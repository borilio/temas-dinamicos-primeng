import { NgModule } from '@angular/core';

import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";



@NgModule({

  // Aquí solo exportaciones!!!!

  exports: [
    ButtonModule,
    DropdownModule,
    RippleModule
  ]


})
export class PrimengModule { }
