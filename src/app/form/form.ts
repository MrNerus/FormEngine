import { Component, ChangeDetectionStrategy, input, inject, computed, output, effect } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormElement, IFormInput, IFormList, ILayout, TextBox } from '../component/text-box/text-box';
import { MultiFileUploadComponent } from '../component/multi-file-upload/multi-file-upload';
import { Accordion } from "../component/accordion/accordion";
import { Subform } from "../component/subform/subform";

@Component({
  selector: 'app-form',
  imports: [
    ReactiveFormsModule,
    // MultiFileUploadComponent, 
    // Accordion, 
    Subform
  ],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  private fb = inject(FormBuilder);

  fields = input<IFormElement[]>([]);
  formValueChange = output<any>();
  layout = input<ILayout>();

  form = computed(() => this.fb.group(this.createGroup(this.fields())));

  constructor() {
    effect(() => {
      const formGroup = this.form();
      // Emit initial value
      this.formValueChange.emit(this.valueObj);
      // Subscribe to value changes
      formGroup.valueChanges.subscribe(value => {
        this.formValueChange.emit(this.valueObj);
      });
    });
  }

  createGroup(fields: IFormElement[]): any {
    const group: any = {};
    fields.forEach(f => {
      if (f.type === 'subForm') {
        const count = f.count || 1;
        const array = this.fb.array([]);
        for (let i = 0; i < count; i++) {
          array.push(this.fb.group(this.createGroup(f.fields)) as any);
        }
        group[f.name] = array;
      } else {
        group[f.name] = [
          f.default,
          f.required ? Validators.required : []
        ];
      }
    });
    return group;
  }

  get valueObj() {
    return this.serializeForm(this.fields(), this.form());
  }

  onSubmit() {
    if (this.form().valid) {
      console.log('Form Submitted:', this.valueObj);
    } else {
      this.form().markAllAsTouched();
    }
  }

  serializeForm(
    fields: IFormElement[],
    form: FormGroup
  ): any {
    const result: any = {};

    for (const field of fields) {
      if (this.isFormList(field)) {
        const formArray = form.get(field.name) as FormArray;
        result[field.name] = this.serializeFormArray(field, formArray);
      } else {
        const value = form.get(field.name)?.value;

        result[field.name] = value;
      }
    }

    return result;
  }

  serializeFormArray(
    field: IFormList,
    formArray: FormArray
  ) {
    return formArray.controls.map(group => {
      const obj: any = {};
      const values: any[] = [];

      for (const child of field.fields) {
        const v = group.get(child.name)?.value;

        if (child.valueOnly) {
          values.push(v);
        } else {
          obj[child.name] = v;
        }
      }

      if (field.fields.every(f => f.valueOnly)) {
        return values[0];
      }

      return obj;
    });
  }

  isFormInput(field: IFormElement): field is IFormInput {
    return field.type !== 'subForm';
  }

  isFormList(field: IFormElement): field is IFormList {
    return field.type === 'subForm';
  }
}
