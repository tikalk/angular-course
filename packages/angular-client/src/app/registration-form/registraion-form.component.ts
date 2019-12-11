import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {User} from '../data-model/User';
import {UsersManagementService} from '../users-management.service';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistraionFormComponent implements OnInit {

  registrationFormGroup: FormGroup;
  username: string;
  password: string;
  @Output() userCreated = new EventEmitter<User>();

  constructor(private formBuilder: FormBuilder, private usersManagementService: UsersManagementService) {

  }

  onSubmit() {
    if (!this.registrationFormGroup.valid) {
      return;
    }
    const userData: User = {
      username: this.registrationFormGroup.controls['username'].value
      , password: this.registrationFormGroup.controls['password'].value
      , firstName: this.registrationFormGroup.controls['firstName'].value
      , lastName: this.registrationFormGroup.controls['lastName'].value
    }

    this.userCreated.emit(userData);
  }

  getErrors(formControlName: string) {
    return !this.registrationFormGroup.controls[formControlName].valid;
  }
  ngOnInit() {
    this.registrationFormGroup = this.formBuilder.group({
      'username': new FormControl('', [ Validators.required],
      this.usersManagementService.userExistValidator().bind(this)),
      'password': new FormControl()
      , 'firstName': new FormControl(), 'lastName': new FormControl()
    })
  }

}
