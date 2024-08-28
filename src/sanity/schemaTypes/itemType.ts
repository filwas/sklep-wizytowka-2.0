import { defineField, defineType } from "sanity";

export const itemType = defineType({
  name: "item",
  title: "Item",
  type: "document",
  fields: [
    defineField({
      title: "Name",
      name: "name",
      type: "string",
      validation: rule => rule.required()
    }),
    defineField({
      title: "Category",
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: rule => rule.required(),
    }),
    defineField({
      title: "Thumbnail",
      name: "thumbnail",
      type: "image",
      validation: rule => rule.required()
    }),
    defineField({
      title: "More images",
      name: "images",
      type: "array",
      of: [{ type: "image" }],
      options: { layout: "grid" },
    }),
    defineField({
      title: 'Text', 
      name: 'content',
      type: 'array', 
      of: [{type: 'block'}]
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'thumbnail'
    }
  }
});
