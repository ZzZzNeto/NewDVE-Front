'use client'
import axios from "axios"
import SubLayout from '@/app/sublayout'

import { useContext, useEffect } from 'react';
import { MyContext  } from '@/contexts'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Profile() {
    const { data, updateData } = useContext(MyContext);
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        updateData(" ")
        router.push('/login')
    }

    const image = () => {
        if(data){
            if(data.profile_picture[0] == "/"){
                return "http://127.0.0.1:8000" + data.profile_picture
            }else{
                return data.profile_picture
            }
        }
    }

    return (
        <SubLayout>
            <div>
                <Image alt='profile' width={100} height={100} src={image()}/>
                <div>
                    <h1>Bem vindo {data.name && (data.name)}</h1>
                    <p>E-mail: {data.email}</p>
                    <button onClick={logout} className="bg-red-600 text-white p-2 rounded">Sair</button>
                </div> 
            </div>
        </SubLayout>
    )
}
