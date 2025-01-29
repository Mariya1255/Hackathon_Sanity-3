import { type SchemaTypeDefinition } from 'sanity';
import products from './products'; // Corrected the import path


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [products], // Ensure `category` is defined properly
};
