import { MatSnackBar } from "@angular/material";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { Injectable, Output, EventEmitter } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable,BehaviorSubject } from 'rxjs';
import { tokenNotExpired, AuthHttp, JwtHelper } from "angular2-jwt";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { Settings } from "./../../settings";
import { Cookie } from "ng2-cookies/ng2-cookies";

@Injectable()
export class AuthService {
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  authToken: any;
  token: string;
  userRoles: any = Settings.userRoles || [];
  jwtHelper: JwtHelper = new JwtHelper();
    $currentUser : BehaviorSubject<any> = new BehaviorSubject<any>({ _id: '', name: '', email: '', role: '', avatar: '',parentID:'' });
    currentUser = { _id: '', name: '', email: '', role: '', avatar: '',parentID:'' };
  user: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.load();
  }
  load(){
    const token = localStorage.getItem("id_token") || Cookie.get("token"); //Cookies set through auth strategy
    const token_parentID = localStorage.getItem("parentID");
    if (token && token !== "null") {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser, token_parentID);
      this.checkCurrentPreviousVal();
      if (this.jwtHelper.isTokenExpired(token)) {
        this.logout();
      }
    }
  }

  checkCurrentPreviousVal(){
    let previousValue=  this.$currentUser.getValue();
     

    if(previousValue.email !==this.currentUser.email ){
      this.$currentUser.next(this.currentUser);
    }
  }
  isLoggedIn() {
    return tokenNotExpired();
  }
  isSessionExpired(token) {
    return this.jwtHelper.isTokenExpired(token);
  }
  isCheckPrivateStoreAccess() {
    this.load();
    if (this.currentUser.role === 'privatevendor') {
      return true;
    }else {
      return false;
    }
  }
  login(emailAndPassword) {
    return this.userService
      .login(emailAndPassword)
      .map(res => res.json())
      .map(res => {
        localStorage.setItem("id_token", res.token);
       
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser, res.user.parentID);
        this.$currentUser.next(this.currentUser);
        if(this.isCheckPrivateStoreAccess()){
          this.router.navigate([ '/admin/dashboard']);
        }
        return this.loggedIn;
      });
  }
  register(user) {
    return this.userService
      .register(user)
      .map(res => res.json())
      .map(res => {
        localStorage.setItem("id_token", res.token);
        const decodedUser = this.decodeUserFromToken(res.token);
        this.setCurrentUser(decodedUser);
        return this.loggedIn;
      });
  }
  logout(url?: string) {
    localStorage.removeItem("id_token");
    Cookie.delete("token");
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = { _id: '', name: '', email: '', role: '', avatar: '',parentID:'' };
    let navigateUrl = url || "/";
    this.$currentUser.next(this.currentUser);
    this.router.navigate([navigateUrl]);
  }
  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedUser, parentID = null) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.email = decodedUser.email;
    this.currentUser.name = decodedUser.name;
    this.currentUser.avatar = decodedUser.avatar;
    this.currentUser.role = decodedUser.role;

    if(this.currentUser.role === 'privatevendor'){
      localStorage.setItem("parentID", this.currentUser._id );
    }else if(this.currentUser.role === 'vendorprivateuser'){
      localStorage.setItem("parentID", parentID );
    }
  
    this.currentUser.parentID = parentID ? parentID : "";

        decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
    // delete decodedUser.role;
  }
  updateProfile(user) {
    // Used for edit-profile page
    this.currentUser.avatar = user.avatar;
    this.currentUser.name = user.name;
  }
  saveProfile(data) {
    this.load();
    return this.userService
      .saveProfile(this.currentUser._id, data)
      .map(res => res.json())
      .map(res => {
        return res;
      });
  }
  changePassword(data) {
    this.load();
    return this.userService
      .changePassword(this.currentUser._id, data.oldPassword, data.newPassword)
      .map(res => {
        this.snack.open(res.json().message, "OK", { duration: 2000 });
        return res.json() || [];
      })
      .catch(this.handleError);
  }
  hasRole(role: string) {
    this.load();

    return this.currentUser
      ? this.userRoles.indexOf(this.currentUser.role) >=
          this.userRoles.indexOf(role)
      : false;
  }

  // this.currentUser.role ==='privatevendor' && item.name ==='Create Private User'
  getToken() {
    return "Bearer " + localStorage.getItem("id_token");
  }
  handleError(err: any) {
    return Observable.throw(err || "Server error");
  }
}
