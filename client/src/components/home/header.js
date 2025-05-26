"use client";

import { LogOut, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login"); // Redirect to login page
  };

  if (status === "loading") {
    return null; // or a loading spinner
  }

  if (!session) {
    // Optionally, redirect to login or show nothing
    return null;
  }

  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6 fixed top-0 right-0 left-[72px] z-10">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard-user"
          className="text-3xl font-extrabold text-transparent drop-shadow-lg tracking-tight hover:text-pink-200 transition-colors cursor-pointer select-none"
          style={{
            WebkitTextStroke: '2px #a855f7',
            color: 'transparent',
            textShadow: '0 2px 8px rgba(168,85,247,0.10)'
          }}
        >
          Designih
        </Link>
      </div>
      <div className="flex-1 max-w-2xl mx-auto relative">
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          className="pl-10 py-6 border-gray-200 bg-gray-50 focus-visible:ring-purple-500 text-base"
          placeholder="Search your Projects and Design's"
        />
      </div>
      <div className="flex items-center gap-5 ml-4">
        <div className="flex items-center gap-1 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger aschild="true">
              <div className="flex items-center space-x-2 ">
                <Avatar>
                  <AvatarFallback>
                    {session?.user?.name?.[0] || "U"}
                  </AvatarFallback>
                  <AvatarImage
                    src={session?.user?.image || "/placeholder-user.jpg"}
                  />
                </Avatar>
                <span className="text-sm font-medium hidden lg:block">
                  {session?.user?.name || "User"}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={handleLogout}
                className={"cursor-pointer"}
              >
                <LogOut className="mr-2 w-4 h-4" />
                <span className="font-bold">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
