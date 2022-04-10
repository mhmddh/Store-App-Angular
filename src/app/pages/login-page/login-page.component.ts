import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-index',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
    model: any = {};
    loginForm!: FormGroup;
    loginsubmitted = false;

    constructor(public commonService: CommonService, private router: Router) { }

    ngOnInit(): void {
        //Login form validations

        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),

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

            this.commonService.loginForm(this.loginForm.value).subscribe(res => {
                if (res.status === 'success') {
                    this.commonService.setUser(res);
                }
            }, error => {
                console.error(error);
            })


        }
    }



}
