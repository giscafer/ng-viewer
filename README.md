# ng-viewer
An angular directive for [viewer.js](https://github.com/fengyuanchen/viewerjs)

[Online demo](https://1ziton.github.io/primeng-ext/#/viewer)

![](https://user-images.githubusercontent.com/8676711/97245953-205a7880-1837-11eb-96b5-6fb6becf2c6e.png)

## Usage

 - add viewer.js and viewer.css to the project

 - add ViewerDiretive to NgModules.declarations

 - add [viewer] attribute to the html


 example:

 ```ts

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'viewer-demo-basic',
    template: `
    <div id="galley" viewer>
        <ul class="pictures">
        <li><img data-original="./assets/showcase/images/demo/pictures/tibet-1.jpg" src="./assets/showcase/images/demo/pictures/thumbnails/tibet-1.jpg" alt="Cuo Na Lake"></li>
        <li><img data-original="./assets/showcase/images/demo/pictures/tibet-2.jpg" src="./assets/showcase/images/demo/pictures/thumbnails/tibet-2.jpg" alt="Tibetan Plateau"></li>
        <li><img data-original="./assets/showcase/images/demo/pictures/tibet-3.jpg" src="./assets/showcase/images/demo/pictures/thumbnails/tibet-3.jpg" alt="Jokhang Temple"></li>
        <li><img data-original="./assets/showcase/images/demo/pictures/tibet-4.jpg" src="./assets/showcase/images/demo/pictures/thumbnails/tibet-4.jpg" alt="Potala Palace 1"></li>
        <li><img data-original="./assets/showcase/images/demo/pictures/tibet-5.jpg" src="./assets/showcase/images/demo/pictures/thumbnails/tibet-5.jpg" alt="Potala Palace 2"></li>
        </ul>
    </div>
  `,
    styles: [`
        .pictures {
            margin: 0;
            padding: 0;
            height: 200px;
            list-style: none;
          }
        
        .pictures > li {
            float: left;
            width: 150px;
            height: 150px;
            margin: 0 -1px -1px 0;
            border: 1px solid transparent;
            overflow: hidden;
        }
        
        .pictures > li > img {
            width: 100%;
            cursor: -webkit-zoom-in;
            cursor: zoom-in;
        }
    `]
})
export class ViewerDemoBasicComponent {


}

```
