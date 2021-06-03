import { Component, NgIterable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: '',
    countryId: '',
    stateId: '',
    cityId: ''
  };

  public countries = [];
  public states = [];
  public cities = [];

  constructor(private userService: UserService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.userService.getCountries().subscribe(
      (data: any) => {
        this.countries = data;
        console.log(data)
      }
    )
  }

  formSubmit() {
    if (this.user.username.trim() == '' || this.user.username == null) {
      this.snackbar.open('Username is required !', '', {
        duration: 3000,
      });
      return;
    }
    //addUser:userService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        swal("Successfully Done !!", "User id is : " + data.id, "success");
        console.log(data);
      },
      (error) => {
        console.log(error);
        swal("Something went wrong !!", "User not registered.", "error");
      }
    )
  }

  onChangeCountry(countryId: any) {
    this.states = [];
    this.cities = [];
    this.userService.getStates(countryId).subscribe(
      (data: any) => {
        this.states = data;
        console.log(data);
      }
    )
  }

  onChangeState(stateId: any) {
    this.cities = [];
    this.userService.getCities(stateId).subscribe(
      (data: any) => {
        this.cities = data;
        console.log(data);
      }
    )
  }
}
