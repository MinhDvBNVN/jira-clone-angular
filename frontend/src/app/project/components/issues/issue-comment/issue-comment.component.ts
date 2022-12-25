import { Component, Input, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JComment } from '@trungk18/interface/comment';
import { JUser } from '@trungk18/interface/user';
import * as authSelector from '../../../state/selectors/auth.selector';
import * as projectAction from '../../../state/actions/project.action';
import {Store} from '@ngrx/store';
import {AuthState} from "@trungk18/project/state/reducers/auth.reducer";

@Component({
  selector: 'issue-comment',
  templateUrl: './issue-comment.component.html',
  styleUrls: ['./issue-comment.component.scss']
})
@UntilDestroy()
export class IssueCommentComponent implements OnInit {
  @Input() issueId: string;
  @Input() comment: JComment;
  @Input() createMode: boolean;
  @ViewChild('commentBoxRef') commentBoxRef: ElementRef;
  commentControl: FormControl;
  user: JUser;
  isEditing: boolean;

  constructor(private store: Store) {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (!this.createMode || this.isEditing) {
      return;
    }
    if (event.key === 'M') {
      this.commentBoxRef.nativeElement.focus();
      this.isEditing = true;
    }
  }

  ngOnInit(): void {
    this.commentControl = new FormControl('');
    this.store.select(authSelector.user$).pipe(untilDestroyed(this)).subscribe((user: AuthState) => {
      this.user = user.user;
      if (this.createMode) {
        this.comment = new JComment(this.issueId, this.user);
      }
    });
  }

  setCommentEdit(mode: boolean) {
    this.isEditing = mode;
  }

  addComment() {
    const now = new Date();
    this.store.dispatch(projectAction.updateIssueComment({
      issueId: this.issueId,
      comment: {
        ...this.comment,
        id: null,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        body: this.commentControl.value
      }
    }));
    this.cancelAddComment();
  }

  cancelAddComment() {
    this.commentControl.patchValue('');
    this.setCommentEdit(false);
  }
}
