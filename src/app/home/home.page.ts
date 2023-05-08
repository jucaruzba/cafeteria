import { Component, OnInit } from '@angular/core';
import { Producto } from '../shared/productos.class';
import { CrudProductosService } from '../services/crud-productos.service';
import { CarritoService } from '../services/carrito.service';
import { AlertController } from '@ionic/angular';
import { Orden } from '../shared/ordenes.class';
import { CrudOrdenesService } from '../services/crud-ordenes.service';
import 'firebase/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  detalleOrden = false;
  isModalOpen = false;
  isModalBuscar = false;
  nombre: string = '';
  numOrden: string = '';
  productos: Producto[] = [];
  productosCarrito: Producto[] = [];
  ordenCliente!: Orden;
  total: number = 0;

  constructor(
    private router: Router,
    public crudProductoService: CrudProductosService,
    public crudOrdenes: CrudOrdenesService,
    public carritoService: CarritoService,
    private alertController: AlertController
  ) { }

  buscarOrden(numOrden: string) {
    if (!numOrden) {
      // mostrar un mensaje de error o advertencia
      return;
    }

    this.crudOrdenes.buscarOrdenes(numOrden).subscribe(ordenes => {
      this.ordenCliente = ordenes; // asignar el arreglo de ordenes a la variable
      this.detalleOrden = true;
    });
  }
  async sinOrden(nombreProducto: string) {
    const alert = await this.alertController.create({
      header: 'NO EXISTE LA ORDEN',
      message: `La orden: ${nombreProducto} no existe.`,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
    this.ionViewDidEnter()
  }
  admin(){
    this.router.navigateByUrl('/register');
  }

  ionViewDidEnter() {
    this.crudProductoService.getProductosList().valueChanges().subscribe(productos => {
      this.productos = productos;
      console.log(this.productos)
    });
  }

  //Agregar al carrito
  onCarrito(producto: any) {
    this.carritoService.agregarProducto(producto)


    this.presentAlert(producto.nombre); // llama al método para mostrar la alerta
  }

  async presentAlert(nombreProducto: string) {
    const alert = await this.alertController.create({
      header: 'Producto agregado al carrito',
      message: `El producto ${nombreProducto} se ha agregado al carrito.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  setBuscar(isOpen: boolean) {
    this.isModalBuscar = isOpen;
  }




  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    this.productosCarrito = this.carritoService.obtenerProductos();
    console.log(this.productosCarrito);
    this.total = this.productosCarrito.reduce((acumulado, producto) => acumulado + producto.precio, 0);
  }

  borrarOrden() {
    this.carritoService.limpiarCarrito();
    this.productosCarrito = this.carritoService.obtenerProductos();
    this.total = 0;
    console.log(this.productosCarrito)
  }

  borrarDelCarrito(id: number) {
    const index = this.productosCarrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
      const productoEliminado = this.productosCarrito.splice(index, 1)[0];
      this.total -= productoEliminado.precio;
    }
  }

  onOrdenar() {
    const fecha = new Date().toLocaleDateString('es-ES');
    const nombreCliente = this.nombre;
    if (!nombreCliente) { // si el campo está vacío
      this.presentAlert2(); // muestra la alerta
      return; // detiene la ejecución del método
    }
    const nombre = this.nombre.substr(0, 3).toUpperCase();
    const numOrden = nombre + Math.floor(Math.random() * 100000);
    // Obtener los datos necesarios para la orden (por ejemplo, del formulario)
    const orden: Orden = {
      productos: this.carritoService.obtenerProductos(),
      total: this.total,
      cliente: nombreCliente,
      numOrden: numOrden,
      fecha: fecha,
      estado: 0
    };
    this.crudOrdenes.createOrden(orden).then(() => {
      this.borrarOrden();
      this.total = 0;
      this.nombre = ''
      this.presentAlert1(orden.numOrden);
      this.isModalOpen = false
    }).catch((error) => {
      // Aquí puedes mostrar un mensaje de error o hacer alguna otra cosa
    });
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      message: 'Para odenar se necesita su nombre',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlert1(numeroOrden: string) {
    const alert = await this.alertController.create({
      header: `${numeroOrden}`,
      message: 'Orden realizada, ve el estatus de tu orden y recogela a tiempo.',
      buttons: [
        {
          text: 'Copiar número de orden',
          handler: () => {
            navigator.clipboard.writeText(numeroOrden);
          }
        }
      ]
    });
    await alert.present();
  }


}
