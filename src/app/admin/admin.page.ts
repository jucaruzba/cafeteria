import { Component, OnInit } from '@angular/core';


interface Producto {
  nombre: string;
  precio: number;
  tamano: string;
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  productos: Producto[] = [
    { nombre: 'Cocacola', precio: 10.5, tamano: 'S' },
    { nombre: 'Sandwinch', precio: 15, tamano: 'M' },
    { nombre: 'Torta Milanesa', precio: 20, tamano: 'L' },
    { nombre: 'Burrito', precio: 8, tamano: 'S' },
    { nombre: 'Muffin', precio: 12.5, tamano: 'M' },
    { nombre: 'Cafe', precio: 18, tamano: 'L' },
  ];
total:number=0;
  isModalOpen = false;
  constructor() { }

  ngOnInit() {
    this.total = 0;
for (let i = 0; i < this.productos.length; i++) {
  this.total += this.productos[i].precio;
}
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
