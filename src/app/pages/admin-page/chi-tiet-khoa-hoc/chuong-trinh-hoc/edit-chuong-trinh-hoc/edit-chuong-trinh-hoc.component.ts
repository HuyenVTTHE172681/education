import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../../../services/course.service';

@Component({
  selector: 'app-edit-chuong-trinh-hoc',
  templateUrl: './edit-chuong-trinh-hoc.component.html',
  styleUrl: './edit-chuong-trinh-hoc.component.css',
})
export class EditChuongTrinhHocComponent implements OnInit {
  @Input() file: any;
  @Output() dataUpdated = new EventEmitter<boolean>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private courseSrv: CourseService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      order: ['', Validators.required],
      status: [], // default to false
    });
  }

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['file'] && changes['file'].currentValue) {
      this.updateFormValues();
      console.log('ngOnChanges - File changed:', this.file);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updateData = {
        ...this.file.data,
        ...this.form.value,
        status: this.form.value.status ? 1 : 0,
      };

      this.courseSrv.editCourse(updateData).subscribe({
        next: (data) => {
          if (data.statusCode === 200) {
            alert('Edit course successfully!');
            this.dataUpdated.emit(true);
            console.log('Edit course successfully!', updateData);
          } else {
            console.error('Error editing course. Data: ', data);
            alert('Error editing course.');
          }
        },
        error: (err) => {
          console.error('Error editing course. Error: ', err);
          alert('Error editing course.');
        },
      });
    } else {
      console.error('Form is invalid!');
      alert('Form is invalid!');
    }
  }
}
