import { Injectable } from "@nx-ddd/core";
import { logger } from "../../../../cli/logger";
import { SelectableTreeNode as TreeNode } from "../../models/tree";

@Injectable()
export class TreeBuilder {
  build(data: string | {name: string, children: any[]}): TreeNode {
    let tree: TreeNode;
    if (typeof data === 'string') {
      tree = TreeNode.from({name: data});
    } else {
      tree = TreeNode.from({name: data.name});
      data.children.map(child => this.build(child)).forEach(node => tree.add(node));
    }
    return tree;
  }
}
