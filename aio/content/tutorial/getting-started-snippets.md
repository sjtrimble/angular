
|Symbol   |Name   |Example   |
|---|---|---|
|{{ }}   |interpolation   |`<p>Welcome to {{storeName}}</p>`   |
|[ ]   |property binding   |`<img [src]="sourceUrl">`   |
|( )   |event binding   |`<button (hover)="doHover()">Buy</button>`   |
|*ngIf   |ngIf   |`<div *ngIf="products.length < 1">No products are currently available</div>`   |
| *ngFor  |ngFor   |`<div *ngFor="let product of products">{{product.name}}</div>`   |

There are many more things you can do using Angular's template syntax that aren't show here. You can see and play with each of these in the embedded examples below.