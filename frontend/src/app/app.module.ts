import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { QuillModule } from 'ngx-quill';
import {StoreModule} from '@ngrx/store';
import {reducers} from './project/state';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffect} from '@trungk18/project/state/effects/auth.effect';
import {ProjectEffect} from '@trungk18/project/state/effects/project.effect';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NzSpinModule,
    NzIconModule.forRoot([]),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffect, ProjectEffect]),
    environment.production ? [] : AkitaNgDevtools,
    AkitaNgRouterStoreModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
