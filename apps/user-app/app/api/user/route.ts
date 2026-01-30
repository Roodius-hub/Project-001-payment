// import  {getServerSession} from "next-auth";
// import { NextResponse } from "next/server";
// import { authOptions } from "../../lib/auth";

// export const GET = async () => {
//     const session = await getServerSession(authOptions);
//     if (session.user) { 
//         return NextResponse.json({
//             user:session.user
//         })
//     }
//     return NextResponse.json({
//         message:"You are not logged in",
//     },
//     {
//         status:403
//     }
// )
// }

import {prisma}  from "@repo/db"
import { NextResponse } from "next/server"

export async function GET(_request:Request) {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}