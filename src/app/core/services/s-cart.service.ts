import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API } from "../../utils/api.constant";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { take, map } from "rxjs/operators";
import { retry, catchError } from "rxjs/operators";
import { Product } from "./../interface-type/types";

@Injectable({
  providedIn: "root",
})
export class SCartService {
  public searchResults: any;
  private searchTerm = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
    // Check if cart product exist in localstorage or not to manage the state after refresh
    let existingCartItems = JSON.parse(localStorage.getItem("products"));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }

  // Initialize behavioursubject for add to cart count
  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();

  addToCart(product: Product) {
    this.items$
      .pipe(
        take(1),
        map((products) => {
          products.push(product);
          localStorage.setItem("products", JSON.stringify(products));
        })
      )
      .subscribe();
  }

  // This service is for login to authenticate users
  login(username: string, password: string) {
    let headerOptions = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    });
    let requestOptions = { headers: headerOptions };
    return this.http
      .get<any>(
        API.LOGIN + "?username=" + username + "&password=" + password,
        requestOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  // This service is for to get product list from server
  getProducts() {
    let headerOptions = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    });
    let requestOptions = { headers: headerOptions };
    return this.http
      .get<any>(API.PRODUCTS, requestOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // This service is for to get detail for specific product with their unique id
  getDetail(id: any) {
    const headerOptions = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    });
    const requestOptions = { headers: headerOptions };
    return this.http
      .get(API.PRODUCTS + "?id=" + id, requestOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // This service is for to get data from server from searchbar
  getProductsBySearch(title: any) {
    let headerOptions = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    });
    let requestOptions = { headers: headerOptions };
    return this.http
      .get<any>(API.PRODUCTS + "?title=" + title)
      .pipe(retry(1), catchError(this.handleError));
  }

  // This service is for to get filter data from server
  getFilters() {
    let headerOptions = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    });
    let requestOptions = { headers: headerOptions };
    return this.http.get(API.FILTERS, requestOptions);
  }

  // getSearchResult(title: any): Observable<any> {
  //   return this.http
  //     .get(API.PRODUCTS + "?title=" + title)
  //     .pipe(retry(1), catchError(this.handleError));
  // }

  public getResults$() {
    return this.searchTerm.asObservable();
  }

  // This function is used to get search result data from api
  public searchProducts(term: string): Observable<any> {
    if (term == "") {
      return of(null);
    } else {
      return this.http.get<any>(API.PRODUCTS + "?title=" + term).pipe(
        map((response) => {
          console.log(response);
          this.searchTerm.next(response);
          return (this.searchResults = response["results"]);
        })
      );
    }
  }

  // This function is used to call search products by name
  public _searchProductsByName(term) {
    return this.searchProducts(term);
  }

  // For error handeling
  handleError(error) {
    console.log(error);
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}