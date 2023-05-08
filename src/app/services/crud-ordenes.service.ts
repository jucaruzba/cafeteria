import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Producto } from '../shared/productos.class';
import firebase from 'firebase/compat/app';  // Asegúrate de importar la biblioteca Firebase
import { Orden } from '../shared/ordenes.class';
import { Observable, map, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudOrdenesService {

  ordenRef: AngularFireObject<any>;
  private ordenListRef = this.db.list<Orden>('ordenes');

  constructor(private db: AngularFireDatabase,) { 
    this.ordenListRef = this.db.list('/ordenes', (ref) => ref.orderByChild('id'));
    this.ordenRef = this.db.object('/orden');
  }
  createOrden(orden: Orden) {
    return this.ordenListRef.push({
      productos: orden.productos,
      total:orden.total,
      cliente:orden.cliente,
      numOrden:orden.numOrden,
      fecha:orden.fecha,
      estado:orden.estado
    });
  }
  getOrdenesList(){
    this.ordenListRef=this.db.list('/ordenes');
    return this.ordenListRef
  }
  
buscarOrdenes(numOrden: string): Observable<Orden> {
  return this.ordenListRef.valueChanges().pipe(
    map(ordenes => ordenes.filter(orden => orden.numOrden === numOrden)),
    map(ordenes => ordenes[0]),
    take(1)
  );
}

cambiarEstadoOrden(numOrden: string, nuevoEstado: number) {
  const ordenRef = this.db.list<Orden>('ordenes', ref => ref.orderByChild('numOrden').equalTo(numOrden)).snapshotChanges().pipe(
    take(1),
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ),
    map(ordenes => ordenes[0])
  );

  ordenRef.subscribe(orden => {
    if (orden) {
      const ordenObjRef = this.db.object(`ordenes/${orden.key}`);
      ordenObjRef.update({ estado: nuevoEstado });
    }
  });
}

borrarOrden(numOrden: string) {
  const ordenRef = this.db.list<Orden>('ordenes', ref => ref.orderByChild('numOrden').equalTo(numOrden)).snapshotChanges().pipe(
    take(1),
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ),
    map(ordenes => ordenes[0])
  );

  ordenRef.subscribe(orden => {
    if (orden) {
      const ordenObjRef = this.db.object(`ordenes/${orden.key}`);
      ordenObjRef.remove();
    }
  });
}


}
