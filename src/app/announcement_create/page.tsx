'use client'

import * as yup from "yup";
import axios from "axios"
import { yupResolver } from '@hookform/resolvers/yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tag from "@/components/Tag";
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from "react-hook-form";
import UploadIcon from '@mui/icons-material/Upload';
import SubLayout from '@/app/sublayout'
import Link from "next/link";
import Image from 'next/image';
import { useSearchParams  } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '@/contexts'
import { Button, Grid, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";


export default function Profile() {
    const [images, setImages] = useState([]);
    const { data, updateData } = useContext(MyContext);
    const [tags, setTags] = useState([]);
    const [courses, setCourses] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const router = useRouter()
    const [curricular,setCurricular] = useState(false)
    const params = useSearchParams ()
    const access = params.get('token')

    const getTags = async () => {
        if (data.access) {
            const tags = await axios.get(
                `http://127.0.0.1:8000/api/tags/`, { headers: { Authorization: `Bearer ${data.access}` } }
            );
            setTags(tags.data.results)
        }
    }

    const getCourses = async () => {
        if (data.access) {
            const courses = await axios.get(
                `http://127.0.0.1:8000/api/announces/courses/`, { headers: { Authorization: `Bearer ${data.access}` } }
            );
            setCourses(courses.data)
        }
    }

    const incomming = async () => {
        try{
            const user = await axios.get(
              `http://127.0.0.1:8000/api/users/me`, {headers: { Authorization: `Bearer ${access}` }} 
            );
            updateData(user.data)
            return true
          }catch{
              return false
        }}

    useEffect(() => {
        if(access){
            incomming()
        }
        getTags()
        getCourses()
        if (data){
            setValue("company_name", data?.name)
            setValue("state", data?.address?.state)
            setValue("city", data?.address?.city)
            setValue("street", data?.address?.street)
            setValue("number", data?.address?.number)
            setValue("district", data?.address?.district)
            setValue("CEP", data?.address?.cep)
        }
    }, [data])

    const getFormatedDate = (currentDate: string) => {
        return currentDate.split('/').reverse().join('-');
    }

    const schema = yup.object({
        company_name: yup.string().required("Este campo é obrigatório"),
        deadline: yup.date().min(getFormatedDate(new Date().toLocaleDateString())).required("Este campo é obrigatório"),
        tags: yup.array().of(yup.string()).nullable(),
        schedule: yup.string().required("Este campo é obrigatorio"),
        salary: yup.number().nullable(),
        journey: yup.string().required("Este campo é obrigatório"),
        vacancies: yup.number().required("Este campo é obrigatório"),
        benefits: yup.string().nullable(),
        requeriments: yup.string().nullable(),
        description: yup.string().nullable(),
        state: yup.string().required("Este campo é obrigatório").min(2, 'A sigla do estado deve ter exatamente 2 digitos').max(2, 'A sigla do estado deve ter exatamente 2 digitos'),
        city: yup.string().required("Este campo é obrigatório"),
        street: yup.string().required("Este campo é obrigatório"),
        number: yup.string().nullable(),
        district: yup.string().nullable(),
        CEP: yup.string().required("Este campo é obrigatório"),
        curriculum: yup.boolean(),
        course: yup.string().nullable(),
        total_workload: yup.string().nullable(),
        images: yup.array().of(yup.mixed()).nullable(),
    }).required();


    const { control, handleSubmit, setValue, setError, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit((data) => {
        let sendtags = []
        selectedTags.map((tag, index) => 
            sendtags.push({'id' : tag, 'name' : 'tagname'})
        )
        console.log(sendtags)
        data.tags = selectedTags
        data.curriculum = curricular
        console.log(curricular)
        if(images.length == 0){
            setError("images", {message : "Ao menos uma imagem deve ser anexada"})
        }else{
            data.images = images
            console.log(data.images)
            create_announcement(data)
        }
    });

    const create_announcement = async (dataset? : any) => {
        try{
            const response = await axios.post(
            `http://127.0.0.1:8000/api/announces/`,
                dataset,
                { headers: { Authorization: `Bearer ${data.access}`, 'Content-Type' : 'multipart/form-data' }}
            );
              
            outer.push('/profile')
        }catch{
            console.log("error")
        }
    }

    const removeImage = (index : number) => {
        let list = [...images]
        list.splice(index, 1)
        setImages(list)
    }

    const previewImages = (image: any) => {
        if (image) {
            let list = [...images]
            list.push(image)
            setImages(list)
        }
    }

    const verifyTag = (id : number) => {
        let list = selectedTags
        if(list.includes(id)){
            let index = list.findIndex(number => number == id)
            list.splice(index, 1)
        }else{
            list.push(id)
        }
        setSelectedTags([...list])
        console.log(selectedTags)
    }

    return (
        <SubLayout>
            <form onSubmit={onSubmit} className='px-[270px] py-[100px]'>
                <div className='border border-gray-400 bg-gray-300 px-[100px] py-[50px] flex-wrap flex items-center justify-center'>
                    {images.length > 0 && images.map((item, index) =>
                        <div className=" flex-row flex w-[100px] h-[100px] mr-[20px]">
                            <Link key={index} className=" text-gray-600 w-[100px] h-[100px] mr-[20px]" target="_blank" href={URL.createObjectURL(item)}>
                                <Image width={0} height={0} sizes="100vw" className="rounded-[20px] w-full h-full object-cover" alt={item.name} src={URL.createObjectURL(item)} />
                                <p className="truncate w-[100px]">{item.name}</p>
                            </Link>
                            <button type="button" onClick={() => removeImage(index)} className={` absolute bg-red-600 hover:bg-red-700 rounded-full top-[320px] w-[30px] h-[30px] p-[2px]`}><CloseIcon className="text-white w-[20px] h[20px]"/></button>
                        </div>
                    )}
                    <Controller
                        name="tags"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <label className="bg-gray-600 cursor-pointer text-white rounded-md px-[10px] py-[3px] hover:bg-gray-700" htmlFor="images"><UploadIcon/> Adicionar</label>
                                <TextField accept="image/png, image/gif, image/jpeg" type="file" id="images" hidden {...field} onChange={(e) => previewImages(e.target.files[0])} />
                            </div>
                        )} />
                </div>
                <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                    {errors.images?.message}
                </Typography>
                <div className="w-full flex mt-[25px] items-center justify-between flex-wrap">
                    <div className="w-5/12">
                        <Controller
                            name="company_name"
                            control={control}
                            render={({ field }) => <TextField error={errors.company_name && true} InputLabelProps={data?.name && { shrink: true }}  className="w-full" id="outlined-basic" label="Nome da empresa" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.company_name?.message}
                        </Typography>
                    </div>
                    <div className="w-3/12">
                        <Controller
                            name="journey"
                            control={control}
                            render={({ field }) => <TextField error={errors.journey && true} className="w-full" id="outlined-basic" label="Jornada de trabalho" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.journey?.message}
                        </Typography>
                    </div>
                    <div className="w-3/12">
                        <Controller
                            name="vacancies"
                            control={control}
                            render={({ field }) => <TextField error={errors.vacancies && true} className="w-full" id="outlined-basic" label="Vagas" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.vacancies?.message}
                        </Typography>
                    </div>
                </div>
                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Categorias</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="flex">
                            {tags.map(({ id, icon, tag_name }, index) =>
                                <Controller
                                    name="tags"
                                    control={control}
                                    render={({ field }) =>
                                        <div className="flex items-center justify-start flex-wrap">
                                            {selectedTags.includes(id) ? 
                                            <Checkbox checked onChange={() => verifyTag(id)}/> : 
                                            <Checkbox onChange={() => verifyTag(id)}/>
                                            }
                                            <Tag key={index} tag_name={tag_name} icon={icon} />
                                        </div>
                                    } />
                            )}
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="w-full flex items-center justify-between mt-[25px] flex-wrap">
                    <div className="w-4/12">
                        <Controller
                            name="schedule"
                            control={control}
                            render={({ field }) => <TextField error={errors.schedule && true} className="w-full" id="outlined-basic" label="Horario" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.schedule?.message}
                        </Typography>
                    </div>
                    <div className="w-3/12">
                        <Controller
                            name="salary"
                            control={control}
                            render={({ field }) => <TextField error={errors.salary && true} className="w-full" id="outlined-basic" label="Salario" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.salary?.message}
                        </Typography>
                    </div>
                    <div className="w-4/12">
                        <Controller
                            name="deadline"
                            control={control}
                            render={({ field }) => <TextField type="date" InputLabelProps={{ shrink: true }} error={errors.deadline && true} className="w-full" id="outlined-basic" label="Prazo de inscrição" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.deadline?.message}
                        </Typography>
                    </div>
                </div> 
                <div className="w-full">
                    <Controller
                        name="benefits"
                        control={control}
                        render={({ field }) => <TextField error={errors.benefits && true} className="w-full" id="outlined-basic" label="Beneficios" {...field} variant="outlined" />}
                    />
                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                        {errors.benefits?.message}
                    </Typography>
                </div>
                <div className="w-full">
                    <Controller
                        name="requeriments"
                        control={control}
                        render={({ field }) => <TextField error={errors.requeriments && true} className="w-full" id="outlined-basic" label="Requisitos" {...field} variant="outlined" />}
                    />
                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                        {errors.requeriments?.message}
                    </Typography>
                </div>
                <div>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <TextField error={errors.description && true} className=" w-full" id="outlined-multiline-static" label="Descrição" {...field} multiline rows={4} />}
                    />
                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                        {errors.description?.message}
                    </Typography>
                </div>
                <div className="w-full flex items-center justify-between mt-[25px] flex-wrap">
                    <div>
                        <Controller
                            name="curriculum"
                            control={control}
                            render={({ field }) => <div className="flex items-center">
                                <Checkbox {...field} onChange={(e) => setCurricular(e.target.checked)}/>
                                <p className="text-[18px] text-blue-600 ">Curricular</p>
                            </div>}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.curriculum?.message}
                        </Typography>
                    </div>
                    <div className="w-5/12">
                        <Controller
                            name="total_workload"
                            control={control}
                            render={({ field }) => <TextField disabled={curricular} error={errors.total_workload && true} className="w-full" id="outlined-basic" label="Carga horaria total" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.total_workload?.message}
                        </Typography>
                    </div>
                    <div className="w-5/12">
                        <Controller
                        name="course"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth>
                            <InputLabel id="course">Curso</InputLabel>
                            <Select
                                disabled={curricular}
                                labelId="course"
                                id="demo-simple-select"
                                label="Curso"
                                {...field}
                                onChange={(event) =>
                                field.onChange(String(event.target.value))
                                }
                            >
                                {courses && courses.map((course , index) => (
                                <MenuItem value={course[0]}>{course[1]}</MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        )}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.course?.message}
                        </Typography>
                    </div>
                </div>
                <h1 className="font-bold my-[20px] text-[30px] text-gray-800">Endereço</h1>
                <div className="w-full flex mt-[25px] items-center justify-between flex-wrap">
                    <div className="w-2/12">
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => <TextField error={errors.state && true} InputLabelProps={data?.address?.state && { shrink: true }}  className="w-full" id="outlined-basic" label="Estado" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.state?.message}
                        </Typography>
                    </div>
                    <div className="w-6/12">
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => <TextField error={errors.city && true} InputLabelProps={data?.address?.city && { shrink: true }}  className="w-full" id="outlined-basic" label="Cidade" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.city?.message}
                        </Typography>
                    </div>
                    <div className="w-1/12">
                        <Controller
                            name="number"
                            control={control}
                            render={({ field }) => <TextField error={errors.number && true} InputLabelProps={data?.address?.number && { shrink: true }}  className="w-full" id="outlined-basic" label="Numero" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.number?.message}
                        </Typography>
                    </div>
                    <div className="w-2/12">
                        <Controller
                            name="cep"
                            control={control}
                            render={({ field }) => <TextField error={errors.cep && true} InputLabelProps={data?.address?.cep && { shrink: true }}  className="w-full" id="outlined-basic" label="CEP" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.cep?.message}
                        </Typography>
                    </div>
                </div>   
                <div className="w-full flex items-center justify-between flex-wrap">
                    <div className="w-6/12">
                        <Controller
                            name="street"
                            control={control}
                            render={({ field }) => <TextField error={errors.street && true} InputLabelProps={data?.address?.street && { shrink: true }}  className="w-full" id="outlined-basic" label="Rua" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.street?.message}
                        </Typography>
                    </div>
                    <div className="w-5/12">
                        <Controller
                            name="district"
                            control={control}
                            render={({ field }) => <TextField error={errors.street && true} InputLabelProps={data?.address?.district && { shrink: true }}  className="w-full" id="outlined-basic" label="Bairro" {...field} variant="outlined" />}
                        />
                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                            {errors.district?.message}
                        </Typography>
                    </div>
                </div>   
                <div className="flex justify-between mt-[25px]">
                    <Button variant="contained" style={{textTransform:'none'}} className="bg-red-500 text-[15px] hover:bg-red-600 rounded-[15px] py-[10px]" href="/profile">Cancelar</Button>
                    <Button variant="contained" style={{textTransform:'none'}}  className="bg-blue-700 text-[15px] hover:bg-blue-800 rounded-[15px] py-[10px]" type='submit'>Criar anúncio</Button>
                </div>                 
            </form>
        </SubLayout>
    )
}
