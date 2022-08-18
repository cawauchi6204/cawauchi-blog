import Link from "next/link";
import { ReactNode } from "react";
import Sidebar from "./sidebar"

const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className="flex flex-rows p-2 text-white font-bold" style={{ backgroundColor: "#ff8906" }}>
        <Link href="/" scroll={false}>
          <a>Home</a>
        </Link>
        <Link href="/about" scroll={false}>
          <a>About </a>
        </Link>
      </nav>
      <div className="flex gap-8">
        <div className="w-1/3" >
          <Sidebar />
        </div>
        <div className="2/3">
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
