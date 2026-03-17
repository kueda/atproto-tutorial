import { getOAuthClient } from "@/lib/auth/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const did = cookieStore.get("did")?.value;

    if (did) {
      const client = await getOAuthClient();
      await client.revoke(did);
    }

    cookieStore.delete("did");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('[route.ts] Logout error: ', error);
    const cookieStore = await cookies();
    cookieStore.delete("did");
    return NextResponse.json({ success: true });
  }
}