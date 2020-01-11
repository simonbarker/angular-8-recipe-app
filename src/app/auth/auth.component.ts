import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    // pass it in as a type and view child will find first of these in the DOM
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
    private alertCloseSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private  componentFactoryResolver: ComponentFactoryResolver
        ) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        this.isLoading = true;
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.showErrorAlert(errorMessage)
            this.isLoading = false;
        });

        form.reset();
    }

    onHandleClose() {
        this.error = null;
    }

    showErrorAlert(errorMessage: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const alertCompRef = hostViewContainerRef.createComponent(alertCmpFactory);
        alertCompRef.instance.message = errorMessage;
        this.alertCloseSubscription = alertCompRef.instance.closeAlert.subscribe(() => {
            this.alertCloseSubscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy() {
        if (this.alertCloseSubscription) {
            this.alertCloseSubscription.unsubscribe();
        }
    }
}
