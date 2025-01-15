import { Component, OnInit } from '@angular/core';
import { Role } from '../../../../core/models/menu.model';
import { debounceTime, Subject } from 'rxjs';
import { MenuService } from '../../../../core/services/api-core/menu.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nhom-quyen',
  templateUrl: './nhom-quyen.component.html',
  styleUrl: './nhom-quyen.component.css'
})
export class NhomQuyenComponent implements OnInit {
  items: MenuItem[] = [];
  listRole: Role[] = [];
  selectedRole: Role = new Role();
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
    this.getRole();
    this.initParams()

    // Subscribe to the search subject with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => {
      this.query.filter = searchValue;
      this.query.page = 1; // Reset to the first page for new search
      this.getRole();
    });

  }

  initParams() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.deleted(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  deleted() {}
  getRole() {
    this.menuSrv.getRole(this.query.filter, this.query.page, this.query.size).subscribe((data) => {
      this.listRole = data?.data?.data || [];
      this.totalItems = data?.data?.recordsTotal;
    })
  }

  onPageChange(event: any): void {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getRole();
  }

  search() {
    this.query.page = 1;
    this.getRole();
  }

  // Trigger search with debounce
  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }

  setSelectedRole(role: any){
    this.selectedRole = role;
  }
}
