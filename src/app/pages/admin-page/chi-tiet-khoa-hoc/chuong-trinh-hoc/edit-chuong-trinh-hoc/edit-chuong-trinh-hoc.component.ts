import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../../../core/services/course.service';
import { HttpStatus } from '../../../../../environments/constants';

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
      name: ['', [Validators.required, Validators.minLength(10)]],
      order: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      status: [false],
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
        ...this.file?.data, // Dữ liệu từ file hiện tại (nếu có)
        ...this.form.value, // Dữ liệu từ form
        id: this.file?.data?.id || '', // Nếu không có ID thì để rỗng (thêm mới)
        courseId: this.file?.data?.courseId || '', // Lấy courseId từ cha
        status: this.form.value.status ? 1 : 0, // Convert boolean sang 1/0
        tests: [], // Mảng tests mặc định
      };

      if (this.file?.data?.id) {
        // Edit logic
        this.courseSrv.editCourse(updateData).subscribe({
          next: (data) => {
            if (data.statusCode === HttpStatus.OK) {
              alert('Edit course successfully!');
              this.dataUpdated.emit(true); // Emit event để thông báo cha
            } else {
              console.error('Error editing course:', data);
              alert('Error editing course.');
            }
          },
          error: (err) => {
            console.error('Error editing course:', err);
            alert('Error editing course.');
          },
        });
      } else {
        // Add logic
        this.courseSrv.addCourse(updateData).subscribe({
          next: (data) => {
            if (data.statusCode === HttpStatus.OK) {
              alert('Add course successfully!');
              this.dataUpdated.emit(true); // Emit event để thông báo cha
              this.form.reset();
            } else {
              console.error('Error adding course:', data);
              alert('Error adding course.');
            }
          },
          error: (err) => {
            console.error('Error adding course:', err);
            alert('Error adding course.');
          },
        });
      }
    } else {
      console.error('Form is invalid!');
      alert('Form is invalid!');
    }
  }

}
