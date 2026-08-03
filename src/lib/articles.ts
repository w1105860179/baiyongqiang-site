import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateISO: string;
  category: string;
  parent?: string;
  readingTime: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

/**
 * 计算阅读时长
 */
function calculateReadingTime(text: string): string {
  const clean = text
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '');

  const cjk = (clean.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = (clean.match(/[a-zA-Z]+/g) || []).length;
  const minutes = Math.ceil(cjk / 300 + words / 200);
  return `${Math.max(minutes, 1)} 分钟`;
}

/**
 * 解析日期，返回中文展示串与可排序的 ISO 串。
 * 支持 "2026-06-22"、"2026/6/3"、"2026-06" 等；缺失或非法时排到最后。
 */
function parseDate(dateValue: unknown): { display: string; iso: string } {
  let d: Date | null = null;
  if (dateValue instanceof Date) {
    d = dateValue;
  } else if (typeof dateValue === 'string') {
    const s = dateValue.trim();
    const full = s.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
    if (full) {
      d = new Date(Number(full[1]), Number(full[2]) - 1, Number(full[3]));
    } else {
      const ym = s.match(/(\d{4})[-/](\d{1,2})/);
      if (ym) d = new Date(Number(ym[1]), Number(ym[2]) - 1, 1);
    }
  }
  if (!d || isNaN(d.getTime())) return { display: '', iso: '0000-00-00' };
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return {
    display: `${y}年${m}月${day}日`,
    iso: `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  };
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
    const { data, content } = matter(raw);
    const { display, iso } = parseDate(data.date);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: display,
      dateISO: iso,
      category,
      parent: data.parent,
      readingTime: calculateReadingTime(content),
    };
  });

  // 按完整日期倒序（新→旧）
  articles.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
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
    date: parseDate(data.date).display,
    dateISO: parseDate(data.date).iso,
    category,
    parent: data.parent,
    readingTime: calculateReadingTime(content),
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

  all.sort((a, b) => b.dateISO.localeCompare(a.dateISO));
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

/**
 * 获取相关文章（同分类，排除当前文章）
 */
export function getRelatedArticles(
  category: string,
  currentSlug: string,
  limit = 3
): ArticleMeta[] {
  return getArticles(category)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);
}
