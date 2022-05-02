import { Injectable } from '@nestjs/common';
import { atom } from '@ng-atomic/schematics/atomic-component';
import { execSync } from 'child_process';

@Injectable()
export class AppService {

  genAtomicComponent(type: string, name: string) {
    const collection = `./dist/libs/schematics/collection.json`;
    const command = [
      `ng`, `g`, `${collection}:${type}`,
      `${name}`,
      `--project components`,
      `--path ../${type}s`
    ].join(' ');
    const stdout = execSync(command).toString();
    return {stdout};
  }

  deploy() {
    
  }
}
