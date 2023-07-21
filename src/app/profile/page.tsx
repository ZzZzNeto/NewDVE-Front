'use client'
import axios from "axios"
import SubLayout from '@/app/sublayout'

import { useContext, useEffect } from 'react';
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
        if(data.profile_picture){
            if(data.profile_picture[0] == "/"){
                return "http://127.0.0.1:8000" + data.profile_picture
            }else{
                return data.profile_picture
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
                        <div className=" flex my-[25px] w-full items-center justify-between">
                            <p className="text-gray-400 text-[15px] mr-[10px]">Navegação</p>
                            <div className='bg-gray-300 h-[1px] w-full'><div></div></div>
                        </div>
                        <Link href={'#personal'}><p className="font-bold text-[18px] mb-[10px] text-gray-600">Dados pessoais</p></Link>
                        <Link href={'#contact'}><p className="font-bold text-[18px] mb-[15px] text-gray-600">Formas de contato</p></Link>
                        {data.group != "Company" && data.group != "IFRN_coordenation" && <Link href={'#professional'}><p className="font-bold text-[18px] mb-[15px] text-gray-600">Dados profissionais</p></Link>}
                        {data.group != "Company" && data.group != "IFRN_coordenation" && <Link href={'#inscriptions'}><p className="font-bold text-[18px] mb-[15px] text-gray-600">Minhas incrições</p></Link>}
                        {data.group != "Company" && data.group != "IFRN_coordenation" && <Link href={'#saved'}><p className="font-bold text-[18px] mb-[15px] text-gray-600">Anúncios salvos</p></Link>}
                        {(data.group == "Company" || data.group == "IFRN_coordenation") && <Link href={'#mine'}><p className="font-bold text-[18px] mb-[15px] text-gray-600">Meus anúncios</p></Link>}
                        <div className="flex justify-between mt-[25px]">
                            <Button style={{textTransform: 'none'}} variant="contained" className="bg-red-600 font-bold text-[15px] hover:bg-red-700 rounded-[15px] py-[10px]" onClick={logout}>Sair</Button>
                            <Link className=" text-white px-[15px] bg-blue-700 font-bold text-[15px] hover:bg-blue-800 rounded-[15px] py-[10px]" href="/profile_edit">Editar</Link>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className=" pr-[270px] h-fit w-full">
                        <div id="personal">
                            <h1 className="font-bold text-[40px] text-gray-800">{data.name && (data.name)}</h1>
                            {data.group != "Company" && data.group != "IFRN_coordenation" ? <p className="text-[15px] mt-[-10px] mb-[30px] text-gray-500">{data.ocupattion ? (data.ocupattion) : ("Não informado")}</p>
                            : <p className="text-[15px] mt-[-10px] mb-[30px] text-gray-500">Empresa</p>}

                            <div className="flex">
                                {data.group != "Company" && data.group != "IFRN_coordenation" ? <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">Data de nascimento:</span>{data.birth_date ? (data.birth_date) : ("Nao informado")}</p> 
                                : <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">CNPJ:</span>{data.cnpj ? (data.cnpj) : ("Nao informado")}</p>}
                                <p className="text-[18px] text-gray-800"><span className="mr-[10px] font-bold">Email:</span>{data.email ? (data.email) : ("Nao informado")}</p>
                            </div>

                            {data.group != "Company" && data.group != "IFRN_coordenation" && 
                            <div className="flex mt-[10px]">
                                <p className="mr-[15px] text-[18px] text-gray-800 font-bold">Interesses: </p>
                                {data.preference_tags && (data.preference_tags.length > 0 ? (
                                    data.preference_tags.map(({ icon, tag_name }, index) => (
                                        <Tag key={index} tag_name={tag_name} icon={icon} />
                                    ))
                                ) : ("Nenhum"))}
                            </div>}
                            <div className="mt-[10px]">
                                <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">Endereço: </span>{data.address ? (`${data.address.street}, ${data.address.number}, ${data.address.city} - ${data.address.state}`) : ("Nenhum")}</p>
                            </div>
                            <div className="mt-[10px]">
                                <p className="mr-[10px] text-[18px] text-gray-800 font-bold">Sobre mim: </p>
                                <p className="text-[18px] my-[20px] text-justify indent-[40px] text-gray-800">{data.description ? (data.description) : ("Nada demais")}</p>
                            </div>

                            {data.group == "IFRN_candidate" &&
                                <div className="flex mt-[10px]">
                                <p className="text-[18px] mr-[50px] text-gray-800"><span className="mr-[10px] font-bold">Matricula:</span>{data.registration_ifrn ? (data.registration_ifrn) : ("Nenhuma")}</p> 
                                <p className="text-[18px] text-gray-800"><span className="mr-[10px] font-bold">Curso:</span>{data.course ? (data.course) : ("Nao informado")}</p>
                            </div>}
                        </div> 
                        <div id="contact" className="my-[20px]">
                            <h1 className="font-bold text-[40px] pb-[10px] text-gray-800">Formas de contato</h1>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Email de contato:</span>{data.contact_mail ? (data.contact_mail) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Telefone:</span>{data.phone ? (data.phone) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Linkedin:</span>{data.linkedin ? (data.linkedin) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Instagram:</span>{data.instagram ? (data.instagram) : ("Nao informado")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Twitter:</span>{data.twitter ? (data.twitter) : ("Nao informado")}</p>
                        </div>
                        
                        {data.group != "Company" && data.group != "IFRN_coordenation" &&
                        <div id="professional" className="my-[20px]">
                            <h1 className="font-bold text-[40px] my-[30px] text-gray-800">Dados profissionais</h1>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px] flex flex-wrap"><span className="mr-[10px] font-bold">Arquivos:</span>{data.files && (data.files.length > 0 ? (
                            data.files.map(({ file }, index) => (
                                    <Button variant="contained" target="_blank" key={index} className="bg-blue-700 font-bold text-[15px] mr-[10px] hover:bg-blue-800 rounded-[15px] py-[3px]" href={`http://127.0.0.1:8000${file}`}>{file.replace(/^.*[\\\/]/, '')}</Button>
                                ))
                            ) : ("Nenhum"))}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Portifolio:</span>{data.portfolio ? (data.portfolio) : ("Nenhum")}</p>
                            <p className="text-[18px] mr-[50px] text-gray-800 my-[10px]"><span className="mr-[10px] font-bold">Escolaridade:</span>{data.schooling ? (data.schooling) : ("Nao informado")}</p>
                        </div>}
                        {data.group != "Company" && data.group != "IFRN_coordenation" &&
                        <div id="inscriptions" className="my-[20px]">
                            <h1 className="font-bold text-[40px] my-[30px] pb-[10px] text-gray-800">Minhas inscrições</h1>
                            {data.inscriptions && (data.inscriptions.length > 0 ? (
                                <Carousel responsive={responsive}>
                                    {data.inscriptions.map(({ id,company_name,company_image,main_image,rate,total_rates,city,tags }, index) => (
                                        <div key={index} className="w-[300px]"><CardHomepage id={id} companyName={company_name} companyImage={`http://127.0.0.1:8000${company_image.profile_picture}`} rating={rate} quantity_rating={total_rates} city={city} tags={tags} image={`http://127.0.0.1:8000${main_image.image}`}/></div>    
                                    ))}
                                </Carousel>
                            ) : 
                            <p className="w-full flex items-center justify-center font-bold text-gray-600 text-[20px]">Nenhuma inscrição...</p>)
                            }
                        </div>}
                        {data.group != "Company" && data.group != "IFRN_coordenation" &&
                        <div id="saved" className="my-[20px]">
                            <h1 className="font-bold text-[40px] my-[30px] pb-[10px] text-gray-800">Anúncios salvos</h1>
                            {data.saved_announcements && (data.saved_announcements.length > 0 ? (
                                <Carousel responsive={responsive}>
                                    {data.saved_announcements.map(({ id,company_name,company_image,main_image,rate,total_rates,city,tags }, index) => (
                                        <div key={index} className="w-[300px]"><CardHomepage id={id} companyName={company_name} companyImage={`http://127.0.0.1:8000${company_image.profile_picture}`} rating={rate} quantity_rating={total_rates} city={city} tags={tags} image={`http://127.0.0.1:8000${main_image.image}`}/></div>    
                                    ))}
                                </Carousel>
                            ) : 
                            <p className="w-full flex items-center justify-center font-bold text-gray-600 text-[20px]">Nenhum...</p>    
                            )}
                        </div>}
                        {(data.group == "Company" || data.group == "IFRN_coordenation") && 
                        <div id="mine" className="my-[20px]">
                        <h1 className="font-bold text-[40px] my-[30px] pb-[10px] text-gray-800">Meus anúncios</h1>
                        {data.my_announcements && (data.my_announcements.length > 0 ? (
                            <Carousel responsive={responsive}>
                                {data.my_announcements.map(({ id,company_name,company_image,main_image,rate,total_rates,city,tags }, index) => (
                                    <div key={index} className="w-[300px]"><CardHomepage id={id} companyName={company_name} companyImage={`http://127.0.0.1:8000${company_image.profile_picture}`} rating={rate} quantity_rating={total_rates} city={city} tags={tags} image={`http://127.0.0.1:8000${main_image.image}`}/></div>    
                                ))}
                            </Carousel>
                        ) : 
                        <p className="w-full flex items-center justify-center font-bold text-gray-600 text-[20px]">Nenhum...</p>    
                        )}
                    </div>}
                    </div>
                </Grid>
            </Grid>
        </SubLayout>
    )
}
