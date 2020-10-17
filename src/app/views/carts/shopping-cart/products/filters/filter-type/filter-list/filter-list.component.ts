import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {
  @Input() item;
  @Input() inputFns;

  checked: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  check() {
    this.checked = !this.checked;
    this.inputFns.onClickHandler(this.item.title, this.checked);
  }

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
