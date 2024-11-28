import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-chuong-trinh-hoc',
  templateUrl: './edit-chuong-trinh-hoc.component.html',
  styleUrl: './edit-chuong-trinh-hoc.component.css',
})
export class EditChuongTrinhHocComponent implements OnInit {
  @Input() file: any;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      order: ['', Validators.required],
      status: [], // default to false
    });
  }

  // updateFormValues(): void {
  //   this.form.patchValue({
  //     name: this.file.data.name,
  //     order: this.file.data.order,
  //     status: this.file.data.status || false,
  //   });
  // }

  private updateFormValues(): void {
    if (this.file && this.file.data) {
      this.form.patchValue({
        name: this.file.data.name || '',
        order: this.file.data.order || '',
        status: this.file.data.status === 1 || false,
      });
    } else {
      console.warn('File or file.data is undefined. Skipping patchValue.');
    }
  }

  ngOnInit(): void {
    if (this.file) {
      this.updateFormValues();
    }
    console.log('ngOnInit - File: ', this.file);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file'] && changes['file'].currentValue) {
      this.updateFormValues();
      console.log('ngOnChanges - File changed:', this.file);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted with values:', this.form.value);
    } else {
      console.error('Form is invalid!');
    }
  }
}
