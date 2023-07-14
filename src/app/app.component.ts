import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {TemasService} from "./services/temas.service";
import {Temas} from "./services/temas";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public temas: string[] = ['lara-light-teal', 'lara-dark-teal'];
  public temaSeleccionado: string="";
  public readonly Temas = Temas;  

  constructor(
    private temaService: TemasService,
    private primeConfig: PrimeNGConfig
  ) {
  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }

  public cambiarTema(tema: string) {
    this.temaService.cambiarTema(tema);
  }


}
