# Smoothie Shop
This is a simple CRUD full-stack web app based on Spring Boot and Angular. 

You can watch a recorded demo here: [demo.mp4](https://github.com/mttbrt/smoothie-shop/blob/main/demo.mp4)

It provides the following functionalities:
* An app user can be either an authenticated **user** or a business **owner**.
* Both roles can:
  * Login and Logout
  * List all the existing smoothies
  * View a smoothie details, which include:
    * Name
    * Price
    * Nutritional Values
* In addition, a **user** can:
	* View their shopping cart
	* Place a order with the content of their shopping cart
* A business **owner** can:
	* Edit a smoothie's name and price
	* Delete a smoothie

## Technologies & Features
Technical features of this web app

### Backend
* Spring Boot 2.7.7
* Spring JPA with file-based H2 DB
* Spring Security
* JWT Authentication
* CSRF Token Validation
* Unit and Integration Tests
* RESTful API (GET, POST, PUT, DELETE)

What can be improved:
* Implement HATEOAS for a full RESTful interface

### Frontend
* Angular 15
* Bootstrap 5 + Font Awesome
* Routing
* Routing Guards
* HTTP Interceptors
* JWT and XSRF Token Management
* Local Storage
* Responsive Layout

## Setup

Required technologies:

Java 17, Maven, NPM

To setup the frontend:

```
cd frontend
npm install
ng serve
```
Now open: https://localhost:4200