"use server";
import { cookies } from "next/headers";

export default async function createCookies(name: string, session: any) {
  if (session) {
    await cookies().set(
      `${name}`,
      JSON.stringify({
        user: {
          ...session,
        },
      })
    );
  }
}
