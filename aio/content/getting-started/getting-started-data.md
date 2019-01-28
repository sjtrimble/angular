# Data

Once an Angular app has its general component structure, the next step is the use and management of data.

## Streams of Data

Data coming back from servers in Angular applications most frequently take the form of a stream. Streams are useful because they make it easy to transform the data that is coming back, and to make modifications to the way data is requested.

The three most common tasks users will do with a stream of data are to transform the data, combine multiple streams, and to perform an action for each of the pieces of data in a stream. Streams are created and managed using [RxJS](https://rxjs.dev/) in Angular.

Any operation you would like to define on a stream is defined with the use of RxJS operators. These will return a new stream, and the operations defined on the stream will only execute when one of your components or services is subscribed to the stream of data.

Read more about observable streams in the [Observables guide](guide/observables).

## Transforming Data

To take a stream of events, and create a new stream of event statuses, use the `pipe()` method and provide the `map()` operator from the RxJS library.

```ts
events.pipe(
  map(events => event.statuses),
)
```

The `map` operator uses a function to transform the value from the source stream into a new value. The new value is returned as a stream to the subscriber.

Another example of this is a JSON object returned from an external API:

```json
{
  status: 'success',
  results_count: 42,
  items: [
    {...},
    {...},
    ...
  ]
}
```

To only return the `items` from the results, use the `map()` operator to define a new stream that only returns the `items` property.

```ts
data.pipe(
  map(result => result.items),
)
```

## Combining Multiple Streams

It's a very common need to combine multiple streams. This is needed to have multiple HTTP requests, or to combine information from the Router with an HTTP request.

```ts
router.paramMap.pipe(
  switchMap(params => http.get(`/items/${params.get('id')}`)),
)
```

The `switchMap()` operator will take the parameters of the current route and use it to create a new stream to request data for that route. If the user visits the same route again only with different parameters, the stream will automatically make an additional HTTP request.

## Angular HTTP Client

Angular includes an easy way to fetch and render data from external APIs, which are generally JSON-based. These external APIs are consumed and provided to your application as a stream of data.

The `HttpClientModule` registers the providers needed to use the `HttpClient` service throughout your application. The `HttpClient` service is what you inject into your services to fetch data and interact with external APIs and resources. The `HttpClient` uses observables to handle requests and provide responses. Learn more about Angular's HTTP client in the [HttpCient guide](guide/http).

## Pulling data using `HttpClient`

Currently, your products data is using the `data` property in the `ProductService` for its data. For a real world application, this data would be fetched from an external API or resource such as a JSON file. To show how to use `HttpClient`, you'll update the `ProductService` to pull the data from a JSON file using the `HttpClient` service.

#### 1. Import HttpClientModule

In the `app.module.ts` file, import `HttpClientModule` from the `@angular/common/http` package.

<code-example header="src/app/app.module.ts (HttpClientModule)" path="getting-started/src/app/app.module.2.ts" region="http-client-module">
</code-example>

#### 2. Register `HttpClientModule`

Add the `HttpClientModule` to the `imports` array of the `AppModule`.

<code-example header="src/app/app.module.ts (HttpClientModule imports)" path="getting-started/src/app/app.module.2.ts" region="http-client-module-imports">
</code-example>

#### 3. Create external JSON data file

Currently, the data for the product list is hard-coded into the `ProductService`, which is not something you want to do often. Instead, you request the data from an external file or resource that is more dynamic. Below, you'll create an external file for the `HttpClient` to retrieve the product list data. 

1. Right click on the `src` folder and create an `assets` folder.  the src folder to contain the products JSON file.
2. Create a `products.json` file in the `assets` folder to contain the object data is currently hard-coded in the `ProductService`.
3. Copy the contents from the `data` property in the `ProductService` to the `products.json` file.

<code-example header="src/assets/products.json (Products JSON)" path="getting-started/src/assets/products.json">
</code-example>

#### 4. Import HttpClient

Import the HttpClient class from the `@angular/common/http` package into the `product.service.ts` file

<code-example header="src/app/products/product.service.ts (HttpClient import)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient">
</code-example>

#### 5. Import RxJS operators

Import the map operator from the RxJS library using the `rxjs/operators` package.

<code-example header="src/app/products/product.service.ts (RxJS map operator)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="rxjs-import">
</code-example>

#### 6. Inject HttpClient

Inject the `HttpClient` service into the `ProductService` by adding it to the constructor as a private variable.

<code-example header="src/app/products/product.service.ts (HttpClient)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient-inject">
</code-example>


#### 7. Request and return data from JSON file

Update the `getAll()` method to transform the results of the `HttpClient#get()` method using the `map()` operator to return the products.

<code-example header="src/app/products/product.service.ts (Http.get)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient-get-all">
</code-example>

The `HttpClient#get()` method returns an observable of the external request made to fetch the `products`. This observable will not execute until the method is subscribed to. The `products.json` is an object with a `products` property. The `{ products: Product[] }` provides type information about the observable stream being returned from the request. The `map()` operator is a function that is called with the results from the request, which then transforms the data into a new observable array of the products.

Remove the `Observable` and `of` imports from the rxjs package, and the data property in the `ProductService`.

When you reload the page, the product list still displays the same information, but the data can be changed dynamically without changing your code.

## Retrieving details for a product

You've retrieved a list of the products with their associated information. You'll use that list to show the details of an individual product. In a real world application, retrieving an individual product might have a separate endpoint, but for this guide, you'll reuse the product list for an individual product.

In the `ProductService`, add a `getOne()` method that takes an id and returns an observable of one product based on the `productId`.

<code-example header="src/app/products/product.service.ts (getOne())" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient-get-one">
</code-example>

The `map()` operator takes the existing array of products, and uses the `Array#filter()` method to find the product based on the `productId`. As mentioned earlier, you are transforming a stream of an array of products into a new stream of a single product.

## Displaying details for a product

The `ProductService` handles retrieving of all products and a a single product. You'll use the `ProductService` and the Angular Router to combine and transform streams of data to display the product details.

#### Import RxJS types and operators

In the `product-details.component.ts`:

1. Import the `Observable` type from the `rxjs` package.
2. Import the `switchMap` operator from the `rxjs/operators` package.

<code-example header="src/app/products/product-details/product-details.component.ts (RxJS imports)" path="getting-started/src/app/products/product-details/product-details.component.2.ts" linenums="false" region="rxjs-imports">
</code-example>

#### Import current route information

Import the `ActivatedRoute` from the `@angular/router` package

<code-example header="src/app/products/product-details/product-details.component.ts (Router imports)" path="getting-started/src/app/products/product-details/product-details.component.2.ts" linenums="false" region="activated-route-import">
</code-example>

#### Import product types

Import the `ProductService` class and `Product` interface.

<code-example header="src/app/products/product-details/product-details.component.ts (Product imports)" path="getting-started/src/app/products/product-details/product-details.component.2.ts" linenums="false" region="product-imports">
</code-example>

#### Define product property

To reference the `product` in the component template, you need to define it as a property of the component class.

Create a `product` property in the `ProductDetailsComponent` class with the type of `Observable<Product>`.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.2.ts" linenums="false" region="product">
</code-example>

#### Retreive the individual product

To retreive an individual product, you must transform the stream containing the `productId` into a request for the product information. The Angular Router contains the route information, and the `ProductService` requests the product. Map these two streams together to retrieve the product.

1. Inject the `ProductService` and `ActivatedRoute` classes in the constructor of the `ProductDetailsComponent`.
2. Define the `product` property to retrieve the route’s params as an observable and `switchMap` it into a request made by the `ProductService.getOne()` method using the `productId`.

<div class="alert is-important">

**Note:** The process of transitioning from one observable stream into another with an operator ending with `Map` is called "flattening". The route parameters stream is flattened and mapped into the second stream of retrieving the individual product. Read more about observable streams in the [Observables](guide/observables) guide.

</div>

<code-example header="src/app/products/product-details/product-details.component.ts (Product stream)" path="getting-started/src/app/products/product-details/product-details.component.2.ts" linenums="false" region="product-details">
</code-example>

#### Display the product details in the template

The `product` property is defined as a stream for an individual `Product`. To display it in the component's template, you need to subscribe to the stream of data to consume its value. Angular provides an `AsyncPipe` to subscribe to an observable stream directly in the template.

Update the `ProductDetailsComponent` template to subscribe to `product`.

1. Use the `AsyncPipe` and assign it to a template variable `productInfo`.
2. Display the product name, price, description and a button to buy the item.

<code-example header="src/app/products/product-details/product-details.component.html (Product details template)" path="getting-started/src/app/products/product-details/product-details.component.1.html" linenums="false">
</code-example>

In the example above, you assigned the `product` as an `productInfo` in the template. This allows you to reuse the same reference in multiple places, instead of using the `AsyncPipe` multiple times, which creates multiple subscriptions.

## Collecting data with Angular Forms

Forms in Angular take the standard capabilities of the HTML based forms and add an orchestration layer to help with creating custom form controls, and to supply great validation experiences. There are two parts to an Angular Reactive form, the visualization of the form that lives in the template, and the objects that live in the component to store and manage the form.

For this example you'll use [reactive forms](/guide/reactive-forms). To learn about Angular forms in general, read the [Forms Overview](guide/forms-overview) guide.

## Storing products for the cart

The product details includes `Buy` button for each product that you need to capture for the checkout process. You'll store the cart items using a service that is accessible from the page where the user checks out.

Right click on the `app` folder, use the `Angular Generator`, and generate a service named `cart`.

<code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.1.ts">
</code-example>

Update the `CartService` file with functionality to add products, and return a list of the products purchased. There are many ways to implement this service, but for this guide you'll only focus on two methods.

<code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts">
</code-example>

* The `ProductService` is injected into the `CartService` as a dependency to retrieve all products.
* The `items` property stores a list of the current products in the cart.
* The `add()` method appends a product to an array of `items` defined in the `CartService`. 
* The `getAll()` method collects the items added to the cart and returns each item with its associated quantity.

## Adding products to the cart

The `CartService` adds the product each time the `CartService#add` method is called. Because services are shared, the `ProductDetailsComponent` can use the service to add products to the cart. Update the `ProductDetailsComponent` to add the `product` to the cart when the `Buy` button is clicked. 

#### Import CartService

In the `product-details.component.ts` file:

Import the `CartService`.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="cart-imports">
</code-example>

#### Inject CartService

Inject the `CartService` as a dependency to the constructor of the `ProductDetailsComponent`.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="cart-service">
</code-example>

#### Add product to cart

Add an `onBuy()` method to the `ProductDetailsComponent` class that calls the `CartService#add()` method with the `product`.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="buy">
</code-example>

Add a click event listener to the Buy button that calls the `onBuy()` method you defined in the component class.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.html" region="buy">
</code-example>

Now you refresh the application, click on product details, click the Buy button, and the product is added to the store list of items.

## Creating a checkout page

The products are stored each time the `Buy` button is clicked, but the checkout page is where the checkout process is completed. You'll build out the checkout page to list the cart items and submit the purchase.

#### Import ReactiveFormsModule

1. Import `ReactiveFormsModule` from the `@angular/forms` package.

<code-example header="src/app/app.module.ts (ReactiveFormsModule imports)" path="getting-started/src/app/app.module.2.ts" region="reactive-forms-module">
</code-example>

#### Register ReactiveFormsModule

2. Add `ReactiveFormsModule` to the `imports` array of the `AppModule`.

<code-example header="src/app/app.module.ts (ReactiveFormsModule imports)" path="getting-started/src/app/app.module.2.ts" region="reactive-forms-module-imports">
</code-example>

The `ReactiveFormsModule` provides the services and directives to build reactive forms in Angular. Read more about Angular forms in the [Forms Overview](guide/forms-overview).

#### Create checkout component

The form lives in a component's TypeScript class and its template. In the component you'll add the objects needed to store the checkout form in the constructor of the component. You'll also create a method to handle user submission of a valid form.

Right click on the `app` folder, use the `Angular Generator`, and generate a component named `checkout`.

#### Import reactive forms classes

Import `FormGroup`, `FormBuilder` and `Validators` from `@angular/forms` package.

<code-example header="src/app/checkout/checkout.component.ts (Reactive forms imports)" path="getting-started/src/app/checkout/checkout.component.ts" region="forms-imports">
</code-example>

#### Import CartService

Import the `CartService` class, and the `CartItem` interface for type information.

<code-example header="src/app/checkout/checkout.component.ts" path="getting-started/src/app/checkout/checkout.component.ts" region="cart-imports">
</code-example>

#### Create items property

To store the cart item locally in the component class, you need to create a class property.

Create an `items` property with type `CartItem[]`. You'll reference the items in the class and in the component template.

<code-example header="src/app/checkout/checkout.component.ts (Checkout form)" path="getting-started/src/app/checkout/checkout.component.ts" region="checkout-form">
</code-example>

#### Create form property

Create a `checkoutForm` property with type `FormGroup`. You'll create the `FormGroup` in the constructor using the `FormBuilder`.

<code-example header="src/app/checkout/checkout.component.ts (Checkout form)" path="getting-started/src/app/checkout/checkout.component.ts" region="checkout-form">
</code-example>

#### Inject CartService

Inject the `CartService` and `CartService` as dependencies in the constructor of the `CheckoutComponent`.

<code-example header="src/app/checkout/checkout.component.ts" path="getting-started/src/app/checkout/checkout.component.ts" region="cart-service">
</code-example>

#### Create form model

The source of truth for the form model for reactive forms is defined in the component class. The form model is reflected in the template through directives provided by Angular reactive forms.

Inject the `FormBuilder` class into the `CheckoutComponent` constructor and use the `FormBuilder#group()` method to create a form group with name and address.

<code-example header="src/app/checkout/checkout.component.ts (Form Builder)" path="getting-started/src/app/checkout/checkout.component.ts" region="formbuilder">
</code-example>

#### Populate list of cart items

The `ngOnInit()` method in each component class is a lifecycle hook. The `ngOnInit()` method is called after the component is initialized. This initialization is after the constructor, but provides you a place to wire up initial logic for your component. Read more about this and other hooks in the [lifecycle hooks](guide/lifecycle-hooks) guide.

In the `ngOnInit()` method, subscribe to the `CartService#getAll()` method to listen to a stream its values. When the stream outputs a value, you want to store the items with the `items` property in the component class.

<code-example header="src/app/checkout/checkout.component.ts (ngOnInit())" path="getting-started/src/app/checkout/checkout.component.ts" region="on-init">
</code-example>

Define an `onSubmit()` method to log the customer data when the form is submitted. To go further, you would submit the data to an external API using the `CartService`, but for now you'll log to the browser console.

<code-example header="src/app/checkout/checkout.component.ts (on submit)" path="getting-started/src/app/checkout/checkout.component.ts" region="on-submit">
</code-example>

#### Displaying the form model in the template

The form model is defined in the `CheckoutComponent` class. The template needs to be updated to reflect the form model.

1. Add a `Checkout` header to the template.

<code-example header="src/app/checkout/checkout.component.html (template)" path="getting-started/src/app/checkout/checkout.component.html" linenums="false" region="header">
</code-example>

2. Use an `NgFor` directive to iterate over the `items`, display each product name and total for the quantity purchased.

<code-example header="src/app/checkout/checkout.component.html (template)" path="getting-started/src/app/checkout/checkout.component.html" linenums="false" region="list">
</code-example>

3. Define a `form` tag in the template and bind the `checkoutForm` from the component class to the `formGroup` attribute on the form. 
4. Set an event listener for the `ngSubmit` event and call the `onSubmit()` method with the checkoutForm value.
5. Add input fields for name and address using `formControlName` directive.
6. Add a `submit` button to trigger the form submission.

<code-example header="src/app/checkout/checkout.component.html (template)" path="getting-started/src/app/checkout/checkout.component.html" linenums="false" region="form">
</code-example>

## Adding the checkout route

To access the checkout route from your application, it needs to be registered with the Angular Router.

Add a route in the array of routes for the `CheckoutComponent`.

<code-example header="src/app/app.module.ts (checkout route)" path="getting-started/src/app/app.module.ts" linenums="false" region="checkout-route">
</code-example>

The route is registered, so you can type the URL in manually. To access the checkout route easily, add a `routerLink` to the `SideNavComponent` template.

<code-example header="src/app/side-nav/side-nav.component.html (checkout link)" path="getting-started/src/app/side-nav/side-nav.component.html" linenums="false" region="checkout-link">
</code-example>

When the user fills out the form and submits the button, the customer data is logged to the browser console. 
Your shopping cart is now accessing data from the internet and allowing users to checkout.

## Next steps

As your application grows, you should starting thinking about the [architecture](/tutorial/getting-started-architecture) of your application.
