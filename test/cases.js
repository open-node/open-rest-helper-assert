const assert = require('assert');
const rest = require('open-rest');
const helper = require('../')(rest);

describe('open-rest-helper-assert', () => {
  describe('equal', () => {
    it('Keypath type error', (done) => {
      assert.throws(() => {
        helper.equal({});
      }, (err) => err instanceof Error && err.message === 'Gets the value at path of object.');
      done();
    });

    it('obj type error', (done) => {
      assert.throws(() => {
        helper.equal('hooks.user.id', 'hello world');
      }, (err) => err instanceof Error && err.message === 'Fixed value or path of req object');
      done();
    });

    it('obj validate error', (done) => {
      assert.throws(() => {
        helper.equal('hooks.user.id', { name: 'Stone' });
      }, (err) => {
        const msg = 'Argument obj contains at least fixed, path one of them.';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.equal('hooks.user.id', { fixed: 2 }, 22);
      }, (err) => (
        err instanceof Error && err.message === 'The error is called next when assert faild.'
      ));
      done();
    });

    it('fixed compare equal', (done) => {
      const equal = helper.equal('hooks.user.id', { fixed: 1 }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 1 },
        },
      };
      const res = {};
      equal(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('fixed compare not equal', (done) => {
      const equal = helper.equal('hooks.user.id', { fixed: 1 }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 2 },
        },
      };
      const res = {};
      equal(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare equal', (done) => {
      const equal = helper.equal('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 1 },
        },
        params: {
          userId: 1,
        },
      };
      const res = {};
      equal(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('Keypath compare not equal', (done) => {
      const equal = helper.equal('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          userId: 1,
        },
      };
      const res = {};
      equal(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });
  });

  describe('notEqual', () => {
    it('Keypath type error', (done) => {
      assert.throws(() => {
        helper.notEqual({});
      }, (err) => err instanceof Error && err.message === 'Gets the value at path of object.');
      done();
    });

    it('obj type error', (done) => {
      assert.throws(() => {
        helper.notEqual('hooks.user.id', 'hello world');
      }, (err) => err instanceof Error && err.message === 'Fixed value or path of req object');
      done();
    });

    it('obj validate error', (done) => {
      assert.throws(() => {
        helper.notEqual('hooks.user.id', { name: 'Stone' });
      }, (err) => {
        const msg = 'Argument obj contains at least fixed, path one of them.';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.notEqual('hooks.user.id', { fixed: 2 }, 22);
      }, (err) => (
        err instanceof Error && err.message === 'The error is called next when assert faild.'
      ));
      done();
    });

    it('fixed compare equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { fixed: 1 }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 1 },
        },
      };
      const res = {};
      notEqual(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('fixed compare not equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { fixed: 1 }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 2 },
        },
      };
      const res = {};
      notEqual(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('Keypath compare equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 1 },
        },
        params: {
          userId: 1,
        },
      };
      const res = {};
      notEqual(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare not equal', (done) => {
      const notEqual = helper.notEqual('hooks.user.id', { path: 'params.userId' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          userId: 1,
        },
      };
      const res = {};
      notEqual(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });
  });

  describe('has', () => {
    it('obj type error', (done) => {
      assert.throws(() => {
        helper.has('hello');
      }, (err) => (
        err instanceof Error && err.message === 'Argument obj1 is fixed value or path of req object'
      ));
      done();
    });

    it('obj2 type error', (done) => {
      assert.throws(() => {
        helper.has({ path: 'hooks.user.id' }, 'hello world');
      }, (err) => (
        err instanceof Error && err.message === 'Argument obj2 is fixed value or path of req object'
      ));
      done();
    });

    it('obj1 validate error', (done) => {
      assert.throws(() => {
        helper.has({ name: 'hooks.user.id' });
      }, (err) => {
        const msg = 'Argument obj1 contains at least fixed, path one of them.';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('obj2 validate error', (done) => {
      assert.throws(() => {
        helper.has({ path: 'hooks.user.id' }, { name: 'hello world' });
      }, (err) => {
        const msg = 'Argument obj2 contains at least fixed, path one of them.';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.has({ path: 'hooks.user.id' }, { fixed: [2, 3, 5] }, 22);
      }, (err) => (
        err instanceof Error && err.message === 'The error is called next when assert faild.'
      ));
      done();
    });

    it('fixed compare has true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 1 },
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('fixed compare not has', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 4 },
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare has', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 1 },
        },
        params: {
          users: '1,2,3',
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('Keypath compare not has', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: '1,2,3',
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare not has obj1 isnt number false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: '4' },
        },
        params: {
          users: '1,2,3',
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('obj1 is fixed value compare true', (done) => {
      const has = helper.has({ fixed: '2' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        params: {
          users: '1,2,3',
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('obj1 is fixed value compare obj2 is map true', (done) => {
      const has = helper.has({ fixed: 2 }, { path: 'params.users' }, Error('Hello'));
      const users = new Map();
      users.set(2, {});
      const req = {
        params: {
          users,
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('obj1 is fixed value compare obj2 is map false', (done) => {
      const has = helper.has({ fixed: '2' }, { path: 'params.users' }, Error('Hello'));
      const users = new Map();
      users.set(5, {});
      const req = {
        params: {
          users,
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });


    it('Keypath compare not has obj1 isnt number true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: '3' },
        },
        params: {
          users: '1,2,3',
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('Keypath compare not has obj1 is string', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: '1,2,3',
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is array', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: [1, 2, 3],
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is Set false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: new Set([1, 2, 3]),
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is Set true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          users: new Set([1, 2, 3]),
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is Set false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 5 },
        },
        params: {
          users: new Set([1, 2, 3]),
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is object true', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 'name' },
        },
        params: {
          users: { name: 'Redstone' },
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is object false', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 'age' },
        },
        params: {
          users: { name: 'Redstone' },
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare not has obj1 is string, obj2 is null', (done) => {
      const has = helper.has({ path: 'hooks.user.id' }, { path: 'params.users' }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 'age' },
        },
        params: {
          users: null,
        },
      };
      const res = {};
      has(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });
  });

  describe('notHas', () => {
    it('obj type error', (done) => {
      assert.throws(() => {
        helper.notHas('hello');
      }, (err) => {
        const msg = 'Argument obj1 is fixed value or path of req object';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('obj2 type error', (done) => {
      assert.throws(() => {
        helper.notHas({ path: 'hooks.user.id' }, 'hello world');
      }, (err) => {
        const msg = 'Argument obj2 is fixed value or path of req object';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('obj1 validate error', (done) => {
      assert.throws(() => {
        helper.notHas({ name: 'hooks.user.id' });
      }, (err) => {
        const msg = 'Argument obj1 contains at least fixed, path one of them.';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('obj2 validate error', (done) => {
      assert.throws(() => {
        helper.notHas({ path: 'hooks.user.id' }, { name: 'hello world' });
      }, (err) => {
        const msg = 'Argument obj2 contains at least fixed, path one of them.';
        return err instanceof Error && err.message === msg;
      });
      done();
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.notHas({ path: 'hooks.user.id' }, { fixed: [2, 3, 5] }, 22);
      }, (err) => (
        err instanceof Error && err.message === 'The error is called next when assert faild.'
      ));
      done();
    });

    it('fixed compare nothas true', (done) => {
      const notHas = helper.notHas({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 4 },
        },
      };
      const res = {};
      notHas(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('fixed compare notHas false', (done) => {
      const notHas = helper.notHas({ path: 'hooks.user.id' }, { fixed: [1, 2, 3] }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 1 },
        },
      };
      const res = {};
      notHas(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it('Keypath compare notHas true', (done) => {
      const notHas = helper.notHas({
        path: 'hooks.user.id',
      }, {
        path: 'params.users',
      }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 4 },
        },
        params: {
          users: '1,2,3',
        },
      };
      const res = {};
      notHas(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('Keypath compare notHas false', (done) => {
      const notHas = helper.notHas({
        path: 'hooks.user.id',
      }, {
        path: 'params.users',
      }, Error('Hello'));
      const req = {
        hooks: {
          user: { id: 2 },
        },
        params: {
          users: [1, 2, 3],
        },
      };
      const res = {};
      notHas(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });
  });

  describe('exists', () => {
    it('keyPath type error', (done) => {
      assert.throws(() => {
        helper.exists({});
      }, (err) => err instanceof Error && err.message === 'Gets the value at path of object.');
      done();
    });

    it('error type error', (done) => {
      assert.throws(() => {
        helper.exists('hooks.user.id', 22);
      }, (err) => (
        err instanceof Error && err.message === 'The error is called next when assert faild.'
      ));
      done();
    });

    it('error defaultValue', (done) => {
      const exists = helper.exists('hooks.users');
      const req = {
        hooks: {
          user: { id: 2, isDelete: 'no' },
        },
        params: {
          users: [1, 2, 3],
        },
      };
      const res = {};
      exists(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('Resource not found.', error.message);
        done();
      });
    });

    it("assert exists true, isDelete 'no'", (done) => {
      const exists = helper.exists('hooks.user', Error('hello world'));
      const req = {
        hooks: {
          user: { id: 2, isDelete: 'no' },
        },
        params: {
          users: [1, 2, 3],
        },
      };
      const res = {};
      exists(req, res, (error) => {
        assert.equal(null, error);
        done();
      });
    });

    it('assert exists false', (done) => {
      const exists = helper.exists('hooks.user', Error('hello world'));
      const req = {
        hooks: {
        },
        params: {
          users: [1, 2, 3],
        },
      };
      const res = {};
      exists(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('hello world', error.message);
        done();
      });
    });

    it("assert exists true isDelete 'yes'", (done) => {
      const exists = helper.exists('hooks.user', Error('hello world'));
      const req = {
        hooks: {
          user: { id: 2, isDelete: 'yes' },
        },
        params: {
          users: [1, 2, 3],
        },
      };
      const res = {};
      exists(req, res, (error) => {
        assert.ok(error instanceof Error);
        assert.equal('hello world', error.message);
        done();
      });
    });
  });
});
