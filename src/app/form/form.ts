import { Component, ChangeDetectionStrategy, input, inject, computed, output, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormElement, IFormInput, TextBox } from '../component/text-box/text-box';
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

  form = computed(() => this.fb.group(this.createGroup(this.fields())));

  constructor() {
    effect(() => {
      const formGroup = this.form();
      // Emit initial value
      this.formValueChange.emit(formGroup.value);
      // Subscribe to value changes
      formGroup.valueChanges.subscribe(value => {
        this.formValueChange.emit(value);
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
          f.default || '',
          f.required ? Validators.required : []
        ];
      }
    });
    return group;
  }

  get valueObj() {
    return this.form().value;
  }

  onSubmit() {
    if (this.form().valid) {
      console.log('Form Submitted:', this.valueObj);
    } else {
      this.form().markAllAsTouched();
    }
  }
}
