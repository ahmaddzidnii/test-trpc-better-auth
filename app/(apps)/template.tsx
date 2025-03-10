import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

interface HomeTemplateProps {
  children: React.ReactNode;
}
const HomeTemplate = async ({ children }: HomeTemplateProps) => {
  const requestHeaders = await headers();
  let redirectUrl = new URL("/auth/login", `${requestHeaders.get("x-url")}`);

  // const callbackUrl = `${requestHeaders.get("x-url")}`;

  // if (callbackUrl) {
  //   redirectUrl.searchParams.append("callbackUrl", btoa(callbackUrl));
  // }

  const [session] = await Promise.all([
    auth.api.getSession({
      headers: requestHeaders,
    }),
  ]);

  if (!session) {
    return redirect(redirectUrl.toString());
  }

  return <>{children}</>;
};

export default HomeTemplate;
