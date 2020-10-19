import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SCartService } from "../../../core/services/s-cart.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Subject, throwError, interval } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  username: any;
  fullname: any;
  isDropdownOpen = false;
  public searchTerm = new Subject<string>();
  public errorMessage: any;

  constructor(
    private router: Router,
    private cartservice: SCartService,
    private spinnerservice: NgxSpinnerService
  ) {}

  // Behavioutsubject for add to cart to increase count
  items$ = this.cartservice.items$;

  ngOnInit() {
    this.search();
    this.username = JSON.parse(localStorage.getItem("user_detail"));
    this.fullname = this.username[0].fullName;
  }

  // Toggle when click on user account
  toggleDrop = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
  };

  // Close toggle when click on outside
  closeDrop = () => {
    this.isDropdownOpen = false;
  };

  // Formgroup and Formcontrol name define here
  public productSearch = new FormGroup({
    title: new FormControl("", Validators.required),
  });

  // This fuction is to subscribe service and get result by searchterm using rxjs operators
  public search() {
    this.searchTerm
      .pipe(
        map((e: any) => {
          return e.target.value;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term) => {
          this.spinnerservice.show();
          return this.cartservice.searchProductsByName(term);
        }),
        catchError((e) => {
          console.log(e);
          this.spinnerservice.hide();
          this.errorMessage = e.message;
          return throwError(e);
        })
      )
      .subscribe((resData) => {
        this.spinnerservice.hide();
      });
  }

  // Logout section starts from here
  logout() {
    localStorage.removeItem("user_detail");
    localStorage.removeItem("products");
    this.router.navigate(["/login"]);
  }
}
