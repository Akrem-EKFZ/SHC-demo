import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-iphone-frame',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="h-screen w-screen flex items-center justify-center bg-gray-100 overflow-hidden">
  <div class="transform scale-[0.8] origin-center">
    <div class="relative w-[430px] h-[932px] rounded-[60px] border-[14px] border-black bg-black shadow-2xl overflow-hidden flex flex-col">

      <!-- 📱 Status Bar (top) -->
      <div class="w-full px-5 pt-4 pb-2 flex justify-between items-center text-[13px] text-white z-50 font-medium bg-black">
        <!-- Static Time -->
        <div>9:41</div>

        <!-- Right-side icons -->
        <div class="flex items-center space-x-2">
          <!-- Signal bars -->
          <div class="flex items-end space-x-0.5 h-3">
            <div class="w-0.5 h-1 bg-white"></div>
            <div class="w-0.5 h-1.5 bg-white"></div>
            <div class="w-0.5 h-2 bg-white"></div>
            <div class="w-0.5 h-2.5 bg-white"></div>
          </div>

          <!-- 5G -->
          <div class="text-xs tracking-tight">5G</div>

          <!-- Battery -->
          <div class="flex items-center">
            <div class="w-5 h-2 border border-white rounded-sm flex items-center">
              <div class="w-3/4 h-full bg-white"></div>
            </div>
            <div class="w-0.5 h-1.5 bg-white ml-0.5 rounded-sm"></div>
          </div>
        </div>
      </div>

      <!-- 🌐 Iframe (content area) -->
      <div class="flex-1 overflow-y-auto z-10">
        <iframe
          [src]="sanitizedUrl"
          class="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        ></iframe>
      </div>

    </div>
  </div>
</div>


`
})
export class IphoneFrameComponent {
  isMobile = false;
   targetLink = 'https://akrem-ekfz.github.io/SHC/'; // Replace this
  sanitizedUrl: SafeResourceUrl;
  isBrowser: boolean;
  currentTime: string = '';

updateTime() {
  const now = new Date();
  this.currentTime = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}


  // constructor(
  //   private sanitizer: DomSanitizer,
  //   @Inject(PLATFORM_ID) private platformId: Object
  // ) {
  //   this.isBrowser = isPlatformBrowser(this.platformId);
  //   this.sanitizedUrl = this.sanitizeUrl(this.targetLink);
  // }
  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.sanitizedUrl = this.sanitizeUrl(this.targetLink);
  }
  

  @HostListener('window:resize')
  onResize() {
    if (this.isBrowser) {
      this.checkMobile();
    }
  }

  
  ngOnInit() {
    if (!this.isBrowser) return;
  
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const fullPath = event.urlAfterRedirects; // e.g. "/cockpit-1"
      const target = `https://akrem-ekfz.github.io/SHC/${fullPath}`;
     
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(target);
    });
  }
  
  

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
