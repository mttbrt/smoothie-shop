import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'src/app/_services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.authenticationService.tokenValue;
        if (token) {
            const userAuthorities: string[] = this.authenticationService.getRoles();
            const allowed_roles: string[] = route.data['allowed_roles'];
            if (allowed_roles && allowed_roles.some(e => userAuthorities.indexOf(e) >= 0)) {
                return true;
            }
        }
        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}