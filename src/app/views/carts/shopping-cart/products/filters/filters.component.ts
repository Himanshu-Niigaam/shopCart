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

  clearAllText$: Observable<any>;

  constructor(
    private cartservice: SCartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.clearAllText$ = this.cartservice.clearAll.pipe();
  }

  clearAll = (clear) => {
    this.child1.clearAll();
    this.child2.clearAll();
    this.child3.clearAll();
  }
}