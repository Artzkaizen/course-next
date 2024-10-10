import { type z } from "zod";
import { api } from "@/trpc/server";
import { type NextRequest, NextResponse } from "next/server";
import { type LaunchRequestLegacy } from "@/server/api/routers/launch";

export async function POST(request: NextRequest) {
  const bodyText = await request.text();

  const params = new URLSearchParams(bodyText);
  const body = Object.fromEntries(params.entries());

  console.log(body);

  const user = await api.launch.launchLti(
    body as z.infer<typeof LaunchRequestLegacy>,
  );

  // return NextResponse.json(user);

  // change this to host domain name
  // const baseUrl = request.nextUrl.origin;

  return NextResponse.redirect(
    `https://v2cfgrg0-3000.euw.devtunnels.ms/course/${user.courseid}`,
  );
}
