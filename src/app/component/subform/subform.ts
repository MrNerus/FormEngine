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

  repeat(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  get valueObj() {
    var obj: { [key: string]: any } = {}
    // if it is Subform, loop through all element instde it io get valueObj.
    // if it is iforminput, get valueObj.
    return null
  }
}
