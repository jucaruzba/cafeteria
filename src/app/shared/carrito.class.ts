import { Producto } from './productos.class';

export interface Carrito {
  productos: Producto[];
  total: number;
  cantidad: number;
}