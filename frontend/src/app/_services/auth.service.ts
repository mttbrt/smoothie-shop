import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Token } from 'src/app/_models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private tokenSubject: BehaviorSubject<Token | null>;
    public token: Observable<Token | null>;

    constructor(private router: Router, private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!));
        this.token = this.tokenSubject.asObservable();
    }

    public get tokenValue() {
        return this.tokenSubject.value;
    }

    login(username: string, password: string) {
        const credentials: string = `${username}:${password}`;
        const header = new HttpHeaders({'Authorization': `Basic ${window.btoa(credentials)}`});
        
        return this.http.post<any>(`${environment.apiUrl}/login`, null, { headers: header, withCredentials: true })
            .pipe(map(result => {
                localStorage.setItem('token', JSON.stringify(result));
                this.tokenSubject.next(result);
                return result;
            }));
    }

    logout() {
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.tokenSubject.value != null;
    }

    getRoles(): string[] {
        if (this.tokenSubject.value) {
            const auth = JSON.parse(window.atob(this.tokenSubject.value.token.split('.')[1]))['AUTHORITIES'];
            const roles = [];
            for (const a of auth) {
                roles.push(a.authority.replace("ROLE_", ""));
            }
            return roles;
        }
        return [];
    }

    getCookie(name: string) {
        const value = `; ${document.cookie}`;
        const parts: string[] = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const res = parts?.pop()?.split(';').shift();
            return res ? res : '';
        }
        return '';
    }
}