import { Routes } from '@angular/router';
import { IphoneFrameComponent } from './iphone-frame/iphone-frame.component';

export const routes: Routes = [
   
    { path: '', component: IphoneFrameComponent, pathMatch: 'full' },
  
    
    { path: ':iframePath', component: IphoneFrameComponent },
  ];