import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as projectAction from '../actions/project.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProjectService} from '@trungk18/project/state/project/project.service';
import {from, of} from "rxjs";

@Injectable()
export class ProjectEffect {
  constructor(
    private action$: Actions,
    private projectService: ProjectService
  ) {
  }

  getProject$ = createEffect(() => {
    return this.action$.pipe(
      ofType(projectAction.getProject),
      switchMap((action) => {
        return this.projectService.getProject().pipe(
          map((project) => {
            return projectAction.getProjectSuccess({project});
          }),
          catchError(() => of(projectAction.getProjectFailure('')))
        );
      })
    );
  });
}
