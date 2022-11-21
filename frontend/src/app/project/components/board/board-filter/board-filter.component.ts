import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { JUser } from '@trungk18/interface/user';
import {Store} from '@ngrx/store';
import * as filterAction from '../../../state/actions/filter.action';
import * as filterSelector from '../../../state/selectors/filter.selector';
import * as projectSelector from '../../../state/selectors/project.selector';
import {Observable} from 'rxjs';

@Component({
  selector: 'board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
  searchControl: FormControl = new FormControl('');
  userIds: string[];

  users$: Observable<any>;
  onlyMyIssue$: Observable<any>;
  ignoreResolve$: Observable<any>;
  any$: Observable<any>;
  constructor(
    private store: Store
  ) {
    this.userIds = [];
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(100), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((term) => {
        this.store.dispatch(filterAction.updateSearchTerm({term}));
      });

    this.users$ = this.store.select(projectSelector.user$);
    this.onlyMyIssue$ = this.store.select(filterSelector.onlyMyIssue$);
    this.ignoreResolve$ = this.store.select(filterSelector.ignoreResolve$);
    this.any$ = this.store.select(filterSelector.any$);
    this.store.select(filterSelector.userIds$).pipe(untilDestroyed(this)).subscribe((userIds) => {
      this.userIds = userIds;
    });
  }

  isUserSelected(user: JUser) {
    return this.userIds.includes(user.id);
  }

  ignoreResolvedChanged() {
    this.store.dispatch(filterAction.toggleIgnoreResolve());
  }

  onlyMyIssueChanged() {
    this.store.dispatch(filterAction.toggleOnlyMyIssue());
  }

  userChanged(user: JUser) {
    this.store.dispatch(filterAction.toggleUserIDSuccess({userId: user.id}));
  }

  resetAll() {
    this.searchControl.setValue('');
  }
}
