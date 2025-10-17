# Requerimientos

# Requerimientos e Instalación del Proyecto

## Requerimientos

### Frontend
- Node.js v22.20.0 (LTS)
- Angular CLI v20.3.5

### Backend
- .NET 8.0

### Docker
- Docker Desktop v4.46.0

------------------------------------------------------------

## Instalación

### 1. Descargar el proyecto
Clona o descarga el repositorio completo a tu máquina local

------------------------------------------------------------

### 2. Configuración del Frontend

1. Navega a la raíz del directorio del frontend.
2. Instala las dependencias con el siguiente comando:

   npm install

3. Para levantar el servidor de desarrollo y ejecutar el frontend, usa:

   ng serve

------------------------------------------------------------

### 3. Configuración del Backend con Docker

#### Crear las imágenes

- En la raíz del proyecto GestionProductos, ejecuta:

  docker build -t gestionproductos .

- En la raíz del proyecto RegistroTransacciones, ejecuta:

  docker build -t registrotransacciones .

#### Crear y levantar los servicios

En la raíz del proyecto, ejecuta:

  docker-compose up -d

------------------------------------------------------------

### 4. Configuración de Bases de Datos

#### Base de Datos: GestionProductosDB

1. Conéctate al contenedor:

   docker exec -it GestionProductosDB psql -U postgres

2. Crea la base de datos:

   CREATE DATABASE gestionproductosdb;

3. Conéctate a la base creada:

   \c gestionproductosdb

4. Crea la tabla productos:

   CREATE TABLE productos (
       producto_id SERIAL PRIMARY KEY,
       nombre VARCHAR(255) NOT NULL,
       descripcion VARCHAR(255) NOT NULL,
       categoria VARCHAR(255) NOT NULL,
       imagen VARCHAR(255),
       precio NUMERIC(10, 2) NOT NULL,
       stock INT NOT NULL
   );

5. Cierra la conexión:

   exit

------------------------------------------------------------

#### Base de Datos: RegistroTransaccionesDB

1. Conéctate al contenedor:

   docker exec -it RegistroTransaccionesDB psql -U postgres

2. Crea la base de datos:

   CREATE DATABASE registrotransaccionesdb;

3. Conéctate a la base creada:

   \c registrotransaccionesdb

4. Crea la tabla transaccion:

   CREATE TABLE transaccion (
       transaccion_id SERIAL PRIMARY KEY,
       fecha TIMESTAMP WITH TIME ZONE NOT NULL,
       tipo_transaccion VARCHAR(255) NOT NULL,
       producto_id INT NOT NULL,
       cantidad INT NOT NULL,
       precio_unitario DECIMAL(10, 2),
       precio_total DECIMAL(10, 2),
       detalle VARCHAR(255)
   );

5. Cierra la conexión:

   exit

- Para levantar el servidor de desarrollo y ejecutar el frontend, usa:
  ```bash
  ng serve

      
