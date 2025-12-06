#!/bin/bash
echo "Starting AI Video Generator..."
echo "Opening http://localhost:8000"
open http://localhost:8000
/usr/bin/python3 -m http.server 8000
