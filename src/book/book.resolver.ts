import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Book, CreateBookInput, FindBookInput } from './book.schema';
import { BookService } from './book.service';
import { Author } from '../author/author.schema';
import { AuthorService } from '../author/author.service';

@Resolver(() => Book)
export class BookResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Book])
  async books() {
    return this.bookService.findMany();
  }

  @Query(() => Book)
  async book(@Args('input') { _id }: FindBookInput) {
    return this.bookService.findById(_id);
  }

  @Mutation(() => Book)
  async createBook(@Args('input') book: CreateBookInput) {
    return this.bookService.createBook(book);
  }

  @ResolveField(() => Author)
  async author(@Parent() book: Book) {
    return this.authorService.findById(book.author);
  }
}
