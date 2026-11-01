import { ApiClient } from "../core/apiClient";

export class OrdersApi {
  constructor(private api: ApiClient) {}

  async post(payload: unknown) {
    return await this.api.post("/orders", payload);
  }

  async getAll() {
    return await this.api.get("/orders");
  }

  async getById(orderId: string) {
    return await this.api.get(`/orders/${orderId}`);
  }

  async patch(orderId: string, payload: unknown) {
    return await this.api.patch(`/orders/${orderId}`, payload);
  }

  async delete(orderId: string) {
    return await this.api.delete(`/orders/${orderId}`);
  }
}
