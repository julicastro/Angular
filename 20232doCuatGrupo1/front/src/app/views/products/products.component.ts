import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  produtcsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.produtcsForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      clasificacion: ['', Validators.required],
      stock: ['', Validators.required],
      importe: ['', Validators.required],
    });
  }

  onSubmit() {
  }
}
