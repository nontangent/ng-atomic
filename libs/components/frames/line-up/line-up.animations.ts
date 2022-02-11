import { animate, query, sequence, state, style, transition, trigger, group } from '@angular/animations';

const visibleHiddenAnimation = trigger('visibleHidden', [
  state('visible', style({
    width: '100%',
  })),
  state('hidden', style({
    display: 'none',
    width: '0%',
  })),
  transition('visible => hidden', [
    animate('0.5s', style({ width: '0%' })),
    style({display: 'none'}),
  ]),
  transition('hidden => visible', [
    sequence([
      style({ display: 'inherit' }),
      animate('0.5s', style({ width: '100%' })),
    ]),
  ]),
]);

const routeAnimation = trigger('pageChange', [
  state('Next', style({
    position: 'relative',
    width: '100%',
  })),
  state('NextWithMainPage', style({
    position: 'relative',
    width: '100%',
  })),
  state('Blank', style({
    position: 'relative',
    display: 'none',
  })),
  transition('Blank => Next', [
    query(':enter', [animate('0.5s')], { optional: true }),
    sequence([
      style({ display: 'inherit', width: '100%' }),
      animate('0.5s'),
    ]),
  ]),
  transition('Blank => NextWithMainPage', [
    query(':enter', [animate('0.5s')], { optional: true }),
    sequence([
      style({ display: 'inherit', width: '100%' }),
      animate('0.5s'),
    ]),
  ]),
  transition('Next => Blank', group([
    query(':leave', animate('0.5s', style({width: '100%'})), { optional: true }),
    sequence([
      style({position: 'absolute', display: 'block', left: '0%'}),
      animate('0.5s', style({left: '100%'})),
    ]),
  ])),
  transition('NextWithMainPage => Blank', group([
    query(':leave', animate('0.5s', style({width: '100%'})), { optional: true }),
    sequence([
      style({position: 'absolute', display: 'block', left: '100%'}),
      animate('0.5s', style({})),
    ]),
  ])),
]);

export const LINE_UP_ANIMATIONS = [
  visibleHiddenAnimation,
  routeAnimation,
];