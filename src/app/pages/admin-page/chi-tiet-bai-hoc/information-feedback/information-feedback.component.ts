import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-information-feedback',
  templateUrl: './information-feedback.component.html',
  styleUrl: './information-feedback.component.css'
})
export class InformationFeedbackComponent implements OnInit {
  cities: any;
  selectedCity: any;

  constructor() { }

  ngOnInit(): void {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

}
