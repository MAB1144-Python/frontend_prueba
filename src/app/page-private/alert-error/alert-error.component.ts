import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent implements OnInit {
  public email: string = "";
  public username: string = "";

  constructor() { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.username = sessionStorage.getItem('username');
  }

}
