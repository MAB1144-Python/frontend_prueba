import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";

// component que son de la estructura nuestra
import { LoginComponent } from "app/pages/login/login.component";
import { RegisterComponent } from "app/pages/register/register.component";
import { AlertErrorComponent } from "app/page-private/alert-error/alert-error.component";
import { MenuModelosComponent } from "app/page-private/menu-modelos/menu-modelos.component";
import { HateSpeechComponent } from "app/page-private/hate-speech/hate-speech.component";
import { ImagepredictComponent } from "app/page-private/imagepredict/imagepredict.component";
import { CreditCardComponent } from "app/page-private/credit-card/credit-card.component";
import { GeographicBankingComponent } from "app/page-private/geographic-banking/geographic-banking.component";
import { SentimentAComponent } from "app/page-private/sentiment-a/sentiment-a.component";

import { ReidentificacionVehiculosComponent } from "app/page-private/reidentificacion-vehiculos/reidentificacion-vehiculos.component";
import { FakeNewsComponent } from "app/page-private/fake-news/fake-news.component";
import { ClinicalTaxonomyComponent } from "app/page-private/clinical-taxonomy/clinical-taxonomy.component";
import { SidebarComponent } from "app/sidebar/sidebar.component";
import { ApneaComponent } from "app/page-private/apnea/apnea.component";
import { ScoringCreditComponent } from "app/page-private/scoring-credit/scoring-credit.component";
import { AlertAuthenticatorComponent } from "app/page-private/alert-authenticator/alert-authenticator.component";
import { IdentificacionEtiquetasVehiculosComponent } from "app/page-private/identificacion-etiquetas-vehiculos/identificacion-etiquetas-vehiculos.component";
// para proteger
import { Guardian1Guard } from "app/core/guardians/guardian1.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "table", component: TableComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  // propios
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "alert-error", component: AlertErrorComponent },
  { path: "user", component: UserComponent, canActivate: [Guardian1Guard] },
  {
    path: "menu",
    component: MenuModelosComponent,
  },
  {
    path: "hate-speech",
    component: HateSpeechComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "imagepredict",
    component: ImagepredictComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "credit-card",
    component: CreditCardComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "reidentificacion-vehiculos",
    component: ReidentificacionVehiculosComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "fake-news",
    component: FakeNewsComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "clinical_taxonomy",
    component: ClinicalTaxonomyComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "apnea",
    component: ApneaComponent,
    canActivate: [Guardian1Guard],
  },

  {
    path: "geographic_banking",
    component: GeographicBankingComponent,
    canActivate: [Guardian1Guard],
  },

  {
    path: "scoring-credit",
    component: ScoringCreditComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "error-authenticator",
    component: AlertAuthenticatorComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "sentiment-a",
    component: SentimentAComponent,
    canActivate: [Guardian1Guard],
  },
  {
    path: "identificacion-vehicular",
    component: IdentificacionEtiquetasVehiculosComponent,
    canActivate: [Guardian1Guard]
  }
];
