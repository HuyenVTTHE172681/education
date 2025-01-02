import { Component, OnInit } from '@angular/core';
import { TestAbilityService } from '../../../../../core/services/test-ability.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chi-tiet-bai-kiem-tra',
  templateUrl: './chi-tiet-bai-kiem-tra.component.html',
  styleUrl: './chi-tiet-bai-kiem-tra.component.css',
})
export class ChiTietBaiKiemTraComponent implements OnInit {
  query = {
    filter: '',
    page: 1,
    size: 10000,
  }
  testType: any;
  validationForm!: FormGroup;

  ngOnInit(): void {
    this.getTestType();
    this.initValidationForm();
  }

  constructor(private testSrv: TestAbilityService, private fb: FormBuilder) { }

  initValidationForm() {
    this.validationForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      time: [60, [Validators.required, Validators.min(1)]],
      order: [0, [Validators.required, Validators.min(1)]],
      totalPointPass: [0, [Validators.required, Validators.min(0)]],
      numberOfTest: [0, [Validators.required, Validators.min(1)]],
      deadlineDate: [''],
      pointShowLessonLink: [0],
      status: [true],
    });
  }

  getTestType() {
    this.testSrv.getTestType(this.query.filter, this.query.page, this.query.size).subscribe({
      next: (data) => {
        this.testType = data;
      },
    });
  }
}
