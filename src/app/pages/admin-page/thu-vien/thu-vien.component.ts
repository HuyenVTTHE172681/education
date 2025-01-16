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
  folders: FolderNode[] = [];
  query = {
    callFromAdmin: 1,
    folderId: '',
    type: '',
    page: 0,
    size: 10
  };
  children: Library[] = [];

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



  loadFiles(event: any) {
    const node: TreeNode = event.node;

    // Kiểm tra node và data trước khi sử dụng
    if (node && node.data && node.data.id) {
      const folderId = node.data.id; // Lấy id của folder được chọn
      console.log("Selected Folder ID:", folderId);

      // Gọi API để lấy dữ liệu
      this.librarySrv
        .getLibrariesFile(
          this.query.callFromAdmin,
          folderId, // Đảm bảo gửi đúng id folder
          this.query.page,
          this.query.size,
          this.query.type
        )
        .subscribe((data: any) => {
          this.children = data?.data?.data || []; // Gán dữ liệu trả về
          console.log("Files in Folder:", this.children);
        });
    } else {
      console.error("Invalid node or node data. Could not load files.");
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


}
