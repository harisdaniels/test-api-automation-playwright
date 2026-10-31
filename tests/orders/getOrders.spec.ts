import { test, expect } from '../fixtures'
import { OrderDetail, OrderListItem } from '../../schema/orderResponse';

test('rejects request without token', { tag: '@negative' }, async ({ anonApi }) => {
    const response = await anonApi.get('/orders');
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Missing Authorization header.');
});

test('lists orders with token', { tag: '@positive' }, async ({ api }) => {
    const response = await api.get('/orders');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    for (const item of body) {
        OrderListItem.parse(item);
    }
});

test('gets a single order by id', { tag: '@smoke'}, async ({ orders, createdOrder }) => {
    const response = await orders.getById(createdOrder.orderId);
    expect(response.status()).toBe(200);

    const order = OrderDetail.parse(await response.json());
    expect(order.id).toBe(createdOrder.orderId);
});

test('returns 404 for an invalid order id', { tag: '@negative' }, async ({ orders }) => {
    const response = await orders.getById("690y7");
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.error).toBe('No order with id 690y7.')
});