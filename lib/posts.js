import fs from "fs";
import path from "path";
import { marked } from "marked";

const dataFile = path.join(process.cwd(), "lib", "posts.json");
const DEFAULT_LOCALE = "de";

function readJSON() {
  const raw = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(raw);
}

function listByLocale(json, locale = DEFAULT_LOCALE) {
  if (json && typeof json === "object" && !Array.isArray(json)) {
    return Array.isArray(json[locale])
      ? json[locale]
      : json[DEFAULT_LOCALE] || [];
  }
  return Array.isArray(json) ? json : [];
}

/** iz jedne stavke napravi normalizirani objekt */
function normalizeItem(p) {
  const id = String(p.id || "").trim(); // 👈 obavezno
  const slug = String(p.slug || "").trim();
  if (!id)
    throw new Error("Svaki post mora imati 'id' (stabilan kroz jezike).");
  if (!slug) throw new Error("Svaki post mora imati 'slug'.");

  const title = String(p.title || slug);
  const description = String(p.description || "");
  const date = p.date ? new Date(p.date).toISOString() : null;
  const cover = p.cover || null;
  const videoId = p.videoId || null;
  const tags = Array.isArray(p.tags) ? p.tags : [];

  let markdown = "";
  if (Array.isArray(p.content)) markdown = p.content.join("\n\n");
  else if (typeof p.content === "string") markdown = p.content;

  const html = marked.parse(markdown || "");

  return {
    id,
    slug,
    frontmatter: { title, description, date, cover, videoId, tags },
    markdown,
    html,
  };
}

/** vrati normaliziranu listu i mape */
function loadAll(locale = DEFAULT_LOCALE) {
  const json = readJSON();
  const list = listByLocale(json, locale).map(normalizeItem);

  // indexi
  const bySlug = new Map(list.map((p) => [p.slug, p]));
  const byId = new Map(list.map((p) => [p.id, p]));

  return { json, list, bySlug, byId };
}

/** PUBLIC API */
export function getSlugs(locale = DEFAULT_LOCALE) {
  return loadAll(locale).list.map((p) => p.slug);
}

export function getAllPosts(locale = DEFAULT_LOCALE) {
  const { list } = loadAll(locale);
  return list.sort((a, b) => {
    const da = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
    const db = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
    return db - da;
  });
}

export function getPostBySlug(slug, locale = DEFAULT_LOCALE) {
  const { bySlug } = loadAll(locale);
  const found = bySlug.get(slug);
  if (!found)
    throw new Error(`Post '${slug}' nije pronađen za locale '${locale}'.`);
  return found;
}

/** Nađi ID iz (localeFrom, slug), pa vrati *slug* za (localeTo) */
export function getSlugForLocale(slug, localeFrom, localeTo) {
  const { json } = loadAll(localeFrom);
  // Iz from-locale liste izvuci id
  const fromList = listByLocale(json, localeFrom);
  const itemFrom = fromList.find(
    (p) => String(p.slug).trim() === String(slug).trim()
  );
  if (!itemFrom) return null;
  const id = itemFrom.id;

  // U to-locale listi nađi isti id i vrati njegov slug
  const toList = listByLocale(json, localeTo);
  const itemTo = toList.find((p) => String(p.id).trim() === String(id).trim());
  return itemTo ? String(itemTo.slug).trim() : null;
}
