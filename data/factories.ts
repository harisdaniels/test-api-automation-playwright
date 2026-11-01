import { randomUUID } from "crypto";

export const newClientData = () => {
  const id = randomUUID().slice(0, 8);
  return {
    clientName: `automation-${id}`,
    clientEmail: `automation-${id}@example.com`,
  };
};

export const newOrderPayload = (bookId: number) => ({
  bookId,
  customerName: `customer-${randomUUID().slice(0, 8)}`,
});

export const orderPayloadWithoutBookId = () => ({
  customerName: `customer-${randomUUID().slice(0, 8)}`,
});

export type OrderPayload = {
  bookId: number;
  customerName: string;
};
