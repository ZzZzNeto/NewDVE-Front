'use client'

import Image from 'next/image'
import axios from "axios"
import { Grid, Typography, TextField, Button } from '@mui/material'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";

import GoogleIcon from '@mui/icons-material/Google';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

import React, { useState, useContext } from 'react';
import { MyContext } from '@/contexts'
import Carousel from 'react-material-ui-carousel'
import Avatar from '@mui/material/Avatar';

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
  const [notfound,setNotFound] = useState(false)
  const { data, updateData } = useContext(MyContext);

  const login_user = async (data? : any) => {
      try{
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
          setNotFound(false)
          router.push('/profile')
      }catch{
          console.log("error")
          setNotFound(true)
      }
    }

  const schema = yup.object({
    email: yup.string().email("E-mail inválido").required("Este campo é obrigatório"),
    password: yup.string().required("Este campo é obrigatório").min(8,"A senha deve ter no minimo 8 carateres"),
  }).required();
  
  
  const {control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => login_user(data));

  return (
    <Grid wrap='wrap' container className='flex flex-wrap'>
      <Grid item xs={5} className='bg-blue-700 h-screen flex text-white items-center'>
        <div className='w-full h-full flex flex-col items-center px-20 py-20 justify-between'>
          <Link className='self-start' href={'/'}><Image alt='logo' src={logo} /></Link>
          <div>
            <h1 style={{ fontSize: '40px' }} className='font-bold mb-3'>Obrigado por escolher nosso serviço!</h1>
            <p className='text-xl font-normal'>Para acessar sua conta, por favor insira suas credenciais abaixo. Lembre-se de que a segurança de sua conta é importante para nós.</p>

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
      <Grid xs={7} item className='bg-background h-screen px-[300px] flex items-center justify-center'>
        <div className='w-full h-full flex flex-col items-center py-20 justify-between'>
        <div className='flex flex-col justify-start w-full'>
          <h1 style={{ fontSize: '40px' }} className='mb-[8px] font-bold'>Bem-vindo de volta!</h1>
          <Typography className='text-base'>Por favor, insira suas credenciais abaixo para acessar sua conta.</Typography>
        </div>
        {notfound &&
          <p className='text-red-600 h-[25px] text-[15px] text-center w-full font-bold mb-[3px]'>Nenhum usuario encontrado com essas credenciais...</p>
        }
        <form onSubmit={onSubmit} className='flex flex-col w-full'>
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
          <a className='self-end text-blue-600 text-[16px]' href="">Esqueceu a senha ?</a>
          <Button size='large' type='submit' variant="contained" style={{ textTransform: "none" }} className='bg-button hover:bg-blue-700 my-[25px] rounded-lg h-[55px] text-[16px]'>Entrar</Button>
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
        <Typography className='text-[16px] mt-[40px]'>Você não tem conta? <a className='text-blue-600 font-semibold' href="/sign_in">Cadaste-se</a></Typography>
        </div>
      </Grid>
    </Grid>
  )
}
