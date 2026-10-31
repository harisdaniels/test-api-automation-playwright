import { APIRequestContext, APIResponse } from '@playwright/test';
import { settings } from '../config/settings';

export class ApiClient {
  constructor(
    private context: APIRequestContext,
    private token?: string,
  ) {}

  async get(path: string): Promise<APIResponse> {
    return await this.context.get(path, { headers: this.headers(), timeout: settings.timeoutMs });
  }

  async post(path: string, data: unknown): Promise<APIResponse> {
    return await this.context.post(path, { headers: this.headers(), data, timeout: settings.timeoutMs });
  }

  async patch(path: string, data: unknown): Promise<APIResponse> {
    return await this.context.patch(path, { headers: this.headers(), data, timeout: settings.timeoutMs });
  }

  async delete(path: string): Promise<APIResponse> {
    return await this.context.delete(path, { headers: this.headers(), timeout: settings.timeoutMs });
  }

  private headers(): Record<string, string> {
    const headers: Record<string, string> = {};
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    return headers;
  }
}