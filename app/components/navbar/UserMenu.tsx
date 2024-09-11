"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModalStore from "@/app/hooks/useRegisterModal";
import useLoginModalStore from "@/app/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types/types";
import useRentModalStore from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";


interface UserMenuProps{
  currentUser?:SafeUser | null;
}


const UserMenu:React.FC<UserMenuProps> = (
  {currentUser}
) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModalStore()
  const loginModal = useLoginModalStore();
  const rentModal = useRentModalStore()
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  
  };
  const router = useRouter()

  const onRent = useCallback(()=>{



    if(!currentUser){
      return loginModal.onOpen();
    }
     
    rentModal.onOpen();
  },[loginModal,currentUser])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
        onClick={onRent}
          className="
            hidden md:block text-sm font-semibold py-3 px-4 
            rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div 
          onClick={toggleMenu}
          className="
            p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 
            flex items-center gap-3 rounded-full hover:shadow-md 
            cursor-pointer transition"
        >
          <AiOutlineMenu/>
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="
          absolute rounded-xl shadow-md w-[40vw] md:w-3/4 
          bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
           {currentUser ? (
  <> <MenuItem onClick={()=>
      router.push('/trips')

  } label="My trips" />
  <MenuItem onClick={() => {}} label="My favorites" />
  <MenuItem onClick={()=>{}} label="My reservations" />
  <MenuItem onClick={()=>{}} label="My properties" />
  <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
  <MenuItem onClick={()=>signOut()} label="Logout" />
  </>



           ) : (
            <>  <MenuItem onClick={loginModal.onOpen} label="Login" />
            <MenuItem onClick={() => {
              registerModal.onOpen();
            }} label="Sign Up" /></>
           )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
