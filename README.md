# Lecteur

## About
Lecteur web app is a book checklist. Lecteur's purpose is to help book lovers organize their current readings and, at the same time, to think of their next  readings.
It's my first web app with NODE.JS and MongoDB. My purpose with this project is, beyond having fun, to train my skills to explore the unknown and going deeper into others technologies.

## What a user can do
The user only can add new books to his library, when the book is available on google books. After adding in his library, the user can change the book status, between: "In Progress", "Reading" and "Read".

## How to run

First, check if "27017" port and "4040" port are available on your device. In oSX, you can check using `lsof -n -i4TCP:{PORT}` command.
Did you check?
Okay...
<br>After git clone, inside project folder, you must run `docker compose up` on bash and acess the Lecteur, by default, on http://localhost:4040/ </br>


## Technologies used

### Front-end
----
 <div style="display:flex">
 <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS">
   <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS"/>
  </a>
 <a href="https://developer.mozilla.org/pt-BR/docs/Web/CSS">
   <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML"/>
  </a>
 <a><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Javascript"/></a>
</div>

### Back-end
----
<div style="display:flex">
 <a href="https://nodejs.org/en/docs/"><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" /></a>
 <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js"/></a>
 <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/></a>
</div>

## Schemas description

#### Books
  
Field | Description
----|----
_id| Primary Key
title| String
author | String
image | String
rate | Integer
addedAt | Date (when add on user's library)
finishedAt | Date
startedAt | Date
status | String - ENUM ['TO READ','READING', 'READ']

#### Books

Field | Description
----|----
_id| Primary Key
name| String
e-mail | String
password | String

