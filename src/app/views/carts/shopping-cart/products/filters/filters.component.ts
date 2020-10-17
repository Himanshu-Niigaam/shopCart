import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs";
import { SCartService } from "../../../../../core/services/s-cart.service";
import { FilterPipe } from '../../pipes/filter.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterTypeComponent } from '../filters/filter-type/filter-type.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() inputFns;
  @Input() content;

  @ViewChild("mul1", { static: false })
  child1: FilterTypeComponent;
  @ViewChild("mul2", { static: false })
  child2: FilterTypeComponent;
  @ViewChild("mul3", { static: false })
  child3: FilterTypeComponent;
  clearAllText: Observable<any>;


  // @ViewChild("search", { static: false }) _el: ElementRef;
  // results: any;
  // name: string;
  // searchText: string = "";
  // selected_count: number = 0;
  // selected_games: any;
  // search = false;
  // showMore = false;
  // title: any;

  constructor(
    private cartservice: SCartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  clearAll = (clear) => {
    this.child1.clearAll();
    this.child2.clearAll();
    this.child3.clearAll();
  };

  ngOnInit() {
    // this.clearAllText = this.cartservice.clearAll.pipe();

    // this.fetchSuppliers();
    // this.route.queryParams
    //   .subscribe(params => {
    //   }
    // );
    // this.title = this.route.snapshot.paramMap.get('title');
    // this.getProductFilters();
  }

  // fetchData() {
  //   this.cs.getSearchResult(this.title).subscribe((res) => {
  //   })
  // }

  // fetchSuppliers = () => {
  //   this.router.navigate(["/sCart"], {
  //     queryParams: { page: JSON.stringify((<any>window).totalQueryArrString) },
  //     queryParamsHandling: "merge",
  //   });
  // };

  // onSearch = () => {
  //   this.search = true;
  //   setTimeout(() => {
  //     this._el.nativeElement.focus();
  //   }, 0);
  // };

  // isSelected = false;
  // checkedCategoryList: any;
  // Getting Selected filter and Count

  // getSelected(title) {
  //   this.selected_games = this.results.filter(s => {
  //     console.log(s);
  //     return s.selected;
  //   });
  //   this.selected_count = this.selected_games.length;
  //   this.isSelected = true;
  //   this.checkedCategoryList = [];
  //   for (var i = 0; i < this.results.length; i++) {
  //     if(this.results[i].values.title)
  //     this.checkedCategoryList.push(this.results[i]);
  //   }
  //   this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
  //   console.log(this.checkedCategoryList);

  //   return this.cs.getProductsBySearch(title).subscribe((res) => {
  //     console.log(res);
  //   })
  // }

  // Clearing All Selections
  // clearSelection() {
  //   this.searchText = "";
  //   this.results = this.results.filter(g => {
  //     g.selected = false;
  //     return true;
  //   });
  //   // this.getSelected();
  // }

  // Remove filter
  // removeFilter(id: number) {
  //   this.searchText = "";
  //   this.results = this.results.filter(g => {
  //     if (g.id == id)
  //       g.selected = false;

  //     return true;
  //   });
  //   // this.getSelected();
  // }

  // //Clear term types by user
  // clearFilter() {
  //   this.searchText = "";
  //   this.search = false;
  // }
  // new: any;
  // getProductFilters() {
  //   this.new = [];
  //   this.cs.getFilters().subscribe((resdata) => {
  //     this.results = resdata;
  //     // this.results.forEach(element => {
  //     //   element.push()
  //     // });
  //   })
  // }


  
}
