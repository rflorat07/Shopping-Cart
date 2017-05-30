import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { UsuarioProvider } from './../usuario/usuario';

import { URL_SERVICIOS } from './../../config/url.servicios';

@Injectable()
export class CarritoProvider {

  items: any[] = [];
  ordenes: any[] = [];
  total_carrito: number = 0;

  constructor(
    public http: Http,
    private storage: Storage,
    private platform: Platform,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private usuarioProvider: UsuarioProvider) {

    this.cargar_storage();
    this.actualizar_total();
  }

  remover_item(idx: number) {
    this.items.splice(idx, 1);
    this.guardar_storage();
    this.actualizar_total();
  }

  realizar_pedido() {

    let data = new URLSearchParams();
    let codigos: string[] = [];

    for (let item of this.items) {
      codigos.push(item.codigo);
    }

    data.append("items", codigos.join(","));

    let url = `${URL_SERVICIOS}/pedidos/realizar_orden/${this.usuarioProvider.token}/${this.usuarioProvider.id_usuario}`;

    this.http.post(url, data)
      .map(resp => resp.json())
      .subscribe(resp => {
        let respuesta = resp;

        if (respuesta.error) {
          //mostramos el error
          this.alertCtrl.create({
            title: "Error en la order !",
            subTitle: respuesta.mensaje,
            buttons: ["OK"]
          }).present();
        } else {
          //todo bien!
          this.items = [];
          this.guardar_storage();
          this.alertCtrl.create({
            title: "Order realizada!",
            subTitle: "Nos contactaremos con usted pròximamente",
            buttons: ["OK"]
          }).present();
        }
      });
  }

  ver_carrito() {
    let modal: any;

    if (this.usuarioProvider.token) {
      //mostar pagina del carrito
      modal = this.modalCtrl.create("CarritoPage");
    } else {
      // mostrar el login
      modal = this.modalCtrl.create("LoginPage");
    }

    modal.present()

    modal.onDidDismiss((abrirCarrito) => {
      if (abrirCarrito) {
        this.modalCtrl.create("CarritoPage").present();
      }
    });

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
    this.actualizar_total();
    this.guardar_storage();
  }

  actualizar_total() {
    this.total_carrito = 0;
    for (let item of this.items) {
      this.total_carrito += Number(item.precio_compra);
    }
  }

  private guardar_storage() {
    if (this.platform.is('cordova')) {
      //dispositivo
      this.storage.set("items", this.items);
    } else {
      // computadora
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  }

  cargar_storage() {

    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        //dispositivo
        this.storage.ready()
          .then(() => {
            this.storage.get("items").then(items => {
              if (items) {
                this.items = items;
              }
              resolve();
            })
          })

      } else {
        //computadora
        if (localStorage.getItem("items")) {
          //Existen items en el localstorage
          this.items = JSON.parse(localStorage.getItem("items"));
        }
        resolve();
      }
    });

    return promesa;

  }

  cargar_ordenes() {
    let url = `${URL_SERVICIOS}/pedidos/obtener_pedidos/${this.usuarioProvider.token}/${this.usuarioProvider.id_usuario}`;

    this.http.get(url)
      .map(resp => resp.json())
      .subscribe(data => {
        if (data.error) {
          //manejar el error
        } else {
          this.ordenes = data.ordenes;
        }
      })
  }


  borrar_order(order_id: string) {
    let url = `${URL_SERVICIOS}/pedidos/borrar_pedido/${this.usuarioProvider.token}/${this.usuarioProvider.id_usuario}/${order_id}`;

    return this.http.delete(url).map(resp => resp.json());
  }



}
