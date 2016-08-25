var assert      = require('assert')
  , helper      = require('../');

describe("open-rest-helper-assert", function() {

  describe("equal", function() {
    it("Keypath type error", function(done) {
      assert.throws(function() {
        helper.equal({});
      }, function(err) {
        return err instanceof Error && err.message === 'Gets the value at path of object.'
      });
      done();
    });

    it("obj type error", function(done) {
      assert.throws(function() {
        helper.equal('hooks.user.id', 'hello world');
      }, function(err) {
        return err instanceof Error && err.message === 'Fixed value or path of req object'
      });
      done();
    });

    it("obj validate error", function(done) {
      assert.throws(function() {
        helper.equal('hooks.user.id', {name: 'Stone'});
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj contains at least fixed, path one of them.'
      });
      done();
    });

    it("error type error", function(done) {
      assert.throws(function() {
        helper.equal('hooks.user.id', {fixed: 2}, 22);
      }, function(err) {
        return err instanceof Error && err.message === 'The error is called next when assert faild.'
      });
      done();
    });

    it("fixed compare equal", function(done) {
      var equal = helper.equal('hooks.user.id', {fixed: 1}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 1}
        }
      };
      var res = {};
      equal(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("fixed compare not equal", function(done) {
      var equal = helper.equal('hooks.user.id', {fixed: 1}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 2}
        }
      };
      var res = {};
      equal(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare equal", function(done) {
      var equal = helper.equal('hooks.user.id', {path: 'params.userId'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 1}
        },
        params: {
          userId: 1
        }
      };
      var res = {};
      equal(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare not equal", function(done) {
      var equal = helper.equal('hooks.user.id', {path: 'params.userId'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 2}
        },
        params: {
          userId: 1
        }
      };
      var res = {};
      equal(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });
  });

  describe("notEqual", function() {
    it("Keypath type error", function(done) {
      assert.throws(function() {
        helper.notEqual({});
      }, function(err) {
        return err instanceof Error && err.message === 'Gets the value at path of object.'
      });
      done();
    });

    it("obj type error", function(done) {
      assert.throws(function() {
        helper.notEqual('hooks.user.id', 'hello world');
      }, function(err) {
        return err instanceof Error && err.message === 'Fixed value or path of req object'
      });
      done();
    });

    it("obj validate error", function(done) {
      assert.throws(function() {
        helper.notEqual('hooks.user.id', {name: 'Stone'});
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj contains at least fixed, path one of them.'
      });
      done();
    });

    it("error type error", function(done) {
      assert.throws(function() {
        helper.notEqual('hooks.user.id', {fixed: 2}, 22);
      }, function(err) {
        return err instanceof Error && err.message === 'The error is called next when assert faild.'
      });
      done();
    });

    it("fixed compare equal", function(done) {
      var notEqual = helper.notEqual('hooks.user.id', {fixed: 1}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 1}
        }
      };
      var res = {};
      notEqual(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("fixed compare not equal", function(done) {
      var notEqual = helper.notEqual('hooks.user.id', {fixed: 1}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 2}
        }
      };
      var res = {};
      notEqual(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare equal", function(done) {
      var notEqual = helper.notEqual('hooks.user.id', {path: 'params.userId'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 1}
        },
        params: {
          userId: 1
        }
      };
      var res = {};
      notEqual(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare not equal", function(done) {
      var notEqual = helper.notEqual('hooks.user.id', {path: 'params.userId'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 2}
        },
        params: {
          userId: 1
        }
      };
      var res = {};
      notEqual(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });
  });

  describe("has", function() {
    it("obj type error", function(done) {
      assert.throws(function() {
        helper.has('hello');
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj1 is fixed value or path of req object'
      });
      done();
    });

    it("obj2 type error", function(done) {
      assert.throws(function() {
        helper.has({path: 'hooks.user.id'}, 'hello world');
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj2 is fixed value or path of req object'
      });
      done();
    });

    it("obj1 validate error", function(done) {
      assert.throws(function() {
        helper.has({name: 'hooks.user.id'});
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj1 contains at least fixed, path one of them.'
      });
      done();
    });

    it("obj2 validate error", function(done) {
      assert.throws(function() {
        helper.has({path: 'hooks.user.id'}, {name: 'hello world'});
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj2 contains at least fixed, path one of them.'
      });
      done();
    });

    it("error type error", function(done) {
      assert.throws(function() {
        helper.has({path: 'hooks.user.id'}, {fixed: [2, 3, 5]}, 22);
      }, function(err) {
        return err instanceof Error && err.message === 'The error is called next when assert faild.'
      });
      done();
    });

    it("fixed compare has true", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {fixed: [1, 2, 3]}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 1}
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("fixed compare not has", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {fixed: [1, 2, 3]}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 4}
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare has", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 1}
        },
        params: {
          users: '1,2,3'
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare not has", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 4}
        },
        params: {
          users: '1,2,3'
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare not has obj1 isnt number false", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: '4'}
        },
        params: {
          users: '1,2,3'
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("obj1 is fixed value compare true", function(done) {
      var has = helper.has({fixed: '2'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        params: {
          users: '1,2,3'
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare not has obj1 isnt number true", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: '3'}
        },
        params: {
          users: '1,2,3'
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare not has obj1 is string", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 4}
        },
        params: {
          users: '1,2,3'
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare not has obj1 is string, obj2 is array", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 4}
        },
        params: {
          users: [1, 2, 3]
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare not has obj1 is string, obj2 is Set false", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 4}
        },
        params: {
          users: new Set([1, 2, 3])
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare not has obj1 is string, obj2 is Set true", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 2}
        },
        params: {
          users: new Set([1, 2, 3])
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare not has obj1 is string, obj2 is Set false", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 5}
        },
        params: {
          users: new Set([1, 2, 3])
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare not has obj1 is string, obj2 is object true", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 'name'}
        },
        params: {
          users: {name: 'Redstone'}
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare not has obj1 is string, obj2 is object false", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 'age'}
        },
        params: {
          users: {name: 'Redstone'}
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare not has obj1 is string, obj2 is null", function(done) {
      var has = helper.has({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 'age'}
        },
        params: {
          users: null
        }
      };
      var res = {};
      has(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

  });

  describe("notHas", function() {
    it("obj type error", function(done) {
      assert.throws(function() {
        helper.notHas('hello');
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj1 is fixed value or path of req object'
      });
      done();
    });

    it("obj2 type error", function(done) {
      assert.throws(function() {
        helper.notHas({path: 'hooks.user.id'}, 'hello world');
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj2 is fixed value or path of req object'
      });
      done();
    });

    it("obj1 validate error", function(done) {
      assert.throws(function() {
        helper.notHas({name: 'hooks.user.id'});
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj1 contains at least fixed, path one of them.'
      });
      done();
    });

    it("obj2 validate error", function(done) {
      assert.throws(function() {
        helper.notHas({path: 'hooks.user.id'}, {name: 'hello world'});
      }, function(err) {
        return err instanceof Error && err.message === 'Argument obj2 contains at least fixed, path one of them.'
      });
      done();
    });

    it("error type error", function(done) {
      assert.throws(function() {
        helper.notHas({path: 'hooks.user.id'}, {fixed: [2, 3, 5]}, 22);
      }, function(err) {
        return err instanceof Error && err.message === 'The error is called next when assert faild.'
      });
      done();
    });

    it("fixed compare nothas true", function(done) {
      var notHas = helper.notHas({path: 'hooks.user.id'}, {fixed: [1, 2, 3]}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 4}
        }
      };
      var res = {};
      notHas(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("fixed compare notHas false", function(done) {
      var notHas = helper.notHas({path: 'hooks.user.id'}, {fixed: [1, 2, 3]}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 1}
        }
      };
      var res = {};
      notHas(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });

    it("Keypath compare notHas true", function(done) {
      var notHas = helper.notHas({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 4}
        },
        params: {
          users: '1,2,3'
        }
      };
      var res = {};
      notHas(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("Keypath compare notHas false", function(done) {
      var notHas = helper.notHas({path: 'hooks.user.id'}, {path: 'params.users'}, Error('Hello'));
      var req = {
        hooks: {
          user: {id: 2}
        },
        params: {
          users: [1, 2, 3]
        }
      };
      var res = {};
      notHas(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('Hello', error.message);
        done();
      });
    });
  });

  describe("exists", function() {
    it("keyPath type error", function(done) {
      assert.throws(function() {
        helper.exists({});
      }, function(err) {
        return err instanceof Error && err.message === 'Gets the value at path of object.'
      });
      done();
    });

    it("error type error", function(done) {
      assert.throws(function() {
        helper.exists('hooks.user.id', 22);
      }, function(err) {
        return err instanceof Error && err.message === 'The error is called next when assert faild.'
      });
      done();
    });

    it("assert exists true, isDelete 'no'", function(done) {
      var exists = helper.exists('hooks.user', Error('hello world'));
      var req = {
        hooks: {
          user: {id: 2, isDelete: 'no'}
        },
        params: {
          users: [1, 2, 3]
        }
      };
      var res = {};
      exists(req, res, function(error) {
        assert.equal(null, error);
        done();
      });
    });

    it("assert exists false", function(done) {
      var exists = helper.exists('hooks.user', Error('hello world'));
      var req = {
        hooks: {
        },
        params: {
          users: [1, 2, 3]
        }
      };
      var res = {};
      exists(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('hello world', error.message);
        done();
      });
    });

    it("assert exists true isDelete 'yes'", function(done) {
      var exists = helper.exists('hooks.user', Error('hello world'));
      var req = {
        hooks: {
          user: {id: 2, isDelete: 'yes'}
        },
        params: {
          users: [1, 2, 3]
        }
      };
      var res = {};
      exists(req, res, function(error) {
        assert.ok(error instanceof Error);
        assert.equal('hello world', error.message);
        done();
      });
    });

  });

});
