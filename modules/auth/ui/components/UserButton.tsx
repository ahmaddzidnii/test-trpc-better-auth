"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/utils/betterAuth/client";
import Link from "next/link";

const menuItems = [
  [
    {
      label: "Profile",
      shortcut: "⇧⌘P",
    },
    {
      label: "Billing",
      shortcut: "⌘B",
    },
    {
      label: "Settings",
      shortcut: "⌘S",
    },
    {
      label: "Keyboard shortcuts",
      shortcut: "⌘K",
    },
  ],
  [
    {
      label: "Invite users",
      shortcut: "⌘U",
    },
    {
      label: "Export data",
      shortcut: "⌘E",
    },
    {
      label: "Analytics",
      shortcut: "⌘A",
    },
    {
      label: "Integrations",
      shortcut: "⌘I",
    },
  ],
];

export const UserButton = () => {
  const session = authClient.useSession();

  if (session.isPending) {
    return <Skeleton className="size-10 rounded-full">&nbsp;</Skeleton>;
  }

  if (!session.data) {
    return (
      <Button>
        <Link href={`/auth/login`}>Login</Link>
      </Button>
    );
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={session.data?.user.image as string}
            alt={session.data?.user.name as string}
          />
          <AvatarFallback>{session.data?.user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        side="bottom"
      >
        <DropdownMenuLabel>{session.data?.user.name}</DropdownMenuLabel>
        <p className="text-xs text-muted-foreground px-2  ">{session.data?.user.email}</p>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems[0].map((item) => (
            <DropdownMenuItem key={item.label}>
              {item.label}
              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
