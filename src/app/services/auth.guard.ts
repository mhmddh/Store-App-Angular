import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private commonService: CommonService
    ) { }

    canActivate() {
        if (!this.commonService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }
    }

}