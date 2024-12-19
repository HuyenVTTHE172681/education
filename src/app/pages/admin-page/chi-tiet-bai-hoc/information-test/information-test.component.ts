import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Test, TestCategory } from '../../../../models/test.model';
import { TestAbilityComponent } from '../../../edu/test-ability/test-ability.component';
import { TestAbilityService } from '../../../../services/test-ability.service';

@Component({
  selector: 'app-information-test',
  templateUrl: './information-test.component.html',
  styleUrl: './information-test.component.css'
})
export class InformationTestComponent implements OnInit {
  id: string | null = null;
  breadcrum: any[] = [];
  roleData: any[] = [];
  role: any[] = [];
  filter: string = '';
  page: number = 1;
  size: number = 10;
  testForm: FormGroup;
  isEditMode: boolean = false;

  searchText: string = '';

  testCategory: TestCategory[] = [];
  selectedTestCategory: { name: string; code: string } | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private testSrv: TestAbilityService
  ) {
    this.testForm = this.formBuilder.group({
      accountsSpecial: [],
      avgRating: [0],
      commentConfiguration: [''],
      courseId: [''],
      courseScheduleId: [''],
      createdBy: [''],
      createdDate: [''],
      deadlineDate: [''],
      description: [''],
      id: [''],
      isAutoSendMail: [0],
      isAutoSort: [0],
      isFree: [0],
      isHaveTestUser: [0],
      isNotification: [0],
      isShowInAbilityTest: [0],
      isSpecial: [0],
      isTestAttacked: [0],
      isTestPass: [0],
      isTestViewed: [0],
      lessonLink: [''],
      livestreamAvatar: [''],
      livestreamCode: [''],
      livestreamDate: [''],
      livestreamGroup: [''],
      livestreamLink: [''],
      livestreamTeacher: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: [''],
      numberOfTest: [0],
      numberQuestionPass: [0],
      order: [0],
      pointShowLessonLink: [0],
      quizzs: [],
      relationTests: [],
      remainMinute: [0],
      status: [0],
      testCategoryCode: [''],
      testCategoryId: [''],
      testCategoryName: [''],
      testComment: [''],
      testQuestionGroupId: [0],
      testUsers: [],
      thumbnail: [''],
      time: [''],
      totalFiltered: [''],
      totalPoint: [0],
      totalPointPass: [0],
      totalViewed: [0],
      videoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.getTestCategory();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ID course: ', this.id);

    if (this.id && this.id !== 'null' && this.id !== 'undefined') {
      this.isEditMode = true;
      this.getTestDetail(this.id);
    } else {
      this.isEditMode = false;
      this.testForm.reset();
    }
  }

  getTestCategory() {
    this.testSrv.getTestType(this.searchText, this.page, this.size).subscribe((data) => {
      this.testCategory = data.data.data.map((category: any) => ({
        code: category.code || '',
        createdBy: category.createdBy || '',
        createdDate: category.createdDate || '',
        description: category.description || '',
        id: category.id || '',
        modifiedBy: category.modifiedBy || '',
        modifiedDate: category.modifiedDate || '',
        name: category.name || '',
        order: category.order || 1,
        status: category.status || 0,
        totalFiltered: category.totalFiltered || 0
      }));
      console.log('testCategory:', this.testCategory);
    });
  }




  getTestDetail(id: string) {
    this.testSrv.getTestNewById(id).subscribe((data) => {
      if (data.statusCode === 200) {
        const testDetail = data.data;
        console.log("Test Data: ", testDetail)
        this.patchForm(testDetail);
        console.log("Form value: ", this.testForm.value)

      }
    })
  }

  patchForm(test: any) {
    this.testForm.patchValue({
      accountsSpecial: test.accountsSpecial,
      avgRating: test.avgRating,
      commentConfiguration: test.commentConfiguration,
      courseId: test.courseId,
      courseScheduleId: test.courseScheduleId,
      createdBy: test.createdBy,
      createdDate: test.createdDate,
      deadlineDate: test.deadlineDate,
      description: test.description,
      id: test.id,
      isAutoSendMail: test.isAutoSendMail === 1,
      isAutoSort: test.isAutoSort,
      isFree: test.isFree === 1,
      isHaveTestUser: test.isHaveTestUser,
      isNotification: test.isNotification,
      isShowInAbilityTest: test.isShowInAbilityTest === 1,
      isSpecial: test.isSpecial === 1,
      isTestAttacked: test.isTestAttacked === 1,
      isTestPass: test.isTestPass,
      isTestViewed: test.isTestViewed,
      lessonLink: test.lessonLink,
      livestreamAvatar: test.livestreamAvatar,
      livestreamCode: test.livestreamCode,
      livestreamDate: test.livestreamDate,
      livestreamGroup: test.livestreamGroup,
      livestreamLink: test.livestreamLink,
      livestreamTeacher: test.livestreamTeacher,
      modifiedBy: test.modifiedBy,
      modifiedDate: test.modifiedDate,
      name: test.name,
      numberOfTest: test.numberOfTest,
      numberQuestionPass: test.numberQuestionPass,
      order: test.order,
      pointShowLessonLink: test.pointShowLessonLink,
      quizzs: test.quizzs,
      relationTests: test.relationTests,
      remainMinute: test.remainMinute,
      status: test.status === 1,
      testCategoryCode: test.testCategoryCode,
      testCategoryId: test.testCategoryId,
      testCategoryName: test.testCategoryName,
      testComment: test.testComment,
      testQuestionGroupId: test.testQuestionGroupId,
      testUsers: test.testUsers,
      thumbnail: test.thumbnail,
      time: test.time,
      totalFiltered: test.totalFiltered,
      totalPoint: test.totalPoint,
      totalPointPass: test.totalPointPass,
      totalViewed: test.totalViewed,
      videoUrl: test.videoUrl
    })

  }
}
