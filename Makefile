NPM:=npm
RUN:=$(NPM) run
.PHONY: build
build:
	$(RUN) build

.PHONY: publish
publish: build
	$(NPM) publish
