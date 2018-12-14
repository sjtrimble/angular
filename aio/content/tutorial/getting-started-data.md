# Getting Started - Data

Once an Angular app has its general component structure, the next most important thing is the use and management of data.

## Streams of Data

Data coming back from servers in Angular applications most frequently take the form of a stream. Streams are useful because they make it easy to transform the data that is coming back, and to make modifications to the way we request data.

The three most common tasks users will do with a stream of data are to transform the data, combine multiple streams, and to perform an action for each of the pieces of data in a stream. Streams are created and managed using [RxJS](https://rxjs.dev/) in Angular.

Any operation you would like to define on a stream is defined with the use of `.pipe([operations])`. This will return a new stream, and the operations defined on the stream will only execute when one of your components or services is using the data.

### Transforming Data

If we wanted to take a stream of events, and create a new stream of event statuses, we should use the `map` operator.

```
stream$.pipe(
  map(...),
)
```

An example of this would be if your API returns an object:

```
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

If you wanted only the `items` from the results, you could use the map operator to define a new stream that only contains the `items` property.

```
stream$.pipe(
  map(result => result.items),
)
```

### Combining Multiple Streams

It's very common to need to combine multiple streams. This is needed to have multiple HTTP requests, or to combine information from the Router with an HTTP request.

```
router.paramsMap.pipe(
  switchMap(params => http.get(`/items/${params.get(id)`)),
)
```

This `switchMap` operator will take the parameters of my current route and use it to create a new stream with data for that route. Any time the user's route changes, the stream will automatically make an additional HTTP request.

## Fetching JSON Data from APIs with HttpClient

Angular includes an easy way to fetch and render data from external APIs, which are generally JSON-based. These external APIs are consumed and provided to your application as a stream of data.

The `HttpClientModule` registers the providers needed to use the `HttpClient` service throughout your application. The `HttpClient` service is what you inject into your services to fetch data and interact with external APIs and resources. The `HttpClient` uses observables to handle asynchronous requests and responses. Learn more about Angular's HTTP client in the [HttpCient guide](guide/http).

## Data Tasks

Currently, your products data is using the `data` property in the `ProductService` for its data. For a real world application, this data would be fetched from an external API or resource. To show how to use `HttpClient`, update the `ProductService` to pull the
data using the `HttpClient` service.

### Pull data using Http Client

In the `app.module.ts` file, import `HttpClientModule` from the `@angular/common/http` package.

<code-example header="src/app/app.module.ts (HttpClientModule)" path="getting-started/src/app/app.module.2.ts" region="http-client-module">
</code-example>

Add the `HttpClientModule` to the `imports` array of the `AppModule`.

<code-example header="src/app/app.module.ts (HttpClientModule imports)" path="getting-started/src/app/app.module.2.ts" region="http-client-module-imports">
</code-example>

Right click on the `src` folder and create an `assets` folder.  the src folder to contain the products JSON file.
Create a `products.json` file in the `assets` folder to contain the object data is currently hard-coded in the `ProductService`.
Copy the contents from the `data` property in the `ProductService` to the `products.json` file.

<code-example header="src/assets/products.json (Products JSON)" path="getting-started/src/assets/products.json">
</code-example>

Import the HttpClient class from the @angular/common/http package into the product.service.ts file

<code-example header="src/app/products/product.service.ts (HttpClient import)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient">
</code-example>

Import the map operator from the RxJS library using the `rxjs/operators` path.

<code-example header="src/app/products/product.service.ts (RxJS map operator)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="rxjs-import">
</code-example>

Inject the `HttpClient` service into the `ProductService` by adding it to the constructor as a private variable.

<code-example header="src/app/products/product.service.ts (HttpClient)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient-inject">
</code-example>

Update the getAll() method to pipe the results of the HttpClient.get() method into the map function to return the products.

<code-example header="src/app/products/product.service.ts (Http.get)" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient-get-all">
</code-example>

The `HttpClient.get` method returns an observable of the external request made to fetch the `products`. This observable will not execute until the method is subscribed to. The `products.json` is just an object with a `products` property. The `{ products: Product[] }` provides type information about the observable stream being returned from the request. The `map` operator is a function that is called with the results from the request, which then transforms the data into a new observable array of the products.

Remove the `Observable` and `of` imports from the RxJS library, and the data property in the ProductService.

This now has provided the `HttpClient` service to our application so we can use it to make HTTP Requests.

### Display product details

In the `ProductService`, add a `getOne()` method that takes an id and returns an observable of one product based on the `productId`.

<code-example header="src/app/products/product.service.ts (getOne())" path="getting-started/src/app/products/product.service.ts" linenums="false" region="httpclient-get-one">
</code-example>

Import the Observable type from the RxJS library.
Import the switchMap operator from the RxJS operators path.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="rxjs-imports">
</code-example>

Import the `ActivatedRoute` from the `@angular/router` package

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="activated-route-import">
</code-example>

Import the `ProductService` and `Product` interface.

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="product-imports">
</code-example>

Create a `product$` property in the ProductDetailsComponent class with the type of `Observable<Product>`

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="product">
</code-example>

Inject the `ProductService` and `ActivatedRoute` classes in the constructor of the `ProductDetailsComponent`.
Define the `product$` property to retrieve the route’s params as an observable and `switchMap` it into a request to the `ProductService.getOne()` method using the `productId`

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" linenums="false" region="product-details">
</code-example>

Update the `ProductDetailsComponent` template to subscribe to `product$` using the `AsyncPipe` and assign it to a template variable `product` for reuse. Then display the product name, price, description and a button to buy the item.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.1.html" linenums="false">
</code-example>

## Collecting data with Angular Forms

Forms in Angular take the standard capabilities of the HTML based forms and add an orchestration layer to help with creating custom form controls, and to supply great validation experiences. 

## Forms Task

There are two parts to an Angular Form, the visualization of the form that lives in the template, and the objects that live in our component to store and manage form.

For this example we'll use [reactive forms](/guide/reactive-forms).

### Create a simple checkout form that allows the user to purchase a selected product

To get started, we'll need to add the `ReactiveFormsModule` to our App Module.

<code-example header="src/app/app.module.ts (ReactiveFormsModule imports)" path="getting-started/src/app/app.module.2.ts" region="reactive-forms-module">
</code-example>

Add `ReactiveFormsModule` to the `imports` array of the `AppModule`.

<code-example header="src/app/app.module.ts (ReactiveFormsModule imports)" path="getting-started/src/app/app.module.2.ts" region="reactive-forms-module-imports">
</code-example>

Our form lives in both our component's TypeScript and its template. In the component we'll add the objects needed to store the checkout form in the constructor of our component. We'll also create a method to handle user submission of a valid form.

Right click on the `products` folder and generate a component named `checkout-form`.
Add Output and EventEmitter to imports from @angular/core

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (ReactiveFormsModule imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="core-imports">
</code-example>

Import FormGroup, FormBuilder and Validators from @angular/forms package

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (ReactiveFormsModule imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="forms-imports">
</code-example>

Create submit Output property with an instance of EventEmitter

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (ReactiveFormsModule imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="submit">
</code-example>

Create a checkoutForm property with type FormGroup

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (ReactiveFormsModule imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="checkout-form">
</code-example>

Inject the FormBuilder class into the CheckoutFormComponent constructor and use the FormBuilder.group() method to create a form group with name and address.

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (ReactiveFormsModule imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="formbuilder">
</code-example>

Define an `onSubmit()` method to emit the customer data when the form is submitted

<code-example header="src/app/products/checkout-form/checkout-form.component.ts (ReactiveFormsModule imports)" path="getting-started/src/app/products/checkout-form/checkout-form.component.ts" region="on-submit">
</code-example>

Update the template with a checkout header and form tag. Bind the checkoutForm from the component class to the formGroup attribute on the form. Set an event listener for the ngSubmit event and call the `onSubmit()` method with the checkoutForm value.
Add input fields for name and address using formControlName directives
Add a submit button to trigger the form submission

<code-example header="src/app/products/checkout-form/checkout-form.component.html (template)" path="getting-started/src/app/products/checkout-form/checkout-form.component.html" linenums="false">
</code-example>

### Add checkout form to product details page

Define showForm and purchased properties in the `ProductDetailsComponent` class and set them to false

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="flags">
</code-example>

Add an onBuy() method to the `ProductDetailsComponent` class that sets the showForm property to true

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="buy">
</code-example>

Add on `onSubmit()` method to the `ProductDetailsComponent` class that takes two arguments: formData and product.  In the `onSubmit()` method, set the `showForm` to true and the `purchased` to false. 

<code-example header="src/app/products/product-details/product-details.component.ts" path="getting-started/src/app/products/product-details/product-details.component.ts" region="on-submit">
</code-example>

Add a click event listener to the Buy button that calls the `onBuy()` method you defined in the component class.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.html" region="buy">
</code-example>

This method is called when the submit event is emitted from the `app-checkout-form` component.

Add the `app-checkout-form` element to the `ProductDetailsComponent` template
Toggle the presence of the element with an `NgIf` based on the `showForm` flag.
Add a submit event listener the `app-checkout-form` element to call the onSubmit() method with the $event argument. The `$event` will consist of the customer data entered in the form. The second argument is the `product` assigned as a template variable.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.html" region="checkout-form">
</code-example>

Add a paragraph element that is toggled by the `purchased` property that displays a message that the order is submitted.

<code-example header="src/app/products/product-details/product-details.component.html" path="getting-started/src/app/products/product-details/product-details.component.html" region="purchased">
</code-example>

Now you refresh the application, click on product details, click the Buy button, and the form is displayed to fill out and complete the purchase.

## Finish!

Our shopping cart is now accessing data from the internet and allows users to checkout.

As our application grows, we should starting thinking about the [architecture](/tutorial/getting-started-architecture) of our application.
