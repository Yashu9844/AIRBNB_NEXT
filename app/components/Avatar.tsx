"use client"

import Image from "next/image";

interface AvatarProps{
  src:string | undefined | null
}


const Avatar:React.FC<AvatarProps> = ({src}) => {
  return (
  <Image
   src={src || "/images/Avatar.jpeg"}
   className="rounded-full"
          height="30"
          width="30"
      alt="user-image"
  
  />
  );
};

export default Avatar;