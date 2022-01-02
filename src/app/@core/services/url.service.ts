import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UrlService {

    private lastUrl: string = '/';
    private currentUrl: string = '/';

    constructor(private router: Router) {
        this.currentUrl = this.router.url;
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = event.url;
                this.lastUrl = this.currentUrl;
            }
        });
    }

    public getLastUrl() {
        return this.lastUrl;
    }

    public setOrigin(page) {
        window.localStorage.setItem('origin', page);
    }

    public getOrigin() {
        return window.localStorage.getItem('origin');
    }
}
