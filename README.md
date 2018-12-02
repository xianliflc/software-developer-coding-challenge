 
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
   
2. Technology stack
    1. Node.js w/Express
    2. MySQL

3. Main Functions:
    1. Record a user's bid: able to bid and get it recorded by `POST api/bids/:car_id`
    2. Get winning bid on a certain car:  `GET api/bids/:car_id/winner`
    3. Get bids history on a certain car `GET api/bids/:car_id`

4. 