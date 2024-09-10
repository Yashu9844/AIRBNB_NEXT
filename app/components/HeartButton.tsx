"use client"

import { User } from "@prisma/client";
import { SafeUser } from "../types/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps{
    listingId:string,
    currentUser?:SafeUser|null;
}



const HeartButton:React.FC<HeartButtonProps> = ({
    listingId,
    currentUser,
  
}) => {
   const hasFavorite = false;
   const toggleFavorite = ()=>{}

  return (
    <div className="relative hover:opacity-80 
    transition cursor-pointer
    "
    onClick={toggleFavorite}
    >
    <AiOutlineHeart
    className="absolute -top-[2px] -right-[2px] fill-white"
    size={26}
    />
    <AiFillHeart
    size={24}
    className={
        hasFavorite ? 'fill-red-500':'fill-neutral-500/70'
    }
    />
    </div>
  );
};

export default HeartButton;