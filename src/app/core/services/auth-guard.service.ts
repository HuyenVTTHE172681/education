import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.isUserLoggedIn();

        if (!isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

    private isUserLoggedIn(): boolean {
        return !!localStorage.getItem('token'); // Trả về true nếu tồn tại accessToken
    }
}
