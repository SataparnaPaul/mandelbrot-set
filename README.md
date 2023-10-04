# Mandelbrot Set Visualization with D3.js

This project provides a visualization of the Mandelbrot set using D3.js. The Mandelbrot set is a complex mathematical set that exhibits fractal properties. This visualization uses a Monte Carlo method to sample points in the complex plane and then checks if each point is in the Mandelbrot set.

## Features

- Dynamic visualization of the Mandelbrot set.
- Enhanced color gradients for a more detailed visualization.
- Dark mode background for better color contrast.

## Setup

1. Ensure you have D3.js included in your project. You can include it using the following script tag:

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
```

2. Include the provided JavaScript code in your HTML file.

3. Ensure you have elements with the IDs `epochNum` and `proportion` in your HTML to display the current epoch and proportion values.

## How It Works

1. **Initialization**: The code sets up an SVG canvas and defines constants for visualization parameters.
2. **Mandelbrot Iteration**: For each sampled point in the complex plane, the code iterates the Mandelbrot function to check if the point is in the set.
3. **Coloring**: Points that are part of the Mandelbrot set are colored black. Points that escape are colored based on the iteration count, using a combination of D3 color interpolators for a vibrant gradient.
4. **Display Updates**: The current epoch and the proportion of points found in the Mandelbrot set are displayed.

## Customization

- **Color Scheme**: You can adjust the color scheme by modifying the color interpolators in the `addPoint` function.
- **Visualization Parameters**: Constants like `epochs` and `pointsPerEpoch` can be adjusted to change the visualization dynamics.
