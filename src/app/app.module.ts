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
import { HateSpeechComponent } from './page-private/hate-speech/hate-speech.component';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MenuModelosComponent } from './page-private/menu-modelos/menu-modelos.component';
import { ImagepredictComponent } from './page-private/imagepredict/imagepredict.component';
import { ImageCropperModule } from "ngx-image-cropper";
import { ReidentificacionVehiculosComponent } from './page-private/reidentificacion-vehiculos/reidentificacion-vehiculos.component';
import { FakeNewsComponent } from './page-private/fake-news/fake-news.component';
import { ClinicalTaxonomyComponent } from './page-private/clinical-taxonomy/clinical-taxonomy.component';
import { ApneaComponent } from './page-private/apnea/apnea.component';
import { GeographicBankingComponent } from "./page-private/geographic-banking/geographic-banking.component";
import { ScoringCreditComponent } from './page-private/scoring-credit/scoring-credit.component';
import { AlertAuthenticatorComponent } from './page-private/alert-authenticator/alert-authenticator.component';
import { AlertErrorComponent } from './page-private/alert-error/alert-error.component';
import { SentimentAComponent } from './page-private/sentiment-a/sentiment-a.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    HateSpeechComponent,
    MenuModelosComponent,
    ImagepredictComponent,
    GeographicBankingComponent,
    ReidentificacionVehiculosComponent,
    FakeNewsComponent,
    ClinicalTaxonomyComponent,
    ApneaComponent,
    ScoringCreditComponent,
    AlertAuthenticatorComponent,
    AlertErrorComponent,
    SentimentAComponent
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
