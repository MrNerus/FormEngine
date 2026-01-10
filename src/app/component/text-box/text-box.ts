import { Component, ChangeDetectionStrategy, input, inject, computed, effect } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  imports: [ReactiveFormsModule],
  templateUrl: './text-box.html',
  styleUrl: './text-box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBox {
  private fb = inject(FormBuilder);

  field = input.required<IFormInput>();
  form = input<FormGroup>();

  internalForm = new FormGroup({});

  effectiveForm = computed<FormGroup>(() => this.form() || this.internalForm);

  constructor() {
    effect(() => {
      const form = this.effectiveForm();
      const field = this.field();

      if (!form.get(field.name)) {
        const control = new FormControl(
          field.default || '',
          field.required ? Validators.required : []
        );
        if (form === this.internalForm) {
          form.addControl(field.name, control);
        }
      }
    });
  }

  get control() {
    return this.effectiveForm().get(this.field().name);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control.dirty || this.control.touched);
  }

  get valueObj() {
    if (this.isInvalid) {
      console.error(`Invalid data on "${this.field().label}" (${this.field().name}). Value: ${this.control?.value}`);
      return null
    }
    return {
      name: this.field().name,
      value: this.control?.value
    }
  }

  isNumericInput(field: IFormInput): field is INumberInput {
    return field.type === 'number' || field.type === 'range';
  }

}

// form-input.interface.ts
export interface IFormBase {
  id: string;
  name: string;
  label: string;
  type: InputType;
  icon?: string | null;
}

export interface IInputBase extends IFormBase {
  default?: string | number | boolean | null;
  placeholder?: string | number | null;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  tabindex?: number;
  autocomplete?: string | null;
}

export type InputType =
  | "text"
  | "number"
  | "date"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "range"
  | "check"
  | "radio"
  | "select"
  | "textarea"
  | "image"
  | "file"
  | "subForm";

export interface ITextInput extends IInputBase {
  type: "text" | "email" | "password" | "tel" | "url" | "textarea";
  pattern?: string | null;
  maxLength?: number | null;
}

export interface INumberInput extends IInputBase {
  type: "number" | "range";
  min?: number | null;
  max?: number | null;
  step?: number | null;
}

export interface ISelectInput extends IInputBase {
  type: "select";
  options: { label: string; value: string | number }[];
}

export interface IRadioInput extends IInputBase {
  type: "radio";
  options: { label: string; value: string | number }[];
}

export interface ICheckboxInput extends IInputBase {
  type: "check";
}

export interface IImageInput extends IInputBase {
  type: "image";
}

export interface IFileInput extends IInputBase {
  type: "file";
}

export interface IFormList extends IFormBase {
  type: "subForm";
  count?: number;
  valueOnlyList?: boolean;
  fields: IFormElement[];
}

export type IFormInput =
  | ITextInput
  | INumberInput
  | ISelectInput
  | IRadioInput
  | ICheckboxInput
  | IImageInput
  | IFileInput

export type IFormElement =
  | IFormInput
  | IFormList;


