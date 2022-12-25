import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueType, JIssue, IssueStatus, IssuePriority } from '@trungk18/interface/issue';
import { quillConfiguration } from '@trungk18/project/config/editor';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { JUser } from '@trungk18/interface/user';
import { tap } from 'rxjs/operators';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';
import { DateUtil } from '@trungk18/project/utils/date';
import {Store} from '@ngrx/store';
import * as projectSelector from '../../state/selectors/project.selector';
import * as projectAction from '../../state/actions/project.action';
@Component({
  selector: 'add-issue-modal',
  templateUrl: './add-issue-modal.component.html',
  styleUrls: ['./add-issue-modal.component.scss']
})
@UntilDestroy()
export class AddIssueModalComponent implements OnInit {
  reporterUsers$: Observable<JUser[]>;
  assignees$: Observable<JUser[]>;
  issueForm: FormGroup;
  editorOptions = quillConfiguration;

  get f() {
    return this.issueForm?.controls;
  }

  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.reporterUsers$ = this.store.select(projectSelector.user$).pipe(
      untilDestroyed(this),
      tap((users) => {
        const [user] = users;
        if (user) {
          this.f.reporterId.patchValue(user.id);
        }
      })
    );

    this.assignees$ = this.store.select(projectSelector.user$);
  }

  initForm() {
    this.issueForm = this._fb.group({
      type: [IssueType.TASK],
      priority: [IssuePriority.MEDIUM],
      title: ['', NoWhitespaceValidator()],
      description: [''],
      reporterId: [''],
      userIds: [[]]
    });
  }

  submitForm() {
    if (this.issueForm.invalid) {
      return;
    }
    const issue: JIssue = {
      ...this.issueForm.getRawValue(),
      status: IssueStatus.BACKLOG,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.store.dispatch(projectAction.createIssue({newIssue: issue}));
    this.closeModal();
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
    this._modalRef.close();
  }
}
