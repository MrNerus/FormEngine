import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormInput, TextBox } from '../component/text-box/text-box';
import { MultiFileUploadComponent } from '../component/multi-file-upload/multi-file-upload';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, TextBox, MultiFileUploadComponent],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class Form {
  form!: FormGroup;

  fields: IFormInput[] = [
    {
      id: 'businessName',
      name: 'businessName',
      label: 'Business Name',
      type: 'text',
      placeholder: 'Enter Business Name',
      required: true,
      icon: 'person',
    },
    {
      id: 'panNo',
      name: 'panNo',
      label: 'PAN Number',
      type: 'text',
      placeholder: 'Enter PAN Number',
      required: true,
      icon: 'person',
    },
    {
      id: 'gender',
      name: 'gender',
      label: 'Gender',
      type: 'radio',
      options: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
      ],
      required: true,
    },
    {
      id: 'subscribe',
      name: 'subscribe',
      label: 'Subscribe to updates',
      type: 'check',
      default: true,
    },
    {
      id: 'country',
      name: 'country',
      label: 'Country',
      type: 'select',
      options: [
        { label: 'Nepal', value: 'NP' },
        { label: 'India', value: 'IN' },
        { label: 'USA', value: 'US' },
      ],
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    let group: any = {};
    this.fields.forEach(f => {
      group[f.name] = [
        f.default || '',
        f.required ? Validators.required : []
      ];
    });
    group['fileSets'] = [[]]; // Add form control for file sets
    this.form = this.fb.group(group);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
