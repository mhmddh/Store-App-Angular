import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Brand, BasePage, Paginater, Modal } from 'src/app/common/models/model';
import { ActionModalComponent } from 'src/app/components/modals/action-modal/action-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faPencil, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { AppState } from 'src/app/store/states/app.state';
import { Store } from '@ngrx/store';
import { getPaginatedBrands } from 'src/app/store/selectors/brand.selector';
import { loadPaginatedBrands } from 'src/app/store/actions/brand.action';
import { PageService } from 'src/app/services/page-service';
@Component({
  selector: 'app-index',
  templateUrl: './brand-page-list.component.html',
  styleUrls: ['./brand-page-list.component.scss']
})
export class BrandPageListComponent implements OnInit {
  brands: Brand[] = [];
  basePageOptions: BasePage = {
    title: 'Brands',
    routeUrl: 'brands/create-brand',
    routeTitle: 'Create New Brand',
    loading: true,
  }
  paginater: Paginater = {
    limit: Number(localStorage.getItem('brandPage-limit')) || 10,
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC'],
    searchKey: 'Name',
  }
  modalItem: Modal = {};
  nbOfBrands: number = 0;
  faTrash = faTrash;
  faPencil = faPencil;
  idarrowIcon = faArrowUp;
  datearrowIcon = faArrowUp;
  namearrowIcon = faArrowUp;

  constructor(public commonService: CommonService, private modalService: NgbModal, private store: Store<AppState>, private pageService: PageService) { }

  ngOnInit(): void {
    this.setDefaultLimit(10);
    this.getBrands();
  }
  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue, 1);
      }
      else {
        this.getBrands(true);

      }
    }
  }
  changePage(page: any) {
    this.paginater.currentPage = page;
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue, 1);
    }
    else {
      this.getBrands(true);
    }
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue, 1);
      }
      else {
        this.getBrands(true);

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
    localStorage.setItem('brandPage-limit', limit.toString());
    this.paginater.limit = Number(localStorage.getItem('brandPage-limit'));
    this.resetCurrentPage();
    this.pageService.set(this.paginater);
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue, 1);
    }
    else {
      this.getBrands(true);
    }
  }
  setDefaultLimit(limit: number) {
    if (this.paginater.limit == 0 || this.paginater.limit == undefined) {
      this.paginater.limit = limit;
      localStorage.setItem('brandPage-limit', limit.toString());
    }
    this.pageService.set(this.paginater);
  }


  toggleSortBy(parameter: any) {
    var ascOrder = this.paginater.sortParameters[1];
    if (ascOrder == 'ASC') {
      ascOrder = 'DESC';
    } else {
      ascOrder = 'ASC';
    }
    if (parameter == 'ID') {
      if (ascOrder == 'ASC') this.idarrowIcon = faArrowUp;
      else this.idarrowIcon = faArrowDown;
    } else if (parameter == 'Name') {
      if (ascOrder == 'ASC') this.namearrowIcon = faArrowUp
      else this.namearrowIcon = faArrowDown;
    } else {
      if (ascOrder == 'ASC') this.datearrowIcon = faArrowUp
      else this.datearrowIcon = faArrowDown;
    }
    this.paginater.sortParameters = [parameter, ascOrder];
    this.sortBy();
  }
  sortBy() {
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue, 1);
    } else {
      this.getBrands(true);
    }
  }
  getBrands(needNewData?: boolean) {
    this.store.select(getPaginatedBrands).subscribe(
      (data) => {
        this.brands = data.brands;
        this.paginater.totalPages = data.pages;
        this.nbOfBrands = data.nbOfItems;
        this.basePageOptions.loading = false;
      }
    )
    if(!this.brands || needNewData)
      this.store.dispatch(loadPaginatedBrands());
  }
  searchItem(str: string, resetCurrentPage: number) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      this.brands = [];
      if (resetCurrentPage != 1) {
        this.resetCurrentPage();
      }
      this.commonService.searchBrands(this.paginater).subscribe((data: any) => {
        this.brands = data.brands;
        this.paginater.totalPages = data.pages;
        this.nbOfBrands = data.nbOfItems;
        this.basePageOptions.loading = false;
      })
    } else {
      this.getBrands(true);
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
    modalRef.componentInstance.actionEvent.subscribe((id: number) => {
      this.deleteBrand(id);
      modalRef.componentInstance.closeModal();
    });
  }


}
