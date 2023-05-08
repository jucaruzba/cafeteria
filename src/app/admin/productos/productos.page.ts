import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudProductosService } from 'src/app/services/crud-productos.service';
import { Producto } from 'src/app/shared/productos.class';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  public alertButtons = ['OK'];
  isModalOpen = false;
  isModalProducto = false;
  productoForm: FormGroup;
  productos: Producto[] = [];
  constructor(
    public crudProductoService: CrudProductosService,
    private fb: FormBuilder
  ) {

    this.productoForm = this.fb.group({
      nombre: [''],
      precio: [''],
      foto: [null],
      categoria: ['']
    })
  }
  ngOnInit() {
    this.ionViewDidEnter()
  }
  ionViewDidEnter() {
    this.crudProductoService.getProductosList().valueChanges().subscribe(productos => {
      this.productos = productos;
      console.log(this.productos)
    });
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setProducto(isOpen: boolean) {
    this.isModalProducto = isOpen;
  }
  fromSubmit() {
    console.log('Submitting form...');
    if (!this.productoForm.valid) {
      console.log('Form is invalid');
      return false;
    } else {
      console.log('Form is valid. Sending request...');

      const input = document.getElementById("foto") as HTMLInputElement;
      if (!input || !input.files || input.files.length === 0) {
        console.log('No file selected');
        return false;
      }

      const file = input.files[0];
      console.log("Selected file:", file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const blob = new Blob([event.target?.result as ArrayBuffer], { type: file.type });
        console.log("Blob:", blob);

        this.crudProductoService.createProduct(this.productoForm.value, blob).then(resp => {
          console.log('Response:', resp);
          this.productoForm.reset();
          this.setOpen(false);
        }).catch(error => {
          console.log('Error:', error);
        });
      };
      reader.readAsArrayBuffer(file);

      return true;
    }
  }

  dataURItoBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    console.log("imagen: " + ia.toString());
    console.log("tipo MIME: " + mimeString);
    return new Blob([ia], { type: mimeString });

  }
  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    this.productoForm.get('foto')?.setValue(file);
  }

  onDelete(id: number) {
    if (window.confirm('Do you really want to delete?')) {
      this.crudProductoService.deleteProduct(id);
    }
  }
}

