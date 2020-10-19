import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-filter-list",
  templateUrl: "./filter-list.component.html",
  styleUrls: ["./filter-list.component.scss"],
})
export class FilterListComponent implements OnInit {
  @Input() item;
  @Input() inputFns;

  checked: boolean = false;

  constructor() {}

  ngOnInit() {}

  // this function call to get checked value from checkbox
  check() {
    this.checked = !this.checked;
    this.inputFns.onClickHandler(this.item.title, this.checked);
  }

  // get checked value true or false from checkbox
  hasId() {
    if (this.inputFns.arr.indexOf(this.item.title) >= 0) {
      this.checked = true;
      return true;
    } else {
      this.checked = false;
      return false;
    }
  }
}
