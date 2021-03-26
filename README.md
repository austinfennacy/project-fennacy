WHEN IN DOUBT, YAGNI

## stack
### frontend must-have
- react (frontend framework)
- create-react-app (boilerplate)
- Redux (state management)
- react router
- passport (authentication)
- axios (HTTP requests client, to access backend API)
### frontend nice-to-have
- ESlint, AirBnB javascript style (code style enforcement)
- Prettier (code format enforcement)
- ant, material, or evergreen? (css library)
- jest, react testing library? (testing)
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
### backend must-have
- express (backend API/framework)
- sequelize (ORM between models/db)
- MySQL (db)
### other tools
 - dotenv (loads private keys from local env to protect them in shared git repos)
 - (?) body-parser if I need to parse JSON?
### stack design research/sources
- https://css-tricks.com/project-need-react/
- https://facebook.github.io/flux/
- https://sidetrade-tech-hub.medium.com/modern-2020-react-stack-or-how-we-switched-away-from-angular-a9efb65d51e5

### style guide thoughts
- Sequelize has the option to have Models named differently than MySQL Tables, so that js model naming convention of PascalCase can be enforced while MySQL table naming convention of snake_case can be enforced simultaneously. However, since I plan on using Sequelize for all database interactions and want this project to be strictly code-first for all migrations, seeding etc, I don't care if the MySQL database breaks convention. enforcing the convention will only increase the boilerplate I have to write for every model and every model field. I will not be overriding Sequelize's database naming conventions to reduce boilerplate in models.

## questions to answer
- where will the business logic live in my architecture?
- what is FLUX architecture? what problems does it solve? will it tell me where to put my business logic?
  - "In flux pattern, data flows in a single direction. Additionally, all the logic for updating state is contained in the store itself and no other parts of the application need to know how to update the state. It is hard to understand an application if every part of the application can mutate state. This is not the case in a flux application."
- how can I write the least SQL possible, create the db using code, and update the db schema using code-first migrations?

## learning objectives for sandbox
- FLUX app to better understand React/Redux
  - https://github.com/facebook/flux/tree/master/examples/flux-todomvc
- Sequelize tutorial
  - will it solve my "SQL-less" needs? is it all code first?
  - https://www.esparkinfo.com/node-js-with-mysql-using-sequelize-express.html
- "know" js
  - https://github.com/getify/You-Dont-Know-JS

## motivation
- You may have been told, or felt yourself, that JS is a deeply flawed language that was poorly designed and inconsistently implemented. Many have asserted that it's the worst most popular language in the world; that nobody writes JS because they want to, only because they have to given its place at the center of the web. That's a ridiculous, unhealthy, and wholly condescending claim. Millions of developers write JavaScript every day, and many of them appreciate and respect the language. (https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/preface.md)