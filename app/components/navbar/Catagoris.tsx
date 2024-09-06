"use client"

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container";
import { FaMountain } from "react-icons/fa6";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";




export const categories = [
    {
        label:'Beach',
        icon:TbBeach,
        description:"This property is close to Beach"
    },{
        label:'Windmills',
        icon:GiWindmill,
        description:"This property is close to Mountain"
    },{
        label:'Modern',
        icon:MdOutlineVilla,
        description:"This property is close to Modern"
    }
    ,{
        label:'Countryside',
        icon:TbMountain,
        description:"This property is close to Countryside"
    }
    ,{
        label:'Pools',
        icon:TbPool,
        description:"This property is close to Pools"
    }
    ,{
        label:'Island',
        icon:GiIsland,
        description:"This property is close to Island"
    }
    ,{
        label:'Lake',
        icon:GiBoatFishing,
        description:"This property is close to Lake"
    }
    ,{
        label:'Skiing',
        icon:FaSkiing,
        description:"This property is close to Skiing"
    }
    ,{
        label:'Camping',
        icon:GiForestCamp,
        description:"This property is close to Camping"
    }
    ,{
        label:'Arctic',
        icon:BsSnow,
        description:"This property is close to Arctic"
    }
    ,{
        label:'Cave',
        icon:GiCaveEntrance,
        description:"This property is close to Cave"
    }
    ,{
        label:'Desert',
        icon:GiCactus,
        description:"This property is close to Desert"
    }
    ,{
        label:'Barns',
        icon:GiBarn,
        description:"This property is close to Barns"
    }
    ,{
        label:'Lux',
        icon:IoDiamond,
        description:"This property is Luxorius"
    }
]


const Catagoris = () => {

    const params = useSearchParams();
    const category = params?.get('category')
    const pathname = usePathname()

    const isMainPage = pathname ==='/'
    if(!isMainPage) {
        return null;  // Redirect to main page if not in main page
    }



  return (
   <Container>
      <div className="
      pt-4 flex  items-center justify-between overflow-x-auto">
               {categories.map((item)=>(
                <CategoryBox
                key={item.label}
                label={item.label}
             selected={category === item.label}
                icon={item.icon}
                />
               ))}
       

      </div>
   </Container>
  );
};

export default Catagoris;