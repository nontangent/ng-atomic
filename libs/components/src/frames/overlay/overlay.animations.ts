import { trigger, transition, style, query, group, animateChild, animate } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('IndexPage => NextPage', [
    query(':enter', [
      style({
        position: 'absolute',
        top: '0px',
        left: '0px'
      })
    ]),
    query(':enter', [style({ left: '100%' })]),
    query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
    query(':enter', animateChild()),
  ]),

  transition('NextPage => IndexPage', [
      query(':leave', [
        style({
          position: 'absolute',
          top: '0px',
          left: '0px'
        })
      ]),
      query(':leave', [style({ left: '0%' })]),
      query(':leave', [animate('300ms ease-in', style({ left: '100%' }))]),
      query(':leave', animateChild()),
  ])

]);