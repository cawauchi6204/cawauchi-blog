import { client } from "../../libs/client";

export default function BlogId({ content }: any) {
  return (
    <main>
      <h1>{content.name}</h1>
    </main>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async ({ params }: any) => {
  if (!params) return
  const id = params.id;
  const data = await client.get({ endpoint: "categories", contentId: id });

  return {
    props: {
      content: data,
    },
  };
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content: any) => `/category/${content.id}`);
  return { paths, fallback: false };
};