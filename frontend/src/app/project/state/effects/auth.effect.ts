import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as authAction from '../actions/auth.action';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '@trungk18/project/auth/auth.service';

@Injectable()
export class AuthEffect {
  constructor(private action$: Actions, private authService: AuthService) {
  }

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authAction.login),
      switchMap((action) => {
        return this.authService.login({email: action.email, password: action.password})
          .pipe(map((user) => {
            return authAction.loginSuccess({user});
          }));
      })
    );
  });
}
