import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //add user
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/save`, user)
  }

  //getCountries
  public getCountries() {
    return this.http.get(`${baseUrl}/user/getCountries`)
  }

  //getStates
  public getStates(countryId: any) {
    return this.http.get(`${baseUrl}/user/getStates/${countryId}`)
  }

  //getCities
  public getCities(stateId: any) {
    return this.http.get(`${baseUrl}/user/getCities/${stateId}`)
  }
}
