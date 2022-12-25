import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JProject } from '@trungk18/interface/project';
import { environment } from 'src/environments/environment';
import {ProjectState} from '@trungk18/project/state/reducers/project.reducer';
import {JIssue} from "@trungk18/interface/issue";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  getProject() {
    return this.http
      .get<JProject>(`${this.baseUrl}/project`);
  }

  updateProject(id: number, payload: ProjectState) {
    return this.http.put(`${this.baseUrl}/project/${id}`, payload);
  }

  createIssue(payload: JIssue) {
    return this.http.post(`${this.baseUrl}/issue`, payload);
  }
  updateIssue(id: number, payload: JIssue) {
    return this.http.put(`${this.baseUrl}/issue/${id}`, payload);
  }

  deleteIssue(id: number) {
    return this.http.delete(`${this.baseUrl}/issue/${id}`);
  }
}
