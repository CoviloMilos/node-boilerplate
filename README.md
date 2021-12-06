# node-inversify-express-boilerplate

[![Travis](https://img.shields.io/travis/inversify/inversify-express-example.svg?style=flat-square&label=Travis)](https://travis-ci.org/inversify/inversify-express-example)
[![Dependencies](https://david-dm.org/inversify/inversify-express-example.svg)](https://david-dm.org/inversify/inversify-express-example#info=dependencies)
[![img](https://david-dm.org/inversify/inversify-express-example/dev-status.svg)](https://david-dm.org/inversify/inversify-express-example/#info=devDependencies)
[![img](https://david-dm.org/inversify/inversify-express-example/peer-status.svg)](https://david-dm.org/inversify/inversify-express-example/#info=peerDependenciess)

> express + inversify + inversify-express-utils boilerplate

## Use examples

First of all run `npm install`
Run prettier to format code `prettier --write ./server`

```
$ npm install -g ts-node
$ prettier --write ./server
```

This will start up the server.

To run all tests simply run `npm run test`

```
$ npm run test
```

## Repo content

| Name                | Description                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic               | A really basic example with CRUD implementation                                                                                                     |
| MongoDB             | Used libraries for [mongoose](https://www.npmjs.com/package/mongoose) && [@typegoose/typegoose](https://www.npmjs.com/package/@typegoose/typegoose) |
| BindingDecorators   | Similar to the basic example. This time with inversify-binding-decorators.                                                                          |
| MiddlewareInjection | A small example that shows how to inject middleware into controllers.                                                                               |
|  |
