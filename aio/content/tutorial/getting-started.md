# Getting Started with Angular

Angular is the modern web developer's platform. Angular gives you the tools and the ecosystem to allow you to build and scale applications using web technologies.

Angular has many advanced features that take care of everything from internationalization and mobile to service workers and server side rendering, but this tutorial will walk you through the basics that will help you get started as a productive Angular developer.

If you are new to web development or programming in general, read our requirements for getting started with Angular.

## Components

Angular applications are composed of a tree of components that you create. Components act very similarly to HTML elements and can be given state or generate events. 

If we imagine a normal shopping experience, like the one on express.google.com:

<figure>
  <img src='generated/images/guide/toh/component-structure.gif' alt="Angular applications are broken down into a tree of components like on express.google.com">
</figure>

We can think of this as an application made up of a tree of components.

* app-root
  * app-top-bar
  * app-side-nav
  * app-product-list
    * app-product-carousel
    * app-product-preview
    * app-product-preview
    * app-product-preview

There are many valid ways you can break down your application into components. In this tutorial, we won't be separating our top bar, side nav, or product list into components.

Each component in Angular has a template and a class. The template determines what will be rendered to the screen, and the class determines the data and functionality of the component. You can nest components by referring to another component's selector in the same way that you would use an HTML element. If you have an `app-product-preview` component, you can nest one with `<app-product-preview><app-product-preview>`.


## Live Editing with StackBlitz

To demonstrate the use of Angular, we'll open an empty application using StackBlitz. StackBlitz allows us to get started building an Angular application without needing any local tooling or installs. Once you are comfortable with the basics, we recommend downloading and installing the [Angular CLI](https://cli.angular.io) for local development.

[Get your own environment](https://stackblitz.com/fork/angular)


## Template Syntax

There are 5 things you can do within an Angular template to start to control the rendering of your component. These extend and build on top of HTML.

|Symbol   |Name   |Example   |
|---|---|---|
|{{ }}   |interpolation   |`<p>Welcome to {{storeName}}</p>`   |
|[ ]   |property binding   |`<img [src]="sourceUrl">`   |
|( )   |event binding   |`<button (hover)="doHover()">Buy</button>`   |
|*ngIf   |ngIf   |`<div *ngIf="products.length < 1">No products are currently available</div>`   |
| *ngFor  |ngFor   |`<div *ngFor="let product of products">{{product.name}}</div>`   |

You can see and play with each of these in our [Angular template](https://stackblitz.com/fork/angular?file=src%2Fapp%2Fapp.component.ts). The root component of an application is called our App Component, we'll begin working here.

### {{ }} Interpolation

Interpolation lets you render the contents of a property of your component as text in your HTML. 

<aio-gs-interpolation></aio-gs-interpolation>

### [ ] Property Binding

Following the mental model of HTML, components have state being given to them. This is accomplished by binding to the property of a component or HTML element.

<aio-gs-property-binding></aio-gs-property-binding>

### ( ) Event Binding

We can listen of standard HTML events, or custom events that we will create later on our components.

<aio-gs-event-binding></aio-gs-event-binding>

### *ngIf

*ngIf is known as a structural directive because it changes which HTML or components are rendered to the user at any given moment. Any directive with a * is called a structural directive and will have similar functionality.

<aio-gs-ng-if></aio-gs-ng-if>

### *ngFor

*ngFor is another structural directive that lets you iterate over a list, rendering the HTML or component once for each item in the list. 

<aio-gs-ng-for></aio-gs-ng-for>

### Summary

At this point you should be able to create your first Angular template, try to play around with these techniques to create HTML. You could create an entire application inside of a single component, but we recommend breaking down an application into smaller components that have fewer responsibilities.

The Angular template syntax is very powerful. To learn about more of the things it can do, see the full [Template Syntax documentation](/guide/template-syntax).

## Tasks

To start building the tutorial application, create a [new project](https://stackblitz.com/fork/angular) in StackBlitz, then complete the 
following tasks below to scaffold out the components for your shopping cart.

* Create a top bar for your application.
* Create a list of product categories as a side menu.
* Create a container for our list of products.

### Create the top bar component

1. Right click on the `app` folder and generate a new component named `top-bar`.
1. Define a `name` property to the `TopBarComponent` class with a value of `My Store`.
1. Update the `TopBarComponent` template to display a welcome message with an interpolation of the `name` property.

<code-tabs>

  <code-pane header="src/app/top-bar/top-bar.component.ts" path="getting-started/src/app/top-bar/top-bar.component.ts">
  </code-pane>

  <code-pane header="src/app/top-bar/top-bar.component.html" path="getting-started/src/app/top-bar/top-bar.component.html" linenums="false">
  </code-pane>

</code-tabs>

Add the `app-top-bar` component to your `app.component.html`.

<code-example header="src/app/app.component.html" path="getting-started/src/app/app.component.1.html" linenums="false" region="top-bar">
</code-example>

### Create the side nav component

The side navigation lists categories for the products in your store.

1. Generate a component named `side-nav`.
1. Define a `categories` property in the `SideNavComponent` as an array with two items: `Phones` and `Shoes`.

<code-example header="src/app/side-nav/side-nav.component.ts" path="getting-started/src/app/side-nav/side-nav.component.ts">
</code-example>

Update the `side-nav.component.html` to display a list of categories using an `NgFor` directive.

<code-example header="src/app/side-nav/side-nav.component.html" path="getting-started/src/app/side-nav/side-nav.component.html" linenums="false">
</code-example>

Add some styles in the `side-nav.component.css` to position the side nav on the left side of the page.

<code-example header="src/app/side-nav/side-nav.component.css" path="getting-started/src/app/side-nav/side-nav.component.css" linenums="false">
</code-example>

<div class="alert is-important">

The styles for each component is scoped so that they do not impact the styles of other components in your application. The `:host` pseudo-class selector targets the styles inside the host component. Read more about these selectors in the [Component Styles Guide](guide/component-styles).

</div>

Add the `app-side-nav` component to your `app.component.html` under the `app-top-bar` component.

## Component Communication

Just like any element in HTML, Angular components can take state, and can emit events. We achieve these by creating Inputs and Outputs as properties in our component class. Below is an example of a component used to display and update a name.

```ts
@Component({
  template: `
    <div>{{name}}</div>

    <button (click)="editName.emit()">Edit</button>
  `
})
export class EditableNameComponent {
  @Input() name: string;
  @Output() editName = new EventEmitter();
}
```

### @Input()

Inputs define what data can be passed INTO your component. Whenever a parent component's property binding is updated, the property you mark with `@Input` will also be updated as a part of Angular's change detection. In the example above, the `name` property is updated when the parent component updates the `name` through a binding.

### @Output()

Outputs are used to create custom events in your component. We create a new EventEmitter and store it as an `@Output()` property of our component. This newly created `EventEmitter` has a method `emit` that you can call whenever your custom event has occurred, in response to some action from the template, or based on some asynchronous process.

By property binding and event binding with a nested component we can build elaborate structures of components that take in state, and give back events.

Read more about these bindings in the [Template Syntax Guide](guide/template-syntax).


## Task

### Create a product preview component

1. Right click on the `app` folder and create a new folder named `products`.
1. In the `products` folder, generate an interface named `product`. 

<code-example header="src/app/products/product.ts" path="getting-started/src/app/products/product.1.ts">
</code-example>

This interface refers to the structure of a product, including its name, description, and other details as needed. It also provides you a consistent way to reference a `Product` throughout your application.

Next, generate a component to display a product preview.

1. Right on the `products` folder and generate a new component named `product-preview`.
1. In the `ProductPreviewComponent` class, add `Input` the imports from the `@angular/core` package.

<code-example header="src/app/products/product-preview/product-preview.component.ts" path="getting-started/src/app/products/product-preview/product-preview.component.ts" region="core-imports">
</code-example>

1. Import the `Product` interface using its path relative to the `product-preview` folder.

<code-example header="src/app/products/product-preview/product-preview.component.ts" path="getting-started/src/app/products/product-preview/product-preview.component.ts" region="product-imports">
</code-example>

Define a property in the `ProductPreviewComponent` class named `product` and use the `Input` decorator on it. Give the `product` a define type using the `Product` interface.

<code-example header="src/app/products/product-preview/product-preview.component.ts" path="getting-started/src/app/products/product-preview/product-preview.component.ts" region="inputs-outputs">
</code-example>

Update the `ProductPreviewComponent` template to display the data received from our `Input`.

<code-example header="src/app/products/product-preview/product-preview.component.html (Product Input)" path="getting-started/src/app/products/product-preview/product-preview.component.1.html">
</code-example>

You can now test the `app-product-preview` component and provide a product with its name and description.

<code-example header="src/app/app.component.1.html (Sample Preview)" path="getting-started/src/app/app.component.1.html" linenums="false" region="product-preview">
</code-example>

## Services

Services are an important part of Angular applications. Services in Angular are a shared instance of a class that can be made available to any part of your application using the [dependency injection system](/guide/dependency-injection).

Services are used to encapsulate data and functionality.

### Creating

To create a service, simply create a class and decorate it with `@Injectable()`.

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {}
```

The service now has defined metadata used for requesting an instance of the service. The `providedIn: 'root'` or `Tree-shakable  provider` syntax provides the Angular compiler information to register the provider globally within Angular's dependency injection.

### Providing

Before you use a service, you must make sure it is provided in your application. 

1st party services are often provided automatically using the `providedIn` metadata as part of the `@Injectable` decorator. 

3rd party services provide services through their `NgModule` definition that you import into your application. 

Angular's HttpClient is an example of how a service is provided through an `NgModule`. First, you import the `HttpClientModule` from the `@angular/common/http` package.

```ts
import { HttpClientModule } from '@angular/common/http';
```

Then you add the `HttpClientModule` to your `AppModule` imports to register its providers globally in your application.

```ts
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ]
})
export class AppModule {}
```

Once the `HttpClientModule` is registered, the `HttpClient` service can be accessed anywhere in your application.

### Accessing

To access a service, you import its type from a package or import path.

```ts
import { HttpClient } from '@angular/common/http';
```

Once the type is imported, supply it to the constructor of your component, service, or `NgModule`.

```ts
@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  constructor(private http: HttpClient) {}
}
```

This is called "injecting" a service and adds it to the properties on the class. Anywhere in the class you can now refer to the service directly by the name you gave it. Read more about Angular's `HttpClient` in the [HttpClient Guide](guide/http-client).

## Tasks

### Create a product service to store products

The product service stores your product list data to share throughout your application.

1. In the `products` folder, generate a service name `Product`.
1. Import the `Observable` type and `of` method from the RxJS library.

<code-example header="src/app/products/product.service.ts (RxJS imports)" path="getting-started/src/app/products/product.service.1.ts" linenums="false" region="rxjs-imports">
</code-example>

Next, import the `Product` interface.

<code-example header="src/app/products/product.service.ts (Product interface)" path="getting-started/src/app/products/product.service.1.ts" linenums="false" region="product-import">
</code-example>

Define a `data` property in the `ProductService` class that contains product list data.
Add a `getAll()` method using the `of` method to return the products from the data property.

<code-example header="src/app/products/product.service.ts (Product Data)" path="getting-started/src/app/products/product.service.1.ts" region="product-data">
</code-example>

The `ProductService` is ready to be injected into many different areas in your application using Angular's dependency injection.

### Display the product list using a service

The products list component displays a listing of each product available in your store with a brief description.

1. In the `products` folder, generate a component named `product-list`.
1. Import the `Observable` type from the `RxJS` library.

<code-example header="src/app/products/product-list/product-list.component.ts (Observable import)" path="getting-started/src/app/products/product-list/product-list.component.ts" region="rxjs-import">
</code-example>

Import the `ProductService` that provides the product data and Product interface.

<code-example header="src/app/products/product-list/product-list.component.ts (Product imports)" path="getting-started/src/app/products/product-list/product-list.component.ts" region="product-imports">
</code-example>

Add a `products$` property in the `ProductListComponent` as an observable array of products.
Inject the `ProductService` into the constructor of the `ProductListComponent` and define the `products$` using the `getAll()` method from the `ProductService`.

<code-example header="src/app/products/product-list/product-list.component.ts (Products Observable)" path="getting-started/src/app/products/product-list/product-list.component.ts" region="products-observable">
</code-example>

<div class="alert is-important">

 **Note:** The `$` used to suffix the `products` property is a convention to denote the variable as an observable
 stream. It's used to easily glance at a property to distinguish it from other class properties. Read more about
 observable streams in the [Observables guide](guide/observables).

</div>

Update the `product-list.component.html` to display the products using an `NgFor` directive, an `AsyncPipe` and the `app-product-preview` component. 

<code-example header="src/app/products/product-list/product-list.component.html (Product List)" path="getting-started/src/app/products/product-list/product-list.component.html">
</code-example>

The `AsyncPipe` used in the template subscribes to the `products$` observable that provides the array of products. The `NgFor` directive iterates over product and binds a `product` to the `app-product-preview`. Learn more about pipes in the [Pipes Guide](guide/pipes).

Add the `app-product-list` component to your `app.component.html` below the `app-side-nav` component.

<code-example header="src/app/app.component.html (Product List)" path="getting-started/src/app/app.component.1.html" region="product-list">
</code-example>

## Router

Up until now, our application hasn't had any variable state or navigation. We'll now add the Angular router to our project that will allow us to show different components and data to the user based on where we are in the application.

In the loosest form, the router takes the state of the URL bar, and maps it into a set of components to render to the screen. By navigating around our application, the router will swap one component for another.
Setup
To add the router to the application, you'll need to import the RouterModule and supply a configuration.

Next, decide where you want to render the current route by adding a `<router-outlet></router-outlet>`.

### Route Configuration
Most applications will want the following:

A default or catchall route: {path:  '' }
Static routes: {path: 'about', component: AboutComponent}
Variable Routes: Your paths can contain variables by prefixing the variable name with a colon.

e.g. {path: 'products/:productName', component: ProductDetailsComponent}

### Navigation
Navigation can either be done via a routerLink directive in a template, or imperatively via the router. For now we'll do this entirely in our template.

Navigation is always done by string, or by array of url pieces, such as ['path', 'to', variable] which could result in a URL that looks like 'https://example.org/path/to/42'.

### Parameters
In order to see the parameters of a component, you must inject the ActivatedRoute service, and access its params property.

```
route.params.subscribe(params => {
	this.productName = params['productName'];
});
```
### Summary

Once you have setup the router, you can continue to create more components and routes in your RouteConfig.

To learn more about the more advanced features of the router, read the Router Guide.

### Task
* Add the router to your project
* Create a route that shows product list
* Create a component for product details
* Create a route that shows product details

## Finish!
You have the basics of our shopping cart.

Now we can [wire up the Data](/tutorial/getting-started-data) of our application.
