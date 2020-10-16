import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ShoppingCartRoutingModule } from "./shopping-cart-routing.module";
import { ProductListingComponent } from "./products/product-listing/product-listing.component";
import { ProductsComponent } from "./products/products.component";
import { FiltersComponent } from "./products/filters/filters.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { FilterShowMorePipe } from "./pipes/filter-show-more.pipe";
import { NgxSpinnerModule } from "ngx-spinner";
import { ProductDetailComponent } from "../product-detail/product-detail.component";

@NgModule({
  declarations: [
    ProductListingComponent,
    ProductsComponent,
    FiltersComponent,
    FilterPipe,
    FilterShowMorePipe,
    ProductDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingCartRoutingModule,
    NgxSpinnerModule,
  ],
})
export class ShoppingCartModule {}
