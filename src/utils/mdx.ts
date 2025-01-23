import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

export interface MdxMeta {
  title: string;
  date: string;
  description: string;
  [key: string]: string | number | boolean | null;
}

export interface MdxContent {
  meta: MdxMeta;
  content: string;
}

export function getMdxContent(filePath: string): MdxContent {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    meta: data as MdxMeta,
    content,
  };
}

export function getAllMdxMeta(dir: string): MdxMeta[] {
  const files = fs.readdirSync(dir);
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));
  
  return mdxFiles.map(file => {
    const { meta } = getMdxContent(path.join(dir, file));
    return meta;
  });
} 