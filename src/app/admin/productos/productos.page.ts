import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudProductosService } from 'src/app/services/crud-productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  isModalOpen = false;

  productoForm:FormGroup;

  constructor(
    public crudProductoService:CrudProductosService,
    private router:Router,
    private fb:FormBuilder
    ) { 

      this.productoForm=this.fb.group({
        nombre:[''],
        precio:[''],
        foto:[null],
        categoria:['']
      })
    }
  ngOnInit() {
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  fromSubmit() {
    console.log('Submitting form...');
    if (!this.productoForm.valid) {
      console.log('Form is invalid');
      return false;
    } else {
      console.log('Form is valid. Sending request...');
      this.crudProductoService.createProduct(this.productoForm.value).then(resp => {
        console.log('Response:', resp);
        this.productoForm.reset();
        this.setOpen(false);
      }).catch(error => {
        console.log('Error:', error);
      });
      return true;
    }
  }
  
}

