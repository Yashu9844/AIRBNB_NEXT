import prisma from '@/app/libs/prismadb'
import getReservations from './getReservation';

export interface IListingParams{
    userId?: string;
    guestCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
    roomCount?: number;
}

export default async function getListings(params:IListingParams){

    // const reservation = await getReservations(params)
    try {
    const {userId,
           guestCount,
           bathroomCount,
           startDate,
           endDate,
           locationValue,
           category,
            roomCount
        } = params;

    
    let query:any = {}
    
    if(userId){
         query.userId = userId;
    }

    if(category){
        query.category = category;
    }

    if(roomCount){
        query.roomCount = {
            gte:+roomCount,
        };
    }
    if(bathroomCount){
        query.bathroomCount = {
            gte:+bathroomCount,
        };
    }
    if(guestCount){
        query.guestCount = {
            gte:+guestCount,
        };
    }

 if(locationValue){
     query.locationValue = locationValue;
 }

 if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
          ],
        },
      },
    };}


        const listings = await prisma.listing.findMany({
            where:query,
            orderBy:{
                createdAt: 'desc',
            }
        })
         const safeListings = listings.map((list)=>({
            ...list,
            createdAt: list.createdAt.toISOString(),
            key:list.id
         }))

         return safeListings;
        
    } catch (error:any) {
        throw new Error(error)
    }
}