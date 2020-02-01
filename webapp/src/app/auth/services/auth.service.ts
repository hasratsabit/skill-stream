import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url: string = 'http://localhost:8080'
    constructor(
        private http: HttpClient
    ) { }

    register(user: any): Observable<any> {
        return this.http.post(`${this.url}/api/v1/user`, user);
    }
}
