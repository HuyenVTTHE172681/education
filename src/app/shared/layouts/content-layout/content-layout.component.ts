import {
  Component,
  ElementRef,
  Renderer2,
  TemplateRef,
  inject,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.css',
})
export class ContentLayoutComponent {
  lastSegment: any;
  constructor(
    private router: Router,
    private elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
  openEnd(content: TemplateRef<any>) { }
  clickOnBody() { }

  closeMenu() { }

  clearToggle() { }
}
