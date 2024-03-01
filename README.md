<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Diagrama de base de Datos de la aplicacion

<p align="center">
  <img src='diagrama/moviesDB - public.png' alt="Descripción de la imagen"/>
</p>

## Pasos para la instalacion

1. Tener instalado Node para su sistema operativo seguir los pasos de instalacion de su sitio web en base a su sistema operativo

   - `https://nodejs.org/en `

2. Instalar yarn
   ```
   npm install --global yarn
   ```
3. Instalar Docker para su sistema operativo siguiendo los pasos de la pagina web

   - `https://docs.docker.com/engine/install `

4. Instalar las dependecias del proyecto
   ```bash
   $ yarn install
   ```

## Pasos para ejecutar la aplicacion

1. Instalar las dependecias del proyecto

   ```bash
   $ yarn install
   ```

2. Renombrar las variables de entorno de:
   ```bash
   $ env.sample a .env
   ```
3. Configurar las variables de entorno

4. Una vez configurado las variables de entorno ejecutar el comando de docker compose para crear la base de datos

   ```bash
   $ docker compose up -d
   ```

5. Correr la aplicacion con los siguientes comandos

   ```bash
   # desarrollo
   $ yarn run start

   # modo escucha
   $ yarn run start:dev

   # produccion
   $ yarn run start:prod
   ```

6. La aplicación estará disponible en [http://localhost:3000/api/v1/](http://localhost:3000/api/v1/).

## End points de la aplicacion

- Registro
  
  **Método:**
  `POST`
  - http://localhost:3000/api/v1/usuario/register
  ```json
  {
    "usuario": "",
    "nombres": "",
    "primer_apellido": "",
    "segundo_apellido": "",
    "contrasena": ""
  }
  ```

- Login
  
  **Método:**
  `POST`
  - http://localhost:3000/api/v1/usuario/login
  ```json
  {
    "usuario": "",
    "contrasena": ""
  }
  ```

- Verificar Token
  
  **Método:**
  `GET`
  - http://localhost:3000/api/v1/usuario/check-token

  ```bash
       curl --location 'http://localhost:3000/api/v1/usuario/check-token' \
        --header 'Authorization: Bearer Tu-token'
  ```

- Agregar favoritos
  
    **Método:**
  `POST`
  - http://localhost:3000/api/v1/peliculas/favorito

  ```json
  {
    "imdbID": "",
    "title": "",
    "year": "",
    "poster": "",
    "actors": "",
    "director": "",
    "usuario_id": ""
  }
  ```
- Eliminar favoritos
  
   **Método:**
  `DELETE`
  - http://localhost:3000/api/v1/peliculas/favoritas/eliminar/id_pelicula

  ```json
  {
    "imdbID": "",
    "title": "",
    "year": "",
    "poster": "",
    "actors": "",
    "director": "",
    "usuario_id": ""
  }
  ```
- Listar favoritos
  
   **Método:**
  `GET`
  - http://localhost:3000/api/v1/peliculas/lista-favorito/id_usuario

  
