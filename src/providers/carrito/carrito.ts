import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarritoProvider {

  items: any[] = [];

  constructor(public http: Http, private alertCtrl: AlertController) {
    console.log('Hello CarritoProvider Provider');
  }

  agregar_carrito(articulo: any) {
    for (let item of this.items) {
      if (item.codigo == articulo.codigo) {
        this.alertCtrl.create({
          title: "Item existe",
          subTitle: articulo.producto + ", ya se encuentra en su carrito de compras.",
          buttons: ["OK"]
        }).present();

        return;
      }
    }
    this.items.push(articulo);
  }

}
