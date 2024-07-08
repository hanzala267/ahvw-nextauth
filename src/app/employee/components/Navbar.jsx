import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="flex h-full w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center justify-between border-b px-4 md:px-6 bg-background shadow-sm">
        <nav className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Image src="/AWVH.png" width={150} height={150} alt="Logo" />
                <Link
                  href="/employee"
                  prefetch={true}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/employee/Vahicles"
                  prefetch={true}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Vehicles
                </Link>
                <Link
                  href="/employee/Service"
                  prefetch={true}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Service
                </Link>
                <Link
                  href="/employee/Stats"
                  prefetch={true}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Stats
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Image
            src="/AWVH.png"
            width={40}
            height={40}
            alt="Logo"
            className="transition-transform duration-200 hover:scale-110"
          />

          <div className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
            <Link
              href="/employee"
              prefetch={true}
              className="transition-colors hover:text-black relative"
            >
              <span className="text-gray-800">
                Home
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
              </span>
            </Link>
            <Link
              href="/employee/Vahicles"
              prefetch={true}
              className="transition-colors hover:text-black relative"
            >
              <span className="text-gray-800">
                Vehicles
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
              </span>
            </Link>
            <Link
              href="/employee/Service"
              prefetch={true}
              className="transition-colors hover:text-black relative"
            >
              <span className="text-gray-800">
                Service
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
              </span>
            </Link>
            <Link
              href="/employee/Stats"
              prefetch={true}
              className="transition-colors hover:text-black relative"
            >
              <span className="text-gray-800">
                Stats
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
              </span>
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block font-semibold">
            Employee Dashboard
          </div>
          {session?.user && (
            <>
              <Button
                onClick={() => signOut()}
                size="sm"
                className="hidden sm:inline-flex"
              >
                Sign Out
              </Button>
              <Avatar>
                <AvatarImage
                  src={session.user.image || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {session.user.name ? session.user.name[0] : "?"}
                </AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
