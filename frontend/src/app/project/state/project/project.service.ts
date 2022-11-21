import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JProject } from '@trungk18/interface/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl: string;

  constructor(private _http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getProject() {
    return this._http
      .get<JProject>(`${this.baseUrl}/project`);
  }
}
