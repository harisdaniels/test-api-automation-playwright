import { test, expect } from "../fixtures";

test("update customer name", { tag: "@smoke" }, async ({ orders, createdOrder }) => {
    const response = await orders.patch(createdOrder.orderId, { customerName: "Jane Doe" });
    expect(response.status()).toBe(204);

    const getUpdatedData = await orders.getById(createdOrder.orderId);
    const order = await getUpdatedData.json();
    expect(order.customerName).toBe("Jane Doe");
  },
);

test("update customer name with invalid id", { tag: "@negative" }, async ({ orders }) => {
    const response = await orders.patch("ebgweve", { customerName: "Jane Doe" });
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.error).toBe("No order with id ebgweve.");
  },
);

test("update customer name with no id", { tag: "@negative" }, async ({ orders }) => {
    const response = await orders.patch("", { customerName: "Jane Doe" });
    expect(response.status()).toBe(404);

    const body = await response.json();
    expect(body.error).toBe(
      "The resource could not be found. Check your endpoint and request method.",
    );
  },
);
