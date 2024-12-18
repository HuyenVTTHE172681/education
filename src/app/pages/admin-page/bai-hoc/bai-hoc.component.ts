import { Component, OnInit } from '@angular/core';
import { TestCategory } from '../../../models/test.model';
import { TestAbilityService } from '../../../services/test-ability.service';
import { ClassRoomService } from '../../../services/classRoom.service';
import { ClassRoom } from '../../../models/classRoom.model';
import { SubjectService } from '../../../services/subject.service';
import { Subject as SubjectModel } from '../../../models/subject.model';

@Component({
  selector: 'app-bai-hoc',
  templateUrl: './bai-hoc.component.html',
  styleUrl: './bai-hoc.component.css'
})
export class BaiHocComponent implements OnInit {

  searchText: string = '';
  page: number = 1;
  size: number = 10;

  testCategory: TestCategory[] = [];
  selectedTestCategory: string = '';

  classRoom: ClassRoom[] = [];
  selectedClassroom: string = '';

  subject: SubjectModel[] = [];
  selectedSubject: string = '';

  statusList = [
    { name: 'Tất cả', value: -1 },
    { name: 'Hiển thị', value: 1 },
    { name: 'Ẩn', value: 0 },
  ];
  selectedStatus: any = this.statusList[0];

  constructor(private testSrv: TestAbilityService, private classRoomSrv: ClassRoomService, private subjectSrv: SubjectService) { }

  ngOnInit(): void {
    this.getTestCategory();
    this.getClassRoom();
    this.getSubject();
  }

  getTestCategory() {
    this.testSrv.getTestType(this.searchText, this.page, this.size).subscribe((data) => {
      this.testCategory = data.data.data;
      console.log("test category: ", this.testCategory);
    })
  }

  getClassRoom() {
    this.classRoomSrv.getClassRooms(this.page, this.size, this.searchText).subscribe((data) => {
      this.classRoom = data.data.data;
      console.log("ClassRoom: ", this.classRoom);
    })
  }

  getSubject() {
    this.subjectSrv.getSubjectByCourse(this.selectedClassroom || '', this.searchText, this.page, this.size).subscribe((data) => {
      this.subject = data.data.data;
      console.log("Subject: ", this.subject);
    })
  }

}
