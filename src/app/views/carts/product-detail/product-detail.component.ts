import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SCartService } from "../../../core/services/s-cart.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  uid: any;
  results: any;

  constructor(
    private route: ActivatedRoute,
    private cartservice: SCartService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // Get product unique id by using activatedRoute
    this.uid = this.route.snapshot.paramMap.get("id");
    this.getDataFromId();
  }

  // Get product detail data from api
  getDataFromId() {
    this.spinner.show();
    return this.cartservice.getDetail(this.uid).subscribe((res) => {
      this.spinner.hide();
      this.results = res;
    });
  }
}
