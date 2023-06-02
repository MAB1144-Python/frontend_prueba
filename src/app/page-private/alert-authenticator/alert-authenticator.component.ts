import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-authenticator',
  templateUrl: './alert-authenticator.component.html',
  styleUrls: ['./alert-authenticator.component.scss']
})
export class AlertAuthenticatorComponent implements OnInit {
  public email: string = "";
  public username: string = "";

  constructor() { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    this.username = sessionStorage.getItem('username');
  }
  authenticator(){
    
  }
}
