import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environments';
import { CkeckTokenResponse } from '../interfaces/checkToken.interface';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { RegisterResponse } from '../interfaces/registerResponse.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly baseUrl:string = environment.baseUrl;
    private http = inject(HttpClient)

    private _currentUser = signal<User|null>(null);
    private _authStatus  = signal<AuthStatus>(AuthStatus.checking);

    public currentUser = computed<User|null>(() => this._currentUser());
    public authStatus  = computed<AuthStatus>(() => this._authStatus());

    constructor() {
        this.checkAuthStatus().subscribe();
    }

    login(email:string, password:string):Observable<boolean>{

        const url = this._getUrl('/auth/login');
        const body = { email, password };
        
        return this.http.post<LoginResponse>(url, body)
                    .pipe(
                        map(({token, user}) => this._setUserToken(user, token)),
                        catchError((err:any) => throwError(() => err.error.message))
                    );
    }

    checkAuthStatus = ():Observable<boolean> => {

        const url = this._getUrl('/auth/check-token');
        const token = localStorage.getItem('token');

        if( !token ){
            this._removeUserAndAuthenticated();
            return of(false)
        };

        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.http.get<CkeckTokenResponse>(url, {headers})
                    .pipe(
                        map(({token, user}) => this._setUserToken(user, token)),
                        catchError(_ => {
                            this._authStatus.set(AuthStatus.notAuthenticated);
                            return of(false)
                        })
                    );
    }

    logout = () => {
        localStorage.removeItem('token');
        this._removeUserAndAuthenticated();
    }

    register = (email:string, password:string, name:string) => {
        const url = this._getUrl('/auth/register');
        const body = {email, password, name};

        return this.http.post<RegisterResponse>(url, body)
                    .pipe(
                        map(({token, user}) => this._setUserToken(user, token)),
                        catchError((err:any) => throwError(() => err.error.message))
                    )

    }

    private _getUrl = (endpoint:string) => `${this.baseUrl}${endpoint}`;

    private _setUserToken = (user:User, token:string):boolean => {
        this._currentUser.set( user );
        this._authStatus.set( AuthStatus.authenticated );
        localStorage.setItem('token', token);
        return true;
    }    

    private _removeUserAndAuthenticated = () => {
        this._currentUser.set(null);
        this._authStatus.set(AuthStatus.notAuthenticated);
    }

}
