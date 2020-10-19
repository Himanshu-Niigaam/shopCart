import { Component, OnInit, Input } from "@angular/core";
import { SCartService } from "../../../../../core/services/s-cart.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-listing",
  templateUrl: "./product-listing.component.html",
  styleUrls: ["./product-listing.component.scss"],
})
export class ProductListingComponent implements OnInit {
  results: any;
  searchResults: any;
  searchArrLength: any;
  prodArrLength: any;
  prodId: any;
  subscription: Subscription;
  @Input() inputFns;
  @Input() filters;

  constructor(
    private cartservice: SCartService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.subscription = cartservice.getResults$().subscribe((resultList) => {
      this.searchResults = resultList;
      this.searchArrLength = resultList.length;
    });
  }

  ngOnInit() {
    this.productListing();
  }

  // Add product to cart function
  addToCart(product) {
    this.cartservice.addToCart(product);
  }

  // Get product data from api
  productListing() {
    this.spinner.show();
    this.cartservice.getProducts().subscribe((resData: any) => {
      this.spinner.hide();
      this.results = resData;
      this.prodArrLength = resData.length;
    });
  }

  removeChipFilter = (filter) => {
    this.filters.removeChipFilter(filter);
  };

  // Destroy subscription to avoid memory leak
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
