import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { SlideComponent } from './components/slide/slide.component';
import { register } from 'swiper/element/bundle'; // Import register function
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { OrderListModule } from 'primeng/orderlist';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

register(); // Register Swiper

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent,
    SlideComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    ToolbarModule,
    MenubarModule,
    CarouselModule,
    SplitButtonModule,
    OverlayPanelModule,
    OrderListModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
