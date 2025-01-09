import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { RecruitmentService } from '../../../../core/services/api-core/recruitment.services';
import { CONSTANTS, HttpStatus } from '../../../../environments/constants';

@Component({
  selector: 'app-chi-tiet-tin-tuyen-dung',
  templateUrl: './chi-tiet-tin-tuyen-dung.component.html',
  styleUrl: './chi-tiet-tin-tuyen-dung.component.css'
})
export class ChiTietTinTuyenDungComponent implements OnInit {
  id: string | null = null;
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  isEditMode: boolean = false;
  newsRecruitmentForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private recruitmentSrv: RecruitmentService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.newsRecruitmentForm = this.formBuilder.group({
      address: [''],
      content: [''],
      createdBy: [''],
      createdDate: [''],
      id: [''],
      isHot: [0],
      modifiedBy: [''],
      modifiedDate: [''],
      name: ['', [Validators.required]],
      order: [1],
      price: [''],
      requirement: ['', [Validators.required]],
      status: [0],
      tags: [''],
      totalFiltered: ['']
    })
  }

  ngOnInit(): void {
    this.initParams();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEditMode = true;
        this.getRecruitmentWithId(this.id);
      } else {
        console.log(this.id);

        this.newsRecruitmentForm.reset();
        this.isEditMode = false;
      }
      console.log("Edit mode: ", this.isEditMode);
      console.log(this.id);

    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Tuyển dụng', routerLink: '/quan-tri/tuyen-dung' },
      { label: 'Chi tiết Tuyển dụng' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  goBack() {
    this.router.navigate(['/quan-tri/tuyen-dung']);
  }

  getRecruitmentWithId(id: string) {
    this.recruitmentSrv.getRecruitmentWithId(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const recruitCandidate = data?.data || [];

        this.patchForm(recruitCandidate);

        console.log("Value form: ", recruitCandidate)
      }
    });
  }

  patchForm(recruitmentForm: any) {
    this.newsRecruitmentForm.patchValue({
      address: recruitmentForm.address || '',
      content: recruitmentForm.content || '',
      createdBy: recruitmentForm.createdBy || '',
      createdDate: recruitmentForm.createdDate || '',
      id: recruitmentForm.id || '',
      isHot: recruitmentForm.isHot === 1,
      modifiedBy: recruitmentForm.modifiedBy || '',
      modifiedDate: recruitmentForm.modifiedDate || '',
      name: recruitmentForm.name || '',
      order: recruitmentForm.order || '',
      price: recruitmentForm.price || '',
      requirement: recruitmentForm.requirement || '',
      status: recruitmentForm.status === 1,
      tags: recruitmentForm.tags || '',
      totalFiltered: recruitmentForm.totalFiltered || ''
    })
  }


  update() {
    if (this.newsRecruitmentForm.valid) {
      const formValue = { ...this.newsRecruitmentForm.value };
      formValue.isHot = formValue.isHot ? 1 : 0;
      formValue.status = formValue.status ? 1 : 0;

      this.recruitmentSrv.updateRecruitCandidate(formValue).subscribe({
        next: (data) => {
          if (data.statusCode === HttpStatus.OK) {
            let detail = this.isEditMode ? CONSTANTS.MESSAGE_ALERT.UPDATE_FAIL : CONSTANTS.MESSAGE_ALERT.ADD_SUCCESSFUL
            let summary = this.isEditMode ? CONSTANTS.SUMMARY.SUMMARY_UPDATE_FAIL : CONSTANTS.SUMMARY.SUMMARY_ADD_SUCCESSFUL

            this.messageService.add({
              severity: 'success',
              summary: summary,
              detail: detail,
              key: 'br',
              life: 3000
            });
            setTimeout(() => {
              this.router.navigate(['/quan-tri/tuyen-dung']);
            }, 1000);
          }
        }
      })
    } else {
      this.messageService.add({
        severity: 'info',
        summary: CONSTANTS.SUMMARY.SUMMARY_INVALID_DATA,
        detail: CONSTANTS.MESSAGE_ALERT.INVALID_DATA,
        key: 'br',
        life: 3000
      })
    }
  }
}
