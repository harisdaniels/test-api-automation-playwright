import { z } from 'zod';

export const OrderListItem = z.object({
    id: z.string(),
    bookId: z.number(),
    customerName: z.string(),
    createdBy: z.string(),
    quantity: z.number(),
    timestamp: z.union([z.number(), z.string()]),
});

export const OrderDetail = z.object({
    id: z.string(),
    bookId: z.number(),
    customerName: z.string(),
    quantity: z.number(),
    timestamp: z.union([z.number(), z.string()]),
});

export const CreateOrderResponse = z.object({
    created: z.literal(true),
    orderId: z.string(),
});

export type OrderListItem = z.infer<typeof OrderListItem>;
export type OrderDetail = z.infer<typeof OrderDetail>;
export type CreateOrderResponse = z.infer<typeof CreateOrderResponse>;