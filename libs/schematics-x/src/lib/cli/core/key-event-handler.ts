type Fn = () => void;

export class KeyEventHandler {
  private keyNameMap = new Map<string, Fn>();
  private defaultFn: Fn;

  registerDefault(fn: Fn) {
    this.defaultFn = fn;
  }

  registerByName(name: string, fn: Fn) {
    this.keyNameMap.set(name, fn);
  }

  handle(event: {name?: string}) {
    if (event?.name) {
      return this.keyNameMap.get(event.name)?.();
    } else {
      return this.defaultFn?.();
    }
  }
}

export const KEY_EVENT_HANDLER = '__keyEventHandler__';

export function KeyBinding(param?: {name?: string}) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const handler = target[KEY_EVENT_HANDLER] ??= new KeyEventHandler();
    const originalMethod = descriptor.value;
    const fn = function (...args: any[]) {
      return originalMethod.apply(this, args);
    };

    if (param?.name) {
      handler.registerByName(param.name, fn);
    } else {
      handler.registerDefault(fn);
    }
    
    return descriptor;
  };
};
