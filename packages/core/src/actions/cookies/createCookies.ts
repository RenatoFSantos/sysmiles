"use server";

import { JWT } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function createCookies(name: string, session: JWT) {
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
