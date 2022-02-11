import { ComponentStore } from '@ngrx/component-store';
import { LoadingService, SnackBarService } from '../services';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

export type Mode = 'create' | 'update'

export interface EntityPageState<Entity> {
  mode: Mode;
  entityId: string;
  entity: Entity;
}

const tryCatch = (promise: Promise<any>) => new Promise(async (resolve, reject) => {
  try { resolve(await promise); } catch (error) { reject(error); }
});

export abstract class EntityPageStore<S extends EntityPageState<Entity>, Entity> extends ComponentStore<S> {
  get entity() { return this.get().entity}

  mode$ = this.select(state => state.mode);
  entityId$ = this.select(state => state.entityId).pipe(filter(id => !!id));
  entity$ = this.select(state => state.entity);

  setMode = this.updater((state, mode: Mode) => ({...state, mode}));
  setEntityId = this.updater((state, entityId: string) => ({...state, entityId}));
  setEntity = this.updater((state, entity: Entity) => ({...state, entity}));

  constructor(initialState?: S) {
    super(initialState);
    this.getEntity(this.entityId$);
  }

  getEntityIdAndMode = this.effect((entityId$: Observable<string>) => entityId$.pipe(
    tap(id => this.setMode(id === 'new' ? 'create' : 'update')),
    filter(id => id !== 'new'),
    tap((id: string) => this.setEntityId(id)),
  ));

  getEntity = this.effect((entityId$: Observable<string>) => entityId$.pipe(
    switchMap(id => this._getEntity(id)),
    tap((entity: Entity) => this.setEntity(entity)),
  ));



  createEntity(value: Partial<Entity>) {
    const entity: Entity = ({...this.entity, ...value});

    this.loading.setKey('[pages/stores/pages/store] Create Store');

    return tryCatch(this._createEntity(entity))
      .catch(error => (console.error(error), this.snackBar.openSnackBar('作成に失敗しました。')))
      .finally(() => this.loading.removeKey('[pages/stores/pages/store] Create Store'));
  }

  updateEntity(value: Partial<Entity>) {
    const entity: Entity = ({...this.entity, ...value});

    this.loading.setKey('[pages/stores/pages/store] Create Store');
    return this._updateEntity(entity)
      .catch(error => (console.error(error), this.snackBar.openSnackBar('更新に失敗しました。')))
      .finally(() => this.loading.removeKey('[pages/stores/pages/store] Create Store'));
  }

  abstract _getEntity(id: string): Observable<Entity>;
  abstract _createEntity(entity: Entity): Promise<Entity>;
  abstract _updateEntity(entity: Entity): Promise<void>;

  abstract get loading(): LoadingService;
  abstract get snackBar(): SnackBarService;

}
