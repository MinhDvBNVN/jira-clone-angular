import { Component, ViewEncapsulation, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { GoogleAnalyticsService } from './core/services/google-analytics.service';
import {Store} from '@ngrx/store';
import * as projectSelector from '../app/project/state/selectors/project.selector';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  isLoading$: Observable<any>;
  constructor(
    public router: Router,
    public store: Store,
    private _cdr: ChangeDetectorRef,
    private _googleAnalytics: GoogleAnalyticsService
  ) {
    if (environment.production) {
      this.handleGoogleAnalytics();
    }
    this.isLoading$ = this.store.select(projectSelector.isLoading);
  }

  handleGoogleAnalytics() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._googleAnalytics.sendPageView(event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit() {
    this._cdr.detectChanges();
  }
}
