create CRUD grid, single view, single update
  create should always share code with update, create uses new model, update uses one populated from the database

add Address model - proposed - 
  Street1
  Street2
  City
  State
  Zip (can have 5 or 9 digits)
  IsMailing
  IsBilling

flesh out ShopDrawingModel

create model Project
  number (e.g. 17100)
  name (FUSD McLane High School)

set up code style
- ESlint
- AirBnB javascript style
- Prettier