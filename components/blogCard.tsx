import React from "react"
import Link from "next/link";
import Image from 'next/image'

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
  name: string
  color: string
}

type Tag = {
  name: string
  id: string
}

const BlogCard: React.FC<Props> = ({ title, href, eyeCatch, category, tags }) => {
  return (
    <div className="relative flex flex-col w-1/2 p-3">
      <Link href={`/blog/${href}`}>
        <a>
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
                <div className="">
                  <span className="rounded-full py-1 px-4 text-sm" style={{ backgroundColor: category.color ? category.color : "" }}>{category.name}</span>
                </div>
              </div>
              <h3 className="text-black my-6 text-lg font-bold">
                <Link href={`/blog/${href}`}>
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
                            <Link href={`/tag/${tag.id}`}>
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
        </a>
      </Link>
    </div >
  )
}

export default BlogCard
