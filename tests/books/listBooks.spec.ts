import { test, expect } from '../fixtures'

test('lists all books', { tag: '@smoke' }, async ({ anonApi }) => {
    const response = await anonApi.get('/books');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('type');
    expect(body[0]).toHaveProperty('available');
});

test('lists only fiction books when filtered by type', { tag: '@positive' }, async ({ anonApi }) => {
    const response = await anonApi.get('/books?type=fiction');
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    for (const book of body) {
        expect(book.type).toBe('fiction');
    }
});

test('lists only non-fiction books when filtered by type', { tag: '@positive' }, async ({ anonApi }) => {
    const response = await anonApi.get('/books?type=non-fiction');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);

    for (const book of body) {
        expect(book.type).toBe('non-fiction');
    }
});

test('limits fiction books to 2 results', { tag: '@positive' }, async ({ anonApi }) => {
    const response = await anonApi.get('/books?type=fiction&limit=2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeLessThanOrEqual(2);
});

test('rejects limit greater than 20', { tag: '@negative' }, async ({ anonApi }) => {
    const response = await anonApi.get('/books?type=fiction&limit=25');
    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toBe("Invalid value for query parameter 'limit'. Cannot be greater than 20.");
});