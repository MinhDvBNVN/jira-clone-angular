import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of, combineLatest } from 'rxjs';
import { catchError, debounceTime, filter, switchMap, take, map } from 'rxjs/operators';
import { ProjectState } from './state/project/project.store';
import * as projectSelector from '../project/state/selectors/project.selector';
import * as projectAction from '../project/state/actions/project.action';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.getFromStoreOrApi().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  getFromStoreOrApi(): Observable<ProjectState> {
    return combineLatest([this.store.select(projectSelector.all$), this.store.select(projectSelector.isLoading)]).pipe(
      map(([state, loading]) => {
        if (!loading) {
          this.store.dispatch(projectAction.getProject());
        }
        return state;
      }),
      filter((state) => !!state.id),
      take(1),
      catchError((error) => of(error))
    );
  }
}
