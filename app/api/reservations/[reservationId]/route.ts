import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('reservationId must be a string or Not Found Reservation Id');
  }

  try {
    const reservation = await prisma.reservation.delete({
      where: {
        id: reservationId,
        // Ensure that either the user is the owner of the reservation or the listing
        AND: [
          {
            OR: [
              { userId: currentUser.id }, // The current user is the owner of the reservation
              { listing: { userId: currentUser.id } } // The current user is the owner of the listing
            ]
          }
        ]
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.error(); // Internal Server Error
  }
}
