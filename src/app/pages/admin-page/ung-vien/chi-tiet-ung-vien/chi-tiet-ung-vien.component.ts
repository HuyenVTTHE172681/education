import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { RecruitmentService } from '../../../../core/services/api-core/recruitment.services';
import { CONSTANTS, HttpStatus } from '../../../../common/constants';

@Component({
  selector: 'app-chi-tiet-ung-vien',
  templateUrl: './chi-tiet-ung-vien.component.html',
  styleUrl: './chi-tiet-ung-vien.component.css'
})
export class ChiTietUngVienComponent implements OnInit {
  id: string | null = null;
  breadcrumb: MenuItem[] = [];
  home: MenuItem = [];
  isEditMode: boolean = false;
  recruitmentCandidateForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recruitmentSrv: RecruitmentService,
    private messageService: MessageService
  ) {
    this.recruitmentCandidateForm = this.formBuilder.group({
      applyDate: [''],
      attackUrl: [''],
      content: [''],
      createdBy: [''],
      createdDate: [''],
      email: [''],
      id: [''],
      interviewComment: [''],
      interviewDate: [''],
      interviewPass: [0],
      interviewUser: [''],
      modifiedBy: [''],
      modifiedDate: [''],
      name: [''],
      phone: [''],
      recruitId: [''],
      recruitName: [''],
      status: [0],
      totalFiltered: ['']
    });
  }

  ngOnInit(): void {
    this.initParams();

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.isEditMode = true;
        this.getRecruitmentCandidate(this.id);
      } else {
        this.isEditMode = false;
        this.recruitmentCandidateForm.reset();
      }
    });
  }

  initParams() {
    this.breadcrumb = [
      { label: 'Quản trị', routerLink: '/quan-tri' },
      { label: 'Ứng viên', routerLink: '/quan-tri/ung-vien' },
      { label: 'Chi tiết Ứng viên' },
    ];

    this.home = { icon: 'pi pi-shop', routerLink: '/' };
  }

  goBack() {
    this.router.navigate(['/quan-tri/ung-vien']);
  }

  getRecruitmentCandidate(id: string) {
    this.recruitmentSrv.getRecruitCandidateWithId(id).subscribe((data) => {
      if (data.statusCode === HttpStatus.OK) {
        const recruitCandidate = data?.data || [];

        this.patchForm(recruitCandidate);
      }
    });
  }

  patchForm(recruitCandidate: any) {
    const formattedApplyDate = this.formatDate(recruitCandidate.applyDate);

    this.recruitmentCandidateForm.patchValue({
      applyDate: formattedApplyDate || '',
      attackUrl: recruitCandidate.attackUrl || '',
      content: recruitCandidate.content || '',
      createdBy: recruitCandidate.createdBy || '',
      createdDate: recruitCandidate.createdDate || '',
      email: recruitCandidate.email || '',
      id: recruitCandidate.id || '',
      interviewComment: recruitCandidate.interviewComment || '',
      interviewDate: recruitCandidate.interviewDate || '',
      interviewPass: recruitCandidate.interviewPass === 0,
      interviewUser: recruitCandidate.interviewUser || '',
      modifiedBy: recruitCandidate.modifiedBy || '',
      modifiedDate: recruitCandidate.modifiedDate || '',
      name: recruitCandidate.name || '',
      phone: recruitCandidate.phone || '',
      recruitId: recruitCandidate.recruitId || '',
      recruitName: recruitCandidate.recruitName || '',
      status: recruitCandidate.status === 0,
      totalFiltered: recruitCandidate.totalFiltered || ''
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  update() {
  }

}
