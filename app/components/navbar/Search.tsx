"use client"

import useSearchModalStore from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {

   const searchModal = useSearchModalStore();

  return (
    <div 
    onClick={searchModal.onOpen}
    className="
    border-[1px]
    w-full
    py-1
    md:w-auto
    rounded-full
    shadow-sm
    hover:shadow-md
    transition
    cursor-pointer
    "
    >
        <div className="flex
        items-center
        justify-between
        "> 
        <div className="
        text-smfont-semibold
        px-6">
           Anywhere
        </div>
        <div className="
        hidden
        sm:block
        text-sm
        font-semibold
        px-6
        border-x-[1px]
        flex-1
        text-center
        
        ">Any Week</div>
        <div className="
        text-sm
        flex
        items-center
        pl-6
        pr-2
        text-gray-500 gap-3
        ">
          <div className="
          hidden sm:block">
            All Guests
          </div>
          <div className="
          p-2
          bg-rose-500
          rounded-full
          text-white">
            <BiSearch size={18}/>
          </div>
        </div>

        </div>
      
    </div>
  );
};

export default Search;