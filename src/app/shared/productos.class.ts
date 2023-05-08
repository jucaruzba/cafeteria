export class Producto {
    static nextId: number = 1; // Variable estática para el próximo ID disponible

    id:number;
    nombre: string;
    precio: number;
    foto: Blob;
    categoria: string;

    constructor(nombre: string, precio: number, foto: Blob, categoria: string) {
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
        this.categoria = categoria;
        this.id = Producto.nextId; // Asignar el próximo ID disponible
        Producto.nextId++; // Incrementar el valor del próximo ID
    }
}