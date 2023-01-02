import { Inject, Injectable, InjectionToken, Injector, NxModuleFactory, Optional, resolveAndCreate } from "@nx-ddd/core";
import { Provider } from "@nx-ddd/core/di/interface/provider";
import { registerPrompt } from "inquirer";
import { GlobalProvidersManager } from "../../core";
import { InquirerAdapter } from "../adapters/inquirer";
import { Prompter, PrompterModule } from "../prompters";
import { SX_SCREEN } from "../renderer";

export class PrompterFactory {
  constructor(
    private prompterType: any,
    private nxModuleDef: any,
  ) { }
  
  create(injector: Injector) {
    const factory = new NxModuleFactory(this.nxModuleDef);
    const nxModuleRef = factory.create(injector);
    return nxModuleRef.injector.get(this.prompterType);
  }
}

export function buildPrompterFactory(prompterType, nxModuleDef) {
  return new PrompterFactory(prompterType, nxModuleDef);
}

export type PromptRegister = () => {name: string, prompterType: any, nxModuleDef: any};
export const PROMPTS_REGISTER = new InjectionToken<PromptRegister>('PromptsRegister');

export function createInjector(providers: Provider[] = [], parentInjector?: Injector) {
  return resolveAndCreate(providers, parentInjector);
}


@Injectable()
export class PromptsRegistry {
  constructor(
    protected injector: Injector,
    @Optional() @Inject(PROMPTS_REGISTER) registers?: PromptRegister[]
  ) {
    registers ??= []
    registers.forEach((register) => {
      const { name, prompterType, nxModuleDef } = register();
      this.register(name, prompterType, nxModuleDef);
    });
  }

  register(name: string, PrompterType: any, PrompterModule) {
    const factory = buildPrompterFactory(PrompterType, PrompterModule);

    registerPrompt(name, InquirerAdapter((screen) => {
      const injector = createInjector([{ provide: SX_SCREEN, useValue: screen }], this.injector);
      return factory.create(injector);
    }));
  }
}

// GlobalProvidersManager.register([
//   {
//     provide: PROMPTS_REGISTER,
//     useValue: () => ({name: 'suggest', prompterType: Prompter, nxModuleDef: PrompterModule}),
//     multi: true,
//   },
//   {
//     provide: PROMPTS_REGISTER,
//     useValue: () => ({name: 'suggest', prompterType: HistoryInputPrompter, nxModuleDef: HistoryInputModule}),
//     multi: true,
//   },
// ]);