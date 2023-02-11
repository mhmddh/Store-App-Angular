import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as categoryActions from '../actions/category.action';
import { CommonService } from 'src/app/services/common.service';
import { Paginater } from 'src/app/common/models/model';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { withLatestFrom } from 'rxjs/internal/operators/withLatestFrom';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { getAllCategories } from '../selectors/category.selector';
import { PageService } from 'src/app/services/page-service';


@Injectable()
export class CategoryEffects {
    paginater !: Paginater;
    constructor(
        private actions$: Actions,
        private commonService: CommonService,
        private pageService: PageService,
        private store: Store<AppState>
    ) {
        this.pageService.paginater$.subscribe((paginater) => {
            this.paginater = paginater;
        });
    }


    loadCategories$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(categoryActions.loadCategories),
            withLatestFrom(this.store.select(getAllCategories)),
            mergeMap(() => {
                return this.commonService.getPaginatedCategories(this.paginater).pipe(
                    map((categoriesResponse) => {
                        return categoryActions.loadCategoriesSuccess({ categoriesResponse });
                    })
                );
            })
        );
    });
}