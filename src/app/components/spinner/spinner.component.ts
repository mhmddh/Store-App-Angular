import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() try!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
