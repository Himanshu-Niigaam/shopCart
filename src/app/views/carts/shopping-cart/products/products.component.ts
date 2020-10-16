import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { FiltersComponent } from "./filters/filters.component";
import { SCartService } from "../../../../core/services/s-cart.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  result: any;
  constructor(private cartservice: SCartService) {}

  ngOnInit(): void {
    // this.getProductFilters();
  }

  // getProductFilters() {
  //   this.cs.getFilters().subscribe((resdata) => {
  //     this.result = resdata;
  //     console.log(this.result.values);
  //     this.filterDataSeparate(this.result.values);
  //     console.log(this.result);
  //   })
  // }
}
