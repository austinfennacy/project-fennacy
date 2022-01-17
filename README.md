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
    - 👀 If you're looking at the source code, I've provided a high-level overview of how the code is structured in the [Basic Architecture](#basic-architecture) section.
  - 🏡 Clone the project and build it locally (make sure to follow the instructions in [Usage: building from a fresh clone](#usage-building-from-a-fresh-clone)).

## Table of Contents

1. [Project Overview](#project-overview)
2. [What I Learned](#what-i-learned)
3. [Basic Architecture](#basic-architecture)
4. [Usage: building from a fresh clone](#usage-building-from-a-fresh-clone)
5. [FAQ: understanding an Architect's use case](#faq-understanding-an-architects-use-case)
6. The Production Build: [https://pf.austinfennacy.com](https://pf.austinfennacy.com)
7. My Website: [https://austinfennacy.com](https://austinfennacy.com)

## Project Overview

Project Fennacy is a prototype where I tried to improve upon the app my father's office is using.

Before jumping into some of the features, lets look at the Microsoft Access app that Mr. Fennacy's office currently uses, alongside my design.

### The Overview Table

![Submittal Table Comparison](./docs/images/submittal-table-comparison.gif)

And here is an existing submittal document that my father has used in his work, compared with the web app version I made to mimic the PDF and the resulting PDF download.

### An Individual Submittal

![Submittal PDF Comparison](./docs/images/submittal-pdf-comparison.gif)

The existing solution can only be accessed locally on office machines, or by using a VPN into the office network. Anyone that's had to use a VPN for private office tooling knows how frustratingly slow that proces can be.

My solution is a web app that can be used remotely, since it is protected via login (a non-prototype version would not allow public account registration). Passwords are hashed using bcrypt, and user sessions are managed by Passport.

### Registration & Login

![Registration and Login](./docs/images/registration.gif)

The Access app his office uses does not automatically sync data between the overview table and the linked PDF documents. Documents must be stored in Box, and architects must save the file's stored path in a field in the Access app. In order to make changes, both the app and the PDF must be separately edited.

This is an obvious area for improvement, and is trivial for a web app that is also responsible for PDF generation.

### Create, Read, Update, & Delete

![Full CRUD](./docs/images/full-crud.gif)

Didn't catch all that? Want to click through at your own pace? Try it yourself! [https://pf.austinfennacy.com](https://pf.austinfennacy.com) 

Obviously, making updates propagate throughout the app would allow for architects to quickly change errors in both the PDF and the record table.

### PDF Download

![Update PDF](./docs/images/quick-changes.gif)

(you might have noticed that PDF download doesn't support emoji's, and without users to file tickets, it's probably going to stay that way - the joys of a side project 🙏🥰)

**Thank you** for reading a bit about my side project!

Want more?

- Lets link up on LinkedIn: [https://www.linkedin.com/in/austin-fennacy/](https://www.linkedin.com/in/austin-fennacy/)
- Check out my personal webpage: [https://austinfennacy.com](https://austinfennacy.com)
- Continue reading about technologies used: [What I Learned](#what-i-learned)
- Or, click through this project at your own pace: [https://pf.austinfennacy.com](https://pf.austinfennacy.com)

### 

![Bye!](./docs/images/looney.gif)


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
- ensure you are in the git branch `local-development` and not `main`, which is used for production
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

### What is a Submittal?

A submittal is a short PDF document that acts as a cover letter for a package of documents being submitted to subcontractors. For example, if my dad was designing a building containing an auditorium, he might send out a submittal for Acoustic Ceiling Samples to Western Building Materials. The submittal acts as a high level overview of a specific material procurement request.

### What is the existing solution?

Currently, my dad's office is using a homebuilt Microsoft Access program to keep track of submittals.

![Submittal Table Comparison](./docs/images/submittal-table-comparison.gif)

This app is mostly a large table with several fields for data entry, but none of these fields are in sync with what is input in PDFs. PDFs are individually populated in Adobe Acrobat from a template Submittal PDF, uploaded to a specific folder in Box (a cloud storage platform), and then the location of that file is copied into the Access app. There is no direct linkage or syncing. Since they don't use a web application with user login, the only way to access these private documents is to VPN into the slow office network.

![Submittal PDF Comparison](./docs/images/submittal-pdf-comparison.gif)

[🔙 Table of Contents](#table-of-contents)

## Motivation

> You may have been told, or felt yourself, that JS is a deeply flawed language that was poorly designed and inconsistently implemented. Many have asserted that it's the worst most popular language in the world; that nobody writes JS because they want to, only because they have to given its place at the center of the web. That's a ridiculous, unhealthy, and wholly condescending claim. Millions of developers write JavaScript every day, and many of them appreciate and respect the language. <https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/preface.md>

Almost a year ago, I recorded this quote to help me perservere with JavaScript's dynamic typing, lack of classes, and messy truthy variables. Coming from a C# background, these were deeply frustrating and challenged the way I thought about code. However, no matter how valid arguments against the language are, JavaScript is ubiquitous with the web, which makes it inherently necessary. After spending countless hours with this project, I proudly love JavaScript, quirks-and-all. I am much better equipped to understand the value it and the node ecosystem provide for rapid, elegant, and powerful web development.8

[🔙 Table of Contents](#table-of-contents)

## Thanks!

I hope you enjoyed learning about my project as much as I enjoyed learning alongside it.

🎊
