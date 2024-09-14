
import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'


export default async function getFavroiteListings(){
    try {
         const currentUser = await getCurrentUser();

         if(!currentUser){
            return null;
         }

      const fav = await prisma.listing.findMany({
        where:{
            id:{
                in:[...(currentUser.favoriteIds || [])]
            }
        }
      })


      const safeFav = fav.map((favorite)=>({
        ...favorite,
            createdAt:favorite.createdAt.toISOString(),
            key:favorite.id
  
      }))

 return safeFav;

    } catch (error:any) {
        throw new Error(error);
        
    }
}
