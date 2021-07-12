import { Injectable } from '@angular/core';
import {Author, Book} from '../model/book';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {ApolloQueryResult, FetchResult} from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
/*  private books = [
    new Book(1001, 'Tech', 'Introduction to Angular', 50.25, [new Author('Bob', 'T')], 2017),
    new Book(1002, 'Tech', 'Angular Advanced Concepts', 125.95, [new Author('Zorb', 'Tar')], 2019),
    new Book(1003, 'Kids', 'A Fantastic Story', 12.25, [new Author('Jane', 'C'), new Author('Tala', 'Tolo')], 2009),
    new Book(1004, 'Cook', 'The Best Shawarmas', 18.99, [new Author('Chef', 'Z')], 1978),
    new Book(1005, 'Tech', 'Angular Demystified', 210.50, [new Author('Zorb', 'Tar')], 2020)
  ];*/

  constructor(private apollo: Apollo) {}

  public getBook(bookNumber: number): Observable<ApolloQueryResult<any>> {
    // tslint:disable-next-line:radix
    // return this.books.find(book => book.id === Number.parseInt(id));
    return this.apollo
    .query<any>({
      query: gql`
        query($bookNumber: Int!) {
          bookByNumber(bookNumber: $bookNumber) {
            bookId
            bookNumber
            category
            title
            cost
            description
            authors {
              firstName
              lastName
            }
          }
        }
      `,
      variables: {
        bookNumber
      }
    });
    // .subscribe(({ data, loading }) => {
    //   console.log('received : ');
    //   if (data.book) {
    //     console.log(data.book);
    //     // const b: Book = data.book;
    //     // console.log(b);
    //     // return b;
    //     return new Observable(subs => {subs.next(data.book); });
    //   }
    // });
    // return new Observable(subs => {subs.next(null); });
  }

  public addBook(b: Book): Observable<FetchResult<unknown>> {
    // this.books.push(b);
    return this.apollo.mutate({
      mutation: gql`
        mutation newBook($bookNumber: Int!,
            $category: String!,
            $title: String!,
            $cost: Float!,
            $year: String,
            $description: String){
        newBook(bookNumber: $bookNumber,
                category: $category,
                title: $title,
                cost: $cost,
                year: $year,
                description: $description) {
                    bookId
                }
        }
      `,
      variables: {
        bookNumber: b.bookNumber,
        category: b.category,
        title: b.title,
        cost: b.cost,
        year: b.year,
        description: b.description
      }
    }
    );
  }

  addAuthor(author: Author): Observable<FetchResult<unknown>> {
    return this.apollo.mutate({
        mutation: gql`
          mutation newAuthor($bookNumber: Int!,
            $firstName: String!,
            $lastName: String!){
            newAuthor(bookNumber: $bookNumber,
              firstName: $firstName,
              lastName: $lastName) {
              firstName
              lastName
            }
          }
        `,
        variables: {
          bookNumber: author.bookNumber,
          firstName: author.firstName,
          lastName: author.lastName
        }
      }
    );
  }
}
