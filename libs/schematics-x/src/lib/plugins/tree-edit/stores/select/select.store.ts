import { Injectable } from "@nx-ddd/core";
import { Logger } from "../../../../cli/logger";
import { combineLatest, distinctUntilChanged, map, Observable, tap } from "rxjs";
import { PrompterStore } from "../../../../cli/prompters/base";
import { reduceTree, SelectableTreeNode as TreeNode } from "../../models/tree";
import { TreeBuilder } from "../../services/tree-builder";

interface Cursor {
  rows: number;
  cols: number;
}

function actTree<T>(tree: TreeNode, cursor: Cursor, callback: (tree: TreeNode) => T): T {
  const target = reduceTree(tree)?.[cursor.rows-1];
  return callback(target);
}

const data = {
  name: "chain 'Create Web Application with Firebase'",
  children: [
    {
      name: "chain 'Create Angular Application with Firebase'",
      children: [
        "@nrwl/angular:application app",
        "@angular/fire:ng-add --project app",
        {
          name: "chain 'create `user` page'",
          children: [
            "@ng-atomic/schematics:page user --project app",
            "instruct -t pages/pages/module.ts 'Add `user` to routes'",
          ],
        },
        {
          name: "chain 'create `settings` page'",
          children: [
            "@ng-atomic/schematics:page settings --project app",
            "instruct -t pages/pages/module.ts 'Add `settings` to routes'",
          ],
        },
      ],
    },
    {
      name: "chain 'Create NestJS Application with Firebase'",
      children: [
        "@nrwl/nest:application api",
      ],
    },
  ],
};

export interface SelectState {
  tree: TreeNode;
  cursor: { rows: number, cols: number };
  length: number;
  selectedTree: TreeNode;
}


@Injectable()
export class TreeSelectStore extends PrompterStore<SelectState> {
  tree$ = this.select(state => state.tree).pipe(
    distinctUntilChanged((pre, cur) => {
      return JSON.stringify(pre.toObj()) === JSON.stringify(cur.toObj())
    }),
    tap(() => this.logger.debug('tree changed!'))
  );
  cursor$ = this.select(state => state.cursor).pipe(distinctUntilChanged())
  length$ = this.select(state => state.length);
  selectedTree$ = this.select(state => state.selectedTree);

  get cursor() {
    return this.state.cursor;
  }

  get tree() {
    return this.state.tree;
  }

  get length() {
    return this.state.length;
  }

  get selectedTree() {
    return this.state.selectedTree;
  }

  constructor(
    builder: TreeBuilder,
    protected logger: Logger,
  ) {
    const initialTree = builder.build(data);
    super({
      tree: initialTree,
      cursor: {rows: 1, cols: 0},
      length: reduceTree(initialTree).length,
      selectedTree: reduceTree(initialTree)[0],
    });

    combineLatest({
      tree: this.tree$,
      cursor: this.cursor$,
    }).subscribe(({tree, cursor}) => {
      this.patchState({selectedTree: reduceTree(tree)[cursor.rows-1]});
    });

    // this.getSelectedTree(combineLatest({tree: this.tree$, cursor: this.cursor$}));
    this.getTreeLength(this.tree$);
  }

  setCursor(cursor: Cursor) {
    this.patchState({cursor});
  }

  setCursorRows(rows: number) {
    this.setCursor({...this.cursor, rows});
  }

  setTree(tree: TreeNode) { 
    this.patchState({tree});
  }

  toggleNode() {
    const tree = this.tree.clone();
    actTree(tree, this.cursor, node => node.toggle());
    this.setTree(tree);
  }

  expandNode() {
    const tree = this.tree.clone();
    actTree(tree, this.cursor, node => node.expand());
    this.setTree(tree);
  }

  collapseNode() {
    const tree = this.tree.clone();
    actTree(tree, this.cursor, node => {
      const curRows = reduceTree(tree).indexOf(node.collapse()) + 1;
      this.setCursorRows(curRows);
    });
    this.setTree(tree);
  }

  getSelectedTree = this.effect(
    tap(({tree, cursor}: {tree: TreeNode, cursor: Cursor}) => {
      this.patchState({selectedTree: reduceTree(tree)[cursor.rows-1]});
    }),
  );

  getTreeLength = this.effect(tap((tree: TreeNode) => this.patchState({length: reduceTree(tree).length})));

}
