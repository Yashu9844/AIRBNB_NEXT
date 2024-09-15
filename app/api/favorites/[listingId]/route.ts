import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    return NextResponse.json({ error: 'Invalid listingId' }, { status: 400 });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  if (!favoriteIds.includes(listingId)) {
    favoriteIds.push(listingId);
  }

  try {
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: favoriteIds },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user favorites:", error);
    return NextResponse.json({ error: 'Failed to update favorites' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== 'string') {
    return NextResponse.json({ error: 'Invalid listingId' }, { status: 400 });
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  try {
    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds: favoriteIds },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user favorites:", error);
    return NextResponse.json({ error: 'Failed to update favorites' }, { status: 500 });
  }
}
