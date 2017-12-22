/**
 * Created by giscafer on 2017/09/21.
 * 基于viewer.js封装
 */
import {
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Renderer2
} from "@angular/core";
import {CommonModule} from "@angular/common";

declare var Viewer;


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
  selector: '[viewer]'
})
export class ViewerDirective implements OnInit, OnDestroy {
  @Input()
  originalAttr: string = "name";
  @ContentChild('content') content: ElementRef;

  @ContentChildren(ViewerContentDirective)
  set _imgContents(value) {
    this.imgContents = value;
    this.renderContent(true);
  }

  viewer: any;
  imgContents;
  nativeElement: HTMLElement;

  constructor(private _elementRef: ElementRef,
              private _render: Renderer2) {
    this.nativeElement = this._elementRef.nativeElement;

  }

  ngOnInit() {
    this.renderContent();
  }

  /**
   * 如果img动态增加，则动态渲染
   * @param {boolean} flag 是否动态增加渲染
   */
  renderContent(flag?: boolean) {
    let nativeEl = this.nativeElement;
    if (this.content) {
      nativeEl = this.content.nativeElement;
    }
    setTimeout(() => {
      let imgs = nativeEl.getElementsByTagName('img');
      if (imgs.length) {
        if (this.viewer) {
          this.viewer.destroy();
        }
        // if (!flag) {
        //   imgs[0].onload = () => {
        //     this.viewer = new Viewer(this.nativeElement, {
        //       url: this.originalAttr,
        //     });
        //   }
        // } else {
        //   imgs[imgs.length-1].onload = () => {
        //     this.viewer = new Viewer(this.nativeElement, {
        //       url: this.originalAttr,
        //     });
        //   }
        // }
        this.viewer = new Viewer(this.nativeElement, {
          url: this.originalAttr,
        });
      }
    },500);
  }

  ngOnDestroy(): void {
    if (this.viewer) {
      this.viewer.destroy();
    }
  }
}

@NgModule({
  declarations: [
    ViewerDirective, ViewerContentDirective
  ],
  exports: [ViewerDirective, ViewerContentDirective],
  imports: [
    CommonModule
  ]
})
export class ViewerDirectiveModule {
}
