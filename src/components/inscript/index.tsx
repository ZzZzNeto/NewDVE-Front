import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
interface InscritpProps {
  id: number;
  name: string;
  email: string;
  profile: string;
}
export default function Inscript({ id, name, email, profile }: InscritpProps) {
  const image = () => {
    if (profile) {
      if (profile[0] == "/") {
        return "http://127.0.0.1:8000" + profile;
      } else {
        return profile;
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-white mt-5 border rounded-lg">
      <div className="bg-primary-900 w-full px-14 h-[100px] rounded-t-lg">
        <div className="rounded-full h-[100px] object-cover flex justify-center">
          <Image
            src={image()}
            alt="foto de inscrito"
            width={100}
            height={100}
            className="mt-10 rounded-full h-[100px] object-cover"
          />
        </div>
      </div>
      <div className="felx flex-col items-center mt-16 px-5">
        <p className="font-bold text-text-500 text-center">{name}</p>
        <p className=" text-gray-500 text-center text-xs">{email}</p>
      </div>
      <Link
        href={`/detailUser/${id}`}
        className="mt-10 w-[90%] text-center mb-5 bg-blue-600 hover:bg-blue-600 rounded-md text-white px-4 font-poppins py-2 text-xs"
      >
        Ver mais informações
      </Link>
    </div>
  );
}
