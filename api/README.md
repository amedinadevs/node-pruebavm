# SOFTWARE NECESARIO

- NodeJS
- MongoDB (No es obligatorio, ver instrucciones)
- Git 


# INSTRUCCIONES PUESTA EN MARCHA

1. Instalar NodeJS
2. Instalar Git
3. Hacer un clone al repositorio (https://github.com/amedinadevs/node-pruebavm.git)


## BASE DE DATOS

Se ha utilizado la base de datos MongoDB. Para no hacer obligatoria la instalación de la base de datos en local se ha dejado prepara una cadena de conexión apuntando a MongoDB Atlas en el archivo situado que podrá sustituirse por otra en local (ver variable *urlDB*):
- server/config/config.js

Para atacar la BD a local sustituir dicha variable por la conexión local.

### USUARIO PRUEDAS MONGODB ATLAS
Para realizar las pruebas a MongoAtlas se ha dejado preparadas las llamadas a los servicios al fichero POSTMAN con el usuario:

- id: 5e65226653614e078c0264ed
- email: info@alexmedina.net
- password: 1234


## ARRANCAR LA APLICACION

1. Situarse en el directorio raíz de la aplicación 
2. Instalar las dependencias de la aplicación. Ejecutar: $ npm i
3. Poner en marcha el server: $ node server/server 
3. Abrir Postman y cargar el fichero *postman/Prueba VM.postman_collection.json* 


## ACERCA DEL FICHERO POSTMAN
El fichero de postman contiene todos los servicios de la API listos para probarlos a excepción de los que se le pasa por parámetro un identificador que se ha puesto uno ya existente solo en MongoDB Atlas.


# NOTAS ACERCA DE LA PRUEBA

1. Se ha realizado los métodos de la API propuestos.
2. El método de Borrado de usuario esta disponible en dos opciones, con borrado de la base de datos o con borrado por flag (estado = false)
3. Adicionalmente se ha incluido un método de listar los usuarios que vendrá bien para obtener los ids (GET/usuario)
4. Se ha utilizado autentifiación JWT, los métodos de Listar, Modificación y Borrado necesitan el token para ejecutarse correctamente. El fichero de POSTMAN esta diseñado para cuando se haga el (POST/login) se guarde el token y se utilice para los demás métodos. Se puede ver en la *pestaña Tests* de este servicio.

