import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import { SCartService } from '../../../core/services/s-cart.service';
import { SnackbarService } from '../../../shared/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  result: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private cartservice: SCartService,
    private SnackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // This fuction perform login when user submit their credentials
  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.show();
    this.cartservice.login(this.f.username.value, this.f.password.value).
    pipe(
      tap(resData => console.log("users array", resData))    // users array [Object, Object, Object]
    ).subscribe(
      resData => {
        console.log(resData);
        this.spinner.hide();
        this.result = resData;
        let name = this.f.username.value;
        let pass = this.f.password.value;
        let objName = this.result.find(function (obj) { return obj.username === name });
        let objPassword = this.result.find(function (obj) { return obj.password === pass });
        if (objName && objPassword){
          this.SnackbarService.show('Congratulations ! You have successfully logged in !')
          this.router.navigate(["sCart"]);
          localStorage.setItem('user_detail', JSON.stringify(resData));
        } else {
          this.SnackbarService.show('Please enter valid credentials !')
        }
      },
      errRes => {
        this.spinner.hide();
        this.SnackbarService.show('Please enter valid credentials')
        console.log(errRes);
      } 
    );
  }
}
