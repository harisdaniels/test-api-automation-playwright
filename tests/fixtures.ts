import { test as base, expect } from '@playwright/test';
import { settings } from '../config/settings';
import { ApiClient } from '../core/apiClient';
import { newClientData, newOrderPayload, OrderPayload } from '../data/factories';
import { BooksApi } from '../clients/booksApi';
import { OrdersApi } from '../clients/ordersApi';

// new fixture for each test
type TestFixtures = {
    anonApi: ApiClient;  // client without token
    api: ApiClient;      // client with token
    books: BooksApi;
    orders: OrdersApi
    createdOrder: { orderId: string; payload: OrderPayload };
};

// create fixture for each worker
type WorkerFixtures = {
    adminToken: string;
};

export const test = base.extend<TestFixtures, WorkerFixtures>({

    adminToken: [async ({ playwright }, use) => {
        const context = await playwright.request.newContext({
            baseURL: settings.apiBaseUrl
        });
        const response = await context.post('/api-clients', { data: newClientData() });
        expect(response.status(), await response.text()).toBe(201);

        const body = await response.json();
        await context.dispose();

        await use(body.accessToken);
    }, { scope: 'worker' }],

    anonApi: async ({ request }, use) => {
        await use(new ApiClient(request));
    },

    api: async ({ request, adminToken }, use) => {
        await use(new ApiClient(request, adminToken));
    },

    books: async ({anonApi}, use) => {
        await use(new BooksApi(anonApi));
    },

    orders: async ({api}, use) => {
        await use(new OrdersApi(api));
    },

    createdOrder: async ({ orders, books}, use) => {
        const bookId = await books.findBookById(true);
        const payload = newOrderPayload(bookId);

        const response = await orders.post(payload);
        expect(response.status()).toBe(201);

        const body = await response.json();
        const orderId: string = body.orderId;

        await use({ orderId, payload });

        await orders.delete(orderId);
    }   
    
});

export { expect };