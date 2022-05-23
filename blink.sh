#!/bin/bash
pm2 stop sisbib
pm2 start --name sisbib npm -- start
