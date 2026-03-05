import { Component, ChangeDetectionStrategy, input, inject, computed, effect } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-box',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-box.html',
  styleUrl: './text-box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBox {
  private fb = inject(FormBuilder);

  field = input.required<IFormInput>();
  form = input<FormGroup>();
  layout = input<ILayout>();

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

  isNumericInput(field: IFormInput): field is INumberInput {
    return field.type === 'number' || field.type === 'range';
  }

  getGridStyle(layout: ILayout | undefined): Record<string, string> {
    if (!layout) {
      return {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      };
    }
    return {
      display: 'grid',
      gridTemplateRows: layout?.rowSize?.join(' ')
        ?? `repeat(${layout?.rows ?? 1}, 1fr)`,
      gridTemplateColumns: layout?.colSize?.join(' ')
        ?? `repeat(${layout?.cols ?? 1}, 1fr)`,
      gap: layout?.gap ?? '0.5rem'
    };
  }

}

// form-input.interface.ts
export interface IFormBase {
  id: string;
  name: string;
  label: string;
  type: InputType;
  icon?: string | null;
  valueOnly?: boolean;
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

export interface ILayout {
  rows: number;
  cols: number;
  gap?: string;
  rowSize?: string[];
  colSize?: string[];
}
