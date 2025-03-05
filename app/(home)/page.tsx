import { headers } from "next/headers";

import { auth } from "@/auth";

import { LogoutButton } from "@/modules/auth/ui/components/LogoutButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, User } from "lucide-react";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return JSON.stringify(session);
  }

  const user = session!.user;

  return (
    <div className="flex min-h-screen items-center justify-center  p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24">
            <AvatarImage
              src={user.image!}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name.charAt(0)}
              {user.name.split(" ")[1]?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <User className="h-5 w-5 text-gray-500" />
            <span>{user.id}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5 text-gray-500" />
            <span>{user.email}</span>
          </div>
          <div className="text-sm text-gray-500">
            Last login: {new Date(session?.session.updatedAt!).toLocaleString()}
          </div>
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
