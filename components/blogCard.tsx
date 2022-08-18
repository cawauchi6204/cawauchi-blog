import React from "react"
import Link from "next/link";
import Image from 'next/image'

import CategoryButton from "./categoryButton";

type Props = {
  title: string
  href: string
  eyeCatch: EyeCatch
  category: Category
  tags: Tag[]
}

type EyeCatch = {
  url: string
}

type Category = {
  id: string
  name: string
  color: string
}

type Tag = {
  name: string
  id: string
}

const BlogCard: React.FC<Props> = ({ title, href, eyeCatch, category, tags }) => {
  return (
    <Link href={`/blog/${href}`} scroll={false}>
      <div className="bg-white flex-grow flex flex-col w-1/3 m-4 cursor-pointer rounded-lg">
        <div className="relative pt-56 bg-top bg-cover">
          <Image
            className="max-h-80 bg-top bg-cover rounded-t-lg"
            src={eyeCatch ? eyeCatch.url : ''}
            layout='fill'
            alt="card-image"
            unoptimized={process.env.NODE_ENV === 'development'}
          />
        </div>
        <div className="bg-white px-4 py-6">
          <CategoryButton id={category.id} name={category.name} color={category.color} />
          <h3 className="text-black mt-6 text-lg font-bold">
            <Link href={`/blog/${href}`} scroll={false}>
              <a>{title}</a>
            </Link>
          </h3>
        </div>
        <ul className="p-2 mt-auto flex flex-wrap text-sm text-gray-500 rounded-b-lg bg-white">
          {
            tags.map((tag) => {
              return (
                <li key={tag.id} className="m-1">
                  <Link href={`/tag/${tag.id}`} scroll={false}>
                    <a>#{tag.name}</a>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div >
    </Link>
  )
}

export default BlogCard
