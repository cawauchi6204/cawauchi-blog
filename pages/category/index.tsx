import { client } from "../../libs/client";
import Link from 'next/link'

export default function BlogId({ categories }: any) {
  return (
    <div>
      <ul>
        {categories.map((category: any) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "categories" });

  return {
    props: {
      categories: data.contents,
    },
  };
};