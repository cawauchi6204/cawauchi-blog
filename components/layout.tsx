import Link from "next/link";
import { ReactNode } from "react";
import Sidebar from "./sidebar"

const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className="flex items-center gap-4 flex-rows p-2 text-white font-bold" style={{ backgroundColor: "#ff8906" }}>
        <Link href="/" scroll={false}>
          <a className="text-xl">cawauchi-blog</a>
        </Link>
        <Link href="/about" scroll={false}>
          <a className="text-xl">About </a>
        </Link>
      </nav>
      <div className="flex">
        <div className="w-1/3" >
          <Sidebar />
        </div>
        <div className="w-2/3">
          {children}
        </div>
      </div>
    </div>
  );
};

type Props = {
  children?: ReactNode;
};

export default Layout;
