import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './authen/login/login.component';
import { RegisterComponent } from './authen/register/register.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { register } from 'swiper/element/bundle';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPageModule } from './pages/admin-page/admin-page.module';
import { EduModule } from './pages/edu/edu.module';
import { MessageService } from 'primeng/api';

register();
@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPageModule,
    EduModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
