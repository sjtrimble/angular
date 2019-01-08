# Getting Started - Data

Once an Angular app has its general component structure, the next step is the use and management of data.

## Streams of Data

Data coming back from servers in Angular applications most frequently take the form of a stream. Streams are useful because they make it easy to transform the data that is coming back, and to make modifications to the way we request data.

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

1. Import the `Observable` type from the `rxjs` package.
2. Import the `switchMap` operator from the `rxjs/operators` package.

<code-example header="src/app/products/product-details/product-details.component.ts (RxJS imports)" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="rxjs-imports">
</code-example>

#### Import current route information

Import the `ActivatedRoute` from the `@angular/router` package

<code-example header="src/app/products/product-details/product-details.component.ts (Router imports)" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="activated-route-import">
</code-example>

#### Import product types

Import the `ProductService` class and `Product` interface.

<code-example header="src/app/products/product-details/product-details.component.ts (Product imports)" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="product-imports">
</code-example>

#### Define product property

To reference the `product` in the component template, you need to define it as a property of the component class.

Create a `product` property in the `ProductDetailsComponent` class with the type of `Observable<Product>`.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="product">
</code-example>

#### Retreive the individual product

To retreive an individual product, you must transform the stream containing the `productId` into a request for the product information. The Angular Router contains the route information, and the `ProductService` requests the product. Map these two streams together to retrieve the product.

1. Inject the `ProductService` and `ActivatedRoute` classes in the constructor of the `ProductDetailsComponent`.
2. Define the `product` property to retrieve the route’s params as an observable and `switchMap` it into a request made by the `ProductService.getOne()` method using the `productId`.

<div class="alert is-important">

**Note:** The process of transitioning from one observable stream into another with an operator ending with `Map` is called "flattening". The route parameters stream is flattened and mapped into the second stream of retrieving the individual product. Read more about observable streams in the [Observables](guide/observables) guide.

</div>

<code-example header="src/app/products/product-details/product-details.component.ts (Product stream)" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="product-details">
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

Forms in Angular take the standard capabilities of the HTML based forms and add an orchestration layer to help with creating custom form controls, and to supply great validation experiences. There are two parts to an Angular Reactive form, the visualization of the form that lives in the template, and the objects that live in our component to store and manage form.

For this example we'll use [reactive forms](/guide/reactive-forms).

## Creating a checkout form 

1. Add the `ReactiveFormsModule` to the `imports` array of the `AppModule`.

<code-example header="src/app/app.module.ts (ReactiveFormsModule imports)" path="getting-started/src/app/app.module.2.ts" region="reactive-forms-module">
</code-example>

2. Add `ReactiveFormsModule` to the `imports` array of the `AppModule`.

<code-example header="src/app/app.module.ts (ReactiveFormsModule imports)" path="getting-started/src/app/app.module.2.ts" region="reactive-forms-module-imports">
</code-example>

The form lives in both our component's TypeScript class and its template. In the component we'll add the objects needed to store the checkout form in the constructor of our component. We'll also create a method to handle user submission of a valid form.

3. Right click on the `products` folder, use the `Angular Generator`, and generate a component named `checkout-form`.
4. Add `Output` and `EventEmitter` to imports from the `@angular/core` package.

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (Output imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="core-imports">
</code-example>

5. Import `FormGroup`, `FormBuilder` and `Validators` from `@angular/forms` package.

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (Reactive forms imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="forms-imports">
</code-example>

6. Create submit `Output` property with an instance of `EventEmitter`.

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (submit)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="submit">
</code-example>

7. Create a `checkoutForm` property with type `FormGroup`.

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (Checkout form)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="checkout-form">
</code-example>

8. Inject the `FormBuilder` class into the `CheckoutFormComponent` constructor and use the `FormBuilder#group()` method to create a form group with name and address.

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (Form Builder)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="formbuilder">
</code-example>

9. Define an `onSubmit()` method to emit the customer data when the form is submitted.

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (on submit)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="on-submit">
</code-example>

10. Update the template with a checkout header and form tag. Bind the checkoutForm from the component class to the formGroup attribute on the form. Set an event listener for the ngSubmit event and call the `onSubmit()` method with the checkoutForm value.
11. Add input fields for name and address using formControlName directives
12. Add a submit button to trigger the form submission

<code-example header="src/app/products/checkout-form/checkout-form.component.html (template)" path="getting-started/src/app/products/checkout-form/checkout-form.component.html" linenums="false">
</code-example>

## Adding a checkout page

1. Define `showForm` and `purchased` properties in the `ProductDetailsComponent` class and set them to `false`.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="flags">
</code-example>

2. Add an `onBuy()` method to the `ProductDetailsComponent` class that sets the `showForm` property to `true`.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="buy">
</code-example>
3. Add on `onSubmit()` method to the `ProductDetailsComponent` class that takes two arguments: formData and product.
4. In the `onSubmit()` method, set the `showForm` to true and the `purchased` to false. 

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="on-submit">
</code-example>

5. Add a click event listener to the Buy button that calls the `onBuy()` method you defined in the component class.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.html" region="buy">
</code-example>

This method is called when the submit event is emitted from the `app-checkout-form` component.

6. Add the `app-checkout-form` component to the `ProductDetailsComponent` template
7. Toggle the presence of the component with an `NgIf` based on the `showForm` flag.
8. Add a submit event listener the `app-checkout-form` element to call the onSubmit() method with the `$event` argument. The `$event` will consist of the customer data entered in the form. The second argument is the `product` assigned as a template variable.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.html" region="checkout-form">
</code-example>

9. Add a paragraph element that is toggled by the `purchased` property that displays a message that the order is submitted.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.html" region="purchased">
</code-example>

10. Now you refresh the application, click on product details, click the Buy button, and the form is displayed to fill out and complete the purchase.

## Finish!

Our shopping cart is now accessing data from the internet and allows users to checkout.

As our application grows, we should starting thinking about the [architecture](/tutorial/getting-started-architecture) of our application.
