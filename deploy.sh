#!/bin/bash

# Définir les variables
APP_NAME="proximity"
APP_PATH="/chemin/vers/mon_application"
REMOTE_HOST="utilisateur@serveur distant"
REMOTE_PATH="/chemin/vers/mon_application"

# Se connecter au serveur distant
ssh $REMOTE_HOST << EOF

# Arrêter l'application
sudo systemctl stop $APP_NAME

# Copier les fichiers
rsync -avz --delete $APP_PATH $REMOTE_PATH

# Démarrer l'application
sudo systemctl start $APP_NAME

EOF
