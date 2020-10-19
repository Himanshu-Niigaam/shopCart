import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { AuthGuard } from "./../../core/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HeaderComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./shopping-cart/shopping-cart.module").then(
            (m) => m.ShoppingCartModule
          ),
          canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartsRoutingModule {}
