#!/usr/bin/env sh

git add -A

git commit -m 'deploy'

git pull

git push

git push -f git@github.com:didadi599/js-online.git master:gh-pages