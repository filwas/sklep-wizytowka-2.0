import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { itemType } from './itemType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, itemType],
}
