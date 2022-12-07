interface Tree {
  node: string;
  children: Tree[];
}

export class FilePathsReducer {
  reduce(paths: string[], target: number): string[] {
    if (paths.length <= target) {
      return paths;
    }
    return this.samplingFiles(paths, target).sort();
  }

  private convertPathsToTree(paths: string[]): Tree {
    const tree: Tree = {
      node: '',
      children: [],
    };
    for (const path of paths) {
      let current = tree;
      const nodes = path.split('/');
      for (const node of nodes) {
        if (node === '') {
          continue;
        }
        let child = current.children.find(child => child.node === node);
        if (!child) {
          child = {
            node,
            children: [],
          };
          current.children.push(child);
        }
        current = child;
      }
    }
    return tree;
  }
  
  // Not use Recruitment
  private randomWalkTree(tree: Tree): string {
    let current = tree;
    let path = '';
    while (current.children.length > 0) {
      const index = Math.floor(Math.random() * current.children.length);
      current = current.children[index];
      path += `/${current.node}`;
    }
    return path;
  }
  
  private samplingFiles(paths: string[], target: number): string[] {
    const tree = this.convertPathsToTree(paths);
    const samples = new Set<string>();
    for (let i = 0; samples.size < target; i++) {
      samples.add(this.randomWalkTree(tree));
    }
    return [...samples];
  }
}

