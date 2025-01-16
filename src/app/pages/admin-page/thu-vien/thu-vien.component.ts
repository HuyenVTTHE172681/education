import { Component, OnInit } from '@angular/core';
import { MenuItem, TreeNode } from 'primeng/api';
import { LibraryService } from '../../../core/services/api-core/library.service';
import { Library } from '../../../core/models/library.model';

interface FolderNode {
  id: string;
  name: string;
  parentId: string;
  children: TreeNode[]; // Cấu trúc cây lồng bên trong
}
@Component({
  selector: 'app-thu-vien',
  templateUrl: './thu-vien.component.html',
  styleUrls: ['./thu-vien.component.css']
})
export class ThuVienComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  treeSource: TreeNode[] = [];
  selectedFile: any;
  folders: FolderNode[] = [];
  query = {
    callFromAdmin: 1,
    folderId: '',
    type: '',
    page: 0,
    size: 10
  };
  children: Library[] = [];
  totalRecords: number = 0; // Tổng số mục để hiển thị trong bảng
  itemsPerPage: number = 10; // Số dòng trên mỗi trang
  first: number = 0;
  countRecord: any = {};

  constructor(private librarySrv: LibraryService) { }

  ngOnInit(): void {
    this.getLibrariesFolder();
    this.initParams();
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Thu viện' },
    ];
    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };
  }

  getLibrariesFolder() {
    this.librarySrv.getLibrariesFolder(1, '', '').subscribe((data) => {
      const flatData = data?.data?.data || [];
      this.folders = flatData.map((folder: any) => ({
        id: folder.id,
        name: folder.name,
        parentId: folder.parentId || '', // Đảm bảo parentId không bị null
        children: [],
      }));

      this.treeSource = this.buildTree(this.folders);
      console.log('Cấu trúc cây:', this.treeSource);
    });
  }



  // Hàm xử lý gọi API với thông tin phân trang
  loadFilesByPage(folderId: string, page: number, size: number): void {
    this.librarySrv
      .getLibrariesFile(this.query.callFromAdmin, folderId, page, size, this.query.type)
      .subscribe((data: any) => {
        const files = data?.data?.data || [];

        this.children = data?.data?.data || [];
        this.totalRecords = data?.data?.recordsTotal || 0;
        this.updatePaginationInfo(page, size, files.length);
      });
  }

  onNodeSelect(event: any): void {
    const selectedNode: TreeNode = event.node;

    if (selectedNode && selectedNode.data && selectedNode.data.id) {
      const folderId = selectedNode.data.id;

      this.loadFilesByPage(folderId, 0, this.itemsPerPage);
    } else {
      console.error("Invalid folder selection.");
    }
  }

  buildTree(folders: FolderNode[]): TreeNode[] {
    const map: { [key: string]: TreeNode } = {};
    const roots: TreeNode[] = [];

    // Tạo map để truy cập nhanh
    folders.forEach((folder) => {
      map[folder.id] = {
        key: folder.id,
        label: folder.name,
        data: { id: folder.id, name: folder.name },
        children: [], // Khởi tạo danh sách con
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        leaf: true, // Mặc định là lá (không có con)
      };
    });

    // Gắn các folder con vào folder cha
    folders.forEach((folder) => {
      if (folder.parentId) {
        const parent = map[folder.parentId];
        if (parent) {
          parent.children!.push(map[folder.id]);
          parent.leaf = false; // Có con nên không phải lá
        }
      } else {
        roots.push(map[folder.id]); // Folder không có parentId là root
      }
    });

    return roots;
  }

  // Hàm cập nhật thông tin hiển thị phân trang
  updatePaginationInfo(page: number, size: number, currentItems: number): void {
    this.countRecord.currentRecordStart = page * size + 1;
    this.countRecord.currentRecordEnd = page * size + currentItems;
  }

  paginate(event: any): void {
    this.first = event.first;
    const page = event.page;
    const size = event.rows;

    const selectedNode = this.selectedFile;
    if (selectedNode && selectedNode.data && selectedNode.data.id) {
      const folderId = selectedNode.data.id;
      this.loadFilesByPage(folderId, page, size);
    }
  }


}
