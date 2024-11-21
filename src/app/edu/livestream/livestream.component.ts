import { Component, OnInit } from '@angular/core';
import { TestAbilityService } from '../../services/test-ability.service';

@Component({
  selector: 'app-livestream',
  templateUrl: './livestream.component.html',
  styleUrl: './livestream.component.css',
})
export class LivestreamComponent implements OnInit {
  classRoom: any[] = [];
  subject: any[] = [];
  selectedClassRoom: string | null = null;
  selectedSubject: string | null = null;

  constructor(private testAbilitySr: TestAbilityService) {}

  ngOnInit(): void {
    this.getClassrooms();
    this.getSubjects();
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
}
