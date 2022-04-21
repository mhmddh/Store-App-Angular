import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/common/models/model';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faUser = faUser;
  faBars = faBars;
  activeTab: string = '';
  isDisplayed = false;
  toggleNavbar = true;
  @Output() logoutEvent = new EventEmitter();
  @Input() user!: User;
  @ViewChild('toggleDropDown') toggleButton!: ElementRef;
  @ViewChild('dropDown') dropDown!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.toggleButton.nativeElement && e.target !== this.dropDown.nativeElement) {
        this.isDisplayed = false;
      }
    });
  }

  ngOnInit(): void {
    this.activeTab = this.router.url;
  }

  toggleMenu() {
    this.isDisplayed = !this.isDisplayed;
  }


  logout() {
    this.logoutEvent.emit();
  }

}
