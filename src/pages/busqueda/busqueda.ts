import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosProvider } from './../../providers/productos/productos';


@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage {

  productoPage: string = 'ProductoPage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productosProvider: ProductosProvider) {
  }


  buscar_productos(ev: any) {
    let valor = ev.target.value;
    this.productosProvider.buscar_producto(valor);
  }

}
