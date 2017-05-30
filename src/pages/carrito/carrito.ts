import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { CarritoProvider } from './../../providers/carrito/carrito';

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    public navParams: NavParams,
    private carritoProvider: CarritoProvider) {
  }

}
