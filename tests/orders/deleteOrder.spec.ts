import { test, expect } from '../fixtures'

test('delete order with valid id', {tag: '@smoke'}, async ({ orders, createdOrder }) => {
    const response = await orders.delete(createdOrder.orderId);
    expect(response.status()).toBe(204);

    const getAfterDelete = await orders.getById(createdOrder.orderId);
    expect(getAfterDelete.status()).toBe(404);
});

test('returns 404 when order id is missing', {tag: '@negative'}, async ({ orders}) => {
    const response = await orders.delete('');
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.error).toBe('The resource could not be found. Check your endpoint and request method.');
});