# PlacesToStay

PlacesToStay is a full-stack web application that allows users to search for and book accommodations in various locations.

## Features

- Search for accommodations by location
- Filter accommodations by type and location
- Book accommodations for a specific number of people and date
- Interactive map display of accommodations
- User authentication and session management

## Technologies Used

- Frontend:
  - React.js
  - HTML5
  - CSS3
  - JavaScript
  - AJAX
  - Leaflet (for mapping)
- Backend:
  - Node.js
  - Express.js
- Database:
  - SQLite
  - better-sqlite3 module
- Other:
  - OpenStreetMap

## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/PlacesToStay.git
```
text
2. Navigate to the project directory:
```
cd PlacesToStay
```
3. Install dependencies:
```
npm install
```
4. Set up the SQLite database using SQLite Studio

## Usage

1. Start the server:
```
npm start
```
2. Open your web browser and navigate to `http://localhost:3000`

## API Endpoints

- GET `/search/:location` - Search for accommodations by location
- GET `/search/:type/:location` - Search for accommodations by type and location
- POST `/book` - Book an accommodation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
