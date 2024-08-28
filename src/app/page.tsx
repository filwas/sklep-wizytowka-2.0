import Link from "next/link";
import { SanityDocument } from "next-sanity";

import { sanityFetch } from "../sanity/lib/client";

const CATEGORIES_WITH_ITEMS_QUERY = `*[_type == "category"]{
  name,
  "items": *[_type == "item" && references(^._id)]{
    _id,
    name,
    thumbnail,
    images,
    content
  }
}|order(name desc)`;

export default async function IndexPage() {
  const categories: SanityDocument[] = await sanityFetch({ query: CATEGORIES_WITH_ITEMS_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Events</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {categories.map((category, i) => (
          <li
            className="bg-white p-4 rounded-lg"
            key={`${category.name}, ${i}`}
          >
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <ul className="mt-4 space-y-2">
              {category.items.map((item: SanityDocument) => (
                <li key={item._id}>
                  <h3 className="text-lg">{item.name}</h3>
                  {item.image && (
                    <img
                      src={item.image.asset.url}
                      alt={item.name}
                      className="w-full h-auto rounded-md"
                    />
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
