import { headers } from "next/headers";
import { Mail, User } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { LogoutButton } from "@/modules/auth/ui/components/LogoutButton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RevokeSessionButton } from "@/modules/auth/ui/components/RevokeSessionButton";

const formatUserAgent = (uaString: string | null | undefined) => {
  if (!uaString) return null;
  const browserMatch = uaString.match(
    /(firefox|msie|chrome|safari|edge|opr|brave)\/?\s*(\d+)/i
  ) || ["Unknown", "Unknown"];
  const osMatch = uaString.match(/\((.*?)\)/);

  return {
    browser: browserMatch[1],
    version: browserMatch[2],
    os: osMatch ? osMatch[1] : "Unknown",
  };
};

// Function to format date in a more readable way
const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const sessions = await auth.api.listSessions({
    headers: await headers(),
  });

  if (!session || !sessions) {
    return redirect("/auth/login");
  }
  const user = session!.user;

  const filteredSessions = sessions.filter((s) => s.id !== session.session.id);
  const currentSession = sessions.find((s) => s.id === session.session.id);
  const orderedSessions = currentSession ? [currentSession, ...filteredSessions] : filteredSessions;

  return (
    <div className="flex min-h-screen items-center justify-center gap-4 flex-col p-4">
      <Card className="w-full max-w-lg">
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
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="mt-4 text-2xl">Sessions Active</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orderedSessions.map((s) => (
            <div
              key={s.id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">{formatUserAgent(s?.userAgent)?.browser}</h3>
                    <p className="text-sm text-gray-500">{s.ipAddress}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-x-4 gap-y-1 text-sm">
                  <div>
                    <span className="text-gray-500">Created:</span> {formatDate(s.createdAt)}
                  </div>
                  <div>
                    <span className="text-gray-500">Expires:</span> {formatDate(s.expiresAt)}
                  </div>
                </div>
              </div>
              <RevokeSessionButton
                token={s.token}
                sessionId={s.id}
                currentSession={session.session.id}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
