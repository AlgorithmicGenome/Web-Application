import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Stlouisfed } from '../models/stlouisfed.model';
import { StlouisfedService } from '../services/stlouisfed.service';

@Component({
  selector: 'app-stlouisfed',
  templateUrl: './stlouisfed.component.html',
  styleUrls: ['./stlouisfed.component.css'],
})
export class StlouisfedComponent {
  stlouisfed: Stlouisfed[] = [];
  private stlouisfedSub: Subscription;

  constructor(private stlouisfedService: StlouisfedService) {
    this.stlouisfedSub = new Subscription();
  }

  ngOnInit() {
    this.stlouisfedService.getJoke();
    this.stlouisfedSub = this.stlouisfedService
      .getUpdatedstlouisfed()
      .subscribe((stlouisfed: any) => {
        this.stlouisfed = stlouisfed;
      });
  }
}
