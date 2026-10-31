import { test, expect } from './fixtures'

test('get welcome page', { tag: '@smoke' }, async ({ anonApi }) => {
    const response = await anonApi.get('/');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.message).toBe('Welcome to the Simple Books API.');
});

test('get status', { tag: '@smoke' }, async ({ anonApi }) => {
    const response = await anonApi.get('/status');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('OK');
});