import 'server-only';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
}

interface Database {
  posts: Post[];
}

function ensureDb(): Database {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_PATH)) {
    const initial: Database = { posts: getSeedPosts() };
    fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function saveDb(db: Database) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function readTime(content: string): number {
  return Math.max(1, Math.round(content.split(' ').length / 200));
}

export function getAllPosts(): Post[] {
  const db = ensureDb();
  return db.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const db = ensureDb();
  return db.posts.find(p => p.slug === slug) || null;
}

export function getPostById(id: string): Post | null {
  const db = ensureDb();
  return db.posts.find(p => p.id === id) || null;
}

export function createPost(data: Omit<Post, 'id' | 'slug' | 'createdAt' | 'updatedAt' | 'readTime'>): Post {
  const db = ensureDb();
  const post: Post = {
    ...data,
    id: uuidv4(),
    slug: toSlug(data.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readTime: readTime(data.content),
  };
  db.posts.push(post);
  saveDb(db);
  return post;
}

export function updatePost(id: string, data: Partial<Omit<Post, 'id' | 'createdAt'>>): Post | null {
  const db = ensureDb();
  const idx = db.posts.findIndex(p => p.id === id);
  if (idx === -1) return null;
  db.posts[idx] = {
    ...db.posts[idx],
    ...data,
    slug: data.title ? toSlug(data.title) : db.posts[idx].slug,
    updatedAt: new Date().toISOString(),
    readTime: data.content ? readTime(data.content) : db.posts[idx].readTime,
  };
  saveDb(db);
  return db.posts[idx];
}

export function deletePost(id: string): boolean {
  const db = ensureDb();
  const before = db.posts.length;
  db.posts = db.posts.filter(p => p.id !== id);
  saveDb(db);
  return db.posts.length < before;
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(p => p.category.toLowerCase() === category.toLowerCase());
}

export const CATEGORIES = ['Beach', 'Mountains', 'City', 'Road Trip', 'Adventure', 'Culture', 'Food & Drink'];

function getSeedPosts(): Post[] {
  return [
    {
      id: uuidv4(),
      title: 'Chasing Sunsets in Santorini',
      slug: 'chasing-sunsets-in-santorini',
      excerpt: 'The iconic white-washed buildings, the endless blue of the Aegean Sea, and sunsets that paint the sky in shades you never knew existed.',
      content: `There is a moment in Santorini, just as the sun begins to dip below the caldera, when time seems to stop entirely. The famous blue-domed churches of Oia are silhouetted against an impossibly orange sky, and the entire island seems to hold its breath.\n\nI arrived on a warm Thursday in late September, stepping off the ferry from Athens into a world that felt more like a painting than reality. The winding cobblestone paths of Fira were already alive with couples and solo travelers, all pilgrims of the same golden hour.\n\nMy accommodation — a modest cave hotel carved directly into the volcanic cliff — had a terrace with an unobstructed view of the caldera. Every evening I would sit there with a glass of local Assyrtiko wine and watch the spectacle unfold.\n\nBeyond the sunsets, Santorini rewards the curious traveler. The ancient ruins of Akrotiri, a Minoan city preserved in volcanic ash much like Pompeii, offer a haunting window into a civilization that vanished 3,600 years ago. The black sand beaches of Perissa and Perivolos are unlike any I had seen before.\n\nFor food, skip the overpriced tourist traps on the main path and look for the small family-run tavernas tucked into side streets. Fresh grilled octopus, fava bean dip, and tomato fritters made from the island's famously sweet cherry tomatoes — this is the real Santorini.\n\nIf you are planning a visit, consider late September or early October. The summer crowds have thinned, the light is softer, and the sea is still warm enough to swim.`,
      category: 'Beach',
      coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
      author: 'Caroline',
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
      readTime: 4,
    },
    {
      id: uuidv4(),
      title: 'Trekking the Annapurna Circuit',
      slug: 'trekking-the-annapurna-circuit',
      excerpt: 'Sixteen days, 230 kilometers, and some of the most breathtaking mountain scenery on the planet. A complete guide to Nepal\'s greatest trek.',
      content: `The Annapurna Circuit is not just a hike — it is an education. Over sixteen days you cross from subtropical jungle to high alpine desert, passing through a dozen distinct cultures and ecosystems, all while the Himalayas tower impossibly above you.\n\nI began in Besisahar, a dusty roadside town that feels like the end of the paved world. Within two hours of walking, it was already behind me, replaced by terraced rice paddies, suspension bridges festooned with prayer flags, and the distant white peaks that would be my constant companions.\n\nThe highest point of the circuit is Thorong La Pass at 5,416 meters. I reached it on a clear morning after a 3am start from Thorong Phedi, headlamp cutting through darkness, breath clouding in the freezing air. When the sun finally crested the ridge and illuminated the sea of peaks around me, I understood why people cross continents to stand in this spot.\n\nPractical notes for anyone planning this trip: acclimatization is not optional. Take an extra day in Manang. Drink more water than you think you need. Hire a local guide if this is your first high-altitude trek — they know the mountain in ways no guidebook can capture.\n\nThe teahouses along the route are simple but warm. The dal bhat — lentil soup with rice and vegetables — is refillable and will become your favorite meal in the world by day four. Budget roughly $30-40 USD per day including accommodation, food, and the TIMS permit.`,
      category: 'Mountains',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      author: 'Caroline',
      createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 14 * 86400000).toISOString(),
      readTime: 5,
    },
    {
      id: uuidv4(),
      title: 'Tokyo on a Budget: 7 Days Under $500',
      slug: 'tokyo-on-a-budget-7-days-under-500',
      excerpt: 'Japan\'s capital has a reputation for being expensive, but with the right strategy you can experience everything this magnificent city offers without breaking the bank.',
      content: `Tokyo has a reputation for being one of the world's most expensive cities. That reputation is half-earned and half-myth. Yes, a kaiseki dinner at a Michelin-starred restaurant will cost you. But the city is also home to some of the world's great food bargains, a world-class public transit system that costs pennies per ride, and dozens of free or cheap world-class attractions.\n\nHere is how I spent seven remarkable days in Tokyo for just under $500 total, including accommodation.\n\nAccommodation: I stayed in a capsule hotel in Shinjuku for roughly $35 per night. Modern capsule hotels are nothing like the cramped pods of the past — mine had a personal reading light, power outlets, a privacy curtain, and access to an excellent communal bathroom and lounge area.\n\nFood: The secret to eating well cheaply in Tokyo is convenience stores. Japanese 7-Eleven and Lawson stores stock genuinely delicious onigiri, sushi, hot noodles, and sandwiches at remarkable prices. For sit-down meals, look for the lunch rush specials — most restaurants offer a teishoku (set meal) at lunchtime that includes a main dish, rice, miso soup, and pickles for 800-1200 yen.\n\nTransit: Buy a Suica card on arrival and use it on every train, subway, and bus. The system is fast, clean, punctual, and covers every corner of the city.\n\nFree attractions: Shinjuku Gyoen, Ueno Park, the Meiji Shrine, Asakusa's Senso-ji temple, and the teamLab digital art installations that change seasonally. The Tokyo Metropolitan Government Building has a free observation deck with a stunning 360-degree view of the city.\n\nThe one thing I would not skimp on: a day trip to Nikko or Kamakura. Both are reachable within 90 minutes and add an entirely different dimension to any Tokyo trip.`,
      category: 'City',
      coverImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
      author: 'Caroline',
      createdAt: new Date(Date.now() - 21 * 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 21 * 86400000).toISOString(),
      readTime: 6,
    },
  ];
}
