/**
 * Created by giscafer on 2017/09/21.
 * 基于viewer.js封装
 */
import {
    Directive,
    ElementRef,
    Renderer,
    Input,
    Output,
    HostListener,
    OnChanges,
    OnDestroy,
    SimpleChange,
    EventEmitter, OnInit, NgModule, SimpleChanges, Renderer2, AfterViewInit, ContentChild
} from "@angular/core";
import { Http } from "@angular/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

declare var Viewer;

@Directive({
    selector: '[viewer]'
})
export class ViewerDirective implements OnInit, OnDestroy {
    @Input()
    originalAttr: string = "data-original";
    @ContentChild('content') content: ElementRef;

    viewer: any;
    nativeElement: HTMLElement;

    constructor(private _elementRef: ElementRef,
        private _render: Renderer2) {
        this.nativeElement = this._elementRef.nativeElement;

    }
    
    ngOnInit() {
        let nativeEl = this.nativeElement;
        if (this.content) {
            nativeEl = this.content.nativeElement;
        }
        setTimeout(() => {
            let imgs = nativeEl.getElementsByTagName('img');
            if (imgs.length) {
                imgs[0].onload = () => {
                    this.viewer = new Viewer(this.nativeElement, {
                        url: this.originalAttr,
                    });
                }
            }
        });
    }

    ngOnDestroy(): void {
        if (this.viewer) {
            this.viewer.destroy();
        }
    }
}
