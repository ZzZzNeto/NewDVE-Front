'use client'

import Image from 'next/image'
import { useContext } from 'react';
import { MyContext } from '@/contexts'
import LogoHeader from '@/../public/assets/LogoNavbar.png'
import Link from 'next/link'

import { Button } from '@mui/material'

export default function NavBar(){
    const image = () => {
        if(data.profile_picture){
            if(data.profile_picture[0] == "/"){
                return "http://127.0.0.1:8000" + data.profile_picture
            }else{
                return data.profile_picture
            }
        }
    }
    
    const { data, updateData } = useContext(MyContext);

    return (
        <>
            <nav className='flex justify-between items-center flex-wrap w-full'>
                <div>   
                    <Link href={'/'}><Image alt='Logo' src={LogoHeader}/></Link>
                </div>
                <ul className='flex w-[500px] justify-between'>
                    <li>
                        <Link href={'/'}><p className='text-[20px] hover:text-gray-300 transition text-white'>Início</p></Link>
                    </li>
                    <li>
                        <Link href={'#about_us'}><p className='text-[20px] hover:text-gray-300 transition text-white'>Sobre Nós</p></Link>
                    </li>
                    <li>
                        <Link href={'/faq'}><p className='text-[20px] hover:text-gray-300 transition text-white'>Duvidas?</p></Link>
                    </li>
                    <li>
                        <Link href={'/announcements'}><p className='text-[20px] text-white transition hover:text-gray-300 font-bold'>Anuncios</p></Link>
                    </li>
                </ul>
                <div>

                        {data? 
                            <Link href={'/profile'} className='flex hover:border-gray-300 transition rounded-full pt-[10px] pb-[10px] pl-[25px] pr-[25px] text-white font-bold'>
                                <Image alt='user' width={30} height={30} className='rounded-full h-[30px] object-cover' src={image()}/>
                                <p className='text-white ml-[10px] text-[20px]'>{data.name}</p>
                            </Link>
                         : 
                        <Link href={'/login'}>
                            <p className='text-[20px] hover:text-gray-300 pt-[10px] pb-[10px] pl-[25px] pr-[25px] shadow-md border border-white hover:border-gray-300 transition rounded-full text-white font-bold'>Entre ou Cadastre-se</p>
                        </Link>
                        }
                </div>
            </nav>

        </>
    )
  }

  
  