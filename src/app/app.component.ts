import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IphoneFrameComponent } from './iphone-frame/iphone-frame.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IphoneFrameComponent],
   template: `<app-iphone-frame />`
 
})
export class AppComponent {
  title = 'iphone-frame-app';
}
