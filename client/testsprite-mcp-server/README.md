# testsprite-mcp-server

This project is a MCP (Multi-Channel Protocol) server designed to manage and serve sprite data. It provides a structured way to handle sprite-related requests and interactions.

## Project Structure

```
testsprite-mcp-server
├── src
│   ├── server
│   │   ├── index.ts         # Entry point of the MCP server
│   │   └── config.ts        # Configuration settings for the server
│   ├── models
│   │   └── sprite.ts        # Defines the Sprite model
│   ├── controllers
│   │   └── spriteController.ts # Handles requests related to sprites
│   └── tests
│       └── sprite.test.ts   # Unit tests for SpriteController methods
├── config
│   └── server.json          # Configuration settings in JSON format
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd testsprite-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the server:**
   Update the `config/server.json` file with your specific settings, such as environment variables and API keys.

4. **Run the server:**
   ```bash
   npm start
   ```

## Usage

- The server listens for incoming requests related to sprite data.
- You can interact with the API endpoints defined in the `SpriteController` class.

## Testing

To run the unit tests for the `SpriteController`, use the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.