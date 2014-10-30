#!/bin/sh

rm index.json

ls | grep .json | grep -v index.json | tr '\n' ' ' | sed "s/\s/\",\"/g" | sed "s/\",\"$/\"\]\}/g" | sed "s/^/\{\"articles\":\[\"/g" > index.json
