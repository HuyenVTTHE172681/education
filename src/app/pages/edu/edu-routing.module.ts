import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { NewsComponent } from './news/news.component';
import { TestAbilityComponent } from './test-ability/test-ability.component';
import { CourseComponent } from './course/course.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { LivestreamComponent } from './livestream/livestream.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '',
        component: ProductListComponent,
      },
      {
        path: 'gioi-thieu',
        component: NewsComponent,
      },
      {
        path: 'kiem-tra-nang-luc',
        component: TestAbilityComponent,
      },
      {
        path: 'khoa-hoc',
        component: CourseComponent,
      },
      {
        path: 'tuyen-dung',
        component: RecruitmentComponent,
      },
      {
        path: 'livestream',
        component: LivestreamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EduRoutingModule { }
