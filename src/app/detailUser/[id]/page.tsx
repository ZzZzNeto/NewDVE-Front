'use client'
import axios from "axios"
import SubLayout from '@/app/sublayout'

import { useContext, useDebugValue, useEffect, useState } from 'react';
import { MyContext  } from '@/contexts'
import "react-multi-carousel/lib/styles.css";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import Tag from "@/components/Tag";
import Carousel from "react-multi-carousel";
import CardHomepage from "@/components/CardHomepage";

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

interface AnnoucementEditProps {
    params: {
      id: string;
    };
  }

export default function Profile({ params }: AnnoucementEditProps) {
    const { data, updateData } = useContext(MyContext);
    const router = useRouter()
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [schoolings, setSchoolings] = useState([])
    const [user, setUser] = useState('')
    const [wait, setWait] = useState(false)

    const getUser = async () => {
        if (data.access) {
            const u = await axios.get(
                `http://127.0.0.1:8000/api/users/${params.id}/`, { headers: { Authorization: `Bearer ${data.access}` } }
            );
            setUser(u.data)
            setWait(true)
        }
    }

    const getSchoolings = async () => {
        if (data.access) {
            const schooling = await axios.get(
                `http://127.0.0.1:8000/api/users/schooling/`, { headers: { Authorization: `Bearer ${data.access}` } }
            );
            schooling.data.map((scho, index) => {
                if(user.schooling == scho[0]){
                    setSchoolings(scho[1])
                }
            })
        }
    }

    const displayMap = async () => {
        if(user?.address){
            const queryString = `housenumber=${user?.address?.number}&street=${encodeURIComponent(user?.address?.street)}&postcode=${user?.address?.cep}&city=${encodeURIComponent(user?.address?.city)}&state=${encodeURIComponent(user?.address?.state)}&format=json&apiKey=3b011d230823499d831285fb00b49c04`;
            const apiUrl = `https://api.geoapify.com/v1/geocode/search?${queryString}`;

            const response = await axios.get(
                apiUrl
            );
            setLat(response.data.results[0].lat)
            setLon(response.data.results[0].lon)
            console.log(response.data.results[0].lon)
            console.log(response.data.results[0].lat)
        }
    }

    useEffect(() => {
        getUser()
        displayMap()
        getSchoolings()
    }, [data,wait])

    const image = () => {
        if(user.profile_picture){
            if(user.profile_picture[0] == "/"){
                return "http://127.0.0.1:8000" + user.profile_picture
            }else{
                return user.profile_picture
            }
        }
    }

    return (
        <SubLayout>
            <Grid container className="py-[100px] bg-white">
                <Grid item xs={4}>
                    <div className=" pl-[270px] max-h-fit sticky top-[30px] pr-[50px] w-full">
                        <div className="h-[300px] w-full">
                            <Image alt='profile' width={0} height={0} sizes="100vw" className=" rounded-2xl object-cover w-full h-full" src={image()}/>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className=" pr-[270px] h-fit w-full">
                        <div id="personal">
                            <h1 className="font-bold text-[40px] text-gray-800">{user.name && (user.name)}</h1>
                            {user.group != "Company" && user.group != "IFRN_coordenation" ? <p className="text-[15px] mt-[-10px] mb-[30px] text-gray-500">{user.ocupattion ? (user.ocupattion) : ("Não informado")}</p>
                            : <p className="text-[15px] mt-[-10px] mb-[30px] text-gray-500">Empresa</p>}

                            <div className="flex">
                                {user.group != "Company" && user.group != "IFRN_coordenation" ? <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">Data de nascimento:</span>{user.birth_date ? (user.birth_date) : ("Nao informado")}</p> 
                                : <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">CNPJ:</span>{user.cnpj ? (user.cnpj) : ("Nao informado")}</p>}
                                <p className="text-[18px] text-gray-800"><span className="mr-[10px] font-bold">Email:</span>{user.email ? (user.email) : ("Nao informado")}</p>
                            </div>

                            {user.group != "Company" && user.group != "IFRN_coordenation" && 
                            <div className="flex mt-[10px]">
                                <p className="mr-[15px] text-[18px] text-gray-800 font-bold">Interesses: </p>
                                {user.preference_tags && (user.preference_tags.length > 0 ? (
                                    user.preference_tags.map(({ icon, tag_name }, index) => (
                                        <Tag key={index} tag_name={tag_name} icon={icon} />
                                    ))
                                ) : ("Nenhum"))}
                            </div>}
                            <div className="mt-[10px]">
                                <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">Endereço: </span>{user.address ? (`${user.address.street}, ${user.address.number}, ${user.address.city} - ${user.address.state}`) : ("Nenhum")}</p>
                                {user?.address && <Image 
                                    className="my-[30px]"
                                    width={600}
                                    height={400}
                                    src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${lon},${lat}&zoom=15.9318&marker=lonlat:${lon},${lat};type:material;color:%23ff0000;size:large;icon:home;iconsize:small&apiKey=3b011d230823499d831285fb00b49c04`}
                                    alt="map"
                                />}
                            </div>
                            <div className="mt-[10px]">
                                <p className="mr-[10px] text-[18px] text-gray-800 font-bold">Sobre mim: </p>
                                <p className="text-[18px] my-[20px] text-justify indent-[40px] text-gray-800">{user.description ? (user.description) : ("Nada demais")}</p>
                            </div>

                            {user.group == "IFRN_candidate" &&
                                <div className="flex mt-[10px]">
                                <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">Matricula:</span>{user.registration_ifrn ? (user.registration_ifrn) : ("Nenhuma")}</p> 
                                <p className="text-[18px] text-gray-800"><span className="mr-[10px] font-bold">Curso:</span>{user.course ? (user.course) : ("Nao informado")}</p>
                            </div>}
                        </div> 
                        <div id="contact" className="my-[20px]">
                            <h1 className="font-bold text-[40px] pb-[10px] text-gray-800">Formas de contato</h1>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Email de contato:</span>{user.contact_mail ? (user.contact_mail) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Telefone:</span>{user.phone ? (user.phone) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Linkedin:</span>{user.linkedin ? (user.linkedin) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Instagram:</span>{user.instagram ? (user.instagram) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Twitter:</span>{user.twitter ? (user.twitter) : ("Nao informado")}</p>
                        </div>
                        
                        {user.group != "Company" && user.group != "IFRN_coordenation" &&
                        <div id="professional" className="my-[20px]">
                            <h1 className="font-bold text-[40px] my-[30px] text-gray-800">Dados profissionais</h1>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px] flex flex-wrap"><span className="mr-[10px] font-bold">Arquivos:</span>{user.files && (user.files.length > 0 ? (
                            user.files.map(({ file }, index) => (
                                    <Button variant="contained" target="_blank" key={index} className="bg-blue-700 font-bold text-[15px] mr-[10px] hover:bg-blue-800 rounded-[15px] py-[3px]" href={`http://127.0.0.1:8000${file}`}>{file.replace(/^.*[\\\/]/, '')}</Button>
                                ))
                            ) : ("Nenhum"))}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Portifolio:</span>{user.portfolio ? (user.portfolio) : ("Nenhum")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Escolaridade:</span>{schoolings ? (schoolings) : ("Nao informado")}</p>
                        </div>}
                    </div>
                </Grid>
            </Grid>
        </SubLayout>
    )
}
