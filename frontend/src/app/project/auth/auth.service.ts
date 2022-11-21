import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JUser } from '@trungk18/interface/user';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string;
  constructor(private _http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  login({ email = '', password = '' }: LoginPayload) {
    return this._http
      .post<JUser>(`${this.baseUrl}/auth`, {
        email,
        password
      });
  }
}

export class LoginPayload {
  email: string;
  password: string;
  constructor() {
    this.email = 'trungk18@gmail.com';
    this.password = `${new Date().getTime()}`;
  }
}
