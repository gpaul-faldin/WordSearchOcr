# 🔍 WordSearchOcr

## 🌟 Overview

WordSearchOcr is an autonomous solver for word search puzzles on [thewordsearch.com](https://thewordsearch.com/). This project represents the culmination of my journey in OCR (Optical Character Recognition) development, serving as the final milestone after successfully tackling every challenge on HumanBenchmark using AI and OCR techniques.

![WordSearch Demo](https://i.imgur.com/placeholder.jpg)

## 🚀 Features

- **🤖 Fully Autonomous Operation**: Detects, solves, and completes word search puzzles without human intervention
- **👁️ Computer Vision Integration**: Utilizes OpenCV for image processing and puzzle grid detection
- **🔤 Advanced OCR**: Implements Tesseract.js to accurately recognize letters in the puzzle grid
- **🖱️ Automated Interaction**: Uses Robot.js to simulate mouse movements and interactions with the website
- **🧩 Intelligent Word Finding**: Algorithm finds words in all possible directions (horizontal, vertical, diagonal)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python (for the mouseinfo utility)
- 1080p screen resolution (currently optimized for this)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WordSearchOcr.git
   cd WordSearchOcr
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure settings**
   Update the `config.json` file with your screen dimensions (default is for 1080p screens)
   ```json
   {
       "width": 1920,
       "height": 1080
   }
   ```

## 🎮 Usage

1. **Navigate to [thewordsearch.com](https://thewordsearch.com/) and select a puzzle**

2. **Run the application**
   ```bash
   npm start
   ```

3. **Watch the magic happen!** The application will:
   - Capture the puzzle grid and word list
   - Process and recognize all letters and words
   - Find word positions in the grid
   - Automatically click and drag to select each word

For development purposes, you can run:
```bash
npm run dev
```

To get information about your mouse position (useful for calibration):
```bash
npm run mouseinfo
```

## 🧠 How It Works

### Project Structure

```
.
├── img/                  # Directory for captured images
├── src/
│   ├── RegionCapture.ts  # Screen region capture functionality
│   ├── parseBoard.ts     # Puzzle grid OCR and processing
│   ├── parseWords.ts     # Word list OCR and processing
│   ├── parseCells.ts     # Cell direction parsing
│   ├── checkWord.ts      # Word search algorithm
│   ├── Interactions.ts   # Mouse movement and clicking
│   ├── searchWords.ts    # Main search coordination
│   └── index.ts          # Application entry point
├── config.json           # Screen configuration
└── package.json          # Project dependencies
```

### Process Flow

1. **Capture Phase**: The application captures regions of the screen containing the puzzle grid and word list
2. **Recognition Phase**: Using Tesseract.js, the application recognizes letters and words
3. **Analysis Phase**: The parsed data is analyzed to determine word positions in the grid
4. **Execution Phase**: Robot.js automates mouse interactions to select all found words

## 🔍 My OCR Journey

WordSearchOcr represents the final project in my series of OCR-based automation challenges. Before this, I successfully tackled every challenge on [HumanBenchmark](https://humanbenchmark.com/) using similar AI and OCR techniques:

Each challenges provided unique learning opportunities that culminated in this comprehensive WordSearchOcr project.

## 🎥 Demo

Check out the [YouTube video](https://www.youtube.com/watch?v=KIiOrXnvHj8) to see WordSearchOcr in action!

## 🛠️ Customization

The application is currently calibrated for 1080p screens. To adapt it for different resolutions:

1. Update the `config.json` file with your screen dimensions
2. You may need to modify the offset constants in `Interactions.ts`:
   ```typescript
   const DEFINED_X_OFFSET = 86;
   const DEFINED_Y_OFFSET = 311;
   ```

## ⚠️ Limitations

- Currently optimized for 1080p screens
- May require recalibration for different websites or puzzle layouts
- Assumes standard English alphabet characters in puzzles

---

**Note**: This project was created for educational purposes. Please use responsibly and respect website terms of service.
