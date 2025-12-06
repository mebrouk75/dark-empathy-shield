#!/bin/bash
cd "$(dirname "$0")"
echo "Lancement de l'application..."
/usr/bin/python3 -m http.server 8000 &
sleep 1
open http://localhost:8000
echo "L'application tourne ! Ne fermez pas cette fenetre."
wait
