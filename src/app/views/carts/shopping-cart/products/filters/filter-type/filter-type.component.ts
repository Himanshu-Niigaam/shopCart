import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { SCartService } from "../../../../../../core/services/s-cart.service";

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrls: ['./filter-type.component.scss']
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
  filterList;
  resultArr;
  subscription;
  constructor(
    private cartservice: SCartService,
  ) { }

  ngOnInit(): void {
    this.initalizeFilters();
  }

  initalizeFilters = () => {
    if (this.heading === "BRAND")
      this.subscription = this.cartservice.brands.pipe().subscribe((ele) => {
        this.filterList = ele;
        console.log(this.filterList);
        this.resultArr = ele;
        return ele;
      });

    if (this.heading === "COLOUR")
      this.subscription = this.cartservice.colors.pipe().subscribe((ele) => {
        this.filterList = ele;
        console.log(this.filterList);

        this.resultArr = ele;
        return ele;
      });

    if (this.heading === "PRICE")
      this.subscription = this.cartservice.price.pipe().subscribe((ele) => {
        this.filterList = ele;
        console.log(this.filterList);

        this.resultArr = ele;
        return ele;
      });
  };

  onSearch = () => {
    this.search = true;
    this.expand = true;
    setTimeout(() => {
      this._el.nativeElement.focus();
    }, 0);
  };

  expandFn = () => {
    this.expand = !this.expand;
  };

  onKey = (event, resultArr) => {
    // this.resultArr = [];
    // for (let i = 0; i < resultArr.length; i++) {
    //   this.resultArr.push(resultArr[i]);
    // }

    // //select all
    // let flag = true;
    // for (let i = 0; i < this.resultArr.length; i++) {
    //   if (this.arr.indexOf(this.resultArr[i]["key"]) < 0) flag = false;
    // }
    // if (!flag) this.isSelectAll = false;
    // else if (flag && this.resultArr.length) this.isSelectAll = true;

    // if (event.target.value !== "") {
    //   this.cartservice.clearAll.next(true);
    // }
  };

  clearSearch() {
    this.searchText = "";
    this.search = false;
    this.isSelectAll = false;
  }

  clearAll = () => {
    this.arr = [];
    this.isSelectAll = false;
    this.inputFns.inputFns.onClickHandler(this.heading, this.arr);
    this.clearSearch();
    this.cartservice.clearAll.next(false);
  }

  selectAll() {
    // this.clearCheckboxes();

    // if (this.isSelectAll) {
    //   for (let i = 0; i < this.resultArr.length; i++) {
    //     let index = this.arr.indexOf(this.resultArr[i]["key"]);
    //     if (index >= 0) {
    //       this.arr.splice(index, 1);
    //     }
    //   }
    //   this.isSelectAll = false;
    //   // this.fetchData();

    //   return false;
    // } else if (!this.isSelectAll) {
    //   for (let i = 0; i < this.resultArr.length; i++) {
    //     if (this.arr.indexOf(this.resultArr[i]["key"]) >= 0) continue;
    //     else this.arr.push(this.resultArr[i]["key"]);
    //   }
    //   this.isSelectAll = true;
    //   // this.fetchData();
    //   return false;
    // }
  }

  clear = () => {
    this.clearAll();
    // this.fetchData();
    // this.clearCheckboxes();
  };

  render = (i) => {
    if (i < 5) return true;
    return false;
  };

  // showMore = () => {
  //   this.dialog.open(ShowMoreFilterComponent, {
  //     width: "800px",
  //     height: "auto",
  //     data: { inputFns: this },
  //     scrollStrategy: new NoopScrollStrategy(),
  //   });
  // };


  onClickHandler(id, value) {
    console.log(id);
    console.log(value);

    // this.clearCheckboxes();

    if (value) {
      if (this.arr.indexOf(id) != -1) {
        return;
      } else {
        this.arr.push(id);
        this.onFilterTitle();
        console.log(this.arr);
      }
    } else if (!value) {
      if (this.arr.indexOf(id) != -1) {
        let index = this.arr.indexOf(id);
        this.arr.splice(index, 1);
      } else {
        return;
      }
    }

  }

  onFilterTitle() {
    let dataObjId = this.arr;
    this.cartservice._searchProductsByName(dataObjId).subscribe((res)=> {
      console.log(res);
    });
  }

}
