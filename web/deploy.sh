#!/usr/bin/env bash

echo "Bumping version number.."
version update -p

#echo "Rebuilding.."
#rm -rf public/
#yarn build

echo "Pushing to Github (Triggers deployment on Netlify)"
git add .
git commit -m "$1"
git push
