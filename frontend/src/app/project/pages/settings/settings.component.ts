import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@trungk18/project/config/const';
import { JProject, ProjectCategory } from '@trungk18/interface/project';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';
import {Store} from '@ngrx/store';
import * as projectSelector from '../../state/selectors/project.selector';
import * as projectAction from '../../state/actions/project.action';
@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@UntilDestroy()
export class SettingsComponent implements OnInit {
  project: JProject;
  projectForm: FormGroup;
  categories: ProjectCategory[];
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Settings'];
  }

  constructor(
    private _notification: NzNotificationService,
    private _fb: FormBuilder,
    private _router: Router,
    private store: Store
  ) {
    this.categories = [
      ProjectCategory.BUSINESS,
      ProjectCategory.MARKETING,
      ProjectCategory.SOFTWARE
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.store.select(projectSelector.all$).pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
      this.updateForm(project);
    });
  }

  initForm() {
    this.projectForm = this._fb.group({
      id: this.project?.id,
      name: ['', NoWhitespaceValidator()],
      url: [''],
      description: [''],
      category: [ProjectCategory.SOFTWARE]
    });
  }

  updateForm(project: JProject) {
    this.projectForm.patchValue({
      name: project.name,
      url: project.url,
      description: project.description,
      category: project.category,
      id: project.id
    });
  }

  submitForm() {
    const formValue: Partial<JProject> = this.projectForm.getRawValue();
    this.store.dispatch(projectAction.updateProject({formValue}));
    this._notification.create(
      'success',
      'Changes have been saved successfully.',
      ''
    );
  }

  cancel() {
    this._router.navigate(['/']);
  }
}
