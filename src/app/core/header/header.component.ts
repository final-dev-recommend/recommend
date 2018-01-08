import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { MatIconModule,MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[
    MediaMatcher
  ]
})
export class HeaderComponent implements OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    iconRegistry.addSvgIcon('logo',sanitizer.bypassSecurityTrustResourceUrl('/assets/logo.svg'));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    iconRegistry.addSvgIcon('title',sanitizer.bypassSecurityTrustResourceUrl('/assets/title2.svg'));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
