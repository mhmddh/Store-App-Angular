import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BasePage, Paginater, User } from '../../common/models/model'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {
  @Input() options!: BasePage;
  @Input() paginater!: Paginater;
  @Input() nbofItems!: number;
  @Output() itemsPerPage = new EventEmitter<any>();
  @Output() sortByFilter = new EventEmitter<any>();
  @Output() searchForItem = new EventEmitter<any>();

  user: User = {};
  faUser = faUser;
  searchStr: string = '';
  constructor(public commonService: CommonService, public authService: AuthService) { }


  ngOnInit(): void {
    this.LoggedIn();
  }


  LoggedIn() {
    var userObject = localStorage.getItem('user') || '';
    this.user = JSON.parse(userObject);
  }

  Logout() {
    this.authService.logout();
  }

  arrayToNumber(n: number) {
    return new Array(n);
  }

  changeLimit(event: any) {
    this.itemsPerPage.emit(event.target.value);
  }

  sortBy(event: any) {
    this.sortByFilter.emit(event.target.value);
  }

  searchItem(event: any) {
    this.searchForItem.emit(this.searchStr);
  }

}
