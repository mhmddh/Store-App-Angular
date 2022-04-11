import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BasePage, Paginater } from '../../common/models/model'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {
  @Input() options!: BasePage;
  @Input() paginater!: Paginater;
  @Output() itemsPerPage = new EventEmitter<any>();
  @Output() sortByFilter = new EventEmitter<any>();

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

  arrayToNumber(n: number) {
    return new Array(n);
  }

  changeLimit(event: any) {
    this.itemsPerPage.emit(event.target.value);
  }

  sortBy(event: any) {
    this.sortByFilter.emit(event.target.value);
  }

}
