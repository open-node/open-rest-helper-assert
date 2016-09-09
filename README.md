# open-rest-helper-assert

open-rest 的 helper 插件，用来对某些值做断言

[![Build status](https://api.travis-ci.org/open-node/open-rest-helper-assert.svg?branch=master)](https://travis-ci.org/open-node/open-rest-helper-assert)
[![codecov](https://codecov.io/gh/open-node/open-rest-helper-assert/branch/master/graph/badge.svg)](https://codecov.io/gh/open-node/open-rest-helper-assert)

# Usage

```bash
npm instsall open-rest-helper-assert --save
```

```js
var rest = require('open-rest');
var assert = require('open-rest-helper-assert')(rest);

// assert Equivalent to rest.helper.assert
```

## assert.equal
判断某两个值是否相等，相等则通过，不等则输出错误信息
```js
// keyPath 从req上获取某个值的路径，例如: 'params.id', 'hooks.user.name', 分别代表读取 req.params.id, req.hooks.user.name
// obj 需要比较的值,有两种情况
//    1. {path: 'params.id'} 代表值从 req.params.id 获取
//    2. {fixed: 20} 代表固定的值
// error 如果不想等报的错误，Error类型

assert.equal(keyPath, obj, error);

// return
// function(req, res, next) { ... };

//or 链式调用
assert
  .equal
  .keyPath('hooks.user.role')
  .obj({fixed: 'admin'})
  .error(new restify.ForbiddenError('您没有权限执行该操作'))
  .exec();
```

## assert.notEqual
判断某两个值是否不等，不等则通过，相等则输出错误信息

```js
var assert = require('open-rest-helper-assert');

// keyPath 从req上获取某个值的路径，例如: 'params.id', 'hooks.user.name', 分别代表读取 req.params.id, req.hooks.user.name
// obj 需要比较的值,有两种情况
//    1. {path: 'params.id'} 代表值从 req.params.id 获取
//    2. {fixed: 20} 代表固定的值
// error 如果不想等报的错误，Error类型

assert.notEqual(keyPath, obj, error);

// return
// function(req, res, next) { ... };

//or 链式调用
assert
  .notEqual
  .keyPath('hooks.user.role')
  .obj({fixed: 'admin'})
  .error(new restify.ForbiddenError('您没有权限执行该操作'))
  .exec();
```

## assert.has
判断某个值是否包含在另外一个Object, Array, Set, Map 中，包含则通过，不包含则输出错误信息

```js
var assert = require('open-rest-helper-assert');

// obj1 被包含的值
//    1. {path: 'params.id'} 代表值从 req.params.id 获取
//    2. {fixed: 20} 代表固定的值
// obj2 判断的对象
//    1. {path: 'params.id'} 代表值从 req.params.id 获取
//    2. {fixed: 20} 代表固定的值
// error 如果不想等报的错误，Error类型

assert.has(obj1, obj2, error);

// return
// function(req, res, next) { ... };

//or 链式调用
assert
  .has
  .obj1({path: 'user.role'})
  .obj2({fixed: new Set(['member', 'admin'])});
  .error(new restify.ForbiddenError('您没有权限执行该操作'))
  .exec();
```

## assert.notHas
判断某个值是否包含在另外一个Object, Array, Set, Map 中，不包含则通过，包含则输出错误信息

```js
var assert = require('open-rest-helper-assert');

// obj1 被包含的值
//    1. {path: 'params.id'} 代表值从 req.params.id 获取
//    2. {fixed: 20} 代表固定的值
// obj2 判断的对象
//    1. {path: 'params.id'} 代表值从 req.params.id 获取
//    2. {fixed: 20} 代表固定的值
// error 如果不想等报的错误，Error类型

assert.notHas(obj1, obj2, error);

// return
// function(req, res, next) { ... };

//or 链式调用
assert
  .notHas
  .obj1({path: 'user.role'})
  .obj2({fixed: new Set(['member', 'admin'])});
  .error(new restify.ForbiddenError('您没有权限执行该操作'))
  .exec();
```

## assert.exists
判断某个值是否存在，不存在则报错

```js
var assert = require('open-rest-helper-assert');

// keyPath 从req上获取某个值的路径，例如: 'params.id', 'hooks.user.name', 分别代表读取 req.params.id, req.hooks.user.name
// error 如果不想等报的错误，Error类型, 默认值: new restify.NotFoundError('Resource not found.')

assert.exists('hooks.users', error);

// return
// function(req, res, next) { ... };

//or 链式调用方式
assert
  .exists
  .keyPath('hooks.users')
  .error(new restify.ForbiddenError('您没有权限执行该操作'))
  .exec();
```
