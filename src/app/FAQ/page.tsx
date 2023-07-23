'use client'

import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import SubLayout from '@/app/sublayout'
import Image from 'next/image';
import { TextField, Button } from '@mui/material';

export default function Profile() {

    return (
        <SubLayout>
            <div className='px-[270px] py-[100px]'>
                <div className='flex mb-[50px] items-center justify-start'>
                    <NotListedLocationIcon className='mr-[20px] h-[50px] w-[50px]'/>
                    <h1 className='text-[36px] font-bold text-gray-800'>Central de dúvidas frequêntes</h1>
                </div>  
                <div>
                    <p className='text-[25px] mb-[5px] font-bold text-gray-800'>- Como entro em contato com uma empresa que quero estagiar para retirar duvidas sobre a proposta?</p>
                    <p className='text-[25px] mb-[40px] text-gray-800'>Nos anuncios publicados na pagina são disponibilizadas as formas de entrar em contato diretamente com a empresa anunciante </p>    
                </div> 
                <div>
                    <p className='text-[25px] mb-[5px] font-bold text-gray-800'>- Como funcionam as inscriçoes pela plataforma?</p>
                    <p className='text-[25px] mb-[40px] text-gray-800'>Quando os usuarios se inscrevem nas propostas anunciadas os dados do perfil são enviados e registrados para que a empresa que realizou o anuncio possa visualizar, analizar os concorrentes e entrar em contato com os mesmos.</p>    
                </div>
                <div className='bg-blue-600 rounded-2xl p-[50px]'>
                    <div>
                        <div className='flex justify-between items-end'>
                            <h1 className='text-[28px] font-bold text-white'>Envie sua duvida</h1>    
                            <p className='text-[18px] text-white'>Caracteres restantes: <span className='font-bold'>255</span></p>
                        </div>
                        <TextField className=" w-full bg-white mt-[20px]" id="outlined-multiline-static" label="Descrição" multiline rows={4} />
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <Button variant="contained" style={{textTransform:'none'}}  className="bg-blue-600 mt-[20px] text-[15px] hover:bg-blue-800 rounded-[15px] py-[10px]" type='button'>Enviar</Button>
                </div>
            </div>
            
        </SubLayout>
    )
}
