import { AuthenticationService } from './authentication/authentication.service';
import { ShowroomService } from './showroom/shared/showroom.service';
import { Component, OnInit } from '@angular/core';

declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShowroomService]
})
export class AppComponent implements OnInit{
  userCredentials = { username: "", password: "" };
  isAuthenticated : boolean=false;
  currentUser : any = null;
  constructor(
    private authenticationService: AuthenticationService
  ){}

  ngOnInit() {
    this.subscribeAuth();
    this.checkAuthentication();
  }

  login(){
    this.authenticationService.login(this.userCredentials).subscribe(
      res =>{
        res=> this.authenticationService.isAuthenticated(true);
        this.currentUser = this.authenticationService.getToken();
        this.closeModal();
      },
      res=> this.authenticationService.isAuthenticated(false)
    );
  }
  
  closeModal() {
    $('#loginModal').modal('hide')
  }

  logout(){
    this.authenticationService.logout();
  }

  // cheks if there is a valid token
  checkAuthentication(){
    if(this.authenticationService.getToken()){
      this.authenticationService.checkToken().subscribe(
        res => {
          this.isAuthenticated = true;
          this.currentUser = this.authenticationService.getToken();
        },
        error => {}
      )
    }
  }
  // subscribe to the isAuthenticated observable
  subscribeAuth() {
    this.authenticationService.isAuthenticated$.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
    }

}
