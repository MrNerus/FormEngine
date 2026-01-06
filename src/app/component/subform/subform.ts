import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormElement, IFormInput, IFormList, TextBox } from '../text-box/text-box';
import { Accordion } from "../accordion/accordion";

@Component({
  selector: 'app-subform',
  imports: [Accordion, TextBox],
  templateUrl: './subform.html',
  styleUrl: './subform.css',
})
export class Subform {
  @Input({ required: true }) field!: IFormElement;
  @Input({ required: true }) form!: FormGroup;
}
