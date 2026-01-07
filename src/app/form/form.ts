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
      id: 'schemaName',
      name: 'schemaName',
      label: 'Schema Name',
      type: 'text',
      placeholder: 'Enter Schema Name',
    },
    {
      id: 'title',
      name: 'title',
      label: 'Title',
      type: 'text',
      placeholder: 'Enter Title',
    },
    {
      id: 'apiEndPoint',
      name: 'apiEndPoint',
      label: 'API End Point',
      type: 'text',
      placeholder: 'Enter API End Point',
    },
    {
      id: 'mainTable',
      name: 'mainTable',
      label: 'Main Table',
      type: 'text',
      placeholder: 'Enter Main Table',
    },
    {
      id: 'keyColumn',
      name: 'keyColumn',
      label: 'Key Column',
      type: 'text',
      placeholder: 'Enter Key Column',
    },
    {
      id: 'columns',
      name: 'columns',
      label: 'Columns',
      type: 'subForm',
      count: 5,
      fields: [
        {
          id: 'key',
          name: 'key',
          label: 'Key',
          type: 'text',
          placeholder: 'Enter Key',
        },
        {
          id: 'dbKey',
          name: 'dbKey',
          label: 'DB Key',
          type: 'text',
          placeholder: 'Enter DB Key',
        },
        {
          id: 'title',
          name: 'title',
          label: 'Title',
          type: 'text',
          placeholder: 'Enter Title',
        },
        {
          id: 'hidden',
          name: 'hidden',
          label: 'Hidden',
          type: 'check',
        },
        {
          id: 'noSearch',
          name: 'noSearch',
          label: 'No Search',
          type: 'check',
        },
        {
          id: 'columnNgStyle',
          name: 'columnNgStyle',
          label: 'Column Ng Style',
          type: 'text',
          placeholder: 'Enter Column Ng Style',
        },
        {
          id: 'focusTo',
          name: 'focusTo',
          label: 'Focus To',
          type: 'text',
          placeholder: 'Enter Focus To',
        },
        {
          id: 'appliedDecimalPipe',
          name: 'appliedDecimalPipe',
          label: 'Applied Decimal Pipe',
          type: 'check',
        },
        {
          id: 'sourceTableAlias',
          name: 'sourceTableAlias',
          label: 'Source Table Alias',
          type: 'text',
          placeholder: 'Enter Source Table Alias',
        },
        {
          id: 'sourceTable',
          name: 'sourceTable',
          label: 'Source Table',
          type: 'text',
          placeholder: 'Enter Source Table',
        },
        {
          id: 'dataType',
          name: 'dataType',
          label: 'Data Type',
          type: 'text',
          placeholder: 'Enter Data Type',
        },
      ]
    },
    {
      id: 'relationalJoins',
      name: 'relationalJoins',
      label: 'Relational Joins',
      type: 'subForm',
      count: 5,
      fields: [
        {
          id: 'sourceTable',
          name: 'sourceTable',
          label: 'Source Table',
          type: 'text',
          placeholder: 'Enter Source Table',
        },
        {
          id: 'query',
          name: 'query',
          label: 'Query',
          type: 'text',
          placeholder: 'Enter Query',
        }
      ]
    },
    {
      id: 'whereClause',
      name: 'whereClause',
      label: 'Where Clause',
      type: 'subForm',
      count: 5,
      fields: [
        {
          id: 'query',
          name: 'query',
          label: 'Query',
          type: 'text',
        }
      ]
    }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const group: any = {};
    const registerControls = (fields: IFormElement[]) => {
      fields.forEach(f => {
        if (f.type === 'subForm' && f.fields) {
          registerControls(f.fields);
        } else if (f.type !== 'subForm') {
          group[f.name] = [
            f.default || '',
            f.required ? Validators.required : []
          ];
        }
      });
    };
    registerControls(this.fields);
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
