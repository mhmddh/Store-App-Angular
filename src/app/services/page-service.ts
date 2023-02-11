import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Paginater } from "../common/models/model";

export interface Todo {
    id: any;
    value: string;
}


@Injectable({
    providedIn: 'root'
}) export class PageService {
    paginater: Paginater = {
        limit: 10,
        currentPage: 1,
        totalPages: 0,
        sortParameters: ['Date', 'ASC'],
        searchKey: 'Name',
    }
    private _paginater = new BehaviorSubject<Paginater>(this.paginater);
    readonly paginater$ = this._paginater.asObservable();


    constructor() { }

    set(paginater: Paginater) {
        this._paginater.next(paginater);
    }

}