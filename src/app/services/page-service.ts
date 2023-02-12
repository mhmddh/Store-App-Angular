import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Paginater } from "../common/models/model";

@Injectable({
    providedIn: 'root'
})

export class PageService {
    paginater!: Paginater;
    private _paginater = new BehaviorSubject<Paginater>(this.paginater);
    readonly paginater$ = this._paginater.asObservable();


    constructor() { }

    set(paginater: Paginater) {
        this._paginater.next(paginater);
    }

}