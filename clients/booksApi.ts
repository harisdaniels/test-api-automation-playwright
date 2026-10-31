import { ApiClient } from "../core/apiClient";

type Book = { id: number, name: string, available: boolean };

export class BooksApi {
    constructor(private api: ApiClient) {}

    async findBookById(available:boolean): Promise<number> {
        const response = await this.api.get('/books');
        const books: Book[] = await response.json();

        const book = books.find((b) => b.available === available)
        if (!book) {
            throw new Error(`No book with available=${available}`)
        }
        return book.id
    }
}