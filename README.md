# aws-lambda-node.js
# Ride-and-Drive Events REST API 

# Endpoint: https://qfdybmvc7d.execute-api.us-east-2.amazonaws.com/dev/events

Node.js project was built using `$ npm init`

Lambda function was built using node.js;
Database was built using AWS RDS(Relational Database Service) and MySQL;
AWS API Gateway was used to make the API publicly accesible;

1. -> Clone repo

## Instalation
``npm install``

## Functionality:
Full CRUD JSON API. Endpoint supports following methods:

- (POST) Create new event
- (GET) Read event(s) 
- (PUT) Update event
- (DELETE) Delete event

## How to use:
(POST) https://qfdybmvc7d.execute-api.us-east-2.amazonaws.com/dev/events
requires 
`headers`
`body`
=> Returns created event

(GET) https://qfdybmvc7d.execute-api.us-east-2.amazonaws.com/dev/events/
requires 
{id}
=> Returns all existed events

(GET) https://qfdybmvc7d.execute-api.us-east-2.amazonaws.com/dev/events/{id}
requires 
{id}

=> Returns event with provided id

(PUT) https://qfdybmvc7d.execute-api.us-east-2.amazonaws.com/dev/events/{id}
requires 
{id}
`headers`
`body`

=> Returns updated event with provided body

(DELETE) https://qfdybmvc7d.execute-api.us-east-2.amazonaws.com/dev/events/{id}
requires 
{id}
`headers`

=> Returns Message about deleted event







