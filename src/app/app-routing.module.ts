import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./views/authentication/login/login.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { AuthGuard } from "./core/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./views/carts/carts.module").then((m) => m.CartsModule),
      canActivate: [AuthGuard],
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
    redirectTo: "",
    pathMatch: "full",
  },

  { path: "**", redirectTo: "/pagenotfound" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
