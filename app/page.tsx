'use client'
import { useState, useEffect } from "react";

// Enhanced font list with beautiful web-safe and system fonts
const fonts = [
  { name: "System UI", value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { name: "Avenir", value: "'Avenir Next', Avenir, 'Segoe UI', sans-serif" },
  { name: "Montserrat", value: "Montserrat, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif" },
  { name: "SF Pro", value: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" },
  { name: "Helvetica Neue", value: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { name: "Playfair Display", value: "'Playfair Display', Georgia, 'Times New Roman', serif" },
  { name: "Garamond", value: "'EB Garamond', Garamond, 'Times New Roman', serif" },
  { name: "Futura", value: "Futura, 'Century Gothic', sans-serif" },
  { name: "Didot", value: "Didot, 'Bodoni MT', 'Times New Roman', serif" },
  { name: "Gill Sans", value: "'Gill Sans', 'Gill Sans MT', Calibri, sans-serif" },
  { name: "Baskerville", value: "Baskerville, 'Hoefler Text', Garamond, 'Times New Roman', serif" },
  { name: "Palatino", value: "Palatino, 'Palatino Linotype', 'Book Antiqua', serif" },
  { name: "Lucida", value: "'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', sans-serif" },
  { name: "Copperplate", value: "Copperplate, 'Copperplate Gothic Light', fantasy" },
  { name: "Fira Code", value: "'Fira Code', 'Courier New', monospace" }
];

export default function TextDesigner() {
  // Load Google Fonts via CSS
  useEffect(() => {
    // Add Google Fonts link
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&family=Roboto:wght@400;700&family=Lato:wght@400;700&family=Open+Sans:wght@400;700&family=Poppins:wght@400;700&family=EB+Garamond:wght@400;700&family=Fira+Code:wght@400;700&display=swap";
    document.head.appendChild(linkElement);
    
    // Cleanup function
    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);
  // Core text properties
  const [text, setText] = useState("Your Text Here");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState(fonts[0].value);
  const [fontWeight, setFontWeight] = useState(400);
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textAlign, setTextAlign] = useState("left");
  
  // Style properties
  const [fontStyle, setFontStyle] = useState("normal");
  const [textDecoration, setTextDecoration] = useState("none");
  const [textTransform, setTextTransform] = useState("none");
  const [borderStyle, setBorderStyle] = useState("none");
  const [borderWidth, setBorderWidth] = useState("0px");
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderRadius, setBorderRadius] = useState("0px");
  
  // Layout and transform
  const [rotate, setRotate] = useState(0);
  const [activeTab, setActiveTab] = useState("text");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // A simple, consistent handler for HTML inputs
  const handleInput = (setter) => (e) => setter(e.target.value);
  
  // Text styling object
  const textStyle = {
    fontSize: `${fontSize}px`,
    fontFamily,
    fontWeight,
    fontStyle,
    textDecoration,
    color: textColor,
    textAlign,
    textTransform,
  };
  
  // Container styling object
  const containerStyle = {
    backgroundColor: bgColor,
    borderStyle,
    borderWidth,
    borderColor,
    borderRadius,
    transform: `rotate(${rotate}deg)`,
    padding: "40px",
    transition: "all 0.3s ease",
    maxWidth: "100%",
    margin: "0 auto",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white p-4 shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Text Designer</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex mb-4 space-x-2">
          <button
            onClick={() => setActiveTab("text")}
            className={`flex-1 py-2 px-3 rounded-md text-sm ${
              activeTab === "text" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Text
          </button>
          <button
            onClick={() => setActiveTab("style")}
            className={`flex-1 py-2 px-3 rounded-md text-sm ${
              activeTab === "style" 
                ? "bg-blue-600 text-white" 
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Style
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="overflow-y-auto" style={{ height: "calc(100vh - 140px)" }}>
          {activeTab === "text" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Content
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={handleInput(setText)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={handleInput(setFontFamily)}
                  className="w-full p-2 border rounded-md"
                >
                  {fonts.map((font) => (
                    <option key={font.name} value={font.value}>
                      {font.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="8"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="ml-2 text-gray-500 w-10 text-center">
                    {fontSize}px
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Weight
                </label>
                <select
                  value={fontWeight}
                  onChange={(e) => setFontWeight(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="400">Normal (400)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* Beautiful curated color palette */}
                  {[
                    "#000000", // Black
                    "#333333", // Dark Gray
                    "#1a365d", // Navy Blue
                    "#2a4365", // Dark Blue
                    "#7b341e", // Brick Red
                    "#285e61", // Dark Teal
                    "#22543d", // Forest Green
                    "#744210", // Dark Amber
                    "#702459", // Burgundy
                    "#553c9a"  // Indigo
                  ].map(color => (
                    <button
                      key={color}
                      onClick={() => setTextColor(color)}
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color, outline: textColor === color ? '2px solid #0000FF' : 'none' }}
                      aria-label={`Color: ${color}`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* Vibrant colors */}
                  {[
                    "#3182ce", // Blue
                    "#38a169", // Green
                    "#dd6b20", // Orange
                    "#805ad5", // Purple
                    "#e53e3e", // Red
                    "#d53f8c", // Pink
                    "#38b2ac", // Teal
                    "#ecc94b", // Yellow
                    "#4299e1", // Light Blue
                    "#48bb78"  // Light Green
                  ].map(color => (
                    <button
                      key={color}
                      onClick={() => setTextColor(color)}
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color, outline: textColor === color ? '2px solid #0000FF' : 'none' }}
                      aria-label={`Color: ${color}`}
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex">
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="flex-1 p-2 border rounded-l-md"
                      placeholder="#000000"
                    />
                    <div 
                      className="w-10 h-10 rounded-r-md border-t border-r border-b border-gray-300"
                      style={{ backgroundColor: textColor }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Align
                </label>
                <select
                  value={textAlign}
                  onChange={handleInput(setTextAlign)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                  <option value="justify">Justify</option>
                </select>
              </div>
            </div>
          )}
          
          {activeTab === "style" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* Soft background colors */}
                  {[
                    "#FFFFFF", // White
                    "#F7FAFC", // Gray 50
                    "#EDF2F7", // Gray 100
                    "#E6FFFA", // Teal 50
                    "#EBFDFF", // Cyan 50
                    "#EBF4FF", // Blue 50
                    "#EBF8FF", // Light Blue 50
                    "#F0FFF4", // Green 50
                    "#FFFFF0", // Yellow 50
                    "#FFF5F5"  // Red 50
                  ].map(color => (
                    <button
                      key={color}
                      onClick={() => setBgColor(color)}
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color, outline: bgColor === color ? '2px solid #0000FF' : 'none' }}
                      aria-label={`Background color: ${color}`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* Darker background colors */}
                  {[
                    "#F0F5FF", // Indigo 50
                    "#FAF5FF", // Purple 50
                    "#FFF0F6", // Pink 50
                    "#E2E8F0", // Gray 200
                    "#B2F5EA", // Teal 200
                    "#BEE3F8", // Blue 200
                    "#C6F6D5", // Green 200
                    "#FEFCBF", // Yellow 200
                    "#FED7D7", // Red 200
                    "#1A202C"  // Gray 900 (dark mode)
                  ].map(color => (
                    <button
                      key={color}
                      onClick={() => setBgColor(color)}
                      className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color, outline: bgColor === color ? '2px solid #0000FF' : 'none' }}
                      aria-label={`Background color: ${color}`}
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex">
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 p-2 border rounded-l-md"
                      placeholder="#FFFFFF"
                    />
                    <div 
                      className="w-10 h-10 rounded-r-md border-t border-r border-b border-gray-300"
                      style={{ backgroundColor: bgColor }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Style
                </label>
                <select
                  value={fontStyle}
                  onChange={handleInput(setFontStyle)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Decoration
                </label>
                <select
                  value={textDecoration}
                  onChange={handleInput(setTextDecoration)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="none">None</option>
                  <option value="underline">Underline</option>
                  <option value="line-through">Line Through</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Transform
                </label>
                <select
                  value={textTransform}
                  onChange={handleInput(setTextTransform)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="none">None</option>
                  <option value="uppercase">Uppercase</option>
                  <option value="lowercase">Lowercase</option>
                  <option value="capitalize">Capitalize</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Border Style
                </label>
                <select
                  value={borderStyle}
                  onChange={handleInput(setBorderStyle)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="none">None</option>
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
              
              {borderStyle !== "none" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Border Width
                    </label>
                    <select
                      value={borderWidth}
                      onChange={handleInput(setBorderWidth)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="1px">Thin (1px)</option>
                      <option value="2px">Medium (2px)</option>
                      <option value="4px">Thick (4px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Border Color
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {/* Classic border colors */}
                      {[
                        "#000000", // Black
                        "#4A5568", // Gray 600
                        "#2D3748", // Gray 700
                        "#1A365D", // Blue 900
                        "#744210", // Yellow 900
                        "#702459", // Pink 900
                        "#285E61", // Teal 800
                        "#22543D", // Green 800
                        "#553C9A", // Purple 800
                        "#BEE3F8"  // Blue 200
                      ].map(color => (
                        <button
                          key={color}
                          onClick={() => setBorderColor(color)}
                          className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer shadow-sm hover:scale-110 transition-transform"
                          style={{ backgroundColor: color, outline: borderColor === color ? '2px solid #0000FF' : 'none' }}
                          aria-label={`Border color: ${color}`}
                        />
                      ))}
                    </div>
                    <div className="mt-3">
                      <div className="flex">
                        <input
                          type="text"
                          value={borderColor}
                          onChange={(e) => setBorderColor(e.target.value)}
                          className="flex-1 p-2 border rounded-l-md"
                          placeholder="#000000"
                        />
                        <div 
                          className="w-10 h-10 rounded-r-md border-t border-r border-b border-gray-300"
                          style={{ backgroundColor: borderColor }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Border Radius
                    </label>
                    <select
                      value={borderRadius}
                      onChange={handleInput(setBorderRadius)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="0px">None (0px)</option>
                      <option value="4px">Small (4px)</option>
                      <option value="8px">Medium (8px)</option>
                      <option value="12px">Large (12px)</option>
                      <option value="9999px">Pill</option>
                    </select>
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotation
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotate}
                    onChange={(e) => setRotate(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="ml-2 text-gray-500 w-16 text-center">
                    {rotate}°
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 ml-64 flex flex-col">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 z-30 p-2 bg-white rounded-md shadow hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
        <div className="flex flex-col items-center justify-center flex-1">
          {/* Preview Area */}
          <div className="mb-8 w-full max-w-3xl flex justify-center">
            <div
              style={containerStyle}
              className="rounded-lg"
            >
              <div 
                style={textStyle}
                className="font-display"
              >
                {text || "Your Text Here"}
              </div>
            </div>
          </div>
          
          {/* Export Options */}
          <div className="flex space-x-4">
            <button
              onClick={() => {
                // Create and export CSS as text file
                const cssText = Object.entries({...textStyle, ...containerStyle})
                  .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
                  .join('\n');
                
                const blob = new Blob([cssText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'text-styles.css';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Export CSS
            </button>
            
            <button
              onClick={() => {
                // Copy CSS to clipboard
                const cssText = Object.entries({...textStyle, ...containerStyle})
                  .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
                  .join('\n');
                
                navigator.clipboard.writeText(cssText);
                alert('CSS copied to clipboard!');
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Copy CSS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}