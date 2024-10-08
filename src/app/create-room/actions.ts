"use server";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { error } from "console";
import { getSession } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession();
    console.log(session);

    if(!session){
        throw new Error("you must be logged in to create this room");
    }
    await db.insert(room).values({...roomData, userId: session.user.id});
}
