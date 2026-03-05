import { Component, ChangeDetectionStrategy, signal, inject, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IFormElement, ILayout, TextBox } from "./component/text-box/text-box";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Form } from "./form/form";
import Prism from 'prismjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextBox, ReactiveFormsModule, Form],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('myapp');
  @ViewChild('jsonOutput') jsonOutput!: ElementRef;

  @ViewChild('inputSchema') inputSchema!: TextBox;

  currentSchema = signal<IFormElement[]>([]);
  initialSchemaString = signal<string>('');

  layout = signal<ILayout>({
    rows: 2,
    cols: 2,
    gap: '1rem',
    rowSize: ["auto", "auto"],
    colSize: ["15rem", "auto"]
  });

  constructor() {
    // Initialize with a sample schema
    const initialSchema: IFormElement[] = [
      {
        id: 'name',
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'Enter your name'
      },
      {
        id: 'age',
        name: 'age',
        label: 'Age',
        type: 'number'
      }
    ];
    this.initialSchemaString.set(JSON.stringify(initialSchema, null, 2));
    this.currentSchema.set(initialSchema);
  }

  ngAfterViewInit() {
    Prism.highlightElement(this.jsonOutput.nativeElement);
  }

  onApply() {
    const schemaString = this.inputSchema.control?.value ?? '';
    console.log("SchemaString", schemaString);
    try {
      const schema = JSON.parse(schemaString) as IFormElement[];
      console.log("Schema", schema);
      this.currentSchema.set(schema);
    } catch (e) {
      console.error('Invalid JSON Schema', e);
      alert('Invalid JSON Schema');
    }
  }

  updateFormValue(value: any) {
    this.jsonOutput.nativeElement.textContent = JSON.stringify(value, null, 2);
  }



}
