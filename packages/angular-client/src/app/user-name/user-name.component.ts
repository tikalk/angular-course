import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  @Input('number') userNumber: number;
  @Input() username: string;
  constructor() { }

  ngOnInit() {
  }

}
