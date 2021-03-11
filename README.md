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
- Formik (form validation)
- Yup (schema builder that reduces boilerplate validation from Formik)
- ant, material, or evergreen? (css library)
- jest, react testing library? (testing)
### backend must-have
- express (backend API/framework)
- sequelize (ORM between models/db)
- MySQL (db)

### stack design research/sources
- https://css-tricks.com/project-need-react/
- https://facebook.github.io/flux/
- https://sidetrade-tech-hub.medium.com/modern-2020-react-stack-or-how-we-switched-away-from-angular-a9efb65d51e5

## questions to answer
- where will the business logic live in my architecture?
- what is FLUX architecture? what problems does it solve? will it tell me where to put my business logic?
  - "In flux pattern, data flows in a single direction. Additionally, all the logic for updating state is contained in the store itself and no other parts of the application need to know how to update the state. It is hard to understand an application if every part of the application can mutate state. This is not the case in a flux application."
- how can I write the least SQL possible, create the db using code, and update the db schema using code-first migrations?

## todo sandbox
- FLUX app to better understand React/Redux
  - https://github.com/facebook/flux/tree/master/examples/flux-todomvc
- Sequelize tutorial
  - will it solve my "SQL-less" needs? is it all code first?
  - https://www.esparkinfo.com/node-js-with-mysql-using-sequelize-express.html