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
    <div className="flex flex-col w-1/2 p-3 cursor-pointer">
      <Link href={`/blog/${href}`} scroll={false}>
        <div>
          <div className="relative pt-56 bg-top bg-cover rounded-t-lg">
            <Image
              className="bg-top bg-cover rounded-t-lg"
              src={eyeCatch ? eyeCatch.url : ''}
              layout='fill'
              alt="card-image"
              unoptimized={process.env.NODE_ENV === 'development'}
            />
          </div>
          <div className="flex-grow rounded-b-lg bg-white px-4 py-6">
            <div className="flex flex-col justify-start">
              <div>
                <CategoryButton id={category.id} name={category.name} color={category.color} />
              </div>
              <h3 className="text-black my-6 text-lg font-bold">
                <Link href={`/blog/${href}`} scroll={false}>
                  <a>{title}</a>
                </Link>
              </h3>
              <div>
                <div>
                  <ul className="flex flex-wrap text-sm text-gray-500">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div >
  )
}

export default BlogCard
