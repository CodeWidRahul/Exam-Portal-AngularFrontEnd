import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snackbar: MatSnackBar, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("login btn clicked.");
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snackbar.open('Username is required !', '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snackbar.open('Password is required !', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to genrate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user)
            console.log(user);

            //redirect ...ADMIN : Admin dashbard
            //redirect ...NORMAL : Normal dashbard
            if (this.login.getUserRole() == 'ADMIN') {
              //admin dashboard
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == 'NORMAL') {
              //normal dashboard
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          }
        )
      },
      (error) => {
        console.log('error');
        console.log(error);
        this.snackbar.open('Invalid details .. Try Again !!', '', {
          duration: 3000
        })
      }
    )
  }

}
