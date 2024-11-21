import { Component, OnInit } from '@angular/core';
import { TestAbilityService } from '../../../services/test-ability.service';

@Component({
  selector: 'app-test-ability',
  templateUrl: './test-ability.component.html',
  styleUrl: './test-ability.component.css',
})
export class TestAbilityComponent implements OnInit {
  testAbility: any[] = [];
  classRoom: any[] = [];
  subject: any[] = [];
  selectedClassRoom: string | null = null;
  selectedSubject: string | null = null;
  showFormRegisterTest: boolean = false;
  first = 0;
  rows = 10;

  constructor(private testAbilitySr: TestAbilityService) {}

  ngOnInit(): void {
    this.getClassrooms();
    this.getSubjects();
    this.loadTest(this.first, this.rows);
  }

  loadTest(offSet: number, pageSize: number) {
    this.testAbilitySr.getTestAbility().subscribe((data) => {
      this.testAbility = data;
    });
  }
  getClassrooms(): void {
    this.testAbilitySr.getClassrooms().subscribe((data) => {
      this.classRoom = data.map((item: any) => ({
        name: item.name, // Tên lớp học
        value: item.id, // ID lớp học
      }));
      console.log(this.classRoom);
    });
  }

  getSubjects(): void {
    this.testAbilitySr.getSubjects().subscribe((data) => {
      this.subject = data.map((item: any) => ({
        name: item.name, // Tên môn học
        value: item.id, // ID môn học
      }));
    });
  }

  onPageChange(event: any) {
    this.first = event.first; // vị trí bắt đầu
    this.rows = event.rows; // số lượng item mỗi trang, mặc định là 10

    const pageIndex = this.first / this.rows; // Tính trang hiện tại
    const offSet = pageIndex * this.rows; // Tính offset

    this.loadTest(offSet, this.rows);
  }

  showDialog() {
    this.showFormRegisterTest = true;
  }
}
