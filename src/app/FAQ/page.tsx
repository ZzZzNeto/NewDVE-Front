'use client'

import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import SubLayout from '@/app/sublayout'
import Image from 'next/image';

export default function Profile() {

    return (
        <SubLayout>
            <div>
                <NotListedLocationIcon/>
                <h1>Central de dúvidas frequêntes</h1>
            </div>
            
        </SubLayout>
    )
}
