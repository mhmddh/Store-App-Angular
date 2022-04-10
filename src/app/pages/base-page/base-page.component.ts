import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BasePage } from './base-page'

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {
  @Input() options!: BasePage;
  username!: string | null;
  userid!: number;
  faUser = faUser;
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.LoggedIn();
  }

  LoggedIn() {
    this.username = localStorage.getItem('name');
    this.userid = Number(localStorage.getItem('id'));
  }

  Logout() {
    this.commonService.logout();
  }

}
