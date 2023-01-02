export class BasePrompter {

}

export interface OnInit {
  sxOnInit(): void | Promise<void>;
}

export interface OnPrompt {
  sxOnPrompt(prompt: string): void | Promise<void>;
}

export interface OnAnswer<T = any> {
  sxOnAnswer(answer: T): T | Promise<T>;
}

export interface OnDestroy {
  sxOnDestroy(): void | Promise<void>;
}
