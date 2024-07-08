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
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="mr-2 shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Image src="/AWVH.png" width={150} height={150} alt="Logo" />
                <Link href="/admin" prefetch={true} className="text-muted-foreground hover:text-foreground">Home</Link>
                <Link href="/admin/Vahicles" prefetch={true} className="text-muted-foreground hover:text-foreground">Vehicles</Link>
                <Link href="/admin/Customers" prefetch={true} className="text-muted-foreground hover:text-foreground">Customers</Link>
                <Link href="/admin/Services" prefetch={true} className="text-muted-foreground hover:text-foreground">Services</Link>
                <Link href="/admin/Employee" prefetch={true} className="text-muted-foreground hover:text-foreground">Employee</Link>
                <Link href="/admin/Inventory" prefetch={true} className="text-muted-foreground hover:text-foreground">Inventory</Link>
                <Link href="/admin/create-employee" prefetch={true} className="text-muted-foreground hover:text-foreground">Add Employee</Link>
                <Link href="/admin/Newcustomer" prefetch={true} className="text-muted-foreground hover:text-foreground">New Customers</Link>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium overflow-x-auto">
            <img
              src="/AWVH.png"
              width={40}
              height={40}
              alt="Logo"
              className="mr-4 transition-transform duration-200 hover:scale-110 flex-shrink-0"
            />
            {[
              { href: "/admin", label: "Home" },
              { href: "/admin/Vahicles", label: "Vehicles" },
              { href: "/admin/Customers", label: "Customers" },
              { href: "/admin/Services", label: "Services" },
              { href: "/admin/Employee", label: "Employee" },
              { href: "/admin/Inventory", label: "Inventory" },
              { href: "/admin/create-employee", label: "Add Employee" },
              { href: "/admin/Newcustomer", label: "New Customers" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={true}
                className="transition-transform transform duration-200 hover:scale-105 hover:text-black whitespace-nowrap"
              >
                <span className="text-gray-800 relative">
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black transform scale-x-0 transition-transform duration-200 hover:scale-x-100"></span>
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block font-semibold whitespace-nowrap">Admin Dashboard</div>
          {session?.user && (
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                onClick={() => signOut()}
                size="sm"
                className="hidden sm:inline-flex whitespace-nowrap"
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
            </div>
          )}
        </div>
      </header>
    </div>
  );
}