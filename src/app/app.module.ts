import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MenuModelosComponent } from './page-private/menu-modelos/menu-modelos.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { AlertAuthenticatorComponent } from './page-private/alert-authenticator/alert-authenticator.component';
import { AlertErrorComponent } from './page-private/alert-error/alert-error.component';
import { RecaudoVehiculosComponent } from './page-private/recaudo-vehiculos/recaudo-vehiculos.component';
import { ConteoVehiculosComponent } from './page-private/conteo-vehiculos/conteo-vehiculos.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    MenuModelosComponent,
    AlertAuthenticatorComponent,
    AlertErrorComponent,
    RecaudoVehiculosComponent,
    ConteoVehiculosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
