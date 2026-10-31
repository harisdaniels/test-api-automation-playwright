import { z } from 'zod';

export const Book = z.object({
    id: z.number(),
    name: z.string(),
    author: z.string(),
    isbn: z.string(),
    type: z.string(),
    price: z.number(),
    'current-stock': z.number(),
    available: z.boolean(),
});

export const BookListItem = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    available: z.boolean(),
});

export type Book = z.infer<typeof Book>;
export type BookListItem = z.infer<typeof BookListItem>;