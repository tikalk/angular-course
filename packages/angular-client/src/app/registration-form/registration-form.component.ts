import { Component, OnInit } from '@angular/core';
import {UserManagementService} from '../user-management.service';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  username: string;
  password: string;
  constructor(private usersManagementService: UserManagementService) { }

  registerUser() {
    this.usersManagementService.createUser({username: this.username,
    password: this.password})
    // TODO: Register user in a service
  }

  ngOnInit() {
  }

}
