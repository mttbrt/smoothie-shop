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
    private STORAGE_KEY: string = "token";
    private tokenSubject: BehaviorSubject<Token | null>;

    constructor(private router: Router, private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(this.STORAGE_KEY)!));
    }

    login(username: string, password: string) {
        const credentials: string = `${username}:${password}`;
        const header = new HttpHeaders({ Authorization: `Basic ${window.btoa(credentials)}` });
        
        return this.http.post<any>(`${environment.apiUrl}/login`, null, { headers: header, withCredentials: true })
            .pipe(map(result => {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(result));
                this.tokenSubject.next(result);
                return result;
            }));
    }

    logout() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.tokenSubject.next(null);
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.getJWT() ? true : false;
    }

    getRoles(): string[] {
        const token = this.isLoggedIn() ? this.getJWT() : null;
        if (token) {
            const auth = JSON.parse(window.atob(token.split('.')[1]))['AUTHORITIES'];
            const roles = [];
            for (const a of auth)
                roles.push(a.authority.substring(5)); // remove prefix "ROLE_"
            return roles;
        }
        return [];
    }

    getJWT() {
        return this.tokenSubject.value?.token;
    }

    getXSRFToken() {
        const value = `; ${document.cookie}`;
        const parts: string[] = value.split('; XSRF-TOKEN=');
        if (parts?.length == 2)
            return parts.pop()?.split(';').shift();
        return undefined;
    }
}