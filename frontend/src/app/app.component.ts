import { Component,  ElementRef, } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:false
})
export class AppComponent {
  constructor(private modalService: NgbModal, private elementRef: ElementRef) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}