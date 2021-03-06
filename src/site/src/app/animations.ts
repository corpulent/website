import { animate, state, style, transition, trigger } from '@angular/animations';

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('200ms ease', style({ transform: 'translateX(0%)' }))
  ]),
  transition(':leave', [
    animate('200ms ease', style({ transform: 'translateX(100%)' }))
  ])
]);

export const slideInLeft = trigger('slideInLeft', [
  state('open', style({
    left: '0',
    transform: 'translateX(0)'
  })),
  state('closed', style({
    left: '0',
    transform: 'translateX(-100%)'
  })),
  transition('open <=> closed', animate('100ms ease'))
]);

export const fadeInOut = trigger('thankyouState', [
  state('false', style({
    opacity: 1
  })),
  state('true', style({
    opacity: 0
  })),
  transition('false => true', animate('200ms ease-out')),
  transition('true => false', animate('200ms ease-in'))
]);
