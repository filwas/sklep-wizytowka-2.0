import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default async function IndexPage() {
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

  const categories: SanityDocument[] = await sanityFetch({
    query: CATEGORIES_WITH_ITEMS_QUERY,
  });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <ul className="grid grid-cols-1 gap-12">
        {categories &&
          categories.map((category, i) => (
            <li className="bg-white p-4 rounded-lg" key={category._id}>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <ul
                className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {category.items.map((item: SanityDocument) => (
                  <li key={item._id + " " + i} className="aspect-square relative">
                    <Image
                      src={urlFor(item.thumbnail)}
                      alt={item.name || category.name}
                      fill={true}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                      priority={true}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </main>
  );
}

// return (
//   <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
//     <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
//       {categories &&
//         categories.map((category, i) => (
//           <li className="bg-white p-4 rounded-lg" key={category._id}>
//             <h2 className="text-xl font-semibold">{category.name}</h2>
//             <ul className="mt-4 space-y-2">
//               {category.items.map((item: SanityDocument) => (
//                 <li key={item._id+" "+i} className=" w-fit">
//                   <div className="relative w-20 h-20">
//                     <Image
//                       src={urlFor(item.thumbnail)}
//                       alt={item.name || category.name}
//                       fill={true}
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className=" object-cover"
//                       priority={true}
//                     />
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//     </ul>
//   </main>
// );