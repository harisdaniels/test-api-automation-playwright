import { test, expect } from '../fixtures'

test('gets a single book with all fields', { tag: '@smoke' }, async ({ anonApi, books }) => {
    const bookId  = await books.findBookById(true);
    const response = await anonApi.get(`/books/${bookId }`);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('author');
    expect(body).toHaveProperty('isbn');
    expect(body).toHaveProperty('type');
    expect(body).toHaveProperty('price');
    expect(body).toHaveProperty('current-stock');
    expect(body).toHaveProperty('available');
});