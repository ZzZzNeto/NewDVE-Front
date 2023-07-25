'use client'

import { createContext, useState, useEffect ,ReactNode } from 'react';
import { useSearchParams  } from 'next/navigation'
import axios from "axios"
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

interface MyContextData {
  data: string;
  updateData: (newData: string) => void;
}

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContext = createContext<MyContextData>({} as MyContextData);

export function MyContextProvider({ children }: MyContextProviderProps) {
  const [data, setData] = useState('');
  const router = useRouter()
  const path = usePathname()
  const params = useSearchParams ()
  const external = params.get('token')

  useEffect(() => {
    
    let access = localStorage.getItem('token') || external
    let refresh = localStorage.getItem('refresh')

    if(access){
      let verify = att(access, refresh).then(result => {
      if(!result){
        get_refresh(refresh)
      }})
    }else{
      console.log(path)
      if(path !== "/login" && path !== "/"){
        router.push('/login')
      }
    }
  },[])

  const updateData = (newData : string) => {
    setData(newData);
  };

  const get_refresh = async (refresh : string | null) => {
    try{
      const response = await axios.post(
        `http://127.0.0.1:8000/api/token/`, {
          refresh : refresh,
        });
    
      localStorage.setItem('token', response.data.access)
      att(response.data.access, refresh)
    }catch{
      localStorage.removeItem('token')
      localStorage.removeItem('refresh')
      updateData(" ")
      router.push('/login')
    }
  }

  const att = async (access : string, refresh : string | null) => {
    try{
      const user = await axios.get(
        `http://127.0.0.1:8000/api/users/me`, {headers: { Authorization: `Bearer ${access}` }} 
      );
      setData({...user.data, 'access' : access, 'refresh' : refresh})
      return true
    }catch{
        return false
    }}

  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
}
