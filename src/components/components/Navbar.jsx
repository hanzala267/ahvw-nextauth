import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <div className="flex h-full w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b  px-4 md:px-6 bg-background shadow-sm">
        <nav className="flex flex-col gap-6 text-lg font-medium hidden md:flex md:flex-row md:items-center md:gap-8 md:text-sm lg:gap-10 p-4">
          <img
            src="/AWVH.png"
            width={40}
            height={40}
            alt="Logo"
            className="transition-transform duration-200 hover:scale-110"
          />

          <Link
            href="/"
            prefetch={true}
            className="transition-transform transform duration-200 hover:scale-105 hover:text-black"
          >
            <span className=" text-gray-800 ">
              Home
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
            </span>
          </Link>
          <Link
            href="/Vahicles"
            prefetch={true}
            className="transition-transform transform duration-200 hover:scale-105 hover:text-black"
          >
            <span className=" text-gray-800 ">
              Vehicles
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
            </span>
          </Link>
          <Link
            href="/Customers"
            prefetch={true}
            className="transition-transform transform duration-200 hover:scale-105 hover:text-black"
          >
            <span className=" text-gray-800 ">
              Customers
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
            </span>
          </Link>
          <Link
            href="/Services"
            prefetch={true}
            className="transition-transform transform duration-200 hover:scale-105 hover:text-black"
          >
            <span className=" text-gray-800 ">
              Services
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
            </span>
          </Link>
          <Link
            href="/Employee"
            prefetch={true}
            className="transition-transform transform duration-200 hover:scale-105 hover:text-black"
          >
            <span className=" text-gray-800 ">
              Employee
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
            </span>
          </Link>
          <Link
            href="/Inventory"
            prefetch={true}
            className="transition-transform transform duration-200 hover:scale-105 hover:text-black"
          >
            <span className=" text-gray-800 ">
              Inventory
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
            </span>
          </Link>
        </nav>

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
              <Image
                src="/AWVH.png"
                width={150}
                height={150}
                alt="Picture of the author"
              />

              <Link
                href="/"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/Vahicles"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                Vehicles
              </Link>
              <Link
                href="/Customers"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link
                href="/Services"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                Services
              </Link>
              <Link
                href="/Employee"
                prefetch={true}
                className="text-muted-foreground hover:text-foreground"
              >
                Employee
              </Link>
              <Link
                href="/Inventory"
                prefetch={true}
                className="hover:text-foreground"
              >
                Inventory
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4 font-semibold ">
          <div>Admin Dashboard</div>
        </div>
        <Button className="rounded-full" size="icon" variant="secondary">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </header>
    </div>
  );
}
