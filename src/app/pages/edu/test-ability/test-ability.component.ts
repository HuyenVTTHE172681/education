import { Component, OnInit } from '@angular/core';
import { TestAbilityService } from '../../../core/services/test-ability.service';
import { Test } from '../../../core/models/test.model';
import { IResponeList } from '../../../core/models/common.model';
import { ClassRoom } from '../../../core/models/classRoom.model';

@Component({
  selector: 'app-test-ability',
  templateUrl: './test-ability.component.html',
  styleUrls: ['./test-ability.component.css'],
})
export class TestAbilityComponent implements OnInit {
  testAbilities: Test[] = [];
  classRooms: any[] = [];
  subjects: any[] = [];
  totalItems: number = 0;

  // Pagination and filters
  page: number = 1;
  size: number = 10;
  searchText: string = '';
  selectedClassRoom: string = '';
  selectedSubject: string = '';

  // Show dialog
  showFormRegisterTest: boolean = false;

  constructor(private testAbilityService: TestAbilityService) { }

  ngOnInit(): void {
    this.getClassRooms(); // Load class rooms
    this.getSubjects(); // Load subjects
    this.getAllTestAbilities(); // Load test abilities
  }

  // Fetch all test abilities with filters
  isShowInAbilityTest: number = 1;
  isFromCMS: number = 0;
  getAllTestAbilities(): void {
    this.testAbilityService
      .getTestAbility(
        this.page,
        this.size,
        this.isShowInAbilityTest,
        this.selectedClassRoom,
        this.selectedSubject,
        this.isFromCMS
      )
      .subscribe({
        next: (data: IResponeList<Test>) => {
          this.testAbilities = data.data.data;
          this.totalItems = data.data.recordsTotal;
          console.log('TestAbilities:', this.testAbilities);
        },
        error: (error) => {
          console.log(error);
          console.log('>:<');
        },
      });
    console.log('TestAbilities:', this.testAbilities);
  }

  // Fetch all classrooms for filtering
  getClassRooms(): void {
    this.testAbilityService.getClassrooms().subscribe({
      next: (data) => {
        this.classRooms = data.map((item: any) => ({
          name: item.name, // Tên lớp học
          value: item.id, // ID lớp học
        }));
        console.log('ClassRooms:', this.classRooms); // In ra kết quả các lớp học
      },
      error: (error) => {
        console.error('Error fetching classrooms:', error);
      },
    });
  }

  // Fetch all subjects for filtering
  getSubjects(): void {
    this.testAbilityService.getSubjects().subscribe({
      next: (data) => {
        this.subjects = data.map((item: any) => ({
          name: item.name, // Tên môn học
          value: item.id, // ID môn học
        }));
        console.log('Subjects:', this.subjects); // In ra kết quả các môn học
      },
      error: (error) => {
        console.error('Error fetching subjects:', error);
      },
    });
  }

  // Handle pagination change
  onPageChange(event: any): void {
    this.page = event.page + 1; // Update current page
    this.size = event.rows; // Update page size
    this.getAllTestAbilities(); // Fetch the test abilities for the new page
    console.log('Page changed:', this.page);
  }

  // Show dialog to register test
  showDialog() {
    this.showFormRegisterTest = true;
  }

  // Optional: You can add search functionality for the filter as well
  onSearchChange(): void {
    this.page = 1; // Reset to the first page on search change
    this.getAllTestAbilities();
  }
}
