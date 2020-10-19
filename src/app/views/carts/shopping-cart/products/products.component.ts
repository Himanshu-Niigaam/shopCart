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
  selectedArr = [];

  constructor(private cartservice: SCartService) {}

  ngOnInit() {
    this.getProductFilters();
  }

  // get filter list from api
  getProductFilters() {
    this.cartservice.getFilters().subscribe((resdata) => {
      this.result = resdata;
    });
  }

  // get filter heading from checkbox to show chip filter
  onClickHandler(id, value) {
    if (value.length > 0) {
      if (this.selectedArr.indexOf(id) != -1) {
        return;
      } else {
        this.selectedArr.push(id);
      }
    } else if (!value || value.length <= 0) {
      if (this.selectedArr.indexOf(id) != -1) {
        let index = this.selectedArr.indexOf(id);
        this.selectedArr.splice(index, 1);
      } else {
        return;
      }
    }
  }
}
