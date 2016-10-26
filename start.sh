#!/bin/bash

echo "Starting nginx..."
nginx

echo "Starting php..."
php-fpm --nodaemonize
