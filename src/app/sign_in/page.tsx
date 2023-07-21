'use client'

import Image from 'next/image'
import axios from "axios"
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import { Grid, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material'

import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

import React, { useState, useContext } from 'react';
import { MyContext } from '@/contexts'
import Carousel from 'react-material-ui-carousel'

import logo from '@/../public/assets/logo.png'
import Comment from '@/components/CommentLoginPage'
import suap from '@/app/login/suap.jpg'

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {

  var itens = [
    {
      image: '/assets/commentUser1.png',
      user: "Rodolfo Silva",
      occupation: "Anunciante",
      content: "Simplismente inacreditável, eu estou realmente satisfeito com meus empregados. Meus negócios decolaram depois que entrei na plataforma."
    },
    {
      image: '/assets/commentUser2.png',
      user: "Lucas Camargo",
      occupation: "Estudante",
      content: "Foi atravez do DVE que consegui minha primeira oportunidade de emprego, fico feliz de ter conhecido a plataforma."
    },
    {
      image: '/assets/commentUser3.png',
      user: "Pedro Rivera",
      occupation: "Estagiario",
      content: "Descobri a plataforma atravez de um amigo, e graças a isso consegui um estagio na empresaq que tanto sonhei, obrigado DVE."
    }
  ]

  const router = useRouter()
  
  const [type, setType] = useState(1)
  const token = localStorage
  const { data, updateData } = useContext(MyContext);

  const create_user = async (data? : any) => {
      try{
          if(type == 2){
            const create = await axios.post(
              `http://127.0.0.1:8000/api/users/`, {
                email : data.email,
                name : data.nameCnpj,
                password : data.password,
                password_confirmation : data.confirmPassword,
                groups : "Candidate"
              }
            );
          }else{
            const create = await axios.post(
              `http://127.0.0.1:8000/api/users/`, {
                email : data.email,
                cnpj : data.nameCnpj,
                password : data.password,
                password_confirmation : data.confirmPassword,
                groups : "Company"
              }
            );
          };

          const response = await axios.post(
          `http://127.0.0.1:8000/api/token/`, {
              email : data.email,
              password : data.password
          });

          const user = await axios.get(
            `http://127.0.0.1:8000/api/users/me`, {headers: { Authorization: `Bearer ${response.data.access}` }} 
          );  
          
          localStorage.setItem('token',response.data.access)
          localStorage.setItem('refresh',response.data.refresh)

          updateData({...user.data,...response.data})
          router.push('/profile')
      }catch{
          console.log("error")
      }
    }
  
  const schema = yup.object({
    nameCnpj: yup.string().required("Este campo é obrigatório"),
    email: yup.string().email("E-mail inválido").required("Este campo é obrigatório"),
    password: yup.string().required("Este campo é obrigatório").min(8,"A senha deve ter no minimo 8 carateres"),
    confirmPassword: yup.string().required("Este campo é obrigatório").oneOf([yup.ref('password')], "As senhas não são iguais"),
  }).required();
  
  
  const {control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => create_user(data));

  return (
    <Grid wrap='wrap' container className='flex flex-wrap'>
      <Grid item xs={5} className='bg-blue-700 h-screen flex text-white items-center'>
        <div className='w-full h-full flex flex-col items-center px-20 py-20 justify-between'>
        <Link className='self-start' href={'/'}><Image alt='logo' src={logo} /></Link>
          <div>
            <h1 style={{ fontSize: '40px' }} className='font-bold mb-3'>Começe sua jornada conosco!</h1>
            <p className='text-xl font-normal'>Descubra a melhor ferramenta para conseguir ofertas de empregos dos melhores empresários do Brasil.</p>

          </div>
          <div className='w-full'>
            <Carousel animation='fade'>
              {
                itens.map((item, i) => <Comment key={i} user={item.user} content={item.content} occupation={item.occupation} image={item.image} />)
              }
            </Carousel>
          </div>
        </div>
      </Grid>
      <Grid xs={7} item className='bg-background h-screen px-[300px] flex flex-col items-center justify-center'>
        <div className='flex flex-col justify-start w-full'>
          <h1 style={{ fontSize: '40px' }} className='mb-[8px] font-bold'>Cadastrar-se</h1>
          <Typography className='text-base'>Começe a se inscrever em ofertas de forma mais rápida e melhor.</Typography>
        </div>
        <form onSubmit={onSubmit} className='flex flex-col mt-[45px] w-full'>
          <RadioGroup name="use-radio-group" row className='justify-between mb-[25px]' defaultValue="company">
            <FormControlLabel className={`border rounded-lg w-[200px] h-[55px] ml-[2px] mr-0 ${type == 1 ? ('border-blue-700 text-blue-700') : ('border-gray-400')}`} value="company" label="Empresa" control={<Radio onChange={() => setType(1)}/>} />
            <FormControlLabel className={`border rounded-lg w-[200px] h-[55px] mr-0 ${type == 2 ? ('border-blue-700 text-blue-700') : ('border-gray-400')}`} value="candidate" label="Candidato" control={<Radio onChange={() => setType(2)}/>} />
          </RadioGroup>
          <Controller
            name="nameCnpj"
            control={control}
            render={({ field }) => <TextField error={errors.nameCnpj && true} id="outlined-basic" label={`${type == 2 ? ('Nome') : ('CNPJ')}`} {...field} variant="outlined" />}
          />
          <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
            {errors.nameCnpj?.message}
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField error={errors.email && true} id="outlined-basic" label="Email" {...field} variant="outlined" />}
          />
          <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
            {errors.email?.message}
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField error={errors.password && true} id="outlined-password-input" type='password' {...field} label="Senha" variant="outlined" />}
          />
          <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
            {errors.password?.message}
          </Typography>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <TextField error={errors.confirmPassword && true} id="outlined-password-input" type='password' {...field} label="Confirme sua senha" variant="outlined" />}
          />
          <Typography className="text-red-600 h-[25px] text-[12px] mb-[3px]">
            {errors.confirmPassword?.message}
          </Typography>
          <Button size='large' type='submit' variant="contained" style={{ textTransform: "none" }} className='bg-button hover:bg-blue-700 my-[25px] rounded-lg h-[55px] text-[16px]'>Confirmar</Button>
        </form>
        <div className='flex items-center'>
          <div className='bg-black h-[1px] w-[212px]'><div></div></div>
          <p className='mx-5 text-xl text-gray-400	font-bold	'>ou</p>
          <div className='bg-black h-[1px] w-[212px]'><div></div></div>
        </div>
        <div className='mt-[25px] flex justify-between w-full'>
          <Link href={`
            https://accounts.google.com/o/oauth2/auth?client_id=715801706986-8aj34ol9c4pfnajha512t8f600dl185u.apps.googleusercontent.com&redirect_uri=http://localhost:3000/redirect/&scope=profile&email&response_type=code&include_granted_scopes=true&access_type=offline&state=google-oauth2`
          } className='w-[30%]'><Button className='rounded-lg h-[55px] w-full font-semibold text-[18px] text-black border-gray-400' variant="outlined" style={{ textTransform: "none" }} startIcon={<GoogleIcon className='h-[35px] w-[35px] text-blue-600' />}>Google</Button></Link>
          <Link href={`
            https://www.facebook.com/v17.0/dialog/oauth?client_id=6058202604308184&redirect_uri=http://localhost:3000/redirect/&state=facebook&scope=["email"]`} className='w-[30%]'><Button className='rounded-lg h-[55px] w-full font-semibold text-[18px] text-black border-gray-400' variant="outlined" style={{ textTransform: "none" }} startIcon={<FacebookRoundedIcon className='h-[35px] w-[35px] text-blue-600' />}>Facebook</Button></Link>
          <Link className='w-[30%]' href={`https://suap.ifrn.edu.br/o/authorize/?client_id=0fdJSVJXcyuXHd0FmiWgMHYXt9iajGWBLApprSTY&redirect_uri=http://localhost:3000/redirect/&state=suap&response_type=token`}><Button className='rounded-lg h-[55px] w-full font-semibold text-[18px] text-black border-gray-400' variant="outlined" style={{ textTransform: "none" }}><Image alt='suap' height={30} width={60} src={suap} /></Button></Link>
        </div>
        <Typography className='text-[16px] mt-[40px]'>Você tem conta? <a className='text-blue-600 font-semibold' href="/login">Entre</a></Typography>
      </Grid>
    </Grid>
  )
}
