import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { SCartService } from "../../../core/services/s-cart.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  uid: any;
  results: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartservice: SCartService
  ) {}

  ngOnInit(): void {
    // Get product unique id by using activatedRoute
    this.uid = this.route.snapshot.paramMap.get("id");
    this.getDataFromId();
  }

  // Get product detail data from api
  getDataFromId() {
    return this.cartservice.getDetail(this.uid).subscribe((res) => {
      this.results = res;
    });
  }
}
