import { client } from "../../libs/client";
import Link from 'next/link'

export default function Tags({ tags }: any) {
  return (
    <div>
      <ul>
        {tags.map((tag: any) => (
          <li key={tag.id}>
            <Link href={`/tag/${tag.id}`}>
              <a>{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "tags" });

  return {
    props: {
      tags: data.contents,
    },
  };
};
