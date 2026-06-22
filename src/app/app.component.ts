import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  animate,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeSlide', [
      transition('* => SearchPage, * => ProductPage', [
        query(
          ':enter',
          [
            style({
              position: 'fixed',
              zIndex: 10,
              inset: 0,
              width: '100%',
              height: '100vh',
              overflowY: 'auto',
              background: '#ffffff',
              transform: 'translate3d(100vw, 0, 0)',
              willChange: 'transform'
            }),

            animate(
              '420ms cubic-bezier(0.22, 1, 0.36, 1)',
              style({
                transform: 'translate3d(0, 0, 0)'
              })
            )
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class AppComponent {
  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['animation'];
  }
}
