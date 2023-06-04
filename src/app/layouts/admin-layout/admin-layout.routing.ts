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
import { RecaudoVehiculosComponent } from "app/page-private/recaudo-vehiculos/recaudo-vehiculos.component";
import { ConteoVehiculosComponent } from "app/page-private/conteo-vehiculos/conteo-vehiculos.component";
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
  { path: "recaudo_vehiculos", component: RecaudoVehiculosComponent},
  { path: "conteto_vehiculos", component: ConteoVehiculosComponent}
];
