import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";

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
      },

      {
        path: "sCart",
        loadChildren: () =>
          import("./shopping-cart/shopping-cart.module").then(
            (m) => m.ShoppingCartModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartsRoutingModule {}
