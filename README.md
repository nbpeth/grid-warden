# **Grid Warden**

Grid Warden is a web application for creating 8×8 LED matrix frames and animations for the Sphero BOLT robot. Users can design pixel art, build multi-frame animations, preview them, and export the result as JSON compatible with the official Sphero BOLT JavaScript SDK.

Sphero matrix specification:
[https://sites.google.com/sphero.com/sphero-edu-javascript-wiki/matrix](https://sites.google.com/sphero.com/sphero-edu-javascript-wiki/matrix)

---

## Features

* Pixel editor for 8×8 LED matrix designs
* Frame creation, deletion, duplication, and reordering
* Animation preview
* JSON export compatible with the Sphero BOLT JS SDK
* Local storage project persistence
* React frontend served statically by an Apollo Server backend

---

## Tech Stack

* React (frontend)
* Node.js + Apollo Server (backend)
* PostgreSQL
* Sphero BOLT JavaScript SDK export format

---

## Installation

### 1. Set up database connection

The application requires a PostgreSQL instance.
Set the environment variable:

```bash
export DATABASE_URL="postgres://user:password@host:5432/dbname"
```

### 2. Install dependencies and build the project

From the project root:

```bash
yarn build
```

### 3. Run the server

```bash
yarn start
```

The Apollo server will launch and serve the static React UI.

---

## Export Format

Animations are exported as arrays of frames containing 64 RGB values each:

```json
[
  [[255,0,0], [0,0,255], ... 64 total],
  [[0,255,0], [255,255,0], ... 64 total]
]
```

This format aligns with the Sphero BOLT JS SDK and can be used directly:

```js
await bolt.ledMatrix.writeFrames(frames, 50); // 50ms per frame
```
 
