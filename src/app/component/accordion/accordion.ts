import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion {
  @Input() title: string = '';
  @Input() content: string = '';

  isOpen: boolean = false;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
