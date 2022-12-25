import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as projectAction from '../actions/project.action';
import * as projectSelector from '../selectors/project.selector';
import {catchError, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {ProjectService} from '@trungk18/project/state/project/project.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {JIssue} from '@trungk18/interface/issue';
import {arrayUpsert} from '@datorama/akita';

@Injectable()
export class ProjectEffect {
  constructor(
    private action$: Actions,
    private projectService: ProjectService,
    private store: Store
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

  updateProject$ = createEffect(() => {
    return this.action$.pipe(
      ofType(projectAction.updateProject),
      switchMap((action) => {
        return this.projectService.updateProject(action.formValue.id, action.formValue)
          .pipe(map((response: any) => {
            return projectAction.updateProjectSuccess({formValue: response});
          }));
      })
    );
  });

  createIssue$ = createEffect(() => {
    return this.action$.pipe(
      ofType(projectAction.createIssue),
      withLatestFrom(this.store.select(projectSelector.lastPositionInBacklog$)),
      switchMap(([action, lastIndex]) => {
        const payload = {
          ...action.newIssue,
          listPosition: lastIndex + 1
        };
        return this.projectService.createIssue(payload).pipe(
          map((res: JIssue) => {
            return projectAction.createIssueSuccess({newIssue: res});
          })
        );
      })
    );
  });

  updateIssue$ = createEffect(() => {
    return this.action$.pipe(
      ofType(projectAction.updateIssue),
      switchMap((action) => {
        return this.projectService.updateIssue(+action.newIssue.id, action.newIssue).pipe(map((res: JIssue) => {
          return projectAction.updateIssueSuccess({newIssue: res});
        }));
      })
    );
  });

  deleteIssue$ = createEffect(() => {
    return this.action$.pipe(
      ofType(projectAction.deleteIssue),
      switchMap((action) => {
        return this.projectService.deleteIssue(action.issueId).pipe(map(() => {
          return projectAction.deleteIssueSuccess({issueId: action.issueId});
        }));
      })
    );
  });

  updateIssueComment$ = createEffect(() => {
    return this.action$.pipe(
      ofType(projectAction.updateIssueComment),
      withLatestFrom(this.store.select(projectSelector.issues$)),
      switchMap(([action, issues]) => {
        let issue: JIssue = issues.find((x) => x.id === action.issueId);
        if (!issue) {
          return of(projectAction.updateIssueCommentFailure({}));
        }
        issue = {
          ...issue,
          comments: arrayUpsert(issue.comments ?? [], action.comment.id, action.comment)
        };
        return this.projectService.updateIssue(action.issueId, issue).pipe(
          map(() => {
            return projectAction.updateIssueCommentSuccess({
              issueId: action.issueId,
              comment: action.comment
            });
          })
        );
      })
    );
  });
}
