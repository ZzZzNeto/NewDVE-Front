'use client'

import Image from 'next/image'
import { useContext } from 'react';
import { MyContext } from '@/contexts'
import logoFooter from '@/../public/assets/logoFooter.png'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function Footer(){
    
    const { data, updateData } = useContext(MyContext);

    return (
        <>
            <div className='h-[400px] flex-col flex justify-between'>
                <Image alt='logo_footer' src={logoFooter}/>
                <p className='text-white text-[20px] text-center font-bold'>Redes sociais</p>
                <div className='flex justify-center items-center'>
                    <Link href={'instagram.com'}><InstagramIcon className='text-white text-[50px] mr-[10px]'/></Link>
                    <Link href={'facebook.com'}><FacebookIcon className='text-white text-[50px] mr-[10px]'/></Link>
                    <Link href={'linkedim.com'}><LinkedInIcon className='text-white text-[50px] mr-[10px]'/></Link>
                    <Link href={'twitter.com'}><TwitterIcon className='text-white text-[50px] mr-[10px]'/></Link>
                </div>
            </div>
            <div className='h-[400px] w-[300px] flex flex-col items-center justify-center'>
                <p className='text-white text-[28px] text-center font-bold'>Links úteis</p>
                <Link className='w-[250px] py-[10px] bg-white text-blue-600 text-[20px] mb-[10px] mt-[20px] font-bold rounded-[15px] text-center' href={'/'}>Início</Link>
                <Link className='w-[250px] py-[10px] bg-white text-blue-600 text-[20px] mb-[10px] mt-[20px] font-bold rounded-[15px] text-center' href={'/announcements'}>Anúncio</Link>
            </div>
            <div className='h-[400px] flex flex-col items-center justify-center'>
                <p className='text-white text-[30px] mb-[20px] font-bold text-center'>Formas de contato</p>
                <p className='text-white text-[20px] text-center'><span className='font-bold'>Email:</span> xxx@gmail.com</p>
                <p className='text-white text-[20px] text-center'><span className='font-bold'>Telefone:</span> (+55) 83 981131773</p>
            </div>
        </>
    )
  }

  
  