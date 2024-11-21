import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ProductListComponent } from './product-list/product-list.component';
import { EduRoutingModule } from './edu-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ExamHomeComponent } from './exam-home/exam-home.component';
import { register } from 'swiper/element/bundle';
import { TeacherQuizComponent } from './teacher-quiz/teacher-quiz.component';
import { NewsComponent } from './news/news.component'; // Import register function
import { TabViewModule } from 'primeng/tabview';
import { TestAbilityComponent } from './test-ability/test-ability.component';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { TestAbilityRegisterComponent } from './test-ability-register/test-ability-register.component';
import { CourseComponent } from './course/course.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { BadgeModule } from 'primeng/badge';
import { LivestreamComponent } from './livestream/livestream.component';

register(); // Register Swiper

@NgModule({
  declarations: [
    ProductListComponent,
    ExamHomeComponent,
    TeacherQuizComponent,
    NewsComponent,
    TestAbilityComponent,
    TestAbilityRegisterComponent,
    CourseComponent,
    RecruitmentComponent,
    LivestreamComponent,
  ],
  imports: [
    CommonModule,
    EduRoutingModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    RatingModule,
    FormsModule,
    TabViewModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule,
    PaginatorModule,
    DialogModule,
    BadgeModule,
  ],
  providers: [ConfirmationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EduModule {}
