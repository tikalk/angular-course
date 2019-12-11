import {Component, OnInit, ViewChild, ViewEncapsulation, ViewChildren, AfterViewInit, AfterViewChecked} from '@angular/core';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {UserNameComponent} from './user-name/user-name.component';
import {User} from './data-model/User';
import {UsersManagementService} from './users-management.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom

})
export class AppComponent implements OnInit {

  userExists$: Observable<User>
  title = 'chat-client';

    constructor(private usersManamgementService: UsersManagementService) {
    }
  users: any = [];

  onUserCreated(userData: User) {

    this.usersManamgementService.createUser(userData).subscribe(user => {
      this.users =[...this.users, user];
    })
  }

  onLogout() {
    this.usersManamgementService.logout();
  }

  trackByUsername(user: any ) {
    return user.password;
  }

  @ViewChildren(UserNameComponent) usernameComponents: UserNameComponent[];

  ngOnInit(): void {

    this.userExists$ = this.usersManamgementService.getCurrentUser();
    this.usersManamgementService.getUsers().subscribe(users=> this.users = users);

  }



}
