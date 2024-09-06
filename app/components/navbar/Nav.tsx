"use client"

import Container from "../Container"
import Catagoris from "./Catagoris"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"
import { SafeUser } from "@/app/types/types"

interface NavProps {
  currentUser? : SafeUser | null
}



const Nav:React.FC<NavProps> = ({currentUser}) => {
 

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
       <div className="
       py-4
       border-b-[1px]
       
       ">
    <Container>
        <div className="
        flex
        flex-row
        items-center
        justify-between
        gap-3
        md:gap-0
        ">
            <Logo/>
            <Search/>
            <UserMenu  currentUser={currentUser}/>

        </div>
    </Container>

       </div>

    <Catagoris/>


    </div>
  )
}

export default Nav
