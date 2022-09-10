import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

export type Mode = 'create' | 'update'

export interface EntityState<Entity> {
  mode: Mode;
  entityId: string;
  entity: Entity;
}

export const tryCatch = (promise: Promise<any>) => new Promise(async (resolve, reject) => {
  try { resolve(await promise); } catch (error) { reject(error); }
});

export abstract class EntityStore<S extends EntityState<Entity>, Entity> extends ComponentStore<S> {
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
    return tryCatch(this._createEntity(entity));
  }

  updateEntity(value: Partial<Entity>) {
    const entity: Entity = ({...this.entity, ...value});
    return this._updateEntity(entity)
  }

  abstract _getEntity(idOrParams: string): Observable<Entity>;
  abstract _createEntity(entity: Entity): Promise<Entity>;
  abstract _updateEntity(entity: Entity): Promise<void>;

}
