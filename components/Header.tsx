import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center justify-center gap-8">
        <li>
          <form
            action={async () => {
              "use server";

              await signOut();
            }}
            className=""
          >
            <Button>Logout</Button>
          </form>
        </li>
        <Link href="/profile">
          <Avatar>
            <AvatarFallback className=" bg-amber-100">
              {getInitials(session.user?.name || "")}
            </AvatarFallback>
          </Avatar>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
