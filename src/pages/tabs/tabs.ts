import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1: any = 'HomePage';
  tab2: any = 'CategoriasPage';
  tab3: any = 'OrdenesPage';
  tab4: any = 'BusquedaPage';

}
