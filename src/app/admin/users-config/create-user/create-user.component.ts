import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../Services/user.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNumber: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipCode: new FormControl(''),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // call in the user.service.ts file on construction of this component
  constructor(public userService: UserService) {}

  onSubmit() {
    // logging the form on submission tells us how to get to the userId,password, firstname, lastname,address,email values
    console.log(this.userForm);
    const user = {
      username: this.userForm.value.username,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      phoneNumber: this.userForm.value.phoneNumber,
      street: this.userForm.value.street,
      city: this.userForm.value.city,
      state: this.userForm.value.state,
      zipCode: this.userForm.value.zipCode,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };

    // send the userId,passward, firstname, lastname,address,email to our service, where we will eventually do an http post
    this.userService.createUser(user);
  }
}
