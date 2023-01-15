import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/_services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn() && request.url.startsWith(environment.apiUrl)) {
            const cookie = this.authService.getXSRFToken();
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${this.authService.getJWT()}`,
                    'X-XSRF-TOKEN': cookie ? cookie : ''
                }
            });
        }

        return next.handle(request);
    }
}