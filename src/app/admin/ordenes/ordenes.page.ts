import { Component, OnInit } from '@angular/core';
import { CrudOrdenesService } from 'src/app/services/crud-ordenes.service';
import { Orden } from 'src/app/shared/ordenes.class';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})

export class OrdenesPage implements OnInit {
  ordenes:Orden[]=[];
  isModalOpen = false;
  ordenCliente!: Orden;
  constructor(
    public crudOrdenes:CrudOrdenesService
  ) { }

  setOpen(isOpen: boolean, numOrden:string) {
    this.isModalOpen = isOpen;
    this.crudOrdenes.buscarOrdenes(numOrden).subscribe(ordenes => {
      this.ordenCliente = ordenes; // asignar el arreglo de ordenes a la variable
      console.log(this.ordenCliente)
    });
  }
  ngOnInit() {
    this.ionViewDidEnter()
  }
  ionViewDidEnter() {
    this.crudOrdenes.getOrdenesList().valueChanges().subscribe(ordenes => {
      this.ordenes = ordenes;
      console.log(this.ordenes)
    });
  }

  cambiarEstado(numOrden: string, estado: number) {
    this.crudOrdenes.cambiarEstadoOrden(numOrden, estado);
  }

  borrarOrden(numOrden:string){
    this.crudOrdenes.borrarOrden(numOrden);
  }
}
