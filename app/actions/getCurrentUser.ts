import { getServerSession, } from "next-auth/next";
import authOptions from "../libs/authOptions";
import prisma from '@/app/libs/prismadb'


export async function getSession(){
    return await getServerSession(authOptions)
}

export default async function getCurrentUser(){
    try {
        const session:any = await getSession();
        if (!(session as any)?.user?.email) {
            return null;
        }
const currentuser = await prisma.user.findUnique({
    where:{
        email:session.user.email as string,
    }
})
if(!currentuser){
    return null; 
}

return currentuser;

        
    } catch (error:any) {
        return null;
        
    }
}
