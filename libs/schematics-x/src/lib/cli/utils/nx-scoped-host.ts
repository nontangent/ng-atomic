import { Path } from '@angular-devkit/core';
import { NxScopedHost as _NxScopedHost } from 'nx/src/adapter/ngcli-adapter';
import { map, Observable } from 'rxjs';
import { omit } from 'lodash'

export class NxScopedHost extends _NxScopedHost {
  read(path: Path): Observable<ArrayBuffer> {
    return super.read(path).pipe(
      map((buffer) => {
        if (path.endsWith('angular.json')) {
          const json = compatAngularJson(JSON.parse(arrayBufferToStr(buffer)));
          return strToArrayBuffer(JSON.stringify(json));
        } else if(path.endsWith('project.json')) {
          const json = compatProjectConfig(JSON.parse(arrayBufferToStr(buffer)));
          return strToArrayBuffer(JSON.stringify(json));
        } else {
          return buffer;
        }
      }),
    );
  }
}

function compatAngularJson(angularJson: any): any {
  return {
    ...omit(angularJson, ['generators']),
    projects: Object.entries(angularJson.projects).reduce((acc, [name, config]) => ({
      ...acc, [name]: compatProjectConfig(config),
    }), {}),
  };
}

function compatProjectConfig(config: any): any {
  return omit(config as any, ['$schema', 'tags', 'configFilePath', 'implicitDependencies']);
}

function arrayBufferToStr(arrayBuffer: ArrayBuffer): string {
  return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
}

function strToArrayBuffer(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
