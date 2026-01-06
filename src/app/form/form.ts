import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormElement, IFormInput, TextBox } from '../component/text-box/text-box';
import { MultiFileUploadComponent } from '../component/multi-file-upload/multi-file-upload';
import { Accordion } from "../component/accordion/accordion";
import { Subform } from "../component/subform/subform";

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, MultiFileUploadComponent, Accordion, Subform],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class Form {
  form!: FormGroup;

  // fields: IFormElement[] = [
  //   {
  //     id: 'businessName',
  //     name: 'businessName',
  //     label: 'Business Name',
  //     type: 'text',
  //     placeholder: 'Enter Business Name',
  //     required: true,
  //     icon: 'person',
  //   },
  //   {
  //     id: 'panNo',
  //     name: 'panNo',
  //     label: 'PAN Number',
  //     type: 'text',
  //     placeholder: 'Enter PAN Number',
  //     required: true,
  //     icon: 'person',
  //   },
  //   {
  //     id: 'gender',
  //     name: 'gender',
  //     label: 'Gender',
  //     type: 'radio',
  //     options: [
  //       { label: 'Male', value: 'M' },
  //       { label: 'Female', value: 'F' },
  //     ],
  //     required: true,
  //   },
  //   {
  //     id: 'subscribe',
  //     name: 'subscribe',
  //     label: 'Subscribe to updates',
  //     type: 'check',
  //     default: true,
  //   },
  //   {
  //     id: 'country',
  //     name: 'country',
  //     label: 'Country',
  //     type: 'select',
  //     options: [
  //       { label: 'Nepal', value: 'NP' },
  //       { label: 'India', value: 'IN' },
  //       { label: 'USA', value: 'US' },
  //     ],
  //   },
  // ];

  fields: IFormElement[] = [
    {
      id: 'productMain',
      name: 'productMain',
      label: 'Product',
      type: 'subForm',
      fields: [
        {
          id: 'desca',
          name: 'desca',
          label: 'Product Name',
          type: 'text',
          placeholder: 'Enter Product Name',
        },
        {
          id: 'menucode',
          name: 'menucode',
          label: 'Item Code',
          type: 'text',
          placeholder: 'Enter Item Code',
        }
      ]
    },
    {
      id: 'parentGroup',
      name: 'parentGroup',
      label: 'Parent Group',
      type: 'subForm',
      fields: [
        {
          id: 'parentGroupName',
          name: 'parentGroup',
          label: 'Parent Group',
          type: 'text',
          placeholder: 'Enter Parent Group',
        }
      ]
    },
    {
      id: 'itemAttributes',
      name: 'itemAttributes',
      label: 'Item Attributes',
      type: 'subForm',
      fields: [
        {
          id: 'drinkable',
          name: 'drinkable',
          label: 'Drinkable',
          type: 'text',
        },
        {
          id: 'gin',
          name: 'gin',
          label: 'Gin',
          type: 'text',
        },
        {
          id: 'attr1',
          name: 'attr1',
          label: 'Attr1',
          type: 'text',
        },
        {
          id: 'attr2',
          name: 'attr2',
          label: 'Attr2',
          type: 'text',
        },
        {
          id: 'attr3',
          name: 'attr3',
          label: 'Attr3',
          type: 'text',
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    let group: any = {};
    this.fields.forEach(f => {
      if (f.type === 'subForm') { }
      else {
        group[f.name] = [
          f.default || '',
          f.required ? Validators.required : []
        ];
      }
    });
    // group['fileSets'] = [[]]; // Add form control for file sets
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
