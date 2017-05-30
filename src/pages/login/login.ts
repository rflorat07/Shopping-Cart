import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { UsuarioProvider } from './../../providers/usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo: string = "";
  contrasena: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private usuarioProvider: UsuarioProvider) {
  }


  ingresar() {
    this.usuarioProvider.ingresar(this.correo, this.contrasena)
      .subscribe((data) => {
        if (this.usuarioProvider.activo()) {
          this.viewCtrl.dismiss(true);
        }
      });
  }



}
