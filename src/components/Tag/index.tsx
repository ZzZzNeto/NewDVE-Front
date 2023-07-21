import { Typography } from "@mui/material";
import Image from "next/image";

interface TagProps {
  icon: string;
  tag_name: string;
}

export default function Tag({ icon, tag_name }: TagProps) {
  return (
    <div className="flex items-center border border-text-500 mr-[10px] rounded-lg px-2 py-1">
      <div>
        <img
          alt="icone da tag"
          height={20} 
          width={20}
          src={icon}
        />
      </div>
      <Typography className="text-[12px] text-text-500 ml-2">{tag_name}</Typography>
    </div>
  );
}