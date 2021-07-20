import { Injectable } from '@nestjs/common';
import author from '../data/authors';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './author.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}
  async findById(id) {
    return this.authorModel.findById(id).lean();
    // const result = author.filter((item) => item.id === id);
    // return result.length ? result[0] : null;
  }

  async findMany() {
    return this.authorModel.find().lean();
  }

  async createAuthor(author) {
    return this.authorModel.create(author)
  }
}
