import { Injectable } from '@angular/core';
import { Producto } from '../shared/productos.class';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productos: Producto[] = [];

  agregarProducto(producto: Producto): void {
    this.productos.push(producto);
  }

  obtenerProductos(): Producto[] {
    return this.productos;
  }

  limpiarCarrito(): void {
    this.productos = [];
  }

  borrarProducto(index: number): void {
    this.productos.splice(index, 1);
  }
  
}
