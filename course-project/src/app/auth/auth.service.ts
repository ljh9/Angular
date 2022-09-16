import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}


@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private http: HttpClient) {}

    singup(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyClR4ER4yvjOS40QXzLvjieiByB-MLRFDs', 
            {
                email: email, 
                password: password, 
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred!';
            if(!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS': 
                    errorMessage = 'This email exists already';
            }
            return throwError(errorMessage);
        }));
    }
}