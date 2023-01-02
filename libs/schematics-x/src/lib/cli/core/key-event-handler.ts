type Fn = (self: any) => void;

export class KeyEventHandler {
  private keyNameMap = new Map<string, Fn>();
  private defaultFn: Fn;

  registerDefault(fn: Fn) {
    this.defaultFn = fn;
  }

  registerByName(name: string, fn: Fn) {
    this.keyNameMap.set(name, fn);
  }

  handle(self, event: {name?: string}) {
    if (event?.name) {
      return this.keyNameMap.get(event.name)?.(self);
    } else {
      return this.defaultFn?.(self);
    }
  }
}

export const KEY_EVENT_HANDLER = '__keyEventHandler__';

export const KeyBinding = (param?: {name?: string}) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const handler = target[KEY_EVENT_HANDLER] ??= new KeyEventHandler();
    const originalMethod = descriptor.value;
    const fn = (self, ...args: any[]) => {
      return originalMethod.apply(self, args);
    };

    if (param?.name) {
      handler.registerByName(param.name, fn);
    } else {
      handler.registerDefault(fn);
    }
    
    return descriptor;
  };
};
