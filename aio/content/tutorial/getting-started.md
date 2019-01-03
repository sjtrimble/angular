# Getting Started with Angular

Angular is the modern web developer's platform. Angular gives you the tools and the ecosystem to allow you to build and scale applications using web technologies.

## Introduction

Angular has many advanced features that support everything from internationalization, mobile, service workers, and server side rendering. These features help you as a developer to build apps as quickly as possible.

If you are new to web development or programming in general, read our requirements for getting started with Angular.

* Basic programming knowledge.
* Knowledge of HTML, CSS, and JavaScript and/or TypeScript.
* Knowledge of command-line based tools such as git, npm or yarn.

This guide walks you through building a simple shopping cart application. You'll cover components, the building blocks of an Angular application, using services to store and share data, architecture for scaling your application, and deployment to a live website.

{@a toc}

## Components

Angular applications are made up of a tree of components. A component is the combination of an HTML template, a class that handles data and functionality, and styles that display a certain look and feel. This provides you a consistent way to combine and present HTML, CSS, and Javascript on a page. Each component has a specific purpose and responsibility in an Angular application. Angular components act very similarly to HTML elements and can be given state or generate events.

You could create an entire application inside of a single component, but we recommend breaking down an application into smaller components that have fewer responsibilities.

If we imagine a normal shopping experience, like the one on https://express.google.com:

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

The components above are referred to by their `selector`. The selector is the name you give the Angular component when it is rendered as an HTML element on the page. Just like HTML elements, components can be referred to or nested in another component's template. Angular provides template syntax that gives components control over the rendering of content.

## Template Syntax

Angular extends and builds on top of HTML. There are 5 things you can do within an Angular template to start to control the rendering of your component. 

### {{ }} Interpolation

Interpolation lets you render the contents of a property of your component as text in your HTML. 

<aio-gs-interpolation></aio-gs-interpolation>

### [ ] Property Binding

Following the mental model of HTML, components have state being given to them. This is accomplished by binding to the property of a component or HTML element.

<aio-gs-property-binding></aio-gs-property-binding>

### ( ) Event Binding

You can listen of standard HTML events, or custom events that you will create later on our components.

<aio-gs-event-binding></aio-gs-event-binding>

### *ngIf

You can add and remove elements from the page dynamically using an `NgIf` directive. `*ngIf` is known as a structural directive because it changes which HTML or components are rendered to the user at any given moment. Any directive with an * is called a structural directive and will have similar functionality.

<aio-gs-ng-if></aio-gs-ng-if>

### *ngFor

*ngFor is another structural directive that lets you iterate over a list, rendering the HTML or component once for each item in the list. 

<aio-gs-ng-for></aio-gs-ng-for>

The Angular template syntax is very powerful. To learn about more of the things it can do, see the full [Template Syntax documentation](/guide/template-syntax).

## Building a shopping cart

To show how to build an Angular application, you'll walk through the steps to build a shopping cart application with multiple components, a list of products, and a checkout process.

#### Live Editing

To demonstrate the use of Angular, you'll open an empty application using StackBlitz. StackBlitz allows us to get started building an Angular application without needing any local tooling or installs. Once you are comfortable with the basics, we recommend downloading and installing the [Angular CLI](https://cli.angular.io for local development.

### 1. Create a new project

To start building the tutorial application, create a [new project](https://stackblitz.com/fork/ng-getting-started) in StackBlitz, then complete the 
following tasks below to scaffold out the components for your shopping cart.

### 2. Generate the top bar component

1. Right click on the `app` folder and use the `Angular Generator` to generate a new component named `top-bar`.

<code-example header="src/app/top-bar/top-bar.component.ts" path="getting-started/src/app/top-bar/top-bar.component.ts" region="v1">
</code-example>

Every component has distinct pieces.

 * The `Component` decorator that provides metadata about the component, including its templates, styles, and a selector.
 * An exported class that handles functionality for the component.

Right now, the `TopBarComponent` doesn't do much, but you'll update it to show the name of your store.

2. Define a `name` property to the `TopBarComponent` class with a value of `My Store`.

<code-example header="src/app/top-bar/top-bar.component.ts" path="getting-started/src/app/top-bar/top-bar.component.ts" region="name">
</code-example>

3. Update the `TopBarComponent` template to display a welcome message with an interpolation of the `name` property.

<code-example header="src/app/top-bar/top-bar.component.html" path="getting-started/src/app/top-bar/top-bar.component.html">
</code-example>

4. Replace the contents of your `app.component.html` with the `app-top-bar` component.

<code-example header="src/app/app.component.html" path="getting-started/src/app/app.component.1.html" linenums="false" region="top-bar">
</code-example>

Now your shopping cart displays the title of your store at the top of your application.

### 3. Create the side nav component

The side navigation lists categories for the products in your store.

1. Right click on the `app` folder, using the `Angular Generator`, generate a component named `side-nav`.
2. Define a `categories` property in the `SideNavComponent` as an array with two items: `Phones` and `Shoes`.

<code-example header="src/app/side-nav/side-nav.component.ts" path="getting-started/src/app/side-nav/side-nav.component.ts">
</code-example> 

3. Update the `side-nav.component.html` to display a list of categories using an `NgFor` directive.

<code-example header="src/app/side-nav/side-nav.component.html" path="getting-started/src/app/side-nav/side-nav.component.html" linenums="false">
</code-example>

4. Add some styles in the `side-nav.component.css` to position the side nav on the left side of the page.

<code-example header="src/app/side-nav/side-nav.component.css" path="getting-started/src/app/side-nav/side-nav.component.css" linenums="false">
</code-example>

<div class="alert is-important">

The styles for each component is scoped so that they do not impact the styles of other components in your application. Read more about styling components in the [Component Styles Guide](guide/component-styles).

</div>

5. Add the `app-side-nav` component to your `app.component.html` under the `app-top-bar` component.

<code-example header="src/app/app.component.html" path="getting-started/src/app/app.component.1.html" linenums="false" region="side-nav">
</code-example>

The side nav is display to the far left of the page under the top bar.

## Component Communication

Just like any element in HTML, Angular components take state, and emit events. We achieve these by creating Inputs and Outputs as properties in our component class. `Input` and `Output` are decorators provided by Angular that provide metadata for properties that are defined in the component class. These decorators with Angular's change detection system to communicate when changes occur from within a component and when the component conveys that some interesting event has happened.

### Providing state with an Input

Below is an example of a component used to display a name.

```ts
import { Component, Input } from '@angular/core';

@Component({
  template: `
    <div>{{name}}</div>
  `
})
export class EditableNameComponent {
  @Input() name: string;
}
```

Inputs define what data can be passed INTO your component. This data is updated through `bindings`, defined in a parent component's template. Whenever a parent component's property binding is updated, the property you mark with `@Input()` will also be updated as a part of Angular's change detection. In the example above, the `name` property is updated when the parent component updates the `name` through a binding.

### External communication with an Output

Look at the `editName` property to see how the component communicates externally.

```ts
import { Component, Input, Output } from '@angular/core';

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

Outputs are used to create custom events in your component. We create a new `EventEmitter` and store it as an `@Output()` property of our component. This newly created `EventEmitter` instance has a method `emit` that you can call whenever your custom event has occurred, in response to some action from the template, or based on some asynchronous process.

With inputs and outputs, you build elaborate tree structures of components that take in state, and give back events using property and event bindings. Read more about these bindings in the [Template Syntax Guide](guide/template-syntax).

## Display a product preview

The steps below show you how to use an `Input` to display details for a single product.

### 1. Create a products folder

Right click on the `app` folder and create a new folder named `products`. This folder will contain the relevant functionality for the `products` feature area.

### 2. Create a product interface

Right click on the `products` folder, use the `Angular Generator` to generate an interface named `product`. 

<code-example header="src/app/products/product.ts" path="getting-started/src/app/products/product.1.ts">
</code-example>

This interface refers to the structure of a product, including its name, description, and other details as needed. It also provides you a consistent way to reference a `Product` throughout your application.

### 3. Create a product preview component

1. Right on the `products` folder and generate a new component named `product-preview`.
2. In the `ProductPreviewComponent` class, add `Input` the imports from the `@angular/core` package.

<code-example header="src/app/products/product-preview/product-preview.component.ts" path="getting-started/src/app/products/product-preview/product-preview.component.ts" region="core-imports">
</code-example>

3. Import the `Product` interface using its path relative to the `product-preview` folder.

<code-example header="src/app/products/product-preview/product-preview.component.ts" path="getting-started/src/app/products/product-preview/product-preview.component.ts" region="product-imports">
</code-example>

4. Define a property in the `ProductPreviewComponent` class named `product` and use the `Input` decorator on it. Give the `product` a define type using the `Product` interface.

<code-example header="src/app/products/product-preview/product-preview.component.ts" path="getting-started/src/app/products/product-preview/product-preview.component.ts" region="inputs-outputs">
</code-example>

When the `app-product-preview` component is used within a template and its `product` property is updated, change detection will be run on the component with the new data being displayed.

5. Update the `ProductPreviewComponent` template to display the data received from our `Input`.

<code-example header="src/app/products/product-preview/product-preview.component.html (Product Input)" path="getting-started/src/app/products/product-preview/product-preview.component.1.html">
</code-example>

6. Test the `app-product-preview` component and provide a product with its name and description.

<code-example header="src/app/app.component.1.html (Sample Preview)" path="getting-started/src/app/app.component.1.html" linenums="false" region="product-preview">
</code-example>

The `app-product-preview` component displays a single product with the product name and description.

## Services

Services are an integral part of Angular applications. Services in Angular are an instance of a class that can be made available to any part of your application using the [dependency injection system](/guide/dependency-injection).

Services are used to encapsulate data and functionality.

### Creating a service

To create a service, simply create a class and decorate it with `@Injectable()`.

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyService {}
```

The service now has defined metadata used for requesting an instance of the service. The `providedIn: 'root'` or `Tree-shakable  provider` syntax provides the Angular compiler information to register the provider globally within Angular's dependency injection.

### Providing services

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
    // Other imports ...
    HttpClientModule
  ]
})
export class AppModule {}
```

Once the `HttpClientModule` is registered, the `HttpClient` service can be accessed anywhere in your application.

### Injecting services

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

This is called "injecting" a service and adds it to the properties on the class. Anywhere in the class you can now refer to the service directly by the name you gave it. Read more about Angular's `HttpClient` in the [HttpClient Guide](guide/http).

## Create a product service to store products

The product service stores your product list data to share throughout your application.

### 1. Generate the product service

Right click on the the `products` folder, use the `Angular Generator` to generate a service name `Product`.

### 2. Import the observable and product types

2. Import the `Observable` type and `of` method from the RxJS library.

<code-example header="src/app/products/product.service.ts (RxJS imports)" path="getting-started/src/app/products/product.service.1.ts" linenums="false" region="rxjs-imports">
</code-example>

Angular integrates with the popular open-source library [Reactive Extensions for Javascript](https://rxjs.dev)(RxJS) to handle asynchronous behavior in your application. Here you are importing the `of` method that creates and returns an observable. Later, you will use this method to return an observable array of products.

3. Update the `Product` interface in the `product.ts` file with more properties about a given product, 
such as its id, price, and categories.

<code-example header="src/app/products/product.ts (Product interface)" path="getting-started/src/app/products/product.ts" linenums="false">
</code-example>

4. Import the `Product` interface.

<code-example header="src/app/products/product.service.ts (Product interface)" path="getting-started/src/app/products/product.service.1.ts" linenums="false" region="product-import">
</code-example>

### 3. Define data properties and methods

5. Define a `data` property in the `ProductService` class that contains product list data.
6. Add a `getAll()` method using the `of` method to return the products from the data property.

<code-example header="src/app/products/product.service.ts (Product Data)" path="getting-started/src/app/products/product.service.1.ts" region="product-data">
</code-example>

<div class="alert is-important">

Read more about observable streams in the [Observables guide](guide/observables).

</div>

The `ProductService` is ready to be injected into many different areas in your application using Angular's dependency injection.

## Display the product list using a service

The products list component displays a listing of each product available in your store with a brief description.

### 1. Generate the product list component

1. Right click on the `products` folder, use the `Angular Generator` to generate a component named `product-list`.

### 2. Import the observable and product types

1. Import the `Observable` type from the `RxJS` library.

<code-example header="src/app/products/product-list/product-list.component.ts (Observable import)" path="getting-started/src/app/products/product-list/product-list.component.ts" region="rxjs-import">
</code-example>

2. Import the `ProductService` that provides the product data, and the `Product` interface.

<code-example header="src/app/products/product-list/product-list.component.ts (Product imports)" path="getting-started/src/app/products/product-list/product-list.component.ts" region="product-imports">
</code-example>

### 3. Define the products and inject the product service

1. Define a `products$` property in the `ProductListComponent` as an observable array of products.
2. Inject the `ProductService` into the constructor of the `ProductListComponent` and define the `products$` using the `getAll()` method from the `ProductService`.

<code-example header="src/app/products/product-list/product-list.component.ts (Products Observable)" path="getting-started/src/app/products/product-list/product-list.component.ts" region="products-observable">
</code-example>

### 4. Display the product list

1. Update the `product-list.component.html` to display the products using an `NgFor` directive, an `AsyncPipe` and the `app-product-preview` component. 

<code-example header="src/app/products/product-list/product-list.component.html (Product List)" path="getting-started/src/app/products/product-list/product-list.component.html">
</code-example>

The `AsyncPipe` used in the template subscribes to the `products$` observable that provides the array of products. The `NgFor` directive iterates over product and binds a `product` to the `app-product-preview`. Learn more about pipes in the [Pipes Guide](guide/pipes).

2. Add the `app-product-list` component to your `app.component.html` below the `app-side-nav` component.

<code-example header="src/app/app.component.html (Product List)" path="getting-started/src/app/app.component.1.html" region="product-list">
</code-example>

## Router

Up until now, our application hasn't had any variable state or navigation. We'll now add the Angular router to our project that will allow us to show different components and data to the user based on where we are in the application.

In the loosest form, the router takes the state of the URL bar, and maps it into a set of components to render to the screen. By navigating around our application, the router swaps one set of components for another.

To add the router to the application, import the RouterModule and supply a configuration.

Next, decide where you want to render the current route by adding a `<router-outlet></router-outlet>`.

### Route Configuration

Most applications that use routing have a few common types of routes:

* Default routes for destination pages in your application.

```ts
{ path: '', component: HomePageComponent }
```

* Catchall routes for displaying a 404 for non-existant pages.

```ts
{ path: '**', component: PageNotFoundComponent }
```

* Static routes for defined pages in your application

```ts
{ path: 'about', component: AboutPageComponent }
```
* Variable routes containing a path and a variable prefixed with a colon to designate substitution.

```ts
{ path: 'products/:productId', component: ProductDetailsComponent }
```

These routes enable you to build simple to complex URLs to navigate around your application, based on the purpose 
and requirements of your application.

Navigation is done through the `RouterLink` directive provided by the router in a template, or imperatively using the `Router` service. Navigation is always done by string, or by array of url paths, such as ['path', 'to', variable] which could result in a URL that looks like 'https://example.org/path/to/42'.

### Retrieving route information

To see information provided by the router for a routed component, each routed component is provided an `ActivatedRoute` service. You inject the `ActivatedRoute` service to access its route parameters, route data, and other necessary information. 

```ts
export class MyPageComponent {
  productId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('productId');
    });
  }
}
```

The route parameters and route data are provided as observables you subscribe to. When the parameters or data observables are updated, the observables produce a new value. The example below shows you how to subscribe to a route and get its `productId` provided through a variable route from its URL.

Once you have setup the router, you can continue to create more components and routes in your `RouteConfig`.

To learn more about the more advanced features of the router, read the [Router Guide](guide/router).

## Adding the router to your project

### 1. Import RouterModule

Import `RouterModule` from the `@angular/router` package into your app.module.ts file.

<code-example header="src/app/app.module.ts (RouterModule)" path="getting-started/src/app/app.module.1.ts" region="router-module">
</code-example>

### 2. Register RouterModule

In the `imports` array, add the `RouterModule.forRoot([])` method with an empty array. Configured routes are stored in the array.

<code-example header="src/app/app.module.ts (imports)" path="getting-started/src/app/app.module.1.ts" region="router-module-imports">
</code-example>

Your application is configured with Angular routing, but the template needs a placeholder where it renders routed components. 

### 3. Add a router outlet

Remove the components below the `app-side-nav` and add the `RouterOutlet` to the template. 

<code-example header="src/app/app.component.html (Router outlet)" path="getting-started/src/app/app.component.html" region="router-outlet">
</code-example>

The router is ready to listen for changes in the browser URL, but you need to configure it with routes to transition from one set of components to the next.

## Create a route that shows product list

To register a route for the product list, it must be defined in the array of routes.

### 1. Add a product list route

In the app.module.ts, add an object to the array defined in `RouterModule.forRoot()` array with an empty string as the `path` and set the `ProductListComponent` as the `component`.

<code-example header="src/app/app.module.ts (Product list route)" path="getting-started/src/app/app.module.ts" region="product-list-route">
</code-example>

Now when you navigate to your example URL with only the `/`, the list of products is displayed.

## Create a route for product details

To display more information for a particular product, you'll use a specific route for product details.

### 1. Generate the product details route component

1. Right click on the `products` folder, use the `Angular Generator` and generate a component named `product-details`.

### 2. Add a product details route

1. In the `app.module.ts` define a variable route for the product details. Use `products/:productId` as the `path`, with `productId` being substituted with the value from the URL, and `ProductDetailsComponent` for the `component`.

<code-example header="src/app/app.module.ts (Product details route)" path="getting-started/src/app/app.module.2.ts" region="product-details-route">
</code-example>

2. In the `ProductPreviewComponent`, update the template to link to the product details page with the `productId` using a `RouterLink`. 

<code-example header="src/app/products/product-preview/product-preview.component.html (Product preview routerLink)" path="getting-started/src/app/products/product-preview/product-preview.component.html" linenums="false">
</code-example>

When the user clicks on the product title, the router will navigate to the product details route, with the specific `productId`. Only placeholder text is displayed, but you'll retrieve the product details in the [data](/tutorial/getting-started-data) section.

## Finish!

You have the basics of our shopping cart.

Now we can [wire up the data](/tutorial/getting-started-data) of our application.
