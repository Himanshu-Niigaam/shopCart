import { Component, OnInit } from "@angular/core";
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

  ngOnInit(): void {
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

  // Destroy subscriber
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
