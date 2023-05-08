import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Producto } from '../shared/productos.class';
import firebase from 'firebase/compat/app';  // Asegúrate de importar la biblioteca Firebase
import 'firebase/compat/storage';


interface NewProducto {
  nombre: string;
  precio: number;
  categoria: string;
  foto?: string;
  id: number;
}// Asegúrate de importar la biblioteca de Firebase Storage
@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {
  productoListRef: AngularFireList<any>;
  productoRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
    private storage: AngularFireStorage

  ) {
    this.productoListRef = this.db.list('/productos', (ref) => ref.orderByChild('id'));
    this.productoRef = this.db.object('/producto');
  }

  deleteProduct(id: number) {
    this.db.list('/productos')
      .snapshotChanges()
      .subscribe(productos => {
        productos.forEach((producto: any) => {
          const productoId = producto.payload.key;
          const productoData = producto.payload.val();
          if (productoData.id === id) {
            this.db.list('/productos').remove(productoId)
              .then(() => console.log("Producto eliminado"))
              .catch((error) => console.error("Error al eliminar producto: ", error));
          }
        });
      });
  }


  createProduct(producto: Producto, imagen: Blob) {
    const newProducto: NewProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      id: Producto.nextId
    };
    Producto.nextId++;
    return new Promise<any>((resolve, reject) => {
      const storageRef: firebase.storage.Reference = firebase.storage().ref(`productos/${producto.nombre}`);
      const uploadTask: firebase.storage.UploadTask = storageRef.put(imagen);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Uploading image...');
        },
        (error) => {
          reject(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            newProducto['foto'] = downloadURL;
            console.log(newProducto)
            this.productoListRef.push(newProducto).then(() => {
              resolve('Product created successfully.');
            }).catch((error) => {
              reject(error);
            });
          }).catch((error) => {
            reject(error);
          });
        });
    });
  }



  getProducto(id: String) {
    this.productoRef = this.db.object('/producto/' + id);
    return this.productoRef
  }

  getProductosList() {
    this.productoListRef = this.db.list('/productos');
    return this.productoListRef
  }

  updateProducto(id: any, producto: Producto) {
    return this.productoRef.update({
      nombre: producto.nombre,
      precio: producto.precio,
      foto: producto.foto,
      categoria: producto.categoria,
    });
  }


}
