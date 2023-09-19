import { Component } from "@angular/core";
import { AuthService } from "../core/services/auth.service";

@Component({
    selector: 'bk-header',
    template: `
    <div class="index-header-container m-0 lg:mt-10 lg:mb-0 lg:mx-0">
        <div class="header-wrapper-desktop py-8 px-0 rounded-[3px] flex justify-center
         lg:border lg:border-solid" style="border-color:rgba(255,255,255,.1);">
            <div class="header-content-desktop w-100 flex items-center flex-col lg:flex-row lg:items-stretch">
                <div class="header-content-desktop__tagline flex-1 text-[2rem] relative
                 lg:flex lg:justify-center
                 xl:justify-start">
                    <span class="ml-0 inline-block h-[200px] 
                    after:content-[''] after:absolute after:w-[200px] after:h-[200px] 
                    after:bg-[url('/assets/images/tagline-full.png')] after:bg-no-repeat after:bg-contain
                    after:translate-x-[-50%]

                    lg:m-0 lg:h-[unset] lg:after:w-[200px] lg:after:h-[200px] lg:after:bg-[url('/assets/images/tagline-full.png')] lg:after:translate-y-[-10%]
                    
                    xl:ml-[15%] xl:after:w-[280px] xl:after:h-[280px] xl:after:bg-[url('/assets/images/tagline.png')] 
                    xl:after:top-[-83px] xl:after:right-[4%] xl:after:translate-y-[4%]
                    xl:after:translate-x-[unset]
                    ">
                        <span class="hidden xl:block">We promote</span>
                    </span>
                </div>

                <div class="header-content-desktop__description description flex-1 text-center">
                    <p class="py-0 px-4 my-4 leading-[1.8rem] text-white/[.95] lg:m-0 lg:p-0 lg:pr-6 lg:mb-6">
                        Beatkhor is a community based platform to discover, publish and download free beats. Start browsing or upload your beat right now!
                    </p>
                    <div class="header-content-desktop__actions p-6 pb-0 lg:p-0 lg:pt-2">
                        <a class="link" mat-flat-button routerLink="browse">Browse Tracks</a>
                        <a class="link" mat-raised-button target="_blank" color="primary" href="https://t.me/beatkhor">
                            <mat-icon class="h-[10px] text-[1.3rem]">link</mat-icon>
                            <span>Telegram</span>
                        </a>
                        <!-- <a *ngIf="!isLoggedIn" mat-raised-button color="primary" routerLink="/authentication">
                            <span>Get Started</span>
                        </a>
                        <a *ngIf="isLoggedIn" mat-raised-button disabled color="primary" routerLink="/upload" class="upload-button">
                            <span>Upload</span>
                        </a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent{
    constructor(private authService: AuthService) { }

    ngOnInit(): void {}

    get isLoggedIn() {
        return this.authService.isLoggedIn();
    } 
}