import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../../services/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  footer: any;
  footerLeft: any[] = [];
  footerRight: any[] = [];
  constructor(private footerSrv: FooterService) {}

  ngOnInit(): void {
    this.footerSrv.getFooter().subscribe((data) => {
      this.processFooterData(data);
    });
  }

  processFooterData(data: any): void {
    this.footerLeft = data.filter(
      (item: any) => item.title === 'Footerbeen trái'
    );
    this.footerRight = data.filter(
      (item: any) => item.title === 'Footer bên phải'
    );
  }
}
