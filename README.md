# Backend Ecommerce

## About

<p>
    This is a backend project for a web application. Its purpose is to provide a REST API for managing data and perfoming business logic. It`s an API to manage data of a ecommerce. 
</p>

<p align="center">
    <a href="#tech-stack">Tech-Stack</a> •
    <a href="#tech-stack">Architecture</a> •
    <a href="#tech-stack">Installation</a> •
    <a href="#tech-stack">API Reference</a> •
    <a href="#deploy">Deploy</a> •
    <a href="#author">Author</a>
</p>

### Tech-Stack

- [x] Node.js<br>
- [x] Express.js<br>
- [x] MongoDB<br>
- [x] Joi<br>
- [x] Uuid<br>
- [x] Bcrypt<br>

### Architecture

The backend project is structured as a REST API with the following components:
- Controllers: Handles incoming HTTP requests and calls the appropriate service functions.<br>
- Middlewares: Handles authentication and request validation.<br>
- Schemas: Defines the MongoDB schemas.<br>
- Routes: Implements the business logic for the API.<br>

### Installation

1. Clone the repository to your local machine.<br>
2. Run `npm install` to install all dependencies.<br>
3. Start MongoDB locally or connect to a remote database.<br>
4. Create a `.env` file and set the `DATABASE_URL`.<br>
5. Run `npm start` to start the server.

### API Reference

Authentication:
- POST /sign-in -> payload: {email, pwd}
- POST /sign-up -> payload: {email, name, phone, pwd, repeatPwd}
- POST /sign-in-admin -> payload: {email, pwd}

Cart:
- GET /cart -> headers: {token}
- POST /cart/:idItem -> headers: {token}, payload:{quantityItem}
- PUT /cart/:idItem -> headers: {token}, payload:{quantityItem}
- DELETE /cart -> headers: {token}
- DELETE /cart/:idItem -> headers: {token}
- POST /cart-payment -> headers: {token}

Items:
- GET /items
- GET /items/:idItem
- POST /items -> payload:{nameItem, imageItem, valueItem, quantityItem}
- PUT /items/:idItem -> payload:{nameItem, imageItem, valueItem, quantityItem}

Users:
- GET /users -> headers: {token}

### Deploy

The API is available on Render:<br>
<a href='https://ecommerce-api-9r3o.onrender.com' target="_blank" ><img src='https://img.shields.io/badge/render%20-%23000000.svg?&style=for-the-badge&logo=render&logoColor=white'></a>

### Author

---

<p align='center'> 
  <img src="https://avatars.githubusercontent.com/u/77166529?s=460&u=a50a7e5f0522d64711bf41b7414631390ae9d80" width="100px" style="border-radius: 50%"/>
  <br>
  <a href="https://www.linkedin.com/in/mateuskavamotovasconcelos/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>
  <a href="mailto:mateuskvasconcelos@gmail.com"><img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/></a>
  <a href="https://github.com/mkvasconcelos"><img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" /></a>
</p>
