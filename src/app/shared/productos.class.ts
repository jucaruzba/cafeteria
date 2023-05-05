export class Producto {
    nombre: string;
    precio:number;
    foto:string;
    categoria:string;
    
    constructor(nombre: string, precio: number, foto:string, categoria:string) {
        this.nombre=nombre;
        this.precio=precio;
        this.foto=foto;
        this.categoria=categoria
    }
  }
  