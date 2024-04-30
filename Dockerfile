
# Use a base image for Jena Fuseki 
FROM stain/jena-fuseki

# ENV ADMIN_PASSWORD=adminpw123

# Copy configuration files and ontology
# COPY config/config.ttl /jena-fuseki/run/
COPY --from=build ./onthologie/onthologie.owl /tmp/

# COPY . /jena-fuseki/webapp
COPY --from=build ./Appweb/foodData /jena-fuseki/webapp/build/

# Copy the ontology file to the dataset directory of Jena Fuseki
# COPY ./ontology/cap_vert_dishes.owl /jena-fuseki/run/databases/dataset/

# Expose port 3030 for Jena Fuseki and node
EXPOSE 3000
EXPOSE 3030

USER root

# # Start Jena Fuseki server
CMD ["/jena-fuseki/fuseki-server --file=/tmp/onthologie.owl /foodData"]

