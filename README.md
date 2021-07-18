# WHEN IN DOUBT, YAGNI, KISS

## getting started from fresh clone

- npm install in root and in ./src/client
- install MySQL, create user & save db_myusername and db_mypassword
  - to keep it simple, have server (MySQL80 Service) automatically start on windows startup
- create .env and populate it
  - note: there are no quotes used surrounding db_myusername and db_mypassword
  - (see npm dotenv for more)

```env
DB_HOST=localhost
DB_USER=db_myusername
DB_PASS=db_mypassword
```

- start MySQL server
  - if unsuccessfull, check Windows>Start>Services>MySQL80
- in terminal at project root, run

```console
npm run init_db
```

- then run

```console
npm run dev
```

## stack

### frontend must-have

- react (frontend framework)
  - jsx (included w react, html markup inside js)
  - create-react-app (boilerplate / toolchain initializer)
  - react router
- material UI (css library)
- axios (HTTP requests client, to access backend API)

### backend must-have

- express (backend API/framework)
- sequelize (ORM between models/db)
- MySQL (db)
- puppeteer (pdf generation)

### Project Organization?

- React is opinionless on how to organize a project, for dev flexibility
- create-react-app has very mild opinions, still may not be enough structure
  - interesting templating, could be used for inspiration
  - <https://create-react-app.dev/docs/custom-templates/>
  - <https://www.npmjs.com/search?q=cra-template>-*
- <https://reboot.studio/blog/folder-structures-to-organize-react-project/>
- <https://www.sitepoint.com/organize-large-react-application/>
- <https://create-react-app.dev/docs/importing-a-component/#absolute-imports>
- <https://nx.dev/react>
  - [Nx: Extensible Dev Tools for Monorepos](https://www.youtube.com/watch?v=E188J7E_MDU)
- I want to get react working first before I add structure/complexity

### frontend nice-to-have

- passport (authentication)
- ESlint, AirBnB javascript style (code style enforcement)
  - will this enforce strict mode implicitly?
- Prettier (code format enforcement)
- [ant's suggested third-party libraries for react](https://ant.design/docs/react/recommendation)
- jest, react testing library, Cypress? (testing)
  - via nx: "And let’s face it: writing Jest tests for presentational components does not work well. For instance, we often use animations in design to engage and delight users — and animations are important to test. When testing details like animations, we want to make sure the necessary UI components are visible before clicking. Cypress does that. Jest does not, and isn’t suitable for this job."
- Redux would technically be a nice-to-have, but I'm so excited by immutability/functional programming concepts that I want to enforce and learn more about it, so making this nice-to-have a must-have for learning's sake
- TypeScript
  - I really want it, the only reason I wouldn't put it in this project was to become a stronger "vanilla" javascript developer...

### repo organization considerations

- currently just running with a working directory layout, probalby could be better organized

### css library considerations

- ant, material, or evergreen?
- evergreen doesn't have enough of an ecosystem, thought it is beautiful out of the box. non-starter for lack of support. getting a bad impression from youtube.
- material has a ton of customization and is very fleshed out / supported
- ant design comes from alibaba where material comes from google, so while ant's ecosystem and robustness is on par with material, a lot of it's support may be in a language I can't speak, so I may not have access to the fully robust ecosystem in the same way that I may with material
- honestly at this point I'm just nitpicking and I would be well off with virtually any of the 5 css libraries I've researched - there's no way I encounter an edge case with my basic project. KISS.
- **Material UI** it is! :)

### validation considerations

on frontend, could use

- Formik (form validation)
- Yup (schema builder that reduces boilerplate validation from Formik)
however, sequelize has what looks to be very robust validation. if sequelize
can communicate it's validation constraints automatically to the react
project then that would be perfect, so that validation is DRY and stored in
the sequelize model.
sequelize has fleshed out basic validation but also supports custom validation
rules, so this seems like a fantastic option

### other tools

- dotenv (loads private keys from local env to protect them in shared git repos)
- (?) body-parser if I need to parse JSON?

### stack design research/sources

- <https://css-tricks.com/project-need-react/>
- <https://facebook.github.io/flux/>
- <https://sidetrade-tech-hub.medium.com/modern-2020-react-stack-or-how-we-switched-away-from-angular-a9efb65d51e5>

### stack thoughts

next.js framework?

- official react docs reccomend it for [static and server-rendered applications](https://reactjs.org/docs/create-a-new-react-app.html#nextjs)
- not sure if it will be the right tool given backend considerations, but I don't know enough about it to be sure
  - **update** - it's absolutely not the right tool, I'm not building a static server-rendered app
- yagni? kiss?
- **considering education**: it's important to have a thorough understanding of the "vanilla" core tools such as react, so while next.js could likely make life easier in certain use cases, given that a strong focus on this project is learning about tools like react, I will not use next.js. I want to use this project to really learn about React, and I may as well focus on vanilla unencumbered React.

sequelize: `.sync()` vs migrations

- sequelize CAVEAT - migrations do not automatically sync with changes to models, so if a model/migration is created from the CLI, 2 sources of truth must be updated.
- sequelize.sync() and migrations perform different purposes, migrations are like git version controlled changes whereas sync can only show you the latest version
- if migrations are used, they must be kept up-to-date with the results that would be otherwise generated by sync(), otherwise they're useless
- [Sequelize Sync vs Migrations](https://stackoverflow.com/a/41628138/9193938)
- PLAN OF ACTION - while I'm getting started, I think the best thing to do will be to rely exclusively on .sync(), especially since I'm learning more about the sequelize API and don't care if I destroy data. however, once I'm starting to consider deployment, it will be important to start practicing migrations, and eventually using migrations for prod deployment. it could be an option to use .sync() in the interrim and use migrations only when deploying, so 1 migration for 1 deployment, to capture the various deployment states while also not requiring excessive code boilerplate maintenence.

### style guide thoughts

- Sequelize has the option to have Models named differently than MySQL Tables, so that js model naming convention of PascalCase can be enforced while MySQL table naming convention of snake_case can be enforced simultaneously. However, since I plan on using Sequelize for all database interactions and want this project to be strictly code-first for all migrations, seeding etc, I don't care if the MySQL database breaks convention. enforcing the convention will only increase the boilerplate I have to write for every model and every model field. I will not be overriding Sequelize's database naming conventions to reduce boilerplate in models.

### what to do with enums

- enums are data, not code
- enums should have data stored in a reference table
  - foreign keys enforce data validity
- <https://web.archive.org/web/20180324095351/http://komlenic.com/244/8-reasons-why-mysqls-enum-data-type-is-evil/>
- [sql naming conventions](https://www.sqlshack.com/learn-sql-naming-conventions/)
- for clarity I'll put them in schema `enum`
  - hackey but worthwhile to avoid confusion, imo
  - everything else in `dbo` or default schema

## questions to answer

- where will the business logic live in my architecture?
- how should I organize my projects (frontend/backend?)
- what is FLUX architecture? what problems does it solve? will it tell me where to put my business logic?
  - "In flux pattern, data flows in a single direction. Additionally, all the logic for updating state is contained in the store itself and no other parts of the application need to know how to update the state. It is hard to understand an application if every part of the application can mutate state. This is not the case in a flux application."
- how can I write the least SQL possible, create the db using code, and update the db schema using code-first migrations?

## learning objectives for sandbox

- Sequelize tutorial
  - will it solve my "SQL-less" needs? is it all code first?
  - <https://www.esparkinfo.com/node-js-with-mysql-using-sequelize-express.html>
- "know" js
  - <https://github.com/getify/You-Dont-Know-JS>

## motivation

- You may have been told, or felt yourself, that JS is a deeply flawed language that was poorly designed and inconsistently implemented. Many have asserted that it's the worst most popular language in the world; that nobody writes JS because they want to, only because they have to given its place at the center of the web. That's a ridiculous, unhealthy, and wholly condescending claim. Millions of developers write JavaScript every day, and many of them appreciate and respect the language. <https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/preface.md>
