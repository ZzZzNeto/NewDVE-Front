"use client";

import Image from "next/image";
import { Bookmark } from "@mui/icons-material";
import { Button, Rating } from "@mui/material";
import { useState } from "react";
import Tag from "../Tag";
import Link from "next/link";
import api from "@/services/api";

interface Tags {
  tag_name: string;
  icon: string;
}

interface AnnoucementProps {
  companyName: string;
  image: string;
  rating: number;
  quantity: number;
  tags: Tags[];
  city: string;
  vacancies: number;
  id: number;
  
}
export default function Announcement({companyName, image, rating, quantity, tags, city, vacancies, id}: AnnoucementProps) {

  const [favorite, setFavorite] = useState(false);

  const handleFavoritedAnnouncement = async () => {
    await api.post(`/announces/${id}/save_unsave/`);
  };


  return (
    <div className="bg-white flex rounded-[20px]">
      <Image
        src={`http://127.0.0.1:8000${image}`}
        alt={"imagem do anuncio"}
        width={200}
        height={200}
        className="rounded-[20px]"
      />
      <div className="flex flex-col mt-5 w-full ">
        <div className="flex justify-between px-4 ">
          <div className="flex">
            <p className="text-text-500 font-bold text-4xl">{companyName}</p>
            <div className="ml-6 mt-1">
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                className="text-warning-600"
                readOnly
                size="large"
              />
            </div>
            <div className="ml-4 mt-[10px]">
              <p className="font-bold text-sm text-text-500">
                {rating} <span>({quantity}) avaliações</span>
              </p>
            </div>
          </div>
          <Button
            disableRipple={true}
            onClick={handleFavoritedAnnouncement}
            className="hover:bg-white"
          >
            <Bookmark
              sx={{ width: 48, height: 48 }}
              className={`${favorite ? "text-warning-600" : "text-gray-400"}`}
            />
          </Button>
        </div>
        <div className="mx-4">
          <div className="flex gap-3">
            {tags.map(({ icon, tag_name }, index) => (
              <Tag key={index} name={tag_name} icon={`http://127.0.0.1:8000${icon}`} />
            ))}
          </div>
        </div>
        <div className="mx-4 mt-4">
          <div className="flex gap-7 ">
            <p className="font-bold text-xl text-text-500">25h/semana</p>
            <p className=" text-text-500 text-xl">{city}</p>
            <p className="font-bold text-text-500 text-xl">
              <span className="text-blue-600">{vacancies}</span> Vagas
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Link
            className="bg-blue-600 hover:bg-blue-600 text-white px-4 font-semibold py-2 rounded-lg text-sm  font-poppins mr-8"
            href={`/announcementDetail/${id}`}
          >
            Ver mais
          </Link>
        </div>
      </div>
    </div>
  );
}
