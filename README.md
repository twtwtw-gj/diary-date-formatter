# Diary Date Formatter

A simple React web app that displays formatted dates for diary entries in Japanese format.

## 📝 What it does

This app helps you quickly get properly formatted dates for your diary entries. It displays:
- **Today's date** - Current date in MM/DD(weekday) format
- **Tomorrow's date** - Next day's date 
- **Day after tomorrow's date** - The day after next

All dates are displayed in Japanese format with weekdays in Japanese characters (日月火水木金土).  
On Japanese public holidays, `・祝` is appended automatically (e.g., `01/01（水・祝）`).

## ✨ Features

- 🗓️ **Three-day view** - See today, tomorrow, and day after tomorrow at a glance
- 🎌 **Holiday support** - Japanese public holidays are automatically detected and indicated with `・祝`
- 📋 **One-click copy** - Click the copy button to copy any date to clipboard
- 🎨 **Clean UI** - Simple, colorful interface with gradient backgrounds
- 📱 **Responsive design** - Works on desktop and mobile devices
- 🔄 **Auto-updates** - Dates update automatically when you load the page

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/twtwtw-gj/diary-date-formatter.git
cd diary-date-formatter
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
npm run serve
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 💡 How to use

1. Open the app in your browser
2. You'll see three date cards showing today, tomorrow, and the day after tomorrow
3. Click the 📋 button next to any date to copy it to your clipboard
4. Paste the copied date into your diary application or text editor

## 🎯 Use Cases

Perfect for:
- Daily diary/journal writing
- Planning blog posts with dated entries
- Creating consistent date formatting across documents
- Quick reference for upcoming dates in Japanese format

## 🔧 Built With

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **CSS** - For styling and responsive design
- **JavaScript Date API** - For date calculations and formatting

## 📱 Date Format

The app uses Japanese date format: `MM/DD（曜日）`

Example: `09/07（日）` for September 7th (Sunday)

On public holidays, the format becomes: `MM/DD（曜日・祝）`

Example: `01/01（水・祝）` for January 1st (Wednesday, New Year's Day)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♂️ Questions?

If you have any questions or suggestions, feel free to open an issue on GitHub!


## 📝 Reference

This project was inspired by Claude Artifacts.
