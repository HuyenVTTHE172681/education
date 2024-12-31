import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { QuestionGroups } from '../../../core/models/question.model';
import { QuestionGroupsService } from '../../../core/services/questionGroups.service';
import { HttpStatus } from '../../../environments/constants';
import { UtilsService } from '../../../core/utils/utils.service';
import { debounceTime, Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nhom-cau-hoi',
  templateUrl: './nhom-cau-hoi.component.html',
  styleUrl: './nhom-cau-hoi.component.css'
})
export class NhomCauHoiComponent implements OnInit {
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  items: MenuItem[] = [];
  questionGroups: QuestionGroups[] = [];
  query = {
    filter: '',
    page: 1,
    size: 10,
    status: -1
  }
  selectedQuestionGroups: any;
  totalItems: number = 0;
  private searchSubject: Subject<string> = new Subject();
  showEditDialog: boolean = false;
  questionGroupForm: FormGroup;

  constructor(
    private questionGroupSrv: QuestionGroupsService,
    public utilsService: UtilsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,

  ) {
    this.questionGroupForm = this.formBuilder.group({
      createdBy: [''],
      createdDate: [''],
      id: [1],
      modifiedBy: [''],
      modifiedDate: [''],
      name: [''],
      order: [0],
      status: [0],
      testQuestions: [''],
      totalFiltered: [0]
    })
  }

  ngOnInit(): void {
    this.initParams();
    this.getQuestionGroups();

  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị' },
      { label: 'Lớp học' },
    ];

    this.home = { icon: 'pi pi-warehouse', routerLink: '/' };

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Sửa',
            icon: 'pi pi-check',
            command: () => this.showEdit(), // Open sidebar on click
          },
          {
            label: 'Xóa',
            icon: 'pi pi-trash',
            command: () => this.deleted(), // Delete functionality (if needed)
          },
        ],
      },
    ];
  }

  showEdit() {
    const selectedGroup = this.selectedQuestionGroups[0]; // Lấy nhóm câu hỏi được chọn
    const id = selectedGroup.id;

    if (id) {
      this.questionGroupSrv.getQuestionGroupsById(id).subscribe((res) => {
        if (res.statusCode === HttpStatus.OK) {
          this.patchQuestionForm(res.data); // Điền dữ liệu vào form
          this.showEditDialog = true; // Mở dialog
        }
      });
    }

  }

  showAdd() {
    this.questionGroupForm.reset();
    this.showEditDialog = true;
  }

  deleted() {
  }

  getQuestionGroups() {
    this.questionGroupSrv.getQuestionGroups(this.query.filter, this.query.page, this.query.size, this.query.status).subscribe(res => {
      if (res.statusCode === HttpStatus.OK) {
        this.questionGroups = res?.data?.data || [];
        this.totalItems = res?.data?.recordsTotal || 0;
      }
    })
  }

  setSelectedQuestionGroup(questionGroups: QuestionGroups) {
    this.selectedQuestionGroups = [questionGroups];
  }

  onPageChange(event: any) {
    this.query.page = event.page + 1;
    this.query.size = event.rows;
    this.getQuestionGroups();
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue); // Emit search value
  }

  search() {
    this.query.page = 1;
    this.getQuestionGroups();
  }

  getQuestionGroupsById(id: number) {
    this.questionGroupSrv.getQuestionGroupsById(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const questionsGroupDetail = data?.data || [];
        this.patchQuestionForm(questionsGroupDetail);
      }
    });
  }

  patchQuestionForm(question: any) {
    this.questionGroupForm.patchValue({
      createdBy: question.createdBy || '',
      createdDate: question.createdDate || '',
      id: question.id || 1,
      modifiedBy: question.modifiedBy || '',
      modifiedDate: question.modifiedDate || '',
      name: question.name || '',
      order: question.order || 0,
      status: question.status === 1,
      testQuestions: question.testQuestions || '',
      totalFiltered: question.totalFiltered || 0
    })
  }

  // saveQuestionGroup() {
  //   this.questionGroupForm.markAllAsTouched();
  //   if (this.questionGroupForm.valid) {
  //     const questionGroup = this.questionGroupForm.value;
  //     if (questionGroup.id) { // Nếu có id, cập nhật nhóm câu hỏi
  //       this.questionGroupSrv.updateQuestionGroup(questionGroup).subscribe((res) => {

  //       })

  //     }
  //   }
  // }
}
