import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BasePage, Paginater, User } from 'src/app/common/models/model'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {
  @Input() options!: BasePage;
  @Input() paginater!: Paginater;
  @Input() nbofItems!: number;
  @Output() itemsPerPage = new EventEmitter<any>();
  @Output() searchForItem = new EventEmitter<any>();
  @Output() prevPaginater = new EventEmitter();
  @Output() changePaginater = new EventEmitter<any>();
  @Output() nextPaginater = new EventEmitter();

  user: User = {};
  faUser = faUser;
  faSearch = faSearch;
  searchStr: string = '';

  constructor(public commonService: CommonService, public authService: AuthService) { }


  ngOnInit(): void {
    this.LoggedIn();
  }


  LoggedIn() {
    var userObject = localStorage.getItem('user') || '';
    this.user = JSON.parse(userObject);
  }

  logout() {
    this.authService.logout();
  }

  arrayToNumber(n: number) {
    return new Array(n);
  }

  previousPage() {
    this.prevPaginater.emit();
  }

  changePage(event: any) {
    this.changePaginater.emit(event.target.value);

  }

  nextPage() {
    this.nextPaginater.emit();
  }

  changeLimit(event: any) {
    this.itemsPerPage.emit(event.target.value);
  }

  searchItem(event: any) {
    this.searchForItem.emit(this.searchStr);
  }

}
