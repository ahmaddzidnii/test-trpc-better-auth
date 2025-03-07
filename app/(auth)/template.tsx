import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

interface AuthTemplateProps {
  children: React.ReactNode;
}

const AuthTemplate = async ({ children }: AuthTemplateProps) => {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (session) {
    return redirect("/");
  }
  return <>{children}</>;
};
``;

export default AuthTemplate;
