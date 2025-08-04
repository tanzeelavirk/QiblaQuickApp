# Qibla Quick App

Welcome to **Qibla Quick**, a minimal, privacy-first web app that helps Muslims find the Qibla direction **instantly and ad-free** using device location and orientation.

No distractions. No trackers. Just accurate direction to Makkah.

---

## Overview

**Qibla Quick** calculates the shortest direction from your current location to the Kaaba in Makkah using your GPS and device compass. When you align your phone with the on-screen arrow, you're facing the Qibla!

- [Built With](#built-with)
- [Features](#features)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Built With

- **React.js** – UI framework
- **Geolocation API** – for detecting user's location
- **DeviceOrientation API** – for compass heading
- **Math (Spherical Trigonometry)** – to calculate Qibla bearing
- **CSS** – for responsive, animated UI

---

## Features

- ✅ Accurate Qibla bearing based on your location
- ✅ Real-time compass rotation
- ✅ Green glow when perfectly aligned
- ✅ Works offline after first load (if installed as PWA)
- ✅ No ads, trackers, or sign-ups

---

## How It Works

1. **Get Location:**  
   Uses the browser’s Geolocation API to fetch your current latitude and longitude.

2. **Calculate Qibla Bearing:**  
   Applies spherical trigonometry to find the shortest angle between your location and the Kaaba.

3. **Get Device Orientation:**  
   Uses compass/gyroscope data to get which direction your phone is facing.

4. **Rotate the Compass:**  
   The app rotates an arrow image so it points to the correct Qibla direction in real-time.

---

## Getting Started

### Prerequisites

- Node.js ≥ 14
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/qibla-quick.git
cd qibla-quick
npm install
```

## Usage
Open https://qibla-quick.vercel.app/ on your mobile device and allow the app to use your current location and motion and orientation.

Click Enable compass and rotate your phone until you receive the message that you are facing the Qibla.

## Troubleshooting
Compass Not Working?
Make sure your phone supports orientation sensors. iOS users: enable "Motion & Orientation Access" in Safari settings.

Location Denied?
Reload the page and accept the location prompt.

Inaccurate Reading?
Calibrate your compass by moving your phone in a figure-8 motion.

## Contributing
Pull requests are welcome! Whether it’s a feature idea, bug fix, or design improvement, feel free to contribute.


