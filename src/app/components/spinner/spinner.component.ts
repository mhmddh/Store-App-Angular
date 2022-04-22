import { Component, OnInit } from '@angular/core';
import { Spinner } from 'src/app/common/models/model';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  faCartShopping = faCartShopping;

  constructor() { }

  ngOnInit(): void {
  }

}
