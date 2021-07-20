import {Resolver, Query, ResolveField, Parent, Mutation, Args} from '@nestjs/graphql';
import { BookService } from '../book/book.service';
import { AuthorService } from './author.service';
import {Author, CreateAuthorInput} from './author.schema';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
  ) {}

  @Query(() => [Author])
  async authors() {
    return this.authorService.findMany();
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput){
    return this.authorService.createAuthor(input)
  }

  @ResolveField()
  async books(@Parent() parent: Author) {
    return this.bookService.findByAuthorId(parent._id);
  }
}
