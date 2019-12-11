import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../data-model/User';

@Component({
  selector: 'current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnInit {
  @Input() currentUser: User;
  @Output() logout = new EventEmitter<void>();
  constructor() {
  }

  onLogOut() {
    this.logout.emit();
  }

  ngOnInit() {
  }

}
