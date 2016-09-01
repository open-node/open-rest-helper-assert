var delegate  = require('func-delegate')
  , restify   = require('restify')
  , _         = require('lodash');

// 检测某字段是否与指定的值是否相同，如果不同则报错
var equal = function(keyPath, obj, error) {
  return function(req, res, next) {
    var value = obj.fixed ? obj.fixed : _.get(req, obj.path);
    if (_.get(req, keyPath) === value) return next();
    next(error);
  };
};

// 检测某字段是否与指定的值是否不相同，如果相同则报错
//
var notEqual = function(keyPath, obj, error) {
  return function(req, res, next) {
    var value = obj.fixed ? obj.fixed : _.get(req, obj.path);
    if (_.get(req, keyPath) !== value) return next();
    next(error);
  };
};

var _has = function(obj1, obj2, has) {
  return function(req, res) {
    var value1 = obj1.fixed ? obj1.fixed : _.get(req, obj1.path);
    var value2 = obj2.fixed ? obj2.fixed : _.get(req, obj2.path);
    if (_.isString(value2)) {
      value2 = value2.split(',');
      if (_.isNumber(value1)) {
        value2 = _.map(value2, function(x) { return +x; })
      }
    }
    if (_.isSet(value2)) {
      if (value2.has(value1)) return has;
    } else if (_.isMap(value2)) {
      if (value2.has(value1)) return has;
    } else if (_.isArray(value2)) {
      if (value2.indexOf(value1) !== -1) return has;
    } else if (_.isObject(value2)) {
      if (value2.hasOwnProperty(value1)) return has;
    } else {
      return !has;
    }
    return !has;
  }
};

// 检测某个字段是否在某个数组里包含, 不包含则报错
var has = function(obj1, obj2, error) {
  var has = _has(obj1, obj2, true);
  return function(req, res, next) {
    if (has(req, res)) return next();
    return next(error)
  };
};

// 检测某个字段是否在某个数组里包含, 包含则报错
var notHas = function(obj1, obj2, error) {
  var notHas = _has(obj1, obj2, false);
  return function(req, res, next) {
    if (notHas(req, res)) return next();
    return next(error)
  };
};

// 检测是否存在
var exists = function(keyPath, error) {
  return function(req, res, next) {
    var model = _.get(req, keyPath);
    if (model === undefined) return next(error);
    if (_.isObject(model) && model.isDelete === 'yes') return next(error);
    next();
  };
};

var equalSchemas = [{
  name: 'keyPath',
  type: String,
  allowNull: false,
  defaultValue: 'params.id',
  message: 'Gets the value at path of object.'
}, {
  name: 'obj',
  type: Object,
  allowNull: false,
  validate: {
    check: function(v) {
      if (!v.hasOwnProperty('fixed') && !v.hasOwnProperty('path')) {
        throw Error('Argument obj contains at least fixed, path one of them.')
      }
      return true;
    }
  },
  message: 'Fixed value or path of req object'
}, {
  name: 'error',
  type: Error,
  allowNull: false,
  message: 'The error is called next when assert faild.'
}];

var hasSchemas = [{
  name: 'obj1',
  type: Object,
  allowNull: false,
  validate: {
    check: function(v) {
      if (!v.hasOwnProperty('fixed') && !v.hasOwnProperty('path')) {
        throw Error('Argument obj1 contains at least fixed, path one of them.')
      }
      return true;
    }
  },
  message: 'Argument obj1 is fixed value or path of req object'
}, {
  name: 'obj2',
  type: Object,
  allowNull: false,
  validate: {
    check: function(v) {
      if (!v.hasOwnProperty('fixed') && !v.hasOwnProperty('path')) {
        throw Error('Argument obj2 contains at least fixed, path one of them.')
      }
      return true;
    }
  },
  message: 'Argument obj2 is fixed value or path of req object'
}, {
  name: 'error',
  type: Error,
  allowNull: false,
  message: 'The error is called next when assert faild.'
}];

var existsSchemas = [{
  name: 'keyPath',
  type: String,
  allowNull: false,
  message: 'Gets the value at path of object.'
}, {
  name: 'error',
  type: Error,
  allowNull: false,
  defaultValue: new restify.NotFoundError('Resource not found.'),
  message: 'The error is called next when assert faild.'
}];

module.exports = {
  equal: delegate(equal, equalSchemas),
  notEqual: delegate(notEqual, equalSchemas),
  has: delegate(has, hasSchemas),
  notHas: delegate(notHas, hasSchemas),
  exists: delegate(exists, existsSchemas)
};
