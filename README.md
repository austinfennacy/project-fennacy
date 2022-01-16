# What is Project Fennacy?

My father is an architect, and one day we were talking about how much time his office wastes manually generating, updating, and tracking PDFs that are necessary to communicate with the many contractors his firm partners with. I've been dying to learn more about node ecosystem, and this was a perfect opportunity to build and deploy a website that I have 100% control over. Using tools like React, Material-UI, Express, Passport, Puppeteer, Sequelize, and many more, Project Fennacy was born.

## How much time do you have?

- **1 minute**
  - 📷 Browse GIFs of the project and technologies used in the [Project Overview](#project-overview).
- **5 minutes**
  - 🔬 Additionally, browse a more complete list of the technologies used in [What I Learned](#what-i-learned).
- **10 minutes**
  - 🔨 Additionally, create an account and explore the production build of Project Fennacy at [https://pf.austinfennacy.com](https://pf.austinfennacy.com).
- **Too much time**
  - 👩‍💻 Browse the publicly-available source code for this project at [https://github.com/austinfennacy/project-fennacy](https://github.com/austinfennacy/project-fennacy).
    - 👀 If you looking at the source code, I've provided a high-level overview of how the code is structured in the [Basic Architecture](#basic-architecture)
  - 🏡 If you'd like to clone the project and build it locally, follow the instructions in [Usage: building from a fresh clone](#usage-building-from-a-fresh-clone).

## Table of Contents

1. [Project Overview](#project-overview)
2. [What I Learned](#what-i-learned)
3. [Basic Architecture](#basic-architecture)
4. [Usage: building from a fresh clone](#usage-building-from-a-fresh-clone)
5. [FAQ: understanding an Architect's use case](#faq-understanding-an-architects-use-case)

## Project Overview

aa

[🔙 Table of Contents](#table-of-contents)

## What I Learned

aa 

[🔙 Table of Contents](#table-of-contents)

## Basic Architecture

Project Fennacy uses independent server and client projects, located in `./server` and `./client`.

[🔙 Table of Contents](#table-of-contents)

## Usage: Building from a Fresh Clone

- `npm install` in ./src/server and in ./src/client
- in Windows or the OS of your choice, install MySQL, create user & save db_myusername and db_mypassword
  - to keep it simple, have server (MySQL80 Service) automatically run on startup
- navigate to `./server`, create a file named `.env`, and populate it:
  - note: there are no quotes used surrounding db_myusername and db_mypassword (see npm dotenv for more)
  - also generate a random guid to store for SESSION_SECRET, to be used by npm package express-session

```env
DB_HOST=localhost
DB_USER=db_myusername
DB_PASS=db_mypassword
SESSION_SECRET=my_randomly_generated_secret
```

- start MySQL server
  - if unsuccessfull, check Windows>Start>Services>MySQL80
- navigate to `./server` and run

```console
npm run init_db
```

- to start the server and client concurrently (reccomended), run

```console
cd server
npm run dev
```

- alternatively, you may run the server and client separately by navigating into `./client` and `./server` and using the command

```console
npm start
```

[🔙 Table of Contents](#table-of-contents)

## FAQ: understanding an Architect's use case

aa

[🔙 Table of Contents](#table-of-contents)

## Motivation

> You may have been told, or felt yourself, that JS is a deeply flawed language that was poorly designed and inconsistently implemented. Many have asserted that it's the worst most popular language in the world; that nobody writes JS because they want to, only because they have to given its place at the center of the web. That's a ridiculous, unhealthy, and wholly condescending claim. Millions of developers write JavaScript every day, and many of them appreciate and respect the language. <https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/preface.md>

Almost a year ago, I recorded this quote to help me perservere with JavaScript's dynamic typing, lack of classes, and messy truthy variables. Coming from a C# background, these were deeply frustrating and challenged the way I thought about code. However, no matter how valid arguments against the language are, JavaScript is ubiquitous with the web, which makes it inherently necessary. After spending countless hours with this project, I can confidently say that I love JavaScript quirks-and-all. I am much better equipped to understand the value it and the node ecosystem provide for rapid, elegant, and powerful web development.

[🔙 Table of Contents](#table-of-contents)

## Thanks!

I hope you enjoyed learning about my project as much as I enjoyed learning alongside it.

🎊
