import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoProvider } from './../../providers/carrito/carrito';

@IonicPage()
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle: string = 'OrdenesDetallePage';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private carritoProvider: CarritoProvider) {
  }

  ionViewWillEnter() {
    console.log("Cargando ordenes...");
    this.carritoProvider.cargar_ordenes();
  }

}
