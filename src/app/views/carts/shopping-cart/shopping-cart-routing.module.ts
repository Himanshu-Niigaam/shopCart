import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { ProductListingComponent } from "./products/product-listing/product-listing.component";
import { ProductDetailComponent } from "../product-detail/product-detail.component";

const routes: Routes = [
  {
    path: "sCart",
    component: ProductsComponent,
    children: [
      {
        path: "product-listing",
        component: ProductListingComponent,
      },
    ],
  },

  {
    path: "product-detail/:id",
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
