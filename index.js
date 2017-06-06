const delegate = require('func-delegate');
const _ = require('lodash');

module.exports = (rest) => {
  // 检测某字段是否与指定的值是否相同，如果不同则报错
  const equal = (keyPath, obj, error) => (
    (req, res, next) => {
      const value = obj.fixed ? obj.fixed : _.get(req, obj.path);
      if (_.get(req, keyPath) === value) return next();
      return next(error);
    }
  );

  // 检测某字段是否与指定的值是否不相同，如果相同则报错
  //
  const notEqual = (keyPath, obj, error) => (
    (req, res, next) => {
      const value = obj.fixed ? obj.fixed : _.get(req, obj.path);
      if (_.get(req, keyPath) !== value) return next();
      return next(error);
    }
  );

  const _has = (obj1, obj2, has) => (
    (req) => {
      const value1 = obj1.fixed ? obj1.fixed : _.get(req, obj1.path);
      let value2 = obj2.fixed ? obj2.fixed : _.get(req, obj2.path);
      if (_.isString(value2)) {
        value2 = value2.split(',');
        if (_.isNumber(value1)) {
          value2 = _.map(value2, (x) => +x);
        }
      }
      if (_.isSet(value2)) {
        if (value2.has(value1)) return has;
      } else if (_.isMap(value2)) {
        if (value2.has(value1)) return has;
      } else if (_.isArray(value2)) {
        if (value2.indexOf(value1) !== -1) return has;
      } else if (_.isObject(value2)) {
        if (_.has(value2, value1)) return has;
      } else {
        return !has;
      }
      return !has;
    }
  );

  // 检测某个字段是否在某个数组里包含, 不包含则报错
  const has = (obj1, obj2, error) => {
    const hasFn = _has(obj1, obj2, true);
    return (req, res, next) => {
      if (hasFn(req, res)) return next();
      return next(error);
    };
  };

  // 检测某个字段是否在某个数组里包含, 包含则报错
  const notHas = (obj1, obj2, error) => {
    const notHasFn = _has(obj1, obj2, false);
    return (req, res, next) => {
      if (notHasFn(req, res)) return next();
      return next(error);
    };
  };

  // 检测是否存在
  const exists = (keyPath, error) => (
    (req, res, next) => {
      const model = _.get(req, keyPath);
      if (model == null) return next(error);
      if (_.isObject(model) && model.isDelete === 'yes') return next(error);
      return next();
    }
  );

  const equalSchemas = [{
    name: 'keyPath',
    type: String,
    allowNull: false,
    defaultValue: 'params.id',
    message: 'Gets the value at path of object.',
  }, {
    name: 'obj',
    type: Object,
    allowNull: false,
    validate: {
      check(v) {
        if (!_.has(v, 'fixed') && !_.has(v, 'path')) {
          throw Error('Argument obj contains at least fixed, path one of them.');
        }
        return true;
      },
    },
    message: 'Fixed value or path of req object',
  }, {
    name: 'error',
    type: Error,
    allowNull: false,
    message: 'The error is called next when assert faild.',
  }];

  const hasSchemas = [{
    name: 'obj1',
    type: Object,
    allowNull: false,
    validate: {
      check(v) {
        if (!_.has(v, 'fixed') && !_.has(v, 'path')) {
          throw Error('Argument obj1 contains at least fixed, path one of them.');
        }
        return true;
      },
    },
    message: 'Argument obj1 is fixed value or path of req object',
  }, {
    name: 'obj2',
    type: Object,
    allowNull: false,
    validate: {
      check(v) {
        if (!_.has(v, 'fixed') && !_.has(v, 'path')) {
          throw Error('Argument obj2 contains at least fixed, path one of them.');
        }
        return true;
      },
    },
    message: 'Argument obj2 is fixed value or path of req object',
  }, {
    name: 'error',
    type: Error,
    allowNull: false,
    message: 'The error is called next when assert faild.',
  }];

  const existsSchemas = [{
    name: 'keyPath',
    type: String,
    allowNull: false,
    message: 'Gets the value at path of object.',
  }, {
    name: 'error',
    type: Error,
    allowNull: false,
    defaultValue: rest.errors.notFound('Resource not found.'),
    message: 'The error is called next when assert faild.',
  }];

  rest.helper.assert = {
    equal: delegate(equal, equalSchemas),
    notEqual: delegate(notEqual, equalSchemas),
    has: delegate(has, hasSchemas),
    notHas: delegate(notHas, hasSchemas),
    exists: delegate(exists, existsSchemas),
  };

  return rest.helper.assert;
};
