# Cambio dinámico de temas

## Pasos

Los temas de PrimeNG hemos visto que hay que seleccionar uno cuando creamos el proyecto. También se pueden cambiar sobre la marcha para que los usuarios puedan elegir su propio tema. 

Partiremos del [repositorio de GitHub](# Repositorio GitHub) para ver todo el todo proceso, aunque puedes hacerlo directamente en tu proyecto. Veamos como hacerlo en unos pocos pasos:

1. Crearemos una carpeta `themes`, en la ruta `src/themes`. Dentro de ella, crearemos un archivo `css` por cada tema que vayamos a cargar. El nombre del archivo `css` tendrá el mismo nombre que el tema. ([Ver temas disponibles](### CSS y Selección del tema)). En nuestro ejemplo vamos a cambiar entre dos temas, `lara-dark-teal` y `lara-light-teal`, así que creamos dos archivos con esos nombres y extensión `css`, dentro de la carpeta `themes`.

![Carpeta themes y su contenido](img/prime-ng/image-20230714200404102.png)

2. El contenido de estos archivos será un `@import` a su correspondiente archivo `css` que estará en la carpeta `node_modules`. En el código de abajo, deberás cambiar `cambia-aquí-ruta-del-tema`, por el nombre del tema que corresponda, tal y como se ve en la captura anterior.

```css
@import "primeng/resources/themes/cambia-aquí-ruta-del-tema/theme.css";
```
3. En el `angular.json`, tenemos que cambiar lo que tenemos originalmente por lo siguiente:

> ⚠️ **IMPORTANTE:** Recuerda cambiar el atributo `styles` de la línea 27 aproximadamente. No el de la línea 90 y algo. Ese es para el testing.

```json
"styles": [
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeflex/primeflex.css",
    "node_modules/primeicons/primeicons.css",
    "src/styles.css",
    {
        "bundleName": "lara-light-teal",
        "input": "src/themes/lara-light-teal.css",
        "inject": false
    },
    {
        "bundleName": "lara-dark-dark",
        "input": "src/themes/lara-dark-teal.css",
        "inject": false
    }
],
```
4. Hemos eliminado la línea donde elegíamos el `css` del tema, dejando las referencias a los css de `primeng`, `primeflex`, `primeicons`, y `styles.css` global.
5. La novedad es que le hemos añadido objetos que representan temas. Tantos temas como queramos añadir a la aplicación. Cada tema tiene 3 atributos: `bundleName` es el nombre del tema, `input`, que es la ruta del tema e `inject` indicará si el estilo se inyectará el DOM o no. 🧙‍♂️Un mago dice que hay que ponerlo en `false`.
6. En este punto, no tenemos un tema elegido para nuestra aplicación. Tan solo hemos definido todos los disponibles. Lo siguiente será elegir el tema por defecto con el que arrancará la aplicación. Para ello tenemos que añadir la siguiente línea al archivo `index.html`, dentro de la etiqueta `<head>`. Eso elegirá el tema llamado `lara-light-teal`.

```html
<link id="app-theme" rel="stylesheet" type="text/css" href="lara-light-teal.css"/>
```

> ⚠️ No te preocupes si te da un *warning* de que no reconoce esa ruta. Es que realmente no existe. Pero funcionará.

7. Ahora ya podrías arrancar el proyecto y se debería de ver con el tema `lara-light-teal`. 
8. Antes de seguir avanzando, para comprobar que todo va bien, prueba a modificar manualmente el atributo `href` anterior y ponle otro tema que hayas configurado. Debería arrancar el proyecto con el tema que le hayas indicado en el `index.html`.
9. Ahora que ya hemos visto que todo lo que tenemos que hacer es cambiar la propiedad `href` del `index.html`, vamos a hacer un servicio que cambie de forma dinámica dicho atributo. Así que le creamos un servicio con el siguiente contenido:

```typescript
import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public cambiarTema(tema: string) {
    // Guardamos en una variable el elemento link del index.html
    let themeLink : HTMLLinkElement = this.document.getElementById('app-theme') as HTMLLinkElement;

    // Y si existe, modifica el href al tema indicado + .css
    if (themeLink) {
      themeLink.href = tema + '.css';
    }
  }
}

```

10. Con una llamada al método `cambiarTema()`, pasándole como argumento el nombre del tema, podremos cambiar "en caliente" el tema de la aplicación, viéndose el cambio al instante.

11. Para usar el servicio, deberemos inyectarlo. Nosotros lo inyectaremos al `app.component.ts`, y haremos un método para consumir el servicio.

    ```typescript
    export class AppComponent implements OnInit{
    
        constructor(private temaService: TemasService) {}
    
        public cambiarTema(tema: string) {
            // Llamamos al método cambiarTema() del servicio
            this.temaService.cambiarTema(tema);
        }
    ```

12. Para hacer llamadas a ese servicio, usaremos dos botones en el `app.component.html` que enviarán como argumento a la función sendos temas como un string:

```html
<p-button (click)="cambiarTema('lara-light-teal')" 
          label="Modo claro" 
          icon="pi pi-sun">
</p-button>
<p-button (click)="cambiarTema('lara-dark-teal')" 
          label="Modo oscuro" 
          icon="pi pi-moon">
</p-button>
```

10. El servicio recibirá como argumento el string `lara-light-teal` o `lara-dark-teal` (o lo que se le envíe), y pondrá ese valor en el `index.html`, aplicando así el tema seleccionado en tiempo de ejecución.

<div style="text-align: center">
    <img src="img/prime-ng/juan-tamariz-tamariz.gif" alt="Juan Tamariz Tamariz tocando el violín" style="zoom:100%;" />
</div>


## Mejoras

Hemos visto los pasos básicos para poder aplicar distintos temas. Nosotros lo hemos probado con dos temas. Podemos hacerlo con todos los [temas disponibles en PrimeNG](https://primeng.org/theming#builtinthemes). 

### Dropdown

En lugar de hacerlo con botones, se puede hacer con un `dropdown`, donde se colocan todos los temas disponibles.

```typescript
// tu-componente.component.ts
public temas: string[] = ['lara-light-teal', 'lara-dark-teal'];
public temaSeleccionado: string = "";
```

```html
<!-- tu-componente.component.html -->
<p-dropdown 
            (onChange)="cambiarTema(temaSeleccionado)" 
            [(ngModel)]="temaSeleccionado" 
            [options]="temas">
</p-dropdown>
```

> 💡Recuerda que para usar el `[(ngModel)]` deberás importar el `FormsModule`.

![image-20230714223237296](img/prime-ng/image-20230714223237296.png)

Puedes hacerlo con botones, *switches*, *dropdowns*, lo que tu quieras. Solo debes consumir el servicio y listo.

### Constantes

Tal y como hace PrimeIcons con las clases de los [iconos disponibles](https://primeng.org/icons#constants), podemos crear una clase (la colocas donde quieras) que tenga solo constantes estáticas, listas para usarlas más limpiamente desde código, sin tener que sabernos los nombres de los temas que tengamos disponibles.

Creamos la clase donde quieras:

```typescript
// temas.ts
export class Temas {
    public static readonly LARA_LIGHT_TEAL: string = "lara-light-teal";
    public static readonly LARA_DARK_TEAL: string = "lara-dark-teal";
    //... definiendo así todos los nombres de los temas disponibles
}
```

Para usar la clase, solo tendremos que importarla y si queremos usarla en el HTML, tendremos que tenerla como atributo (como siempre):

```typescript
// component.ts
import {Temas} from "./services/temas"; // Sustituye por tu ruta
export class TuComponente {
    // otros atributos...
    public readonly Temas = Temas;     

    constructor (...) {}
}
```

```html
<!-- component.html -->
<p-button (click)="cambiarTema(Temas.LARA_LIGHT_TEAL)" 
          label="Modo claro"  
          icon="pi pi-sun">
</p-button>
<p-button (click)="cambiarTema(Temas.LARA_DARK_TEAL)" 
          label="Modo oscuro" 
          icon="pi pi-moon">
</p-button>
```

La gran ventaja es que usando la clase, cuando escribamos `Temas.`, el IDE nos ayudará mostrándonos la lista de todas las constantes disponibles.

![image-20230714224937843](img/prime-ng/image-20230714224937843.png)

## Repositorio GitHub

Puedes encontrar todo el código del ejemplo para crear temas dinámicos en la siguiente url:

**https://github.com/borilio/temas-dinamicos-primeng**

