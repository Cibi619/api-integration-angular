import { HttpClient } from '@angular/common/http';
import { InvokeFunctionExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Responses } from '../interfaces/response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl: string = "https://randomuser.me/api/";

  constructor(private http: HttpClient) { }

  // fetch all users
  getUsers(size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?results=${size}`).pipe(
      map(response => this.processResponse(response))
    );
  }

  // fetch single user
  getUser(uid: number = 1): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/?results=${uid}`).pipe(
      map(response => this.processResponse(response))
    );
  }

  private processResponse(response: Responses): Responses {
      return {
        info: {...response.info},
        results: response.results.map((user:any) => (<User>{
          uuid: user.login.uuid,
          firstName: user.name.first,
          lastName: user.name.last,
          email: user.email,
          username: user.login.username,
          gender: user.gender,
          address: `${user.location.street.number} ${user.location.street.name} ${user.location.street.city} ${user.location.street.country},${user.location.street.postcode}`,
          dateOfBirth: user.dob.date,
          phone: user.phone,
          imageUrl: user.picture.medium,
          coordinate: user.coordinates
        }))
      };
  }
}
