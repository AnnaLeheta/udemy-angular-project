import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
export interface AuthResponceData{
   kind: string;
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
   registered?: boolean;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    
    constructor(private http: HttpClient,
                private router: Router) { }
    signup(email: string, pass: string) {
        return this.http.post<AuthResponceData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGsO1JEE-78_in_F2g4W_DNpln7WzvN50',
            {
                email: email,
                password: pass,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap( resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }
    autoLogin(){
        const userData : {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: Date
         } = JSON.parse(localStorage.getItem('user'));
        if(!userData){
            return;
        }else{
            const loadedUser = new User(
                userData.email, 
                userData.id, 
                userData._token, 
                new Date(userData._tokenExpirationDate)
                );
                // console.log(userData);
                // console.log(loadedUser);
            if(loadedUser.token){
               this.user.next(loadedUser); 
               const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
               this.autoLogout(expirationDuration);
            }
        }
    }
    login(email: string, pass: string){
        return this.http.post<AuthResponceData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGsO1JEE-78_in_F2g4W_DNpln7WzvN50',
        {
            email: email,
            password: pass,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap( resData =>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }
    private handleAuthentication(email: string,userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn *1000);
            const user = new User(email,
                                userId,
                                token,
                                expirationDate);
            this.user.next(user);
            this.autoLogout(expiresIn *1000);
            //const JSON = require('circular-json');
            localStorage.setItem('user', JSON.stringify(user));
    }

    private handleError(error: HttpErrorResponse){
        let errorMessage = 'Some error occurred.'; 
            if(!error.error || !error.error.error){
                return throwError(errorMessage);
            }else{
                switch(error.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists.';
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                        errorMessage = 'Password sign-in is disabled for this project.';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                        break; 
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                        break;  
                    case 'INVALID_PASSWORD':
                        errorMessage = 'The password is invalid or the user does not have a password.';
                        break;  
                }
                return throwError(errorMessage);
            }
    }
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() =>{
            this.logout();
        }, expirationDuration);
    }
}