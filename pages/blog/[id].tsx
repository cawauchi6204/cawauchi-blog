import { client } from "../../libs/client"
import CategoryButton from "../../components/categoryButton"
import Image from "next/image"
import * as cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css';

export default function BlogId({ content,highlightedBody }: any) {
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
          className="tracking-wider leading-loose mt-8"
          dangerouslySetInnerHTML={{
            __html: highlightedBody,
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

  const $ = cheerio.load(data.content);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      content: data,
      highlightedBody: $.html()
    },
  };
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};
