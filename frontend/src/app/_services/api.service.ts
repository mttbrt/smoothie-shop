import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Order } from "../_models/order.model";
import { SmoothieUpdate } from "../_models/smoothie-update.model";
import { AuthenticationService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  constructor(private router: Router, private http: HttpClient, private authService: AuthenticationService) {}

  getSmoothies() {
    if (!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    const userRoles: string[] = this.authService.getRoles();
    if (['USER', 'OWNER'].some(e => userRoles.indexOf(e) >= 0))
      return this.http.get<any>(`${environment.apiUrl}/smoothies`, { withCredentials: true });
    return null;
  }

  getSmoothieById(id: number) {
    if (!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    const userRoles: string[] = this.authService.getRoles();
    if (['USER', 'OWNER'].some(e => userRoles.indexOf(e) >= 0))
      return this.http.get<any>(`${environment.apiUrl}/smoothies/${id}`, { withCredentials: true });
    return null;
  }

  getSmoothieNutritionalValues(id: number) {
    if (!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    const userRoles: string[] = this.authService.getRoles();
    if (['USER', 'OWNER'].some(e => userRoles.indexOf(e) >= 0))
      return this.http.get<any>(`${environment.apiUrl}/smoothie-nutrients/${id}`, { withCredentials: true });
    return null;
  }

  deleteSmoothieById(id: number) {
    if (!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    const userRoles: string[] = this.authService.getRoles();
    if (['OWNER'].some(e => userRoles.indexOf(e) >= 0))
      return this.http.delete<any>(`${environment.apiUrl}/smoothies/${id}`, { withCredentials: true });
    return null;
  }

  updateSmoothieById(id: number, data: SmoothieUpdate) {
    if (!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    const userRoles: string[] = this.authService.getRoles();
    if (['OWNER'].some(e => userRoles.indexOf(e) >= 0))
      return this.http.put<any>(`${environment.apiUrl}/smoothies/${id}`, data, { withCredentials: true });
    return null;
  }

  createOrder(data: Order) {
    if (!this.authService.isLoggedIn())
      this.router.navigate(['/login']);
    
    const userRoles: string[] = this.authService.getRoles();
    if (['USER'].some(e => userRoles.indexOf(e) >= 0))
      return this.http.post<any>(`${environment.apiUrl}/orders`, data, { withCredentials: true });
    return null;
  }
}