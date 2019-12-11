import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
   templateUrl: './navigation-bar.component.html',

  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {

  @Input('active-item') activeItem: string;

  @Output() todayChange = new EventEmitter<number>();

  private myName = 'Nav-bar';
  constructor() {
  }

  resetActiveItem() {
    this.activeItem = 'home';
  }

  ngOnInit() {

  }

  buttonClick(evt: any) {
    this.todayChange.emit(Date.now());
    this.activeItem  = 'home';
  }

}
