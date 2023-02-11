import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'src/app/common/models/model';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss']
})
export class ActionModalComponent implements OnInit {
  @Input() public modal: Modal = {};
  @Output() actionEvent = new EventEmitter();

  constructor(private modalService: NgbModal, public commonService: CommonService) { }

  ngOnInit(): void {
  }

  action(id:any) {
    this.actionEvent.emit(id);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
