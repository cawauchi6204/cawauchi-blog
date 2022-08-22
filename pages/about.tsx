import type { NextPage } from "next";
import Head from "next/head";

import { blogClient } from "../libs/blogClient"

const About: NextPage = () => {
  return (
    <div>
      <Head>
        <title>About Page</title>
      </Head>
      <main>
        <h1>ここは概要ページです</h1>
      </main>
    </div>
  );
};


export const getStaticProps = async ({ params }: any) => {
  if (!params) return
  const id = params.id;
  const data = await blogClient.get({ endpoint: "about" });

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
  const data = await blogClient.get({ endpoint: "blogs" });

  const paths = data.contents.map((content: any) => `/blog/${content.id}`);
  return { paths, fallback: false };
};


export default About;
