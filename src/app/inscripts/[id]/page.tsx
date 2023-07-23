"use client";
import Inscript from "@/components/inscript";
import api from "@/services/api";
import { useEffect, useState } from "react";

interface InscriptsProps {
  params: {
    id: string | number;
  };
}

interface Inscritps {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
}
export default function Inscripts({ params }: InscriptsProps) {
  const [inscripts, setInscripts] = useState<Inscritps[]>();

  const handleInscripts = async () => {
    const response = await api.get(`/announces/${params.id}`);
    console.log(response.data)
    if (response.data.inscripts) {

      setInscripts(response.data.inscripts);
    }
  };

  
  useEffect(() => {
    handleInscripts()
  }, []);

  return (
    <div className="w-full h-screen bg-background px-[270px] mb-10">
      <p className="text-center font-bold mt-5 text-text-500">
        Lista de inscritos
      </p>
      <div className="flex flex-wrap gap-4">
        {inscripts &&
          inscripts.map(({ id, name, email, profile_picture }) => (
            <div>
              <Inscript id={id} name={name} email={email} profile={profile_picture} />
            </div>
          ))}
      </div>
    </div>
  );
}
