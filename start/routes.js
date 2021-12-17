'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
//create user


//login process
Route.get('login', 'Auth/LoginController.index').as('login.index')
Route.post('login', 'Auth/LoginController.check').as('login.check')
Route.get('logout', 'Auth/LoginController.logout').as('logout')

//dahsboard
Route.get('dashboard', 'DashboardController.index').as('dashboard')

//users
Route.get('/users', 'UserController.index').as('users.index')
Route.get('/users/delete/:id', 'UserController.delete').as('users.delete')
Route.get('register', 'Auth/RegisterController.index').as('register.index')
Route.post('register', 'Auth/RegisterController.store').as('register.store')
Route.get('/users/edit/:id', 'UserController.edit').as('users.edit')
Route.post('/users/update/:id', 'UserController.update').as('users.update')

//api digima
Route.post('loginDigima', 'UserAPIController.check').as('loginDigima.login')
Route.get('loginDigima', 'UserAPIController.loginDigima').as('loginDigima')

Route.group(() => {
    Route.get('user', 'UserAPIController.index')
    Route.post('user', 'UserAPIController.store')
    Route.delete('user/:id', 'UserAPIController.delete')
    Route.get('user/:id', 'UserAPIController.edit')
    Route.put('user/:id', 'UserAPIController.update')
}).prefix('api/v1')