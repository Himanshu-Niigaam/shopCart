import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../shared/snackbar/snackbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  public show = false;
  public message: string = 'This is snackbar';
  public type: string = 'success'
  private snackbarSubscription: Subscription;

  constructor(
    private SnackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.snackbarSubscription = this.SnackbarService.snackbarState.subscribe(
      (state) => {
        if(state.type) {
          this.type = state.type;
        } else {
          this.type = 'success'
        }
        this.message = state.message;
        this.show = state.show;
        setTimeout(() => {
          this.show = false;
        }, 3000);
      }
    )
  }

  ngOnDestroy() {
    this.snackbarSubscription.unsubscribe();
  }

}
