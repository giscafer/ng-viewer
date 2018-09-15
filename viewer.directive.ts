/**
 * Created by giscafer on 2017/09/21.
 * 基于viewer.js封装
 */
import {
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef, HostListener,
  Input,
  NgModule,
  Renderer2,
  NgZone
} from "@angular/core";
import { CommonModule } from "@angular/common";

/* 动态获取接口异步返回的图片*/
@Directive({
  selector: '[viewer-content]',
})
export class ViewerContentDirective {

  nativeElement: HTMLElement;

  constructor(private _el: ElementRef) {
    this.nativeElement = this._el.nativeElement;
  }

}

@Directive({
  selector: '[yzt-viewer]'
})
export class YZTViewerDirective {

  @Input() originalAttr: string = "name";

  @ContentChild('content') content: ElementRef;

  @ContentChildren(ViewerContentDirective)
  set _imgContents(value) {
    this.imgContents = value;
    this.renderContent();
  }

  viewer: any;
  imgContents;
  nativeElement: HTMLElement;

  constructor(private _elementRef: ElementRef, private ngZone: NgZone) {
    this.nativeElement = this._elementRef.nativeElement;

  }

  ngOnInit() {
    this.renderContent();
  }

  /**
   * 如果img动态增加，则动态渲染
   */
  renderContent() {
    let nativeEl = this.nativeElement;
    if (this.content) {
      nativeEl = this.content.nativeElement;
    }
    let imgs = nativeEl.getElementsByTagName('img');
    this.ngZone.runOutsideAngular(() => {
      if (imgs.length) {
        if (this.viewer) {
          this.viewer.destroy();
        }
        this.viewer = new Viewer(this.nativeElement, {
          url: this.originalAttr,
        });
        this.viewer.play();
      }
    });
    // setTimeout(() => {
    //   let imgs = nativeEl.getElementsByTagName('img');
    //   if (imgs.length) {
    //     if (this.viewer) {
    //       this.viewer.destroy();
    //     }
    //     this.viewer = new Viewer(this.nativeElement, {
    //       url: this.originalAttr,
    //     });
    //   }
    // }, 500);
  }

  ngOnDestroy(): void {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }
}

@NgModule({
  declarations: [
    YZTViewerDirective, ViewerContentDirective
  ],
  exports: [YZTViewerDirective, ViewerContentDirective],
  imports: [
    CommonModule
  ]
})
export class YZTViewerDirectiveModule {
}
