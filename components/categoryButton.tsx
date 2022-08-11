import React from "react"

type Category = {
  name: string
  color: string
}

const CategoryButton: React.FC<Category> = ({ name, color }) => {
  return (
    <div>
      <span className="rounded-full py-1 px-4 text-sm" style={{ backgroundColor: color ? color : "black" }}>
        {name}
      </span>
    </div>
  )
}

export default CategoryButton
