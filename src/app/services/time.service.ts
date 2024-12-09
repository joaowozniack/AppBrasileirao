import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/Response';
import { TimeListar } from '../models/Time';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TimeService {
    ApiUrl = environment.UrlApi;

    constructor(private http : HttpClient) { }

    GetUsuarios(): Observable<Response<TimeListar[]>> {
        return this.http.get<Response<TimeListar[]>>(this.ApiUrl);
    }

}
