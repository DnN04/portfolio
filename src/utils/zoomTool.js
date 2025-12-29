// Zoom Tool for Portfolio Page
// This tool allows zooming the page, locking the zoom, and extracting element positions to fix the layout.

class ZoomTool {
  constructor() {
    this.zoomLevel = 1;
    this.isLocked = false;
    this.originalPositions = new Map();
    this.controlsContainer = null;
  }

  init() {
    this.createControls();
    this.applyZoom();
  }

  createControls() {
    // Create a fixed overlay for controls
    this.controlsContainer = document.createElement('div');
    this.controlsContainer.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 10000;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 12px;
    `;

    // Zoom slider
    const zoomLabel = document.createElement('div');
    zoomLabel.textContent = 'Zoom:';
    const zoomSlider = document.createElement('input');
    zoomSlider.type = 'range';
    zoomSlider.min = '0.5';
    zoomSlider.max = '2';
    zoomSlider.step = '0.01';
    zoomSlider.value = this.zoomLevel;
    zoomSlider.oninput = (e) => {
      this.zoomLevel = parseFloat(e.target.value);
      this.applyZoom();
    };

    // Lock button
    const lockButton = document.createElement('button');
    lockButton.textContent = 'Lock Zoom';
    lockButton.onclick = () => this.lockZoom();

    // Extract button
    const extractButton = document.createElement('button');
    extractButton.textContent = 'Extract Positions';
    extractButton.onclick = () => this.extractPositions();

    // Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.onclick = () => this.reset();

    this.controlsContainer.appendChild(zoomLabel);
    this.controlsContainer.appendChild(zoomSlider);
    this.controlsContainer.appendChild(document.createElement('br'));
    this.controlsContainer.appendChild(lockButton);
    this.controlsContainer.appendChild(extractButton);
    this.controlsContainer.appendChild(resetButton);

    document.body.appendChild(this.controlsContainer);
  }

  applyZoom() {
    document.body.style.transform = `scale(${this.zoomLevel})`;
    document.body.style.transformOrigin = 'top left';
    document.body.style.width = `${100 / this.zoomLevel}%`;
    document.body.style.height = `${100 / this.zoomLevel}%`;
  }

  lockZoom() {
    this.isLocked = true;
    // Remove controls after locking
    if (this.controlsContainer) {
      this.controlsContainer.remove();
    }
    console.log(`Zoom locked at ${this.zoomLevel}`);
  }

  extractPositions() {
    const elements = document.querySelectorAll('*');
    const positions = {};

    elements.forEach((el, index) => {
      if (el.id || el.className) {
        const rect = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        positions[el.id || `element_${index}`] = {
          id: el.id,
          className: el.className,
          left: rect.left / this.zoomLevel,
          top: rect.top / this.zoomLevel,
          width: rect.width / this.zoomLevel,
          height: rect.height / this.zoomLevel,
          position: computedStyle.position,
          zIndex: computedStyle.zIndex,
          fontSize: computedStyle.fontSize,
          // Add more properties as needed
        };
      }
    });

    console.log('Extracted positions:', positions);

    // Generate CSS
    let css = '';
    for (const [key, pos] of Object.entries(positions)) {
      if (pos.position === 'absolute' || pos.position === 'fixed') {
        css += `#${pos.id || key} {\n`;
        css += `  position: ${pos.position};\n`;
        css += `  left: ${pos.left}px;\n`;
        css += `  top: ${pos.top}px;\n`;
        css += `  width: ${pos.width}px;\n`;
        css += `  height: ${pos.height}px;\n`;
        css += `  z-index: ${pos.zIndex};\n`;
        css += `  font-size: ${pos.fontSize};\n`;
        css += `}\n\n`;
      }
    }

    console.log('Generated CSS:\n', css);

    // Copy to clipboard
    navigator.clipboard.writeText(css).then(() => {
      console.log('CSS copied to clipboard');
    });
  }

  reset() {
    this.zoomLevel = 1;
    this.isLocked = false;
    document.body.style.transform = '';
    document.body.style.transformOrigin = '';
    document.body.style.width = '';
    document.body.style.height = '';
    if (this.controlsContainer) {
      this.controlsContainer.remove();
    }
    this.init();
  }
}

// Initialize the tool
const zoomTool = new ZoomTool();
zoomTool.init();

// Export for console use
window.zoomTool = zoomTool;
