#paramètre définit l’image Docker de base.
FROM node:18-alpine AS build

#paramètre définit le répertoire d'application par défaut. Le répertoire défini est créé s'il n'existe pas.
WORKDIR /usr/src/app

#paramètre copie les fichiers et répertoires de l'application locale dans le répertoire défini.
COPY . /usr/src/app

#paramètre installe la dépendance globale de ligne de commande pour Angular.
RUN npm install -g @angular/cli

#paramètre installe les dépendances de l'application Angular.
RUN npm install

# This run will store the build in the folder build
RUN npm run build

#paramètre crée et exécute l'application Angular pour un accès externe.


#Ensuite, nous allons créer l'image avec la commande ci-dessous.
# $ docker build -t angular-docker .
#Après avoir créé l'image, nous vérifierons si l'image a été créée avec la commande ci-dessous.
# $ docker images
#Exécutons le conteneur Docker en utilisant l'image créée de l'application Angular avec la commande ci-dessous.
# $ docker run -p 4201:4200 angular-docker
#Nous allons maintenant vérifier si le conteneur est en cours d'exécution avec la commande ci-dessous.
# $ docker ps
#Prêt ! Ensuite, nous accéderons à l'URL http://localhost:4201/et vérifierons si l'application fonctionne dans le conteneur Docker.


# Use a base image for Jena Fuseki
FROM stain/jena-fuseki


# Expose port 3030 for Jena Fuseki and node
#EXPOSE 3030

# ENV ADMIN_PASSWORD=adminpw123

# Copy configuration files and ontology
# COPY config/config.ttl /jena-fuseki/run/
COPY --from=build /usr/src/app/onthologie.owl /tmp/

# COPY . /jena-fuseki/webapp

COPY --from=build /usr/src/app/ /jena-fuseki/webapp/build/

# # Start Jena Fuseki server
# CMD ["ng", "serve", "--host", "0.0.0.0"]
USER root

RUN apk upgrade --no-cache
RUN apk add --update curl

ENV NODE_PACKAGE_URL  https://unofficial-builds.nodejs.org/download/release/v18.17.0/node-v18.17.0-linux-x64-musl.tar.gz
RUN apk add libstdc++
RUN wget $NODE_PACKAGE_URL
RUN mkdir -p /opt/nodejs
RUN tar -zxvf *.tar.gz --directory /opt/nodejs --strip-components=1
RUN rm *.tar.gz
RUN ln -s /opt/nodejs/bin/node /usr/local/bin/node
RUN ln -s /opt/nodejs/bin/npm /usr/local/bin/npm

# RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
#     && apk add nodejs
RUN apk add --no-cache nodejs npm
RUN npm install -g npm@9.6.6

RUN node -v

    # Copy startup script
COPY --from=build /usr/src/app/startup.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/startup.sh && chown root:root /usr/local/bin/startup.sh
# RUN chmod +x /usr/local/bin/startup.sh

# Define default command
CMD ["startup.sh"]

# # Start Jena Fuseki server
# CMD /jena-fuseki/fuseki-server --file=/tmp/cap_vert_dishes.owl /cap-vert-dish && npm start --prefix fuseki/build/
