import { env } from "@/env";
// import { HydrateClient } from "@/trpc/server";
import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const referer = getHeaders().get("referer");

  if (referer?.includes("https://staging.b-trend.digital")) {
    redirect("/api/lti");
  }

  console.log(referer);

  return redirect(`${env.NEXT_PUBLIC_DOMAIN}/course/18`);
  // return (
  //   <HydrateClient>
  //     <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b text-black">
  //       Welcome
  //     </main>
  //   </HydrateClient>
  // );
}
