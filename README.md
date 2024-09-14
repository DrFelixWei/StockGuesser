## Project Description

StockGuesser is a simple game where you are awarded scores for how accurately you can guess the movement a stock's price for a given date.


## Contributors
- Felix Wei

## Hosting
https://stockguesser.up.railway.app/


## Tech Stack
Frontend: vite-react
Backend: nestjs
Database: postgres 

## Installation
To get started with Stock Guesser, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/StockGuesser.git`
2. Navigate into api and install the required dependencies: `npm install`
3. Navigate into webapp and install the required dependencies: `npm install`
4. Update the .envs in both api and webapp (see example envs)
4. Link a postgres database to the api

## Usage
This is a monorepo divided into api and webapp subfolders. 
The monorepo is configured to be able to start both services from the root: `npm run start`

To run the backend and frontend independently, use these commands
in /api: `npm run start`
in /webapp: `npm run start`

Upon first launch you will have no data. Data is meant to be generated through a cronjob daily. However you can also manually generate one through the admin page.
Once you have generated at least one stockSnapshot, you can try guessing the next day's stock price by following the prompts.


## Known Bugs & Limitations
-

## Future Features Planned
- Add snapshot of news feed for the random date


## License
- Marketstack is used as the source of historical stock data
