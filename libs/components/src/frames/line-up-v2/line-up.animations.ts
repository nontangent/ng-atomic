import { animate, query, sequence, state, style, transition, trigger, group } from '@angular/animations';

const MAIN_ANIMATION = trigger('modeChangeForMain', [
  state('*', style({
    width: '100%',
  })),
  state('Next', style({
    display: 'none',
    width: '0%',
  })),
  transition('* => Next', [
    animate('0.5s', style({ width: '0%' })),
    style({display: 'none'}),
  ]),
  transition('Next => *', [
    sequence([
      style({ display: 'inherit' }),
      animate('0.5s', style({ width: '100%' })),
    ]),
  ]),
]);

const NEXT_ANIMATION = trigger('modeChangeForNext', [
  state('Next', style({
    position: 'relative',
    width: '100%',
  })),
  state('Both', style({
    position: 'relative',
    width: '100%',
  })),
  state('Main', style({
    position: 'relative',
    display: 'none',
  })),
  transition('Main => Next', [
    query(':enter', [animate('0.5s')], { optional: true }),
    sequence([
      style({ display: 'inherit', width: '100%' }),
      animate('0.5s'),
    ]),
  ]),
  transition('Main => Both', [
    query(':enter', [animate('0.5s')], { optional: true }),
    sequence([
      style({ display: 'inherit', width: '100%' }),
      animate('0.5s'),
    ]),
  ]),
  transition('Next => Main', group([
    query(':leave', animate('0.5s', style({width: '100%'})), { optional: true }),
    sequence([
      style({position: 'absolute', display: 'block', left: '0%'}),
      animate('0.5s', style({left: '100%'})),
    ]),
  ])),
  transition('Both => Main', group([
    query(':leave', animate('0.5s', style({width: '100%'})), { optional: true }),
    sequence([
      style({position: 'absolute', display: 'block', left: '100%'}),
      animate('0.5s', style({})),
    ]),
  ])),
]);

export const LINE_UP_ANIMATIONS = [MAIN_ANIMATION, NEXT_ANIMATION];
