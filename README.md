  - Requirements:
    - Node is installed
    - You have local/remote MySQL server

1. How to use
    1. clone this repo: `https://github.com/xianliflc/software-developer-coding-challenge.git`
    2. cd `path/to/software-developer-coding-challenge/`
    3. run `npm install`
    4. import schema and test data with `dump.sql`
    5. update `config/config.js` with proper `host, user, password`, for now only default port `3306` is supported
    6. run `node index.js` to start the server
    7. For functions showcase, please `cd electron_app` and run `npm install`, and then run `npm start`, make sure main server of auction system is running, and it's trying to connect port http://localhost:8080/api which is auction server is listening.
        1. click top-left menu to show all available users, the default user is `user 1`
        2. click each car in the list, you can see three buttons
            1. All Bids: click get all bids on the selected car
            2. Winning Bid: click to get the winning bid on the selected car
            3. Add Bid: enter a number in the input field on the right of the button (no $, only integer or float), then click this button
        3. All response should be rendered in each car's section
   
2. Technology stack
    1. Node.js w/Express 
    2. MySQL
    3. Electron w/MaterializeCSS and Jquery

3. Main Functions of an auction system:
    1. Record a user's bid: able to bid and get it recorded by `POST api/bids/:car_id`
    2. Get winning bid on a certain car:  `GET api/bids/:car_id/winner`
    3. Get bids history on a certain car `GET api/bids/:car_id`

4. API:
    > add bid
    Request: 
    - car_id (required) must be positive integer
    - bidding_value (required) must be positive number >=1
    - user_id (required) must be positive integer
    ```http
    POST /api/bids/3 HTTP/1.1
    Host: localhost:8080
    Content-Type: application/json
    {
        "user_id" : 4,
        "bidding_value" : "13.33"
    }
    ```
    Response:
    ```json
    {
        "success": true,
        "data": {
            "message": "success"
        }
    }
    ```
    > get the winning bid on a certain car
    Request
    - car_id (required) must be positive integer
    ```http
    GET /api/bids/1/winner HTTP/1.1
    Host: localhost:8080
    ```
    Response
    ```json
    {
        "success": true,
        "data": {
            "car_id": 1,
            "winner": [
                {
                    "bidding_value": 13.33,
                    "user_id": 3
                }
            ]
        }
    }
    ```
    > get all bids on a certain car
    Request
    - car_id (required) must be positive integer
    ```http
    GET /api/bids/1 HTTP/1.1
    Host: localhost:8080
    ```
    Response
    ```json
    {
        "success": true,
        "data": {
            "car_id": 1,
            "bids": [
                {
                    "user_id": 1,
                    "bidding_value": 10,
                    "created_at": "2018-12-01T02:18:47.000Z"
                },
                ...
                {
                    "user_id": 12,
                    "bidding_value": 13.33,
                    "created_at": "2018-12-01T20:02:27.000Z"
                },
                {
                    "user_id": 3,
                    "bidding_value": 13.33,
                    "created_at": "2018-12-01T21:12:31.000Z"
                }
            ]
        }
    }
    ```
    > get all cars (only used for showcase)
    ```http
    GET /api/car HTTP/1.1
    Host: localhost:8080
    ``` 
    > get all users (only used for showcase)
    ```http
    GET /api/user HTTP/1.1
    Host: localhost:8080
    ``` 
5. TODO:
    1. add memcached as caching layer
    2. move data layer from containers to Dao or using ORM
