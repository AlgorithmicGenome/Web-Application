import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Stlouisfed } from '../models/stlouisfed.model';
@Injectable({ providedIn: 'root' })
export class StlouisfedService {
  private stlouisfed: Stlouisfed = {
    id: '',
    realtime_start: '',
    realtime_end: '',
    title: '',
    observation_start: '',
    observation_end: '',
    frequency: '',
    frequency_short: '',
    units: '',
    units_short: '',
    seasonal_adjustment: '',
    seasonal_adjustment_short: '',
    last_updated: '',
    popularity: 0,
    group_popularity: 0,
    notes: '',
  };
  private stlouisfedUpdated = new Subject<Stlouisfed>();

  constructor(private http: HttpClient) {}

  getJoke() {
    this.http
      .get<{ stlouisfed: Stlouisfed[] }>(
        'https://api.stlouisfed.org/fred/category/series?category_id=125&api_key=500ac387c99212afc1f1ea980c758903&file_type=json'
      )
      .subscribe((payLoad: any) => {
        if (!payLoad) {
          return;
        }
        if (payLoad.seriess) {
          this.stlouisfed = payLoad.seriess;
          this.stlouisfedUpdated.next(this.stlouisfed);
        } else {
          console.log('No stlouisfed found');
        }
      });
  }

  getUpdatedstlouisfed() {
    return this.stlouisfedUpdated.asObservable();
  }
}
