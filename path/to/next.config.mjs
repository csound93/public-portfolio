import withMDX from '@next/mdx'
import rehypePrismPlus from 'rehype-prism-plus'

const nextConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrismPlus],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})

export default nextConfig