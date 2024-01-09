import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Auth, signOut} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  isLoggedIn: any;
  username: any;
  userId: any;

  constructor(private http: HttpClient, private auth: Auth) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl + '/users/addUser', user);
  }

  login({email, password}:any){
    return this.http.post<User>(this.apiUrl + '/users/userLogin', {email, password});
  }

  recuperarContrasena(email:string){
    return this.http.get<User>(this.apiUrl + '/users/resetPassword/' + email);
  }

  logout(){
    return signOut(this.auth);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users/getAllUser');
  }

  getUser() {
    const email= this.getUserSession();

    return this.http.get(this.apiUrl +'/users/getUser/'+ email);
  }


  getUserById(userId: string){
    return this.http.get(this.apiUrl + '/users/getUserById/' + userId);
  }

  getUserSession(): string {
    this.isLoggedIn= sessionStorage.getItem('isLoggedIn');
    if (this.isLoggedIn === 'true') {
      this.username = sessionStorage.getItem('username');
      this.userId = sessionStorage.getItem('idUsuario');
    } else {
      this.username = 'Usuario no logueado';
    }
     return this.username;
  }


}

