import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    error = '';

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
        private router: Router, private authService: AuthenticationService) {
        if (this.authService.isLoggedIn())
            this.router.navigate(['/smoothies']);
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get form() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid)
            return;

        this.error = '';
        this.loading = true;
        this.authService.login(this.form['username'].value, this.form['password'].value)
            .pipe(first())
            .subscribe({
                next: () => {
                    const nvaigateTo = this.route.snapshot.queryParams['returnUrl'] || '/smoothies';
                    this.router.navigate([ nvaigateTo ]);
                },
                error: error => {
                    this.error = error == 'OK' ? 'Login failed.' : error;
                    this.loading = false;
                }
            });
    }
}