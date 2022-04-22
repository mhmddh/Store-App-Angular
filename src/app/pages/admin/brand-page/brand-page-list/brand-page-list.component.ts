import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Brand, BasePage, Paginater, Modal } from 'src/app/common/models/model';
import { ActionModalComponent } from 'src/app/components/modals/action-modal/action-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-index',
  templateUrl: './brand-page-list.component.html',
  styleUrls: ['./brand-page-list.component.css']
})
export class BrandPageListComponent implements OnInit {
  brands: Brand[] = [];
  basePageOptions: BasePage = {
    title: 'Brands',
    routeUrl: 'admin/brands/create-brand',
    routeTitle: 'Create New Brand',
    loading: true,
  }
  paginater: Paginater = {
    limit: Number(localStorage.getItem('limit')),
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC'],
    searchKey: 'Name',
  }
  modalItem: Modal = {};
  nbOfBrands: number = 0;
  faTrash = faTrash;
  faPencil = faPencil;

  constructor(public commonService: CommonService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.setDefaultLimit(10);
    this.getBrands(this.paginater);
  }
  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getBrands(this.paginater);

      }
    }
  }
  changePage(page: any) {
    this.paginater.currentPage = page;
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue);
    }
    else {
      this.getBrands(this.paginater);
    }
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue);
      }
      else {
        this.getBrands(this.paginater);

      }
    }
  }

  arrayPages(n: number) {
    return new Array(n);
  }
  resetCurrentPage() {
    this.paginater.currentPage = 1;
  }

  changeLimit(limit: any) {
    localStorage.setItem('limit', limit.toString());
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.resetCurrentPage();
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue);
    }
    else {
      this.getBrands(this.paginater);

    }
  }
  setDefaultLimit(limit: number) {
    if (this.paginater.limit == 0 || this.paginater.limit == undefined) {
      this.paginater.limit = limit;
      localStorage.setItem('limit', limit.toString());
    }
  }

  sortBy(parameters: any) {
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.paginater.sortParameters = parameters.split(" ", 2);
      this.searchItem(this.paginater.searchValue);
    } else {
      this.paginater.sortParameters = parameters.split(" ", 2);
      this.getBrands(this.paginater);
    }
  }
  getBrands(paginater: Paginater) {
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.commonService.getPaginatedBrands(paginater).subscribe((data: any) => {
      this.brands = data.brands;
      this.paginater.totalPages = data.pages;
      this.nbOfBrands = data.nbOfItems;
      this.basePageOptions.loading = false;
    })
  }
  searchItem(str: string) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      this.brands = [];
      this.commonService.searchBrands(this.paginater).subscribe((data: any) => {
        this.brands = data.brands;
        this.paginater.totalPages = data.pages;
        this.nbOfBrands = data.nbOfItems;
        this.basePageOptions.loading = false;
      })
    } else {
      this.getBrands(this.paginater);
    }
  }

  deleteBrand(id: number) {
    this.commonService.deleteBrand(id).subscribe(res => {
      if (res.success) {
        this.brands = this.brands.filter(item => item.id !== id);
      }
      console.log(res.message);

    })
  }

  openModal(id: number, name: any) {
    this.modalItem = {
      itemId: id,
      title: 'Delete Brand',
      text: 'Are you sure you want to delete ' + name + ' Brand ?',
      buttonLabel: 'Delete'
    }
    const modalRef = this.modalService.open(ActionModalComponent);
    modalRef.componentInstance.modal = this.modalItem;
    modalRef.componentInstance.deleteEvent.subscribe((id: number) => {
      this.deleteBrand(id);
      modalRef.componentInstance.closeModal();
    });
  }


}
