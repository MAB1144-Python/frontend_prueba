# [Paper Dashboard Angular](https://www.creative-tim.com/product/paper-dashboard-angular)
![version](https://img.shields.io/badge/version-2.4.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) [![GitHub issues open](https://img.shields.io/github/issues/creativetimofficial/paper-dashboard-angular.svg?maxAge=2592000)]() [![GitHub issues closed](https://img.shields.io/github/issues-closed-raw/creativetimofficial/paper-dashboard-angular.svg?maxAge=2592000)]()  [![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg)](https://discord.gg/E4aHAQy)

![Product Gif](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/paper-dashboard-angular/paper-dashboard-angular.gif)

Paper Dashboard Angular is a Bootstrap Admin Template which combines soft colors with beautiful typography and spacious cards and graphics. It was built on top of Google's [Angular Framework](https://angular.io/) and the HTML version of [Paper Dashboard](https://www.creative-tim.com/product/paper-dashboard). It is a powerful dashboard but it is light and easy to be used. It has enough features to allow you to get the job done, but it is not crowded to the point where you can't find the files for a specific component.

 We like consistency and design that blends into its purpose. Paper Dashboard Angular is a perfect example of our most thoughtful work. It combines over a dozen components and plugins, while looking like everything fits together. For an easy start or inspiration for you project, we have also create a set of example pages, like the user settings or usage graphics.

 Paper Dashboard Angular is built using the same design language as [Paper Kit](http://www.creative-tim.com/product/paper-kit), which you can use for the presentation pages of your website. You can easily use them together, or pick between them depending on the project you have.

 **Example Pages** We wanted to fully display the power of this dashboard, so the kit comes packed with examples showing you how to use the components.

 ## Table of Contents

 * [Versions](#versions)
 * [Demo](#demo)
 * [Quick Start](#quick-start)
 * [Documentation](#documentation)
 * [File Structure](#file-structure)
 * [Browser Support](#browser-support)
 * [Resources](#resources)
 * [Reporting Issues](#reporting-issues)
 * [Technical Support or Questions](#technical-support-or-questions)
 * [Licensing](#licensing)
 * [Useful Links](#useful-links)

 ## Versions

 [<img src="https://s3.amazonaws.com/creativetim_bucket/github/html.png" width="60" height="60" />](https://www.creative-tim.com/product/paper-dashboard-2)
 [<img src="https://s3.amazonaws.com/creativetim_bucket/github/angular.png" width="60" height="60" />](https://www.creative-tim.com/product/paper-dashboard-angular)
 [<img src="https://s3.amazonaws.com/creativetim_bucket/github/react.svg" width="60" height="60" />](https://www.creative-tim.com/product/paper-dashboard-react)

 | HTML | Angular | React |
 | --- | --- | --- |
 | [![Paper Dashboard 2 HTML](https://s3.amazonaws.com/creativetim_bucket/products/86/thumb/opt_pd2_thumbnail.jpg)](https://www.creative-tim.com/product/paper-dashboard-2) | [![Paper Dashboard Angular](https://s3.amazonaws.com/creativetim_bucket/products/58/thumb/opt_pd_angular_thumbnail.jpg)](https://www.creative-tim.com/product/paper-dashboard-angular) | [![Paper Dashboard React](https://s3.amazonaws.com/creativetim_bucket/products/98/thumb/opt_pd_react_thumbnail.jpg)](https://www.creative-tim.com/product/paper-dashboard-react) |

 ## Demo

 | Dashboard | User Profile | Tables | Icons | Notifications |
 | --- | --- | --- | --- | --- |
 | [![Start page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/paper-dashboard-angular/dashboard.png?raw=true)](https://demos.creative-tim.com/paper-dashboard-angular/#/dashboard) | [![User profile page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/paper-dashboard-angular/user-profile.png?raw=true)](https://demos.creative-tim.com/paper-dashboard-angular/#/user-profile) | [![Tables page ](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/paper-dashboard-angular/tables.png?raw=true)](https://demos.creative-tim.com/paper-dashboard-angular/#/table-list) | [![Icons Page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/paper-dashboard-angular/icons.png?raw=true)](https://demos.creative-tim.com/paper-dashboard-angular/#/maps) | [![Notifications page](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/paper-dashboard-angular/notifications.png?raw=true)](https://demos.creative-tim.com/paper-dashboard-angular/#/notifications)

 [View More](https://demos.creative-tim.com/paper-dashboard-angular/#/dashboard).


## Quick start

Quick start options:

- [Download from Creative Tim](https://www.creative-tim.com/product/paper-dashboard-angular).

## Terminal Commands

1. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en).
2. Open Terminal
3. Go to your file project
4. Run in terminal: ```npm install -g @angular/cli```
5. Then: ```npm install```
6. And: ```ng serve```
7. Navigate to: [http://localhost:4200/](http://localhost:4200/)

### What's included

Within the download you'll find the following directories and files:

```
paper-dashboard-angular
├── CHANGELOG.md
├── ISSUES_TEMPLATE.md
├── LICENSE.md
├── README.md
├── angular.json
├── browserslist
├── documentation
│   └── tutorial-components.html
├── e2e
├── karma.conf.js
├── package-lock.json
├── package.json
├── protractor.conf.js
├── src
│   ├── app
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── layouts
│   │   │   └── admin-layout
│   │   │       ├── admin-layout.component.html
│   │   │       ├── admin-layout.component.scss
│   │   │       ├── admin-layout.component.spec.ts
│   │   │       ├── admin-layout.component.ts
│   │   │       ├── admin-layout.module.ts
│   │   │       └── admin-layout.routing.ts
│   │   ├── pages
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.ts
│   │   │   ├── icons
│   │   │   │   ├── icons.component.html
│   │   │   │   └── icons.component.ts
│   │   │   ├── maps
│   │   │   │   ├── maps.component.html
│   │   │   │   └── maps.component.ts
│   │   │   ├── notifications
│   │   │   │   ├── notifications.component.html
│   │   │   │   └── notifications.component.ts
│   │   │   ├── table
│   │   │   │   ├── table.component.html
│   │   │   │   └── table.component.ts
│   │   │   ├── typography
│   │   │   │   ├── typography.component.html
│   │   │   │   └── typography.component.ts
│   │   │   ├── upgrade
│   │   │   │   ├── upgrade.component.html
│   │   │   │   └── upgrade.component.ts
│   │   │   └── user
│   │   │       ├── user.component.html
│   │   │       └── user.component.ts
│   │   ├── shared
│   │   │   ├── fixedplugin
│   │   │   │   ├── fixedplugin.component.html
│   │   │   │   ├── fixedplugin.component.ts
│   │   │   │   └── fixedplugin.module.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.ts
│   │   │   │   └── footer.module.ts
│   │   │   └── navbar
│   │   │       ├── navbar.component.html
│   │   │       ├── navbar.component.ts
│   │   │       └── navbar.module.ts
│   │   └── sidebar
│   │       ├── sidebar.component.html
│   │       ├── sidebar.component.ts
│   │       └── sidebar.module.ts
│   ├── assets
│   │   ├── css
│   │   ├── fonts
│   │   ├── img
│   │   └── scss
│   │       ├── paper-dashboard
│   │       └── paper-dashboard.scss
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.css
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── typings.d.ts
├── tsconfig.json
└── tslint.json
```
## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">


## Resources
- Demo: https://demos.creative-tim.com/paper-dashboard-angular/#/dashboard
- Download Page: https://www.creative-tim.com/product/paper-dashboard-angular
- Documentation: https://demos.creative-tim.com/paper-dashboard-angular/#/documentation/tutorial
- License Agreement: https://www.creative-tim.com/license
- Support: https://www.creative-tim.com/contact-us
- Issues: [Github Issues Page](https://github.com/creativetimofficial/paper-dashboard-angular/issues)

## Reporting Issues
We use GitHub Issues as the official bug tracker for the Paper Dashboard Angular. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of the Paper Dashboard Angular. Check the CHANGELOG from your dashboard on our [website](https://www.creative-tim.com/).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please [contact us](https://www.creative-tim.com/contact-us) instead of opening an issue.

## Licensing

- Copyright 2019 Creative Tim (https://www.creative-tim.com)
- Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-angular/blob/master/LICENSE.md)

## README - Ejecución del programa en Angular

Este documento contiene instrucciones para ejecutar un programa en Angular después de clonar el repositorio desde Git. Asegúrate de seguir estos pasos para configurar correctamente el entorno y ejecutar la aplicación utilizando `npm start`.

### Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org): Descarga e instala Node.js.
- [Git](https://git-scm.com): Descarga e instala Git.

### Clonar el repositorio

Abre una terminal y ejecuta el siguiente comando para clonar el repositorio:

```shell
git clone https://gitlab.com/CAOBA-Central/productos-caoba/datalab/analitica-como-servicio/frontend-release2.git
```

### Instalación de Angular 13

Angular utiliza el administrador de paquetes npm para gestionar las dependencias. Asegúrate de tener Node.js instalado antes de continuar.

Abre una terminal en la ubicación del repositorio clonado y ejecuta el siguiente comando para instalar las dependencias:

```shell
npm install
```

```shell
sudo npm install --force
```

para MAC en algunos casos.

Este comando leerá el archivo `package.json` y descargará todas las dependencias necesarias para el proyecto.

Verifica la versión de Node.js ejecutando el siguiente comando:

   ```shell
   node --version
   ```

   Asegúrate de tener una versión igual o superior a la versión recomendada de Angular 13.

Verifica que npm esté instalado correctamente ejecutando el siguiente comando:

   ```shell
   npm --version
   ```

# Instalación de Angular 13

A continuación se detallan los pasos para instalar Angular 13 en tu entorno de desarrollo.

## Pasos para instalar Angular 13

1. Abre una terminal o línea de comandos en tu sistema.


2. Instala Angular CLI (Command Line Interface), que es una herramienta de línea de comandos utilizada para crear y administrar proyectos de Angular. Ejecuta el siguiente comando:

   ```shell
   npm install -g @angular/cli@13
   ```

   Este comando instalará Angular CLI de forma global en tu sistema.

3. Verifica la instalación de Angular CLI ejecutando el siguiente comando:

   ```shell
   ng version
   ```

   Deberías ver la versión de Angular CLI instalada, que coincide con la versión 13.

¡Felicitaciones! Has completado la instalación de Angular 13 en tu entorno de desarrollo. Ahora puedes comenzar a crear y ejecutar aplicaciones de Angular utilizando Angular CLI.

### Ejecutar la aplicación

Una vez finalizada la instalación de las dependencias, puedes ejecutar la aplicación utilizando el siguiente comando:

```shell
npm start
```

Este comando compilará el proyecto y ejecutará un servidor de desarrollo. Abre tu navegador y navega a `http://localhost:4200` para ver la aplicación en funcionamiento.

### Otros comandos útiles

A continuación se muestran algunos comandos útiles que puedes utilizar durante el desarrollo de la aplicación:

- `npm run build`: Compila la aplicación para producción en el directorio `dist/`.
- `npm test`: Ejecuta las pruebas unitarias.
- `npm run lint`: Ejecuta el linter para verificar el estilo del código.

### Problemas en MAC

algunas veces se puede presentar problemas en los MAC y el proceso debe ser diferente 

```shell
brew install node
brew update
brew update node
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
source ~/.profile
Sudo npm install -g jshint
NPM_CONFIG_PREFIX=~/.npm-global
Sudo npm install -g @angular/cli@13.0.0
```

##### referencias install on MAC

https://medium.com/@media_9518/how-to-completely-delete-uninstall-angular-angular-cli-globally-on-a-mac-fb7f18fcf460

https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

https://stackoverflow.com/questions/67665753/angular-12-data-path-must-not-have-additional-properties-styleext

## Crear un servicio en Angular

Para crear un servicio en Angular, puedes seguir los siguientes pasos:

1. Abre una terminal en la ubicación de tu proyecto de Angular.

2. Ejecuta el siguiente comando para generar un nuevo servicio:

   ```shell
   ng generate service nombre-del-servicio
   ```

   Reemplaza `nombre-del-servicio` con el nombre que desees darle a tu servicio.

3. Angular generará automáticamente un nuevo archivo de servicio en el directorio `src/app/nombre-del-servicio`. El archivo se llamará `nombre-del-servicio.service.ts`.

4. Abre el archivo `nombre-del-servicio.service.ts` y define tu lógica de servicio dentro de la clase generada. Puedes agregar propiedades y métodos según tus necesidades.

5. Si deseas que tu servicio esté disponible para toda la aplicación, debes proporcionarlo en el módulo raíz (`app.module.ts`). Importa el servicio y agrégalo al arreglo `providers` del módulo.

   ```typescript
   import { NgModule } from '@angular/core';
   import { NombreDelServicioService } from './nombre-del-servicio.service';

   @NgModule({
     providers: [NombreDelServicioService]
   })
   export class AppModule { }
   ```

¡Listo! Has creado un servicio en Angular.

## Crear un componente en Angular

Los componentes son elementos fundamentales en Angular. A continuación, se muestra cómo crear un componente:

1. Abre una terminal en la ubicación de tu proyecto de Angular.

2. Ejecuta el siguiente comando para generar un nuevo componente:

   ```shell
   ng generate component nombre-del-componente
   ```

   Reemplaza `nombre-del-componente` con el nombre que desees darle a tu componente.

3. Angular generará automáticamente un nuevo directorio para el componente en `src/app/nombre-del-componente`. Los archivos del componente se crearán dentro de este directorio.

4. El componente recién generado incluirá un archivo TypeScript (`nombre-del-componente.component.ts`), un archivo de plantilla HTML (`nombre-del-componente.component.html`), un archivo de estilos CSS (`nombre-del-componente.component.css`), y un archivo de pruebas unitarias (`nombre-del-componente.component.spec.ts`).

5. Puedes personalizar la lógica, el diseño y los estilos del componente editando los archivos generados según tus necesidades.

6. Para utilizar el componente en tu aplicación, debes agregarlo a un módulo. Si deseas agregarlo al módulo raíz (`app.module.ts`), importa el componente y agrega su nombre al arreglo `declarations` del módulo.

   ```typescript
   import { NgModule } from '@angular/core';
   import { NombreDelComponenteComponent } from './nombre-del-componente/nombre-del-componente.component';

   @NgModule({
     declarations: [NombreDelComponenteComponent]
   })
   export class AppModule { }
   ```

¡Enhorabuena! Has creado un componente en Angular. Ahora puedes utilizarlo en tus vistas y aprovechar su funcionalidad.