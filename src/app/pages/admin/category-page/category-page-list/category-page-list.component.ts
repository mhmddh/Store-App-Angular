import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Category, BasePage, Paginater, Modal } from 'src/app/common/models/model';
import { ActionModalComponent } from 'src/app/components/modals/action-modal/action-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faPencil, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './category-page-list.component.html',
  styleUrls: ['./category-page-list.component.css']
})
export class CategoryPageListComponent implements OnInit {
  categories: Category[] = [];
  basePageOptions: BasePage = {
    title: 'Categories',
    routeUrl: 'admin/categories/create-category',
    routeTitle: 'Create New Category',
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
  nbOfCategories: number = 0;
  faTrash = faTrash;
  faPencil = faPencil;
  idarrowIcon = faArrowUp;
  datearrowIcon = faArrowUp;
  namearrowIcon = faArrowUp;
  constructor(public commonService: CommonService, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.setDefaultLimit(10);
    this.getCategories(this.paginater);
  }

  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue,1);
      }
      else {
        this.getCategories(this.paginater);

      }
    }
  }
  changePage(page: any) {
    this.paginater.currentPage = page;
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue,1);
    }
    else {
      this.getCategories(this.paginater);

    }
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue,1);
      }
      else {
        this.getCategories(this.paginater);

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
      this.searchItem(this.paginater.searchValue,1);
    }
    else {
      this.getCategories(this.paginater);

    }
  }

  setDefaultLimit(limit: number) {
    if (this.paginater.limit == 0 || this.paginater.limit == undefined) {
      this.paginater.limit = limit;
      localStorage.setItem('limit', limit.toString());
    }
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
      this.searchItem(this.paginater.searchValue,1);
    } else {
      this.getCategories(this.paginater);
    }
  }

  getCategories(paginater: Paginater) {
    this.paginater.limit = Number(localStorage.getItem('limit'));
    this.commonService.getPaginatedCategories(paginater).subscribe((data: any) => {
      this.categories = data.categories;
      this.paginater.totalPages = data.pages;
      this.nbOfCategories = data.nbOfItems;
      this.basePageOptions.loading = false;
    })
  }

  searchItem(str: string,resetCurrentPage:number) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      this.categories = [];
      if(resetCurrentPage != 1){
        this.resetCurrentPage();
      }
      this.commonService.searchCategories(this.paginater).subscribe((data: any) => {
        this.categories = data.categories;
        this.paginater.totalPages = data.pages;
        this.nbOfCategories = data.nbOfItems;
        this.basePageOptions.loading = false;
      })
    } else {
      this.getCategories(this.paginater);
    }
  }
  deleteCategory(id: number) {
    this.commonService.deleteCategory(id).subscribe(res => {
      this.categories = this.categories.filter(item => item.id !== id);
      console.log('Category deleted successfully!');
    })
  }

  openModal(id: number, name: any) {
    this.modalItem = {
      itemId: id,
      itemName: name,
      title: 'Delete Category',
      text: 'Are you sure you want to delete ' + name + ' this Category ?',
      buttonLabel: 'Delete'
    }
    const modalRef = this.modalService.open(ActionModalComponent);
    modalRef.componentInstance.modal = this.modalItem;
    modalRef.componentInstance.deleteEvent.subscribe((id: number) => {
      this.deleteCategory(id);
      modalRef.componentInstance.closeModal();
    });
  }



}
