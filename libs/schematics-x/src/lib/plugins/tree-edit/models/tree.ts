import { omit } from 'lodash';

export function reduceTree<T extends ExpandTreeNode>(tree: T, expandedOnly = true): T[] {
  if (expandedOnly && !tree.isExpanded) return [tree];
  return [tree, ...tree.children.reduce((acc, child) => [...acc, ...reduceTree(child, expandedOnly)], [])];
}

export class TreeNode {
  parent = null;
  name: string;
  children: (typeof this)[] = [];

  get root(): typeof this {
    return this.parent ? this.parent.root : this;
  }

  get depth(): number {
    return this.parent ? this.parent.depth + 1 : 0;
  }

  get hasChildren(): boolean {
    return !!this.children.length;
  };

  static from(obj: Partial<TreeNode>): any {
    return Object.assign(new this(), {...obj});
  }

  add(node: typeof this) {
    node.parent = this;
    this.children.push(node);
  }
}

export class ExpandTreeNode extends TreeNode {
  private _isExpanded = true;

  get isExpanded(): boolean {
    if(!this.hasChildren) return false;
    return this._isExpanded;
  }

  set isExpanded(value: boolean) {
    this._isExpanded = value;
  }

  get index(): number {
    return reduceTree(this.root).indexOf(this);
  }

  expand() {
    return this.isExpanded = true;
  }

  collapse(): this {
    if (!this.isExpanded && this.parent) {
      return this.parent.collapse();
    }
    this.isExpanded = false;
    return this;
  }

  toObj() {
    return omit({
      name: this.name,
      isExpanded: this.isExpanded,
      children: this.children.map(child => child.toObj())
    }, ['parent']);
  }
}

export function cloneTree(tree: SelectableTreeNode, parent = null): SelectableTreeNode {
  const cloned = SelectableTreeNode.from({...tree});
  cloned.parent = parent;
  cloned.children = tree.children.map(child => cloneTree(child, cloned));
  return cloned;
}


export class SelectableTreeNode extends ExpandTreeNode {
  private _isSelected = true;

  get isSelected(): boolean {
    if(this.hasChildren) {
      return this.children.some((child) => child.isSelected);
    }
    return this._isSelected;
  }

  set isSelected(value: boolean) {
    if(this.hasChildren) {
      this.children.forEach((child) => value ? child.select() : child.unselect());
    } else {
      this._isSelected = value;
    }
  }

  toggle() {
    return this.isSelected ? this.unselect() : this.select();
  }

  select() {
    this.isSelected = true;
  }

  unselect() {
    this.isSelected = false;
  }

  clone(): SelectableTreeNode {
    return cloneTree(this);
  }
}