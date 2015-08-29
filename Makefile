TESTS = $(ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = tap
TIMEOUT = 3000
MOCHA_OPTS =
REGISTRY = --registry=http://registry.npm.taobao.net

install:
	@npm install $(REGISTRY) \
    --disturl=http://dist.cnpmjs.org

jshint: install
	@-./node_modules/.bin/jshint ./

test: install
	@NODE_ENV=test ./node_modules/.bin/mocha \
    --harmony \
    --bail \
    --reporter $(REPORTER) \
    --timeout $(TIMEOUT) \
    --require should \
    --require co-mocha \
    $(MOCHA_OPTS) \
    $(TESTS)

test-cov cov: install
	@NODE_ENV=test node --harmony \
    node_modules/.bin/istanbul cover --preserve-comments \
    -x **/plugins/** \
    ./node_modules/.bin/_mocha \
    -- -u exports \
    --reporter $(REPORTER) \
    --timeout $(TIMEOUT) \
    --require should \
    --require co-mocha \
    --require ./engines/ \
    $(MOCHA_OPTS) \
    $(TESTS)
	@./node_modules/.bin/alicov coverage

test-all: jshint test cov

sample:
	@cd client/tmall-fp && svn up
	@cp -r client/tmall-fp/_tms/ tms/tmall-fp
	@cp -r client/tmall-fp/ templates/tmall-fp
	@rm -rf templates/tmall-fp/_tms

clean:
	@rm -rf node_modules
	@rm -rf coverage

autod:
	@./node_modules/.bin/autod $(REGISTRY) -w -e coverage,templates -k should,kissy
	@$(MAKE) install

.PHONY: test test-all
