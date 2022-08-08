// pages/blog/[id].js
import { client } from "../../libs/client";

export default function BlogId({ content }: any) {
  return (
    <main>
      <h1>{content.title}</h1>
      <p>{content.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${content.content}`,
        }}
      />
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
