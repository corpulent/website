# Makefile for docs-nginx

# Docker settings
ORGANIZATION = hookandloop
CONTAINER = docs-nginx
VERSION = 1.0.1

.PHONY: build

build :
	docker build -t $(ORGANIZATION)/$(CONTAINER):$(VERSION) .
