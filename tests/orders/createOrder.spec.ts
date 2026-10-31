import { newOrderPayload, orderPayloadWithoutBookId  } from '../../data/factories';
import { test, expect } from '../fixtures'

test('creates an order and persists it', { tag: '@smoke'}, async ({ orders, books }) => {
    const bookId = await books.findBookById(true);
    const payload = newOrderPayload(bookId);
    const response = await orders.post(payload);
    expect(response.status()).toBe(201);

    const body = await response.json();
    const orderId: string = body.orderId;

    try {
        const fetchedOrder = await orders.getById(orderId);
        expect(fetchedOrder.status()).toBe(200);

        const order = await fetchedOrder.json();
        expect(order.id).toBe(orderId)
    } finally {
        await orders.delete(orderId);
    }
});

test('rejects order for a book that is not available', { tag: '@negative' }, async ({ orders, books }) => {
    const bookId = await books.findBookById(false);
    const payload = newOrderPayload(bookId);
    const response = await orders.post(payload);
    expect(response.status()).toBe(404);
});

test('rejects order without bookId', { tag: '@negative' }, async ({ orders }) => {
    const response = await orders.post(orderPayloadWithoutBookId());
    expect(response.status()).toBe(400);
});