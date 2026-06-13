import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  parent?: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

/**
 * 格式化日期为"2026年"格式
 */
function formatDate(dateValue: unknown): string {
  if (!dateValue) return '';
  // 如果是 Date 对象，提取年份
  if (dateValue instanceof Date) {
    return `${dateValue.getFullYear()}年`;
  }
  // 如果是字符串，尝试提取年份
  const str = String(dateValue);
  const yearMatch = str.match(/\d{4}/);
  if (yearMatch) {
    return `${yearMatch[0]}年`;
  }
  return str;
}

/**
 * 获取指定目录下所有文章的元数据
 */
export function getArticles(category: string): ArticleMeta[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  const articles = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
    const { data } = matter(raw);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: formatDate(data.date),
      category,
      parent: data.parent,
    };
  });

  // 按日期倒序
  articles.sort((a, b) => {
    const dateA = String(a.date || '');
    const dateB = String(b.date || '');
    return dateB.localeCompare(dateA);
  });
  return articles;
}

/**
 * 获取单篇文章的完整内容
 */
export function getArticle(category: string, slug: string): Article | null {
  const filePath = path.join(contentDir, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: formatDate(data.date),
    category,
    parent: data.parent,
    content,
  };
}

/**
 * 获取所有分类下的所有文章（按日期倒序）
 */
export function getAllArticles(): ArticleMeta[] {
  const categories = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter((f) => {
        const fp = path.join(contentDir, f);
        return fs.statSync(fp).isDirectory();
      })
    : [];

  const all: ArticleMeta[] = [];
  for (const category of categories) {
    all.push(...getArticles(category));
  }

  all.sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
  return all;
}

/**
 * 获取所有可用的文章 slug（用于 generateStaticParams）
 */
export function getArticleSlugs(category: string): string[] {
  const dir = path.join(contentDir, category);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}
