import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PorCategoriasPage } from './por-categorias';

@NgModule({
  declarations: [
    PorCategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(PorCategoriasPage),
  ],
  exports: [
    PorCategoriasPage
  ]
})
export class PorCategoriasPageModule {}
