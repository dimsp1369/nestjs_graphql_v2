import { Injectable } from '@nestjs/common';
import books from '../data/books';
import { Book, BookDocument, CreateBookInput } from './book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  books: Partial<Book>[];
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {
    this.books = books;
  }

  async findMany() {
    return this.bookModel.find().lean();
  }

  async findById(id) {
    return this.bookModel.findById(id).lean();
    // const books = this.books.filter((book) => book._id === id);
    // return books.length ? books[0] : null;
  }

  async findByAuthorId(authorId) {
    return this.bookModel.find({ author: authorId }).lean();
    // return this.books.filter((book) => book.author === authorId);
  }

  async createBook(book: CreateBookInput) {
    return this.bookModel.create(book);
  }
}
