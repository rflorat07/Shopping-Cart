import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarritoProvider } from './../../providers/carrito/carrito';

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  orden: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private carritoProvider: CarritoProvider) {

    this.orden = this.navParams.get("orden");
    console.log(this.orden);
  }

  borrar_order(order_id: string) {
    this.carritoProvider.borrar_order(order_id).subscribe((data) => {
      if (data.error) {
        //manejo de errores
      } else {
        this.navCtrl.pop();
      }
    })
  }

}
