import { Component, OnInit } from '@angular/core';
import { Action } from '../../../../core/models/menu.model';
import { MenuService } from '../../../../core/services/api-core/menu.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-hanh-dong',
  templateUrl: './hanh-dong.component.html',
  styleUrl: './hanh-dong.component.css'
})
export class HanhDongComponent implements OnInit {
  listActions: Action[] = [];
  totalItems: number = 0;
  query = {
    filter: '',
    page: 0,
    size: 5
  }
  private searchSubject: Subject<string> = new Subject(); // Subject for search

  constructor(
    private menuSrv: MenuService
  ) { }

  ngOnInit(): void {
    this.getActions();

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getActions();
    });

  }

  getActions() {
    this.menuSrv.getActions(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      this.listActions = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal;
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getActions();
  }

  search() {
    this.query.page = 1;
    this.getActions();
  }

  // Trigger search with debounce
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }

}
