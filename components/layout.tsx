import Link from "next/link";
import { ReactNode } from "react";

const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className="flex flex-rows p-2 bg-red-500 text-white font-bold">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About </a>
        </Link>
      </nav>
      <div className="max-w-4xl m-auto">
        {children}
      </div>
    </div>
  );
};

type Props = {
  children?: ReactNode;
};

export default Layout;
