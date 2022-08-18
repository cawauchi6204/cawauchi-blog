import React from "react"
import Image from "next/image"
import Toc from "./toc"

type Props = {}

const Sidebar: React.FC<Props> = ({ }) => {
  return (
    <aside className="w-96 min-h-screen h-full bg-white text-black">
      <div className="relative w-2/3 m-auto" style={{ height: 250 }}>
        <Image
          className="rounded-full border-8 border-black"
          src="/tori.png"
          alt="prof"
          layout='fill'
          unoptimized={process.env.NODE_ENV === 'development'} />
      </div>
      <div className="text-left mx-12">
        <h3 className="font-bold text-2xl">cawauchi</h3>
        <p>webエンジニア</p>
        <p>
          埼玉在住のwebエンジニア｜2019年11月14日にプログラミング学習を開始しました 2020年8月1日からプログラマーデビューしました
        </p>
      </div>
      <Toc tocs={[]} />
    </aside>
  )
}

export default Sidebar
