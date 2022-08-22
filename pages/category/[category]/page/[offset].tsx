import { GetStaticPropsContext, GetStaticPaths } from 'next'
import { blogClient } from '../../../../libs/blogClient'
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
      category: string,
      offset: string
    }
  }[] = []
  const categoryData = await blogClient.get({
    endpoint: 'categories',
    queries: { limit: 9999, fields: 'id' }
  })
  const categoryIds = categoryData.contents.map((category: any) => category.id)
  for (let i = 0; i < categoryIds.length; i++) {
    const categoryBlogs = await blogClient.get({
      endpoint: 'blogs',
      queries: { limit: 9999, filters: `category[equals]${categoryIds[i]}`, fields: 'totalCount' }
    })
    const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)
    const pages = range(1, Math.ceil(categoryBlogs.totalCount / PER_PAGE))
    pages.forEach((_page) => {
      paths.push({
        params: { category: categoryIds[i], offset: String(_page) }
      })
    })
  }
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params) return console.error('no context.params')
  const category = params.category as string
  const offset = Number(params.offset)
  const categoryInfo = await blogClient.get({
    endpoint: 'categories', contentId: category
  })
  const categoryBlogs = await blogClient
    .get({
      endpoint: 'blogs',
      queries: { limit: PER_PAGE, offset: (Number(offset) - 1) * PER_PAGE, filters: `category[equals]${category}` }
    })

  return {
    props: {
      name: categoryInfo.name,
      description: categoryInfo.description,
      blogs: categoryBlogs.contents,
      totalCount: Number(categoryBlogs.totalCount)
    }
  }
}
