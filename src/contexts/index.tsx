'use client'

import { createContext, useState, useEffect ,ReactNode } from 'react';
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

  useEffect(() => {
    
    let access = localStorage.getItem('token')
    let refresh = localStorage.getItem('refresh')

    if(access){
      let verify = att(access, refresh)
      if(!verify){
        get_refresh(refresh)
      }
    }else{
      if(path != "/login" && path != "/"){
        router.push('/login')
      }
    }
  },[])

  const updateData = (newData : string) => {
    setData(newData);
  };

  const get_refresh = async (refresh : string | null) => {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/token/`, {
          refresh : refresh,
      });
      localStorage.setItem('token', response.data.access)
      att(response.data.access, refresh)
  }

  const att = async (access : string, refresh : string | null) => {
    try{
      const user = await axios.get(
        `http://127.0.0.1:8000/api/users/me`, {headers: { Authorization: `Bearer ${access}` }} 
      );
      setData({...user.data, 'access' : access, 'refresh' : refresh})
    }catch{
        return false
    }}

  return (
    <MyContext.Provider value={{ data, updateData }}>
      {children}
    </MyContext.Provider>
  );
}
