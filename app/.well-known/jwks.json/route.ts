import { JoseKey } from "@atproto/oauth-client-node";
import { NextResponse } from "next/server";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export async function GET() {
  if (!PRIVATE_KEY) {
    return NextResponse.json({ keys: []});
  }

  const key = JoseKey.fromJWK(JSON.parse(PRIVATE_KEY));
  return NextResponse.json({
    keys: [(await key).publicJwk],
  });
}