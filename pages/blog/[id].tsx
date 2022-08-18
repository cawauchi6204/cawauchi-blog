import { client } from "../../libs/client"
import CategoryButton from "../../components/categoryButton"
import Image from "next/image"
import * as cheerio from 'cheerio';
import hljs from 'highlight.js'
import 'highlight.js/styles/night-owl.css'
import { useAtom } from 'jotai'
import { tocAtom } from '../../libs/atoms'
import { useEffect } from "react"
import { motion } from 'framer-motion'

export default function BlogId({ content, highlightedBody, toc }: any) {
  const [, setTocs] = useAtom(tocAtom)
  useEffect(() => {
    setTocs(toc)
  }, [])

  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }} // 初期状態
        animate={{ opacity: 1 }} // マウント時
        exit={{ opacity: 0 }}    // アンマウント時
      >
        <div className="max-w-3xl mt-16">
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
      </motion.div>
    </main >
  );
}

export const getStaticProps = async ({ params }: any) => {
  if (!params) return
  const id = params.id;
  const data = await client.get({ endpoint: "blogs", contentId: id });

  const activateSyntaxHighlight = (body: string): string => {
    const $ = cheerio.load(body);
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text());
      $(elm).html(result.value);
      $(elm).addClass('hljs');
    });
    return $.html()
  }

  const generateTOC = (body: string) => {
    const $ = cheerio.load(body, { decodeEntities: false })
    const headings = $('h1, h2, h3').toArray()
    if (headings.length === 0) return []

    return headings.map((data: cheerio.Element) => {
      return (
        {
          id: data.attribs.id,
          name: data.name,
          // @ts-ignore
          text: String(data.children[0].data)
        })
    })
  }


  return {
    props: {
      content: data,
      toc: generateTOC(data.content),
      highlightedBody: activateSyntaxHighlight(data.content)
    },
  };
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blogs" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};
