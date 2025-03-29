export function adjustColor(color, percent) {
    // Only works for hex colors in this simple implementation
    if (!color.startsWith('#') || color.length !== 7) {
      return color; // Return original for non-hex colors
    }
    
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
  
    // Adjust each channel
    R = Math.max(0, Math.min(255, R + Math.floor(R * percent / 100)));
    G = Math.max(0, Math.min(255, G + Math.floor(G * percent / 100)));
    B = Math.max(0, Math.min(255, B + Math.floor(B * percent / 100)));
  
    // Convert back to hex
    return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
  }