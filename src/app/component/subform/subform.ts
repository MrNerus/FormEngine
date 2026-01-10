import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { IFormElement, IFormInput, IFormList, TextBox } from '../text-box/text-box';
import { Accordion } from "../accordion/accordion";

@Component({
  selector: 'app-subform',
  imports: [Accordion, TextBox],
  templateUrl: './subform.html',
  styleUrl: './subform.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Subform {
  field = input.required<IFormElement>();
  form = input.required<FormGroup>();

  get controls(): AbstractControl[] {
    const control = this.form().get(this.field().name);
    if (control instanceof FormArray) {
      return control.controls;
    }
    return [];
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  asFormInput(field: IFormElement): IFormInput {
    return field as IFormInput;
  }

  asFormList(field: IFormElement): IFormList {
    return field as IFormList;
  }

  isFormInput(field: IFormElement): field is IFormInput {
    return field.type !== 'subForm';
  }

  isFormList(field: IFormElement): field is IFormList {
    return field.type === 'subForm';
  }
}
