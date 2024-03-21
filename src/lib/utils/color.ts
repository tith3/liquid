export function tailwindColorToHex(tailwindClass: string): string {
    // Create a temporary element with the Tailwind class
    const el = document.createElement('div');
    el.className = tailwindClass;
    document.body.appendChild(el);

    // Get the computed style of the element
    const rgb = window.getComputedStyle(el).backgroundColor;

    // Remove the temporary element
    document.body.removeChild(el);

    // Extract the RGB values
    const rgbValues = rgb.match(/\d+/g);

    if (!rgbValues) {
       console.log("invalid tailwind class")
       return "#000000";
    }

    // Convert RGB to HEX
    const [r, g, b] = rgbValues.map(Number);
    const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

    return hex;
}