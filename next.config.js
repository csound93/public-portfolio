import createMDX from '@next/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex],
  },
})

export default withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}) 