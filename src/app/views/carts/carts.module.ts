import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header/header.component";
import { CartsRoutingModule } from "./carts-routing.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    CartsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CartsModule {}
