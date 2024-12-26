import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Test, TestCategory } from '../../../../models/test.model';
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private testSrv: TestAbilityService
  ) {
    this.testForm = this.formBuilder.group({
      accountsSpecial: [''],
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
      name: ['', Validators.required],
      numberOfTest: [0],
      numberQuestionPass: [0],
      order: [0],
      pointShowLessonLink: [0],
      quizzs: [],
      relationTests: [],
      remainMinute: [0],
      status: [0],
      testCategoryCode: [''],
      testCategoryId: ['', Validators.required],
      testCategoryName: [''],
      testComment: [''],
      testQuestionGroupId: [0],
      testUsers: [],
      thumbnail: [''],
      time: [0],
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
      this.testCategory = data.data.data;
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
      accountsSpecial: test?.accountsSpecial || "[]",
      avgRating: test?.avgRating ?? 0,
      commentConfiguration: test?.commentConfiguration || "",
      courseId: test?.courseId || "",
      courseScheduleId: test?.courseScheduleId || "",
      createdBy: test?.createdBy || "",
      createdDate: test?.createdDate || "",
      deadlineDate: test?.deadlineDate || "",
      description: test?.description || "",
      id: test?.id || "",
      isAutoSendMail: test?.isAutoSendMail ?? 0,
      isAutoSort: test?.isAutoSort ?? 0,
      isFree: test?.isFree ?? 0,
      isHaveTestUser: test?.isHaveTestUser ?? 0,
      isNotification: test?.isNotification ?? 0,
      isShowInAbilityTest: test?.isShowInAbilityTest ?? 0,
      isSpecial: test?.isSpecial ?? 0,
      isTestAttacked: test?.isTestAttacked ?? 0,
      isTestPass: test?.isTestPass ?? false, // Chuyển thành false nếu null
      isTestViewed: test?.isTestViewed ?? 0,
      lessonLink: test?.lessonLink || "",
      livestreamAvatar: test?.livestreamAvatar || "",
      livestreamCode: test?.livestreamCode || "",
      livestreamDate: test?.livestreamDate || "",
      livestreamGroup: test?.livestreamGroup || "",
      livestreamLink: test?.livestreamLink || "",
      livestreamTeacher: test?.livestreamTeacher || "",
      modifiedBy: test?.modifiedBy || "",
      modifiedDate: test?.modifiedDate || "",
      name: test?.name || "", // Tên không được để trống
      numberOfTest: test?.numberOfTest ?? 0,
      numberQuestionPass: test?.numberQuestionPass ?? 0,
      order: test?.order ?? 0,
      pointShowLessonLink: test?.pointShowLessonLink ?? 0,
      quizzs: test?.quizzs || [],
      relationTests: test?.relationTests || [],
      remainMinute: test?.remainMinute ?? 0,
      status: test?.status ?? 0,
      testCategoryCode: test?.testCategoryCode || "",
      testCategoryId: test?.testCategoryId || "",
      testCategoryName: test?.testCategoryName || "",
      testComment: test?.testComment || "",
      testQuestionGroupId: test?.testQuestionGroupId ?? 0,
      testUsers: test?.testUsers || [],
      thumbnail: test?.thumbnail || "",
      time: test?.time ?? 60,
      totalFiltered: test?.totalFiltered ?? 0,
      totalPoint: test?.totalPoint ?? 0,
      totalPointPass: test?.totalPointPass ?? 0,
      totalViewed: test?.totalViewed ?? 0,
      videoUrl: test?.videoUrl || ""
    });
  }


  updateSubject() {
    if (this.testForm.valid) {
      const formValue = { ...this.testForm.value };

      // Chuyển đổi tất cả các boolean thành 0 hoặc 1
      formValue.status = formValue?.status ? 1 : 0;
      formValue.isAutoSendMail = formValue?.isAutoSendMail ? 1 : 0;
      formValue.isFree = formValue.isFree ? 1 : 0;
      formValue.isShowInAbilityTest = formValue?.isShowInAbilityTest ? 1 : 0;
      formValue.isSpecial = formValue?.isSpecial ? 1 : 0;
      formValue.isTestAttacked = formValue?.isTestAttacked ? 1 : 0;
      formValue.avgRating = formValue?.avgRating ? 1 : 0;
      formValue.isAutoSort = formValue?.isAutoSort ? 1 : 0;
      formValue.isHaveTestUser = formValue?.isHaveTestUser ? 1 : 0;
      formValue.isTestViewed = formValue?.isTestViewed ? 1 : 0;
      formValue.numberOfTest = formValue?.numberOfTest || 0; // Giá trị số, giữ nguyên nếu có
      formValue.numberQuestionPass = formValue?.numberQuestionPass || 0;
      formValue.order = formValue?.order || 0;
      formValue.pointShowLessonLink = formValue?.pointShowLessonLink || 0;
      formValue.remainMinute = formValue?.remainMinute || 0;
      formValue.testQuestionGroupId = formValue?.testQuestionGroupId || 0;
      formValue.time = formValue?.time || 60;
      formValue.totalPointPass = formValue?.totalPointPass || 0;
      formValue.totalViewed = formValue?.totalViewed || 0;
      formValue.accountsSpecial = formValue?.accountsSpecial || "[]";


      Object.keys(formValue).forEach((key) => {
        if (formValue[key] === null || formValue[key] === undefined) {
          formValue[key] = ''; // Chuyển thành chuỗi rỗng
        }
      });

      console.log("Form value: ", formValue);

      // Thực hiện thao tác Update hoặc Add
      if (this.isEditMode) {
        // UPDATE
        this.testSrv.updateTest(formValue).subscribe({
          next: (data) => {
            if (data.statusCode === 200) {
              alert('Cập nhật bài thành công!');
              this.router.navigate(['/quan-tri/bai-kiem-tra']);
            } else if (data.statusCode === 500) {
              alert(data.message);
            }
          },
          error: (err) => {
            console.error('Error updating account:', err);
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
          },
        });
      } else {
        // ADD
        this.testSrv.addTest(formValue).subscribe({
          next: (data) => {
            if (data.statusCode === 200) {
              alert('Thêm tài khoản thành công!');
              this.router.navigate(['/quan-tri/bai-kiem-tra']);
            }
            // else if (data.statusCode === 500) {
            //   alert(data.message);
            //   console.log('Payload sent to server:', formValue);
            // }
          },
          error: (err) => {
            console.error('Error adding account:', err);
            alert('Có lỗi xảy ra. Vui lòng thử lại!');
          },
        });
      }
    } else {
      alert('Form is not valid');
      console.log('Form is not valid, errors: ', this.testForm.errors);
    }
  }


  getInvalidControls(formGroup: FormGroup): string[] {
    const invalidControls: string[] = [];

    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control && control.invalid) {
        invalidControls.push(controlName);
      }
    });

    return invalidControls;
  }

  back() {
    this.router.navigate(['/quan-tri/bai-kiem-tra']);
  }
}
