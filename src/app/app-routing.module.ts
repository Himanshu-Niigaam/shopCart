import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { AuthGuardService } from "./core/guards/auth-guard.service";
import { LoginComponent } from "./views/authentication/login/login.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./views/carts/carts.module").then((m) => m.CartsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "pagenotfound",
    component: PageNotFoundComponent,
  },

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "/pagenotfound" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
