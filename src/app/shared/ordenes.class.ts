import { Producto } from "./productos.class";

export class Orden {
    productos: Producto[];
    total: number;
    cliente: string;
    numOrden: string;
    fecha: string;
    estado: number;

    constructor(productos: Producto[], total: number, cliente: string, numOrden: string, estado:number) {
        this.productos = productos;
        this.total = total;
        this.cliente = cliente;
        this.numOrden = numOrden;
        this.fecha = '';
        this.estado = estado;
    }
}
