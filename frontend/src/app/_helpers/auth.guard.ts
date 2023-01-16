import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from 'src/app/_services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // true only if user roles (inside the JWT) correspond to those provided in the routes
        if (this.authService.isLoggedIn()) {
            const userRoles: string[] = this.authService.getRoles();
            const allowedRoles: string[] = route.data['allowedRoles'];
            if (allowedRoles && allowedRoles.some(e => userRoles.indexOf(e) >= 0))
                return true;
        }
        
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}