'use client'
import axios from "axios"
import { useSearchParams  } from 'next/navigation'

import { useContext, useEffect } from 'react';
import { MyContext  } from '@/contexts'
import { redirect } from "next/navigation";

export default function Redirect() {
    const { data, updateData } = useContext(MyContext);
    
    const params = useSearchParams ()
    const code = params.get('code')
    const state = params.get('state')

    const provider = state 

    const getData = async (mySubString : string) => {

        if(mySubString.length > 4){
            const response = await axios.get(`https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/`, {headers: { Authorization: `Bearer ${mySubString}` }})
            const create = await axios.post(`http://127.0.0.1:8000/api/users/suap/`, {user : response.data})
            localStorage.setItem('token',create.data.access)
            localStorage.setItem('refresh',create.data.refresh)
            updateData(create.data)
            console.log(create.data)
        }else{
            if(code){
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/login/social/jwt-pair-user/`, {
                        provider : provider,
                        code : code
                    });
                    updateData(response.data)
                    console.log(response.data)
                    localStorage.setItem('token',response.data.token)
                    localStorage.setItem('refresh',response.data.refresh)
            }
        }
    };

   useEffect(() => {
    const hash = window.location.hash
    var mySubString = hash.substring(
        hash.indexOf("=") + 1, 
        hash.indexOf("&")
    );
    getData(mySubString)
    redirect('/profile')
   }, [])
    
}
