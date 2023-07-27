import { Avatar, Rating, Typography } from "@mui/material";
import Image from "next/image";
import Tag from "../Tag";
import Link from "next/link";

interface Tags {
  icon: string;
  tag_name: string;
}
interface AnnoucementProps {
  companyName: string;
  companyImage: string;
  image: string;
  id: number;
  rating: number;
  quantity_rating: number;
  tags: Tags[];
  city: string;
  expired: boolean;
}

export default function CardHomepage({
  companyName,
  id,
  companyImage,
  image,
  rating,
  quantity_rating,
  tags,
  expired,
  city,
}: AnnoucementProps) {
  return (
    <div className="border border-gray-400 border-opacity-50 rounded-lg ">
      <div className="relative min-w-fit h-28">
        <Image
          alt="imagem de anuncio"
          src={image}
          fill
          className="rounded-t-lg object-cover "
        />
      </div>
      <div className="mx-4">
        <div className=" relative flex justify-end">
          <Avatar
            alt="Remy Sharp"
            src={companyImage}
            sx={{
              width: 50,
              height: 50,
            }}
            className=" object-cover absolute -top-[25px]"
          />
        </div>
        <div className=" pb-3 border-b border-text-500">
          <Typography className="font-bold text-base mt-6 text-text-500">
            {companyName}
          </Typography>
          <div className="flex ">
            <Rating
              name="read-only"
              value={rating}
              precision={0.1}
              readOnly
              size="small"
            />
            <div className="ml-2 flex items-end">
              <Typography
                className="font-bold text-xs text-text-500"
                style={{ fontSize: 12 }}
              >
                {rating}
              </Typography>
              <Typography
                className="font-bold text-xs text-text-500 ml-1"
                style={{ fontSize: 10 }}
              >
                ({quantity_rating})
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map(({ icon, tag_name }, index) => (
            <Tag key={index} tag_name={tag_name} icon={`http://127.0.0.1:8000${icon}`}/>
          ))}
        </div>
        <div className="flex justify-between mt-4 mb-4 items-center">
          <Typography className="text-xs font-bold">{city}</Typography>
          <Link href={expired ? (`/inscripts/${id}`) : (`/announcementDetail/${id}`)} className="text-white text-[16px] font-bold bg-blue-600 rounded-full px-[10px] py-[3px]">{expired ? ('ver inscritos') : ('ver mais')}</Link>
        </div>
      </div>
    </div>
  );
}