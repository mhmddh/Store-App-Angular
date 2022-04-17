import { Component, Input, OnInit } from '@angular/core';
import { Spinner } from 'src/app/common/models/model';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() attributes!: Spinner;

  constructor() { }

  ngOnInit(): void {
  }

}
