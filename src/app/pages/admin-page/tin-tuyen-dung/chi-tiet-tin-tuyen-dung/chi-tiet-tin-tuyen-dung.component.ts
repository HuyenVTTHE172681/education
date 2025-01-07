import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RecruitmentService } from '../../../../core/services/api-core/recruitment.services';
import { HttpStatus } from '../../../../environments/constants';

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
      name: [''],
      order: [1],
      price: [''],
      requirement: [''],
      status: [0],
      tags: [''],
      totalFiltered: [0]
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
        this.isEditMode = false;
        this.newsRecruitmentForm.reset();
      }
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
      totalFiltered: recruitmentForm.totalFiltered === 0
    })
  }


}
