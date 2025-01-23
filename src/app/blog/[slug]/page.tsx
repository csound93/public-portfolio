import 'katex/dist/katex.min.css';
import 'github-markdown-css/github-markdown.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/content/${slug}.mdx`);

  return (
    <div className="markdown-body">
      <Post />
    </div>
  );
}

export function generateStaticParams() {
  return [{ slug: 'welcome' }, { slug: 'about' }];
}

export const dynamicParams = false;
