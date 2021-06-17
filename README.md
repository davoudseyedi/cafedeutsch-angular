# Sample Angular Application
This project generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Run application
```
  $ npm install #Download application dependecies
  $ npm start #Run start script that defined in package.json file
```

## Shortcut to create shared component
```
  $ ng generate component components/test --skipTests

```
## Shortcut to create page
```
  $ ng generate component pages/home --skipTests

```

## Run application with docker-compose
Install docker on your device then copy .env.example to .env then run below command:
```
  $ docker-compose -f docker-compose.yml up -d # For the first time
  $ docker-compose -f docker-compose.yml up -d --build --force-recreate

```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Project hierarchy
```
.
├── ...
├── src
│├── app
││   ├── components
││   ├── pages
││   ├── pipes
││   ├── services
││   └── interceptor
│├── assets
││   └── img
│├── styles.scss
│└── index.html
├── angular.json
└── ...
```

### Project Completion
- [x] Basic flow implemented
- [x] Http Service and http interceptor
- [x] Component implemented
- [x] Pipes module
- [x] Html Binding
- [x] Meta service
- [x] Token service (use localstorage)
- [x] Animations
- [x] Helpers
- [x] Dockerize with node
- [x] Server side rendering
- [x] Dockerize
- [ ] Transfer state
