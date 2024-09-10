import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import {SafeUser} from '../types/types'
import useLoginModalStore from "./useLoginModal";
import { useRouter } from "next/navigation";
import axios from "axios";


interface IUseFavroite{
    listingId: string ,
    currentUser?: SafeUser | null,

}


const useFavorites = ({listingId,currentUser,}:IUseFavroite) => {
 
    const router = useRouter()
    const loginModal = useLoginModalStore();


    const hasFavorited = useMemo(()=>{

        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId)

    },[currentUser,listingId])


 const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>)=>{
e.stopPropagation();

if(!currentUser){
    return loginModal.onOpen();
}
try {
    
 let request;
if(hasFavorited){
    request= ()=>axios.delete(`/api/favorites/${listingId}`);
}else{
    request = ()=>axios.post(`/api/favorites/${listingId}`);
}

await request();
router.refresh();
toast.success('Success')




} catch (error) {
    toast.error('Something went wrong');
}

 },[
    currentUser,listingId,loginModal,router
 ]);



 return {
    hasFavorited,
    toggleFavorite
 }


}

export default useFavorites;