#!/bin/bash
echo 'Starting HTTP Server...'
cd /home/pi/MagicMirror
python -m SimpleHTTPServer
echo 'Http Server shutting down...'