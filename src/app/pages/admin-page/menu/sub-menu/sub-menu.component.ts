import { Component, OnInit } from '@angular/core';
// import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../../core/services/api-core/menu.service';
import { MenuItem } from 'primeng/api';
import { Menu, MenuSub } from '../../../../core/models/menu.model';
import { UtilsService } from '../../../../common/utils/utils.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrl: './sub-menu.component.css'
})
export class SubMenuComponent implements OnInit {
  items: MenuItem[] = [];
  statusList = [
    { name: 'Tất cả', value: '' },
    { name: 'Trang chủ', value: 'user' },
    { name: 'Quản trị', value: 'admin' },
  ];
  selectedStatus: any = this.statusList[0];
  listMenus: Menu[] = [];
  selectedMenu: Menu = new Menu();
  totalItems: number = 0;
  expandedRows = {};
  query = {
    page: 0,
    size: 10,
    filter: '',
    screen: '',
    status: -1
  }
  selectedSubMenu: MenuSub = new MenuSub();


  constructor(
    private menuSrv: MenuService,
    public utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.getMenus();

  }

  initParams() {

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-pencil',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Open sidebar on click
          }
        ],
      },
    ];

  }

  deleted() { }

  getMenus() {
    this.menuSrv
      .getMenus(this.query.page, this.query.size, this.query.filter, this.selectedStatus.value, this.query.status)
      .subscribe({
        next: (data) => {
          this.listMenus = data?.data?.data || []; // Đảm bảo menu luôn là mảng
          this.totalItems = data?.data?.recordsTotal || 0;

          this.listMenus.forEach((menu: Menu) => {
            menu.childs = menu.childs || [];
          });

          if (this.query.page < 1) {
            this.query.page = 1;
          }
        },
        error: (err) => {
          console.error('Error fetching menus:', err);
          this.listMenus = []; // Trong trường hợp lỗi, đảm bảo menu là mảng rỗng
        },
      });
  }


  onStatusChange(event: any) {
    this.query.page = 1;
    this.getMenus();
  }

  setSelectedMenu(menu: any) {
    this.selectedMenu = menu;
  }

  setSelectedSubMenu(child: MenuSub){
    this.selectedSubMenu = child;
  }

  onPageChange(event: any) {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getMenus();
  }


}
