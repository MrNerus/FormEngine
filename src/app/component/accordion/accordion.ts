import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion {
  @Input() title: string = '';
  @Input() content: string = '';

  @ViewChild('accordionTitle') accordionTitle!: ElementRef;
  @ViewChild('accordionBody') accordionBody!: ElementRef;
  @ViewChild('accordionContent') accordionContent!: ElementRef;

  isOpen: boolean = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.accordionTitle.nativeElement.classList.toggle('active');
    this.accordionBody.nativeElement.classList.toggle('active');

    if (this.isOpen) {
      // this.accordionBody.nativeElement.style.maxHeight = this.accordionBody.nativeElement.scrollHeight + 'px';
      this.accordionContent.nativeElement.style.padding = '0.5rem 1rem';
    } else {
      // this.accordionBody.nativeElement.style.maxHeight = null;
      this.accordionContent.nativeElement.style.padding = '0';
    }
  }
}
