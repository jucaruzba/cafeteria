import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Producto } from '../shared/productos.class';

@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {
  productoListRef: AngularFireList<any>;
  productoRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { 
    this.productoListRef = this.db.list('path/to/productos');
    this.productoRef = this.db.object('path/to/booking');
  }

  createProduct(producto:Producto){
    return this.productoListRef.push({
      nombre:producto.nombre,
      precio:producto.precio,
      foto:producto.foto,
      categoria:producto.categoria,
    });
  }

  getProducto(id:String){
    this.productoRef= this.db.object('/producto/'+id);
    return this.productoRef
  }

  getProductosList(){
    this.productoListRef=this.db.list('/producto');
    return this.productoListRef
  }

  updateProducto(id:any, producto:Producto){
    return this.productoRef.update({
      nombre:producto.nombre,
      precio:producto.precio,
      foto:producto.foto,
      categoria:producto.categoria,
    });
  }

  deleteProcuto(id:string){
    this.productoRef=this.db.object('/producto/'+id);
    this.productoRef.remove
  }
}
