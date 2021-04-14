# todo

create CRUD grid, single view, single update
  create should always share code with update, create uses new model, update uses one populated from the database

add Address model - proposed
  Street1
  Street2
  City
  State
  Zip (can have 5 or 9 digits)
  IsMailing
  IsBilling

flesh out Submittal model

create model Project
  number (e.g. 17100)
  name (FUSD McLane High School)

set up code style

- ESlint
- AirBnB javascript style
- Prettier

refactor layout - I want 2 folders in `src`, `src\client` and `src\server`
or possibly 3? client, server, and db? should server and db be coupled?

also I really want typescript now there is no learning-objective-oriented reason to not have it, from what I can tell