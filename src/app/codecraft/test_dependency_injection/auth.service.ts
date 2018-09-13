import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated(): boolean | string {
    return !!localStorage.getItem('token');
  }
  constructor() { }
}
