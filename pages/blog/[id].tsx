import { client } from "../../libs/client"
import CategoryButton from "../../components/categoryButton"
import Image from "next/image"

export default function BlogId({ content }: any) {
  return (
    <main>
      <div className="max-w-3xl bg-black mt-16">
        <CategoryButton id={content.category.id} name={content.category.name} color={content.category.color} />
        <h1 className="text-3xl font-bold mt-2.5">{content.title}</h1>
        <p className="my-5">{content.publishedAt}</p>
        <div className="relative w-full" style={{ height: 350 }}>
          <Image
            className="rounded-lg"
            src={content.eyecatch ? content.eyecatch.url : ''}
            layout='fill'
            alt="card-image"
            unoptimized={process.env.NODE_ENV === 'development'}
          />
        </div>
        <div
          className="tracking-wider leading-loose"
          dangerouslySetInnerHTML={{
            __html: `${content.content}`,
          }}
        />
      </div>
    </main>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async ({ params }: any) => {
  if (!params) return
  const id = params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  return {
    props: {
      content: data,
    },
  };
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};
