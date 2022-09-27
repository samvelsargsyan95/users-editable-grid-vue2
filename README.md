# test-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Description
Need to have a simple web page with using fake API from [https://reqres.in/]. All needed endpoints, response and requests here [https://reqres.in/].

### Requirements:
1. Authentication (only login. Registration is not required)
2. All pages requires user authentication except login
3. Please make sure to have route middlewares so authenticated user must not be able to navigate to
the login page and vice versa
4. After login user must be redirected to /users page when he can see the list of users (please make
sure to use backend pagination). Users list must be shown in a table. With this fields – Index (not the id),
Avatar, Full Name, Email, Actions. The avatar and full name must be links to user’s single page.
5. In user’s single page user need to be able to see all information (Avatar, id, email, first name, last
name).
6. Action buttons
6.1 Edit – open popup with already filled inputs (only name and job) and “Edit” button on the bottom
of the popup, details see in API doc
6.2 Delete – the click on delete button will open a confirmation popup and if user confirmed, call the
api endpoint which will delete the corresponding user’s data.
7. On the top of the table we need a “Create user” button. Click on this button will open a modal with
**name** and **job** inputs and save button in the bottom of the popup.


### NOTES:
All API endpoints are fake and the requests will not do real changes.
Need to use bootstrap-vue ( [https://github.com/bootstrap-vue/bootstrap-vue] ).
Need to choose the HTTP client Axios.
Need validation for inputs.


### API endpoints
**login** - */login* (post) <br />
**users list** - */users* (get) <br />
**single user** - */users/{id}* (get) <br />
**create user** - */users* (post) <br />
**update user** - */users/{id}* (put/patch) <br />
**delete user** - */users/{id}* (delete)


### Registred Accout
**email** - *eve.holt@reqres.in* <br />
**password** - *cityslicka*
