import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { tap } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { SCartService } from "../../../core/services/s-cart.service";
import { SnackbarService } from "../../../shared/snackbar/snackbar.service";
import { MESSAGES } from "../../../../app/utils/message-constant";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  result: any;
  valUser = MESSAGES.shoppingCart.VALID_USER;
  valPass = MESSAGES.shoppingCart.VALID_PASSWORD;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cartservice: SCartService,
    private SnackbarService: SnackbarService
  ) {
    if (localStorage.getItem("user_detail")) {
      this.router.navigate(["sCart"]);
    } else {
      this.router.navigate(["login"]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // This fuction perform login when user submit their credentials from api
  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.cartservice
      .login(this.f.username.value, this.f.password.value)
      .pipe(tap((resData) => console.log("users array", resData)))
      .subscribe(
        (resData) => {
          this.spinner.hide();
          this.result = resData;
          let name = this.f.username.value;
          let pass = this.f.password.value;
          let objName = this.result.find(function (obj) {
            return obj.username === name;
          });
          let objPassword = this.result.find(function (obj) {
            return obj.password === pass;
          });
          if (objName && objPassword) {
            this.router.navigate(["sCart"]);
            this.SnackbarService.show(MESSAGES.shoppingCart.SUCCESS);
            localStorage.setItem("user_detail", JSON.stringify(resData));
          } else {
            this.SnackbarService.show(MESSAGES.shoppingCart.FAILURE);
          }
        },
        (errRes) => {
          this.spinner.hide();
          this.SnackbarService.show(MESSAGES.shoppingCart.FAILURE);
        }
      );
  }
}
