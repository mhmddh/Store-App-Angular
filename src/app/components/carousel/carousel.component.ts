import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']

})
export class CarouselComponent {
  @Input() images!: any;
  @Input() index!: number;
  @Output() closeEvent = new EventEmitter();

  closeCarousel() {
    this.closeEvent.emit();
  }
}


