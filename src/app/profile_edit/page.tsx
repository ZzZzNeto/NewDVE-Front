'use client'
import axios from "axios"
import SubLayout from '@/app/sublayout'
import FilePreview from '@/../public/assets/filepreview.png'

import { useContext, useEffect, useState } from 'react';
import { MyContext } from '@/contexts'
import "react-multi-carousel/lib/styles.css";
import * as yup from "yup";
import EditIcon from '@mui/icons-material/Edit';
import { yupResolver } from '@hookform/resolvers/yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tag from "@/components/Tag";
import { useForm, Controller } from "react-hook-form";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button, Grid, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
}

export default function Profile() {
    const { data, updateData } = useContext(MyContext);
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]);
    const [selectedTags, setSelectedTags] = useState([])
    const router = useRouter()
    const [profile, setProfile] = useState(undefined)
    const [schoolings, setSchoolings] = useState([])

    const getTags = async () => {
        if (data.access) {
            const tags = await axios.get(
                `http://127.0.0.1:8000/api/tags/`, { headers: { Authorization: `Bearer ${data.access}` } }
            );
            setTags(tags.data.results)
        }
    }

    const getSchoolings = async () => {
        if (data.access) {
            const schooling = await axios.get(
                `http://127.0.0.1:8000/api/users/schooling/`, { headers: { Authorization: `Bearer ${data.access}` } }
            );
            setSchoolings(schooling.data)
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

    const previewFile = (file: any) => {
        if (file) {
            let list = [...files]
            list.push(file)
            setFiles(list)
        }
    }

    useEffect(() => {
        getTags()
        getSchoolings()
        setFiles(data.files && [...data.files])
        let list = selectedTags
        if(data.preference_tags){
            data.preference_tags.map((tag, index) =>
                list.push(tag.id)
            )
            setSelectedTags([...list])
        }
        if (data){
            setValue("name", data?.name)
            setValue("birth_date", data?.birth_date)
            setValue("cnpj", data?.cnpj)
            setValue("ocupattion", data?.ocupattion)
            setValue("state", data?.address?.state)
            setValue("city", data?.address?.city)
            setValue("street", data?.address?.street)
            setValue("number", data?.address?.number)
            setValue("district", data?.address?.district)
            setValue("cep", data?.address?.cep)
            setValue("description", data?.description)
            setValue("contact_mail", data?.contact_mail)
            setValue("phone", data?.phone)
            setValue("linkedin", data?.linkedin)
            setValue("instagram", data?.instagram)
            setValue("twitter", data?.twitter)
            setValue("portfolio", data?.portfolio)
            setValue("schooling", data?.schooling)}
    }, [data])

    const image = () => {
        if (profile){
            return URL.createObjectURL(profile)
        }
        if (data.profile_picture) {
            if (data.profile_picture[0] == "/") {
                return "http://127.0.0.1:8000" + data.profile_picture
            } else {
                return data.profile_picture
            }
        }
    }

    const getFormatedDate = (currentDate: string) => {
        return currentDate.split('/').reverse().join('-');
    }

    const schema = yup.object({
        name: yup.string().required("Este campo é obrigatório"),
        birth_date: yup.date().max(getFormatedDate(new Date().toLocaleDateString())).nullable(),
        ocupattion: yup.string().nullable(),
        state: yup.string().required("Este campo é obrigatório").min(2, 'A sigla do estado deve ter exatamente 2 digitos').max(2, 'A sigla do estado deve ter exatamente 2 digitos'),
        city: yup.string().required("Este campo é obrigatório"),
        cnpj: yup.string().nullable(),
        street: yup.string().required("Este campo é obrigatório"),
        number: yup.string().required("Este campo é obrigatório"),
        district: yup.string().required("Este campo é obrigatório"),
        cep: yup.string().required("Este campo é obrigatório"),
        tags: yup.array().of(yup.string()).nullable(),
        description: yup.string().nullable(),
        contact_mail: yup.string().email("Email inválido").nullable(),
        phone: yup.number().nullable(),
        linkedin: yup.string().nullable(),
        instagram: yup.string().nullable(),
        twitter: yup.string().nullable(),
        files: yup.array().of(yup.mixed()).nullable(),
        portfolio: yup.string().nullable(),
        schooling: yup.string().nullable(),
        profile_picture: yup.mixed().nullable()
    });


    const { control, handleSubmit,setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit((data) => {
        let sendtags = []
        selectedTags.map((tag, index) => 
            sendtags.push({'id' : tag, 'name' : 'tagname'})
        )
        console.log(sendtags)
        data.tags = selectedTags
        data.profile_picture = profile
        data.files = files
        update_user(data)
    }, ((errors) => console.log(errors)
    ));


    const update_user = async (dataset? : any) => {
        try{
            const response = await axios.patch(
            `http://127.0.0.1:8000/api/users/${data?.id}/`,
                dataset,
                { headers: { Authorization: `Bearer ${data.access}`, 'Content-Type' : 'multipart/form-data' }}
            );
            
            console.log(response.data)
            localStorage.setItem('token',response.data.access)
            localStorage.setItem('refresh',response.data.refresh)
                    
            updateData(response.data)
            router.push('/profile')
        }catch{
            console.log("error")
        }
    }

    return (
        <SubLayout>
            <Grid container className="py-[100px] bg-white">
                <Grid item xs={4}>
                    <div className=" pl-[270px] max-h-fit pr-[50px] w-full">
                        <div className="h-[300px] w-full">
                            <label className="bg-blue-700 cursor-pointer text-white rounded-full absolute left-[530px] top-[290px] px-[3px] py-[3px] hover:bg-blue-800" htmlFor="profile"><EditIcon/></label>
                            <Image alt='profile' width={0} height={0} sizes="100vw" className={`rounded-2xl object-cover w-full h-full ${errors.profile_picture && " border-red-600 border"}`} src={image()} />
                        </div>
                        <Typography className="text-red-600 h-[25px] text-[12px] mt-[3px]">
                            {errors.profile_picture?.message}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <form className=" pr-[270px] h-fit w-full" onSubmit={onSubmit}>
                    <Controller
                        name="profile_picture"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <TextField error={errors.profile_picture && true} type="file" accept="image/png, image/gif, image/jpeg"  id="profile" hidden {...field} onChange={(e) => {setProfile(e.target.files[0])}} />
                            </div>
                        )} />
                        <div>
                            <h1 className="font-bold mb-[20px] text-[30px] text-gray-800">Dados pessoais</h1>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => <TextField error={errors.name && true} InputLabelProps={data?.name && { shrink: true }} className="w-full" id="outlined-basic" label="Nome" {...field} variant="outlined" />}
                            />
                            <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                {errors.name?.message}
                            </Typography>
                            <div>
                                {data.group != "Company" && data.group != "IFRN_coordenation" ? <div className="flex items-center justify-between w-full"><div className="w-5/12"><Controller
                                    name="birth_date"
                                    control={control}
                                    render={({ field }) => <TextField type="date" InputLabelProps={{ shrink: true }} error={errors.birth_date && true} className="w-full" id="outlined-basic" label="Data de nascimento" {...field} variant="outlined" />}
                                />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.birth_date?.message}
                                    </Typography></div><div className="w-6/12">
                                        <Controller
                                            name="ocupattion"
                                            control={control}
                                            render={({ field }) => <TextField error={errors.ocupattion && true} InputLabelProps={data?.ocupattion && { shrink: true }} className=" w-full" id="outlined-basic" label="Ocupação" {...field} variant="outlined" />}
                                        />
                                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                            {errors.ocupattion?.message}
                                        </Typography></div></div> : <div className="flex items-center justify-between w-full"><Controller
                                            name="cnpj"
                                            control={control}
                                            render={({ field }) => <TextField error={errors.cnpj && true} InputLabelProps={data?.cnpj && { shrink: true }} className="w-full" id="outlined-basic" label="CNPJ" {...field} variant="outlined" />}
                                        />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.cnpj?.message}
                                    </Typography></div>}
                                {data.group != "Company" && data.group != "IFRN_coordenation" &&
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Preferencias</Typography>
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
                                    </Accordion>}
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => <TextField error={errors.description && true} InputLabelProps={data?.description && { shrink: true }}  className=" my-[25px] w-full" id="outlined-multiline-static" label="Descrição" {...field} multiline rows={4} />}
                                />
                                <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                    {errors.description?.message}
                                </Typography>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-bold mb-[20px] text-[30px] text-gray-800">Endereço</h1>
                            <div className="w-full flex items-center justify-between flex-wrap">
                                <div className="w-3/12">
                                    <Controller
                                        name="state"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.state && true} InputLabelProps={data?.address?.state && { shrink: true }} className="w-full" id="outlined-basic" label="Estado (sigla)" {...field} variant="outlined" />}
                                    />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.state?.message}
                                    </Typography>
                                </div>
                                <div className="w-8/12 min-w-[200px]">
                                    <Controller
                                        name="city"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.city && true} InputLabelProps={data?.address?.city && { shrink: true }}  className="w-full" id="outlined-basic" label="Cidade" {...field} variant="outlined" />}
                                    />
                                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                            {errors.city?.message}
                                    </Typography>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between flex-wrap">
                                <div className="w-9/12">
                                    <Controller
                                        name="street"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.street && true} InputLabelProps={data?.address?.street && { shrink: true }}  className="w-full" id="outlined-basic" label="Rua" {...field} variant="outlined" />}
                                    />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.street?.message}
                                    </Typography>
                                </div>
                                <div className="w-2/12">
                                    <Controller
                                        name="number"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.number && true} InputLabelProps={data?.address?.number && { shrink: true }}  className="w-full" id="outlined-basic" label="Numero" {...field} variant="outlined" />}
                                    />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.number?.message}
                                    </Typography>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between flex-wrap">
                                <div className="w-8/12">
                                    <Controller
                                        name="district"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.district && true} InputLabelProps={data?.address?.district && { shrink: true }}  className="w-full" id="outlined-basic" label="Bairro" {...field} variant="outlined" />}
                                    />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.discrict?.message}
                                    </Typography>
                                </div>
                                <div className="w-3/12">
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
                        </div>
                        <div>
                            <h1 className="font-bold mb-[20px] text-[30px] text-gray-800">Formas de contato</h1>
                            <div className="w-full flex items-center justify-between flex-wrap">
                                <div className="w-6/12">
                                    <Controller
                                        name="contact_mail"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.contact_mail && true} InputLabelProps={data?.contact_mail && { shrink: true }} className="w-full" id="outlined-basic" label="Email para contato" {...field} variant="outlined" />}
                                    />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.contact_mail?.message}
                                    </Typography>
                                </div>
                                <div className="w-5/12 min-w-[200px]">
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.phone && true} InputLabelProps={data?.phone && { shrink: true }} className="w-full" id="outlined-basic" label="Telefone" {...field} variant="outlined" />}
                                    />
                                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                            {errors.phone?.message}
                                    </Typography>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between flex-wrap">
                                <div className="w-4/12">
                                    <Controller
                                        name="instagram"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.instagram && true} InputLabelProps={data?.instagram && { shrink: true }} className="w-full" id="outlined-basic" label="Instagram" {...field} variant="outlined" />}
                                    />
                                    <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                        {errors.instagram?.message}
                                    </Typography>
                                </div>
                                <div className="w-3/12 min-w-[200px]">
                                    <Controller
                                        name="linkedin"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.linkedin && true} InputLabelProps={data?.linkedin && { shrink: true }} className="w-full" id="outlined-basic" label="Linkedin" {...field} variant="outlined" />}
                                    />
                                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                            {errors.linkedin?.message}
                                    </Typography>
                                </div>
                                <div className="w-3/12 min-w-[200px]">
                                    <Controller
                                        name="twitter"
                                        control={control}
                                        render={({ field }) => <TextField error={errors.twitter && true} InputLabelProps={data?.twitter && { shrink: true }} className="w-full" id="outlined-basic" label="Twitter" {...field} variant="outlined" />}
                                    />
                                        <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                            {errors.twitter?.message}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        {data.group != "Company" && data.group != "IFRN_coordenation" &&
                            <div>
                                <h1 className="font-bold mb-[20px] text-[30px] text-gray-800">Dados profissionais</h1>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Arquivos</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="w-full flex">
                                            {files && files.map((item, index) =>
                                                <Link key={index} className=" text-gray-600 " target="_blank" href={item.file ? `http://127.0.0.1:8000${item.file}` : URL.createObjectURL(item)}>
                                                    <Image alt={item.name} src={FilePreview} />
                                                    <p className="truncate w-[100px]">{item.file ? item.file.replace(/^.*[\\\/]/, '') : item.name}</p>
                                                </Link>
                                            )}
                                        </div>
                                        <div className="flex w-full justify-between items-end mt-[25px]">
                                            <Button variant="contained" className="bg-red-600 font-bold text-[13px] hover:bg-red-700 rounded-[5px] py-[3px]" onClick={() => setFiles([])}>Remover todos</Button>
                                            <Controller
                                                name="tags"
                                                control={control}
                                                render={({ field }) => (
                                                    <div>
                                                        <label className="bg-blue-700 cursor-pointer text-white rounded-md px-[10px] py-[3px] hover:bg-blue-800" htmlFor="files">Enviar arquivos</label>
                                                        <TextField type="file" id="files" hidden {...field} onChange={(e) => previewFile(e.target.files[0])} />
                                                    </div>
                                                )} />
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Controller
                                    name="portfolio"
                                    control={control}
                                    render={({ field }) => <TextField error={errors.portfolio && true} InputLabelProps={data.portfolio && { shrink: true }}  className="w-full mt-[25px]" id="outlined-basic" label="Portifólio" {...field} variant="outlined" />}
                                />
                                <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                    {errors.portfolio?.message}
                                </Typography>
                                <Controller
                                name="schooling"
                                control={control}
                                defaultValue={data && data?.schooling}
                                render={({ field }) => (
                                    <FormControl fullWidth>
                                    <InputLabel id="schooling">Escolaridade</InputLabel>
                                    <Select
                                        labelId="schooling"
                                        id="demo-simple-select"
                                        label="Escolaridade"
                                        {...field}
                                        onChange={(event) =>
                                        field.onChange(String(event.target.value))
                                        }
                                    >
                                        {schoolings && schoolings.map((schooling , index) => (
                                        <MenuItem value={schooling[0]}>{schooling[1]}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                )}
                                />
                                <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
                                    {errors.schooling?.message}
                                </Typography>
                            </div>}
                        <div className="flex justify-between mt-[25px]">
                            <Button variant="contained" className="bg-red-600 font-bold text-[15px] hover:bg-red-700 rounded-[15px] py-[10px]  transform-none" href="/profile">Cancelar</Button>
                            <Button variant="contained" className="bg-blue-700 font-bold text-[15px] hover:bg-blue-800 rounded-[15px] transform-none py-[10px]" type='submit'>Salvar</Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </SubLayout>
    )
}
