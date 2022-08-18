import { GetStaticPropsContext, GetStaticPaths } from 'next'
import { client } from '../../../../libs/client'
import BlogCard from "../../../../components/blogCard"
import { motion } from 'framer-motion'

const PER_PAGE = 10

export default function Home({ name, description, blogs, totalCount }: any) {
  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h2>{name}</h2>
        <p>{description}</p>
        <div className="flex flex-wrap">
          {blogs.map((content: any) => <BlogCard key={content.id} title={content.title} href={content.id} category={content.category} eyeCatch={content.eyecatch} tags={content.tag} />)}
        </div>
      </motion.div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: {
    params: {
      tag: string,
      offset: string
    }
  }[] = []
  const tagData = await client.get({
    endpoint: 'tags',
    queries: { limit: 9999, fields: 'id' }
  })
  const tagIds: string[] = tagData.contents.map((_tag: any) => _tag.id)
  for (let i = 0; i < tagIds.length; i++) {
    const tagBlogs = await client.get({
      endpoint: 'blogs',
      queries: { limit: 9999, filters: `tag[contains]${tagIds[i]}`, fields: 'totalCount' }
    })
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
    const pages = range(1, Math.ceil(tagBlogs.totalCount / PER_PAGE))
    pages.forEach((_page) => {
      paths.push({
        params: { tag: tagIds[i], offset: String(_page) }
      })
    })
  }
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) return console.error('no context.params')
  const tag = params.tag as string
  const offset = Number(params.offset)
  const tagInfo = await client.get({
    endpoint: 'tags', contentId: tag
  })
  const blogs = await client
    .get({
      endpoint: 'blogs',
      queries: { limit: PER_PAGE, offset: (Number(offset) - 1) * PER_PAGE, filters: `tag[contains]${tag}` }
    })

  return {
    props: {
      name: tagInfo.name,
      description: tagInfo.description,
      blogs: blogs.contents,
      total_count: Number(blogs.totalCount)
    }
  }
}
