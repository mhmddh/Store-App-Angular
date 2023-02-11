import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Product, BasePage, Paginater, Modal } from 'src/app/common/models/model'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrash, faPencil, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ActionModalComponent } from 'src/app/components/modals/action-modal/action-modal.component';
import { getAllProducts } from 'src/app/store/selectors/product.selector';
import { loadProducts } from 'src/app/store/actions/product.action';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { PageService } from 'src/app/services/page-service';
@Component({
  selector: 'app-index',
  templateUrl: './product-page-list.component.html',
  styleUrls: ['./product-page-list.component.scss']
})
export class ProductPageListComponent implements OnInit {
  products: Product[] = [];
  faTrash = faTrash;
  faPencil = faPencil;
  idarrowIcon = faArrowUp;
  datearrowIcon = faArrowUp;
  namearrowIcon = faArrowUp;
  basePageOptions: BasePage = {
    title: 'Products',
    routeUrl: 'admin/products/create-product',
    routeTitle: 'Create New Product',
    loading: true,
  }
  paginater: Paginater = {
    limit: Number(localStorage.getItem('productPage-limit')) || 10,
    currentPage: 1,
    totalPages: 0,
    sortParameters: ['Date', 'ASC'],
    searchKey: 'Name',
  }
  nbOfProducts: number = 0;
  modalItem!: Modal;
  constructor(public commonService: CommonService, private modalService: NgbModal, private store: Store<AppState>, private pageService: PageService,

  ) { }

  ngOnInit(): void {
    this.setDefaultLimit(10);
    this.getProducts();
  }



  nextPage() {
    if (this.paginater.currentPage < this.paginater.totalPages) {
      this.paginater.currentPage++;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue, 1);
      }
      else {
        this.getProducts(true);

      }
    }
  }
  changePage(page: any) {
    this.paginater.currentPage = page;
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue, 1);
    }
    else {
      this.getProducts(true);

    }
  }
  previousPage() {
    if (this.paginater.currentPage > 1) {
      this.paginater.currentPage--;
      if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
        this.searchItem(this.paginater.searchValue, 1);
      }
      else {
        this.getProducts(true);

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
    localStorage.setItem('productPage-limit', limit.toString());
    this.paginater.limit = Number(localStorage.getItem('productPage-limit'));
    this.resetCurrentPage();
    if (this.paginater.searchValue != '' && this.paginater.searchValue != null) {
      this.searchItem(this.paginater.searchValue, 1);
    }
    else {
      this.getProducts(true);
    }
  }

  setDefaultLimit(limit: number) {
    if (this.paginater.limit == 0 || this.paginater.limit == undefined) {
      this.paginater.limit = limit;
      localStorage.setItem('productPage-limit', limit.toString());
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
      this.getProducts(true);
    }
  }


  getProducts(needNewData?: boolean) {
      this.store.select(getAllProducts).subscribe(
        (data) => {
          this.products = data.products;
          this.paginater.totalPages = data.pages;
          this.nbOfProducts = data.nbOfItems;
          this.basePageOptions.loading = false;
        }
      )
    if (!this.products || needNewData)
      this.store.dispatch(loadProducts());
  }

  searchItem(str: string, resetCurrentPage: number) {
    this.paginater.searchValue = str;
    if (str != '' && str != null) {
      if (resetCurrentPage != 1) {
        this.resetCurrentPage();
      }
      this.products = [];
      this.commonService.searchProducts(this.paginater).subscribe((data: any) => {
        this.products = data.products;
        this.paginater.totalPages = data.pages;
        this.nbOfProducts = data.nbOfItems;
        this.basePageOptions.loading = false;
      })
    } else {
      this.getProducts(true);
    }
  }

  deleteProduct(id: number) {
    this.commonService.deleteProduct(id).subscribe(res => {
      this.products = this.products.filter(item => item.id !== id);
      console.log(res);
    })
  }

  openModal(id: number, name: any) {
    this.modalItem = {
      itemId: id,
      title: 'Delete Product',
      text: 'Are you sure you want to delete ' + name + ' Product ?',
      buttonLabel: 'Delete'
    }
    const modalRef = this.modalService.open(ActionModalComponent);
    modalRef.componentInstance.modal = this.modalItem;
    modalRef.componentInstance.actionEvent.subscribe((id: number) => {
      this.deleteProduct(id);
      modalRef.componentInstance.closeModal();
    });
  }



}
