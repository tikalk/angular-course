import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ViewChildren,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy
} from '@angular/core';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {UserNameComponent} from './user-name/user-name.component';
import {User} from './data-model/User';
import {UsersManagementService} from './users-management.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom

})
export class AppComponent implements OnInit, OnDestroy {

  userExists$: Observable<User>
  title = 'chat-client';
  private subscription: Subscription;

    constructor(private usersManamgementService: UsersManagementService) {
    }
  users: any = [];

  onUserCreated(userData: User) {

  this.subscription.add(  this.usersManamgementService.createUser(userData)
      .subscribe(user => {
     // this.users =[...this.users, user];
     // this.users.push(user);
    }));
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
  this.subscription =  this.usersManamgementService.getUsers().
    subscribe(users=> {
      this.users = users
    });



  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
