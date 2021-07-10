import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Book} from '../model/book';
import {BooksService} from '../service/books.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  selectedBook: Book;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private booksService: BooksService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.subscription = this.booksService.getBook(id).subscribe(
        ({ data, loading }) => {
          console.log('next : ');
          console.log(data);
          this.selectedBook = data.book;
        },
        (_: any) => {
          console.log('error : ');
          this.selectedBook = null;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
