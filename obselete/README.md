# 🛠️ Tool Suite Overview

A collection of browser-based data processing and visualization tools for the cold box project and beyond. All tools run entirely in your browser — no installation required, and your data never leaves your machine.

---

## 🌡️ U07B Extractor
**`bukaymila.github.io/U07B-extract`**

### Description
Specialized tool for extracting temperature and humidity data from U07B recorder CSV files. Automatically detects and parses metadata headers, extracts the core data, and merges it with a 10‑minute interval timestamp column for streamlined analysis.

### Key Features
- 📁 **Multiple File Support** — Upload one or more U07B CSV files via drag‑and‑drop
- 🔍 **Auto‑Detection** — Intelligently finds the `Date,Time,Temperature(C),Humidity(%RH)` header row, even with metadata above it
- ⏱️ **Interval Generation** — Automatically creates a 10‑minute interval hours column (n/6 intervals)
- 📋 **Live Preview** — See the first 10 rows before processing to verify correct parsing
- 💾 **One‑Click Export** — Download merged, cleaned data as a new CSV file

### Best For
Engineers and analysts working with U07B environmental data loggers who need to quickly transform raw recorder files into structured, analysis‑ready datasets.

---

## 📊 CSV Processor
**`bukaymila.github.io/csv-edit`**

### Description
A streaming CSV processor that handles files of any size — past the limit of 1,048,576 rows — without loading the entire file into memory. Follow the simple step‑by‑step workflow to clean, sample, or split massive CSV files with ease.

### Key Features
- ⚡ **Memory‑Efficient Streaming** — Processes line by line; never loads the full file into memory
- 🔍 **Find & Replace** — Search and replace text with live preview from sample rows
- 📐 **Row Sampling** — Keep every Nth row (1 = all, 2 = half, 10 = 10%) to reduce file size
- ✂️ **Smart Splitting** — Split large CSVs into multiple files with configurable rows per file
- 📁 **Large File Sizes** — Works with 100MB, 1GB files without crashing

### Best For
Data teams and analysts who need to clean, sample, or split massive CSV files quickly and reliably without consuming excessive memory.

---

## 📊 Row‑wise CSV Aggregator
**`bukaymila.github.io/csv-aggregator`**

### Description
A lightweight, single‑file web tool that combines multiple CSV files row by row. Upload several CSV files with matching column headers, and this tool will align data by row position, automatically detect numeric columns, and compute row‑wise statistics across all files.

### How It Works
- 📁 Upload multiple CSV files with matching column headers
- 🔗 Aligns data by row position (using the shortest file as the cutoff)
- 🚫 Ignores the first column (typically X‑axis values like timestamps)
- 🔢 Automatically detects numeric columns — any column containing text or empty cells is dropped
- 📊 Computes row‑wise statistics — **Average, Minimum, and Maximum** — across all files for each duplicate column name
- 📋 Displays results in a clean, sortable table
- 💾 Exports aggregated data as a CSV file with one click

### Best For
- Comparing experimental replicates
- Aggregating sensor data from multiple runs
- Summarizing survey responses across different time points
- Merging financial data from multiple sources

No installation required — just open the HTML file in any modern browser. All processing happens locally; your data never leaves your machine.

---

## 🎨 Line Chart Studio
**`bukaymila.github.io/line-chart`**

### Description
An interactive data visualization tool designed for creating, customizing, and exporting multi‑line charts with ease. It allows users to upload CSV data, drag and drop series between charts, and fine‑tune every visual element — from axis ranges and point shapes to color themes and reference lines.

### Key Features
- 📊 **Drag & Drop Series Management** — Move data series between charts effortlessly
- 🎨 **Customizable Charts** — Per‑chart axis titles, min/max ranges, step intervals, and point sizes
- 🔷 **Per‑Series Point Shapes** — Mix circles, squares, triangles, crosses, and diamonds within the same chart
- 📉 **Visual Decimation** — Show every Nth point for cleaner visuals without losing data
- 📏 **Reference Lines** — Add horizontal (Y) and vertical (X) dotted reference lines
- 🌈 **12 Color Themes** — Apply gradients like Ocean Blues, Sunset Oranges, or Pastel to any chart
- 📸 **High‑Quality Exports** — Export individual charts or stacked grids as 6× resolution PNGs
- 📂 **CSV Support** — Upload local CSV files or load from URLs with automatic X‑axis detection (numeric or categorical)

### Best For
Researchers, engineers, and data analysts who need a flexible, no‑code solution for visualizing time‑series or experimental data.

---

## 📐 Shaded Region Chart Studio
**`bukaymila.github.io/shaded-chart`**

### Description
An interactive data visualization tool designed specifically for visualizing statistical summaries from CSV data. Transforms aggregated data (average, minimum, maximum values) into professional‑looking line charts with shaded confidence regions.

### Key Features

#### 📂 Data Import
- **CSV Upload** — Load CSV files directly from your computer
- **URL Import** — Fetch CSV data from any public URL
- **Sample Data** — One‑click loading of example data to explore features

#### 📊 Visualization
- **AVG Line** — Solid line showing the average values
- **Shaded Region** — Semi‑transparent band (50% opacity) between MIN and MAX values, providing instant visual context for data variability
- **Multiple Charts** — Automatically creates a separate chart for each metric in your dataset
- **No Points** — Clean, minimalist design without data points cluttering the view

#### 🎨 Customization
- **12 Color Themes** — Choose from carefully curated palettes (Rainbow, Ocean Blues, Sunset Oranges, etc.)
- **Axis Controls** — Customize titles, min/max ranges, and tick intervals for both X and Y axes
- **Chart Titles** — Rename individual charts to keep your data organized
- **Global Settings** — Apply axis titles across all charts with one click
- **Toggle Shaded Regions** — Show/hide the MIN/MAX shaded area to focus on the average trend

#### 📸 Export Options
- **Individual Chart Export** — Export each chart separately with your choice of:
  - **White Background** — Perfect for reports and presentations
  - **Transparent Background** — Ideal for overlaying on branded materials
- **Batch Export** — Export all charts stacked vertically in a single PNG file with white background

### Use Cases
- **Quality Control** — Visualize product measurements with tolerance bands
- **Financial Analysis** — Display stock prices with high/low ranges
- **Scientific Data** — Show experimental results with error margins
- **Performance Monitoring** — Track KPIs with acceptable ranges
- **Survey Analysis** — Present survey results with confidence intervals

### Why Choose This Tool?
✅ **No coding required** — Pure drag‑and‑drop interface  
✅ **Instant visualization** — See your data as soon as you upload  
✅ **Professional output** — High‑quality exports ready for reports  
✅ **Interactive** — Hover tooltips show exact values  
✅ **Free** — Fully functional, no subscriptions or limitations

Perfect for data analysts, researchers, business professionals, and anyone who needs to quickly visualize aggregated data with clear, professional‑looking charts.

---

## 🔷 STL Explorer — 3D Model Viewer
**`bukaymila.github.io/stl-viewer`**

### Description
A browser‑based 3D viewer designed for quick and easy inspection of STL files. Simply drag and drop or upload your STL models to explore them in full 3D space.

### Key Features
- 🖱️ **Intuitive Controls** — Rotate, pan, and zoom with mouse or touch gestures
- 📐 **Automatic Scaling** — Smart grid and camera adapt to any model size, from tiny components to massive architectural designs
- 📏 **Real‑time Measurements** — Instantly see X, Y, Z dimensions with maximum size highlighted
- 📂 **Drag & Drop Support** — Load files directly from your file explorer
- 🌙 **Eye‑Friendly Interface** — Dark theme designed for comfortable extended viewing
- 🔄 **Supports Both Formats** — Handles both binary and ASCII STL files
- 🚀 **Zero Installation** — Runs entirely in your browser — no software to install

### Perfect For
- 🖨️ 3D printing enthusiasts previewing models
- 👷 Engineers and designers reviewing CAD exports
- 🔍 Quick model inspections without opening heavy CAD software
- 🎓 Educational demonstrations and presentations
- 👀 Anyone who needs to view STL files quickly and easily

No sign‑up, no installation, just pure 3D viewing.

---

## 🧭 Workflow Integration

These tools are designed to work together seamlessly:

| **Tool** | **Role in Workflow** |
|----------|------------------------|
| **U07B Extractor** | Convert raw U07B logs → clean CSV with timestamps |
| **CSV Processor** | Clean, sample, or split large CSV files |
| **Row‑wise CSV Aggregator** | Combine multiple CSVs → summary with AVG/MIN/MAX |
| **Line Chart Studio** | Visualize time‑series or numeric data from any CSV |
| **Shaded Region Chart Studio** | Visualize aggregated (AVG/MIN/MAX) data with uncertainty bands |
| **STL Explorer** | Preview 3D models (e.g., cold box components or prototypes) |

### Typical Data Pipeline
1. **Collect** data from U07B loggers → use **U07B Extractor** to clean and timestamp
2. **Combine** multiple runs using **Row‑wise CSV Aggregator** to get AVG/MIN/MAX
3. **Visualize** results with **Shaded Region Chart Studio** for publication‑ready charts
4. **Refine** datasets using **CSV Processor** for large‑file operations
5. **Explore** line trends with **Line Chart Studio** for deeper insights
6. **Review** 3D models with **STL Explorer** for design verification and quick check before 3D printing

---

**📌 Note:** All tools run entirely in your browser — no data is sent to any server. Your files stay on your machine, ensuring complete privacy and security.