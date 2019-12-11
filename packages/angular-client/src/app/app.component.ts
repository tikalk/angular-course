import {Component, OnInit} from '@angular/core';
import {UserManagementService} from './user-management.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-client';

  currentUser$: Observable<any>;
  users = [];

  constructor(private usersManagementService: UserManagementService) {
  }

  logout() {
    this.usersManagementService.logout();
  }

  ngOnInit() {
   this.usersManagementService.getUsers().subscribe(users => {
     this.users = users;
   });
   this.currentUser$  = this.usersManagementService.getCurrentUser();
  }
}
