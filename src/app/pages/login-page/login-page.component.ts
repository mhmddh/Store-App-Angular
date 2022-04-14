import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-index',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
    model: any = {};
    loginForm= new FormGroup ({});
    isCorrect = true;
    loginsubmitted = false;

    constructor(public authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        //Login form validations

        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required,Validators.email]),
            password: new FormControl('', [Validators.required,Validators.minLength(8),
            ],),

            // email: new FormControl('', [Validators.required]),
        });
    }

    // Login form actions
    get ff() {
        return this.loginForm.controls;
    }

    onLoginSubmit() {
        this.loginsubmitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        if (this.loginsubmitted) {
            this.authService.loginForm(this.loginForm.value).subscribe(res => {
                if (res.status === 'success') {
                    this.authService.setUser(res);
                }
                else{
                    this.isCorrect = false;
                } 
            }, error => {
                console.error(error);
            })


        }
    }



}
