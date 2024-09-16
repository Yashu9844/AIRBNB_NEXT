import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
export async function POST(request: Request){

    const body = await request.json();

    const {email,name,password} = body;

    const hashedPassword = await bcrypt.hash(password,10)
    const databaseUrl = process.env.DATABASE_URL;

    // Log the DATABASE_URL to the server console
    console.log("Database URL:", databaseUrl);

  const user = await prisma.user.create({
    data:{
        name,
        email,
        hashedPassword
    }
  })
return NextResponse.json(user);

}