# LibraryApp
This is a simple Library App emulates borrowing and returning books from it.
Application is architected according to Clean Architecture (Ports § Adapters)
## Technology used:
* Node.js
* Postgresql
* TypeORM

## How to setup?
in DataSource.ts, you can see configuration file for database. Configure it accordingly, after app is on, db is going to be synced.


*  Clone the repository on your local machine
*  Run `npm install` to install all node dependencies.
*  Run `npm run dev` create database.
* `http://127.0.0.1:3030` is ready.

## Enpoints
* `/users` -> with get request return all users
* `/users` -> with post request, creates a new user
* `/users/:id` -> returns a user by id
* `/books` -> with get request returns all books
* `/books` -> with create request creates a new book
* `/books/:id` -> retrieves specific book from databse.
* `/users/:userid/borrow/:bookid` -> specfic user borrows a specific book
* `/users/:userid/return/:bookid` -> specfic user returns a specific book


## How to test?
* After you ready your databases
* Run `npm run dev` in a terminal session.


## Further Developments

A caching mechanism may reduce the latency on read operations. There are already two bounded contexts, which may point out in order achieve scalability, we may configure an even-driven system with a message queue. Unit tests and a CI/CD pipeline can be added as well. I feel like I was short on mastering TypeORM, I am sure there are better practices. 


