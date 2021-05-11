import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class RoutingGuard implements CanActivate {

    constructor(
        public router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(state.url)

        if (state.url === "/home/dashboard" || state.url === "/home/dashboard")
            return true;
        else
            return this.router.parseUrl('/home/dashboard');
    }

}