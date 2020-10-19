import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ShoppingCartRoutingModule } from "./shopping-cart-routing.module";
import { ProductListingComponent } from "./products/product-listing/product-listing.component";
import { ProductsComponent } from "./products/products.component";
import { FiltersComponent } from "./products/filters/filters.component";
import { FilterPipe } from "./pipes/filter.pipe";
import { FilterShowMorePipe } from "./pipes/filter-show-more.pipe";
import { ProductDetailComponent } from "../product-detail/product-detail.component";
import { FilterTypeComponent } from './products/filters/filter-type/filter-type.component';
import { FilterListComponent } from './products/filters/filter-type/filter-list/filter-list.component';

@NgModule({
  declarations: [
    ProductListingComponent,
    ProductsComponent,
    FiltersComponent,
    FilterPipe,
    FilterShowMorePipe,
    ProductDetailComponent,
    FilterTypeComponent,
    FilterListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingCartRoutingModule,
  ],
})
export class ShoppingCartModule {}
