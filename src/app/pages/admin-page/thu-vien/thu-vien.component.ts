import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LibraryService } from '../../../core/services/api-core/library.service';
import { Library } from '../../../core/models/library.model';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-thu-vien',
  templateUrl: './thu-vien.component.html',
  styleUrl: './thu-vien.component.css'
})
export class ThuVienComponent implements OnInit {
  items: MenuItem[] = [];
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  librariesFolder: Library[] = [];
  query = {
    callFromAdmin: 1,
    folderId: '',
    type: ''
  }

  constructor(
    private librarySrv: LibraryService
  ) { }

  ngOnInit(): void {
    this.getLibrariesFolder();
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Thư viện' },
    ];
    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }

  deleted() { }

  getLibrariesFolder() {
    this.librarySrv.getLibrariesFolder(this.query.callFromAdmin, this.query.folderId, this.query.type).subscribe((data) => {
      this.librariesFolder = data?.data?.data || [];

      console.log("Folder: ", this.librariesFolder)
    })
  }

}
