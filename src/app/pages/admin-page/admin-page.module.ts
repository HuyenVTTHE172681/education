import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TongQuanComponent } from './tong-quan/tong-quan.component';
import { KhoaHocComponent } from './khoa-hoc/khoa-hoc.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ChiTietKhoaHocComponent } from './chi-tiet-khoa-hoc/chi-tiet-khoa-hoc.component';
import { TabViewModule } from 'primeng/tabview';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';

@NgModule({
  declarations: [TongQuanComponent, KhoaHocComponent, ChiTietKhoaHocComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    TableModule,
    CheckboxModule,
    BreadcrumbModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    TabViewModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    AutoCompleteModule,
    EditorModule,
  ],
})
export class AdminPageModule {}
