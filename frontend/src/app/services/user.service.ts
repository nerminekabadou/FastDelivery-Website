import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { User } from '../shared/models/User';
import { UserLogin } from '../shared/interfaces/UserLogin';
import { ToastrService } from 'ngx-toastr';
import { UserRegister } from '../shared/interfaces/UserRegister';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject =
  new BehaviorSubject<User>(this.getUserFromLocalStorage()); //BehaviorSubject initialized with the user data fetched from localStorage.
  // It holds the current user state and emits the user value to any component that subscribes to it.
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:UserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin                                                                                                                                                                                                                                                         ).pipe(
      tap({
        next: (user) =>{
          user.email = userLogin.email;

          console.log('User received:', user.email); // Log the user object
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bienvenue sur Delivroo ${user.email}!`,
            'Connexion réussie'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Échec de la connexion');
        }
      })
    );
  }
  
  register(userRegiser:UserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Veuillez-maintenant vous connecter `,
            'Enregistrement réussi'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Échec inscription')
        }
      })
    )
  }


  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}