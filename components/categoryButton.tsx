import React from "react"
import Link from "next/link"

type Category = {
  id: string
  name: string
  color: string
}

const CategoryButton: React.FC<Category> = ({ id, name, color }) => {
  return (
    <Link href={`/category/${id}`} scroll={false}>
      <div className="cursor-pointer inline-block">
        <span className="rounded-full py-1 px-4 text-sm" style={{ backgroundColor: color ? color : "black" }}>
          {name}
        </span>
      </div>
    </Link>
  )
}

export default CategoryButton
