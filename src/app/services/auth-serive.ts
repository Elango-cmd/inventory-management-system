import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loggedInKey = 'isLoggedIn';

  constructor() {}

  login(): void {
    localStorage.setItem(this.loggedInKey, 'true');
  }

  logout(): void {
    localStorage.removeItem(this.loggedInKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.loggedInKey) === 'true';
  }
}
