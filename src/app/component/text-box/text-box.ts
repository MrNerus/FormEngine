import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-box',
  imports: [ReactiveFormsModule],
  templateUrl: './text-box.html',
  styleUrl: './text-box.css',
})
export class TextBox {
  @Input({ required: true }) field!: IFormInput;
  @Input({ required: true }) form!: FormGroup;

  get control() {
    return this.form.get(this.field.name);
  }

  get isInvalid() {
    return this.control?.invalid && (this.control.dirty || this.control.touched);
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


