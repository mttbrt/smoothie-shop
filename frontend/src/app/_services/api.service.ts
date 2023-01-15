import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { CartItem } from "../_models/cart-item.model";
import { Smoothie } from "../_models/smoothie.model";
import { AuthenticationService } from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  constructor(private router: Router, private http: HttpClient, private authService: AuthenticationService) {}

  getSmoothies() {
    const token = this.authService.tokenValue?.token;
    if (!token)
      this.router.navigate(['/login']);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    return this.http.get<any>(`${environment.apiUrl}/smoothies`, { headers: header, withCredentials: true });
  }

  getSmoothieNutritionalValues(id: number) {
    const token = this.authService.tokenValue?.token;
    if (!token)
      this.router.navigate(['/login']);
    const header = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    return this.http.get<any>(`${environment.apiUrl}/smoothie-nutrients/${id}`, { headers: header, withCredentials: true });
  }

  deleteSmoothieById(id: number) {
    const token = this.authService.tokenValue?.token;
    if (!token)
      this.router.navigate(['/login']);
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'X-XSRF-TOKEN': this.authService.getCookie('XSRF-TOKEN')
    });
    console.log(this.authService.getCookie('XSRF-TOKEN'));
    
    return this.http.delete<any>(`${environment.apiUrl}/smoothies/${id}`, { headers: header, withCredentials: true });
  }

  updateSmoothieById(id: number, data: {name: string, price: number}) {
    const token = this.authService.tokenValue?.token;
    if (!token)
      this.router.navigate(['/login']);
    const header = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'X-XSRF-TOKEN': this.authService.getCookie('XSRF-TOKEN')
    });
    
    return this.http.put<any>(`${environment.apiUrl}/smoothies/${id}`, data, { headers: header, withCredentials: true });
  }

}