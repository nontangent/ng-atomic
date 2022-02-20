import { AfterViewInit, Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[iosSafariScrollBuggyfill]'
})
export class IosSafariScrollBuggyfillDirective implements AfterViewInit {

  ngAfterViewInit(): void {
    // this.el.nativeElement.addEventListener('touchmove', (e: Event) => {
    //   e.preventDefault();
    // }, {passive: false});
  }

  @HostListener('touchmove', ['$event'])
  onTouchmove(event: Event) {
    event.preventDefault();
  }

}
