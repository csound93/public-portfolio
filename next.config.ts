import createMDX from '@next/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import type { NextConfig } from 'next';

interface Node {
  children: Array<{ type: string; value: string }>;
  properties?: {
    className: string[];
  };
}

const prettyCodeOptions = {
  keepBackground: true,
  grid: true,
  themes: {
    light: 'github-light',
    dark: 'github-dark'
  },
  onVisitLine(node: Node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: Node) {
    if (node.properties) {
      node.properties.className.push('highlighted');
    }
  },
  onVisitHighlightedWord(node: Node) {
    if (node.properties) {
      node.properties.className = ['word'];
    }
  },
};

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config) => {
    config.module?.rules?.push({
      test: /\.mmd$/,
      type: 'asset/source',
    });
    return config;
  },
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex, [rehypePrettyCode, prettyCodeOptions]],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
