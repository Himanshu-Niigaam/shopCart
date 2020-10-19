import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { SCartService } from "../../../../../../core/services/s-cart.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-filter-type",
  templateUrl: "./filter-type.component.html",
  styleUrls: ["./filter-type.component.scss"],
})
export class FilterTypeComponent implements OnInit {
  @ViewChild("search", { static: false }) _el: ElementRef;
  @Input() inputFns;
  @Input() heading;
  search = false;
  searchText;
  arr = [];
  isSelectAll: boolean = false;
  expand = true;
  filterList: any;
  resultArr: any;
  subscription: any;

  constructor(
    private cartservice: SCartService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.initalizeFilters();
  }

  // get filter list from api using behavioursubject
  initalizeFilters = () => {
    if (this.heading === "BRAND")
      this.subscription = this.cartservice.brands.pipe().subscribe((ele) => {
        this.filterList = ele;
        this.resultArr = ele;
        return ele;
      });

    if (this.heading === "COLOUR")
      this.subscription = this.cartservice.colors.pipe().subscribe((ele) => {
        this.filterList = ele;
        this.resultArr = ele;
        return ele;
      });

    if (this.heading === "PRICE")
      this.subscription = this.cartservice.price.pipe().subscribe((ele) => {
        this.filterList = ele;
        this.resultArr = ele;
        return ele;
      });
  };

  // show in-built searchbar to click on this function
  onSearch() {
    this.search = true;
    this.expand = true;
    setTimeout(() => {
      this._el.nativeElement.focus();
    }, 0);
  }

  // to expand and collapse filter section
  expandFn = () => {
    this.expand = !this.expand;
  };

  // this function clear checkboxes individual filters
  clearSearch() {
    this.searchText = "";
    this.search = false;
    this.isSelectAll = false;
  }

  // this function clears all checkboxes
  clearAll = () => {
    this.arr = [];
    this.isSelectAll = false;
    this.inputFns.inputFns.onClickHandler(this.heading, this.arr);
    this.clearSearch();
    this.cartservice.clearAll.next(false);
  };

  // select all functionality for filters but needs to changes from backend api to work this functionality properly
  selectAll() {
    if (this.isSelectAll) {
      for (let i = 0; i < this.resultArr.length; i++) {
        let index = this.arr.indexOf(this.resultArr[i]["title"]);
        if (index >= 0) {
          this.arr.splice(index, 1);
        }
      }
      this.isSelectAll = false;

      return false;
    } else if (!this.isSelectAll) {
      for (let i = 0; i < this.resultArr.length; i++) {
        if (this.arr.indexOf(this.resultArr[i]["title"]) >= 0) continue;
        else this.arr.push(this.resultArr[i]["title"]);
      }
      this.isSelectAll = true;
      return false;
    }
  }

  render = (i) => {
    if (i < 5) return true;
    return false;
  };

  // this function shows filter tag when click on filter
  fetchData() {
    if (this.heading === "BRAND" || "COLOUR" || "PRICE") {
      this.inputFns.inputFns.onClickHandler(this.heading, this.arr);
    }
  }

  // this logic call when click on seperate filter to get checkbox value
  onClickHandler(id, value) {
    if (value) {
      if (this.arr.indexOf(id) != -1) {
        return;
      } else {
        this.arr.push(id);
        this.onFilterTitle();
      }
    } else if (!value) {
      if (this.arr.indexOf(id) != -1) {
        let index = this.arr.indexOf(id);
        this.arr.splice(index, 1);
      } else {
        return;
      }
    }
    this.fetchData();
  }

  // this api call to get filter result when click on checkbox
  onFilterTitle() {
    this.spinner.show();
    let dataObjId = this.arr;
    this.cartservice.searchProductsByName(dataObjId).subscribe((res) => {
      this.spinner.hide();
    });
  }
}
