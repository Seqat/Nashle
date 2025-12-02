# Nashle: Anti-Cooperative Guessing Game

> A dark, dystopian cyberpunk twist on Wordle built with React + Vite + TailwindCSS. Battle an adversarial AI that actively tries to evade your guesses.

![Nashle](https://img.shields.io/badge/React-19.1.1-blue) ![Vite](https://img.shields.io/badge/Vite-7.1.7-maroon) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-darkgreen)

## 📑 Table of Contents

- [Nashle: Anti-Cooperative Guessing Game](#nashle-anti-cooperative-guessing-game)
  - [📑 Table of Contents](#-table-of-contents)
  - [🎮 What is Nashle?](#-what-is-nashle)
  - [🧠 Game Theory Foundation](#-game-theory-foundation)
    - [The Nash Equilibrium Connection](#the-nash-equilibrium-connection)
    - [Adversarial Feedback Strategy](#adversarial-feedback-strategy)
    - [Why This is Different from Wordle](#why-this-is-different-from-wordle)
  - [🎯 How to Play](#-how-to-play)
    - [Basic Rules](#basic-rules)
    - [Gameplay Flow](#gameplay-flow)
    - [Tips for Success](#tips-for-success)
  - [🚀 Setup Instructions](#-setup-instructions)
    - [Prerequisites](#prerequisites)
      - [Installing Node.js](#installing-nodejs)
    - [Installation Steps](#installation-steps)
    - [Building for Production](#building-for-production)
    - [Troubleshooting](#troubleshooting)
  - [🎨 Features](#-features)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📁 Project Structure](#-project-structure)
  - [⚙️ Customization](#️-customization)
    - [Game Settings](#game-settings)
    - [Dictionary](#dictionary)
    - [Styling](#styling)
  - [Docker](#docker)
  - [📝 License](#-license)
  - [🤝 Contributing](#-contributing)
  - [📧 Contact](#-contact)

## 🎮 What is Nashle?

Nashle is an adversarial word guessing game inspired by Wordle, but with a crucial twist: **there is no pre-selected secret word**. Instead, after each of your guesses, the AI adversary chooses feedback that keeps as many words as possible consistent with all previous feedback. Your goal is to strategically corner the AI until only one word remains—and then name it within the guess limit.

Unlike cooperative games where feedback is designed to help you, Nashle pits you against an AI that actively tries to maintain ambiguity and maximize its options.

## 🧠 Game Theory Foundation

### The Nash Equilibrium Connection

The game is named after **John Nash** (of Nash Equilibrium fame) because it represents a **non-cooperative game** between two players:

1. **You (the Guesser)**: Try to eliminate possibilities and force a unique solution
2. **The AI (the Adversary)**: Try to maintain ambiguity by choosing feedback that maximizes the remaining candidate set

### Adversarial Feedback Strategy

The AI follows a **minimax-like strategy**:

- For each possible secret word, compute what feedback would be given
- Group words by the feedback they would produce
- **Choose the feedback that corresponds to the largest group** (maximizing remaining possibilities)
- On ties, prefer feedback with fewer green tiles (revealing less information)

This ensures the AI maintains as much ambiguity as possible, making your task progressively harder.

### Why This is Different from Wordle

- **Wordle**: Cooperative — the feedback is truthful and helpful
- **Nashle**: Adversarial — the feedback is truthful but strategically chosen to maximize ambiguity
- **Wordle**: One secret word chosen at start
- **Nashle**: No secret word initially; the AI chooses feedback that could be consistent with many words

This creates a dynamic where you must outthink not just the word, but the AI's strategy itself.

## 🎯 How to Play

### Basic Rules

1. **Objective**: Identify the correct 5-letter word within 9 guesses
2. **Winning Condition**: You win if:
   - There is exactly **1 word remaining** in the possible set
   - **AND** you guess that word correctly
   - **AND** you do so within the 9-guess limit

3. **Losing Condition**: The AI wins if:
   - You use all 9 guesses without correctly identifying the word when only 1 remains

### Gameplay Flow

1. **Make a Guess**: Enter any valid 5-letter word from the dictionary
2. **AI Responds**: The AI chooses feedback (green/yellow/gray) that:
   - Is consistent with at least one possible word
   - Maximizes the number of remaining candidate words
3. **View Feedback**:
   - 🟢 **Green (#00FF80)**: Letter is in the correct position
   - 🟡 **Yellow (#FFD300)**: Letter exists in the word but in a different position
   - ⬛ **Gray**: Letter is not in the word
4. **Track Progress**: Watch the "Rationality Meter" to see how many words remain possible
5. **Corner the AI**: Use strategic guesses to eliminate possibilities until only one word remains
6. **Win**: Guess the final word when the meter shows 1 remaining word

### Tips for Success

- **Early Game**: Use common words with diverse letter sets to quickly eliminate possibilities
- **Mid Game**: Focus on narrowing down based on known letters and positions
- **End Game**: When the meter shows few remaining words, guess strategically to identify the exact word
- **Watch the Meter**: The number of remaining words tells you how close you are to cornering the AI

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (version 20.19.0 or higher — Vite requires Node.js >= 20.19.0 or >= 22.12.0)
- **npm** (comes with Node.js) or **yarn**

#### Installing Node.js

**Windows:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation by opening Command Prompt or PowerShell and running:
   ```bash
   node --version
   npm --version
   ```

**macOS:**
1. **Option A - Direct Download:**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the installer for Node 20 (or a newer LTS)
   - Run the installer and follow the prompts

2. **Option B - Using Homebrew** (recommended):
   ```bash
   brew install node@20
   ```

3. **Option C - Using nvm (recommended for multiple Node versions):**
   ```bash
   # install nvm if you don't have it, then:
   nvm install 20.19
   nvm use 20.19
   ```

4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

**Linux (Ubuntu/Debian):**
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

**Linux (Fedora/RHEL/CentOS):**
```bash
# Install Node.js and npm
sudo dnf install nodejs npm

# Verify installation
node --version
npm --version
```

**Arch Linux:**
```bash
# Install Node.js and npm
sudo pacman -S nodejs npm

# Verify installation
node --version
npm --version
```

### Installation Steps

1. **Clone or Download the Repository**
   ```bash
   git clone <repository-url>
   cd nashle
   ```
   Or extract the ZIP file and navigate to the folder in your terminal.

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages (React, Vite, TailwindCSS, etc.)

3. **Configure Environment Variables (Optional)**
   
   For developer mode (shows solution list):
   - Create a `.env` file in the root directory
   - Add: `VITE_DEV_MODE=true`
   - Set to `false` or leave empty to disable

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The terminal will display a local URL (typically `http://localhost:5173`)

5. **Open in Browser**
   - Open your web browser
   - Navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory. To preview the production build:

```bash
npm run preview
```

### Troubleshooting

**Port Already in Use:**
- If port 5173 is occupied, Vite will automatically try the next available port
- Check the terminal output for the actual URL

**Dependencies Installation Issues:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- On Windows, you may need to run as Administrator

**Node.js Version Issues:**
- Vite requires Node.js **20.19.0 or newer** (or >=22.12.0). If you see an error mentioning Vite's Node requirement, upgrade to Node 20.19+.
- Use `nvm` (Node Version Manager) to install and switch Node versions if needed:
   ```bash
   nvm install 20.19
   nvm use 20.19
   ```

## 🎨 Features

- **Dark Cyberpunk Aesthetic**: Immersive terminal-style interface with neon green accents
- **Real-time AI Feedback**: Watch the AI "think" and process your guesses
- **Rationality Meter**: Track how many words remain possible
- **Developer Mode**: Enable solution viewing via environment variable
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Tile reveals and glowing effects
- **End Game Modal**: Victory/defeat popup with smooth animations

## 🛠️ Tech Stack

- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool and dev server
- **TailwindCSS 3.4.14** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **ESLint** - Code linting

## 📁 Project Structure

```
nashle/
├── src/
│   ├── components/
│   │   ├── EndGameModal.jsx    # Victory/defeat popup
│   │   ├── FinalPanel.jsx      # End game panel (legacy)
│   │   ├── Grid.jsx            # Game tile grid
│   │   ├── GuessInput.jsx      # Input field and submit button
│   │   ├── Header.jsx          # Title and reset button
│   │   └── Meter.jsx           # Rationality meter + AI console
│   ├── App.jsx                 # Main game logic and state
│   ├── logic.js                # Adversarial feedback algorithm
│   ├── words.js                # Dictionary of 5-letter words
│   ├── index.css               # Global styles and cyberpunk theme
│   └── main.jsx                # React entry point
├── public/                     # Static assets
├── .env                        # Environment variables (optional)
├── LICENSE                     # MIT License
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## ⚙️ Customization

### Game Settings

Edit `src/App.jsx`:

- **Max Attempts**: Change `const maxTries = 9` to your desired limit
- **Thinking Delay**: Adjust `thinkingDelayMs` (default: 450ms) to change AI response time

### Dictionary

Edit `src/words.js` to add, remove, or modify words:
- Words must be lowercase
- Words must be exactly 5 letters
- Format: `'word1','word2','word3',...`

### Styling

The cyberpunk theme is defined in `src/index.css`:
- Background: `#050505`
- Primary neon: `#00FF80`
- Secondary accent: `#1AFF9C`
- Text color: `#C0FFC0`
- Error color: `#FF0050`
- Partial (yellow): `#FFD300`

## Docker

You can build a production Docker image and serve the built static site with `nginx`.

Build the image:
```
docker build -t nashle:latest .
```

Run the container:
```
docker run --rm -p 80:80 nashle:latest
```

For local development using `docker-compose`:
```
# Run the dev service (maps host port 5173)
docker-compose up dev

# Build and run the production image via compose
docker-compose up --build web
```

Note: the `dev` service defined in `docker-compose.yml` uses a Node 20.19 image so it matches Vite's engine requirement. If you change the `dev` image, ensure it uses Node >= 20.19.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📧 Contact

For questions, issues, or suggestions, please open an issue on the GitHub repository.

---

**Enjoy it!** 🟢
