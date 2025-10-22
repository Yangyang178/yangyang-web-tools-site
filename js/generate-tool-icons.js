const fs = require('fs');
const path = require('path');

// 从tools-data.json中读取工具数据
function loadToolsData() {
  const data = fs.readFileSync('tools-data.json', 'utf8');
  return JSON.parse(data);
}

// 读取工具数据
const toolsData = loadToolsData();

// 扩展的彩色图标模板库 - 为每个工具创建独特图标
const iconTemplates = {
  // 基础模板
  calculator: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="calc-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" /><stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" /></linearGradient></defs>
    <rect x="4" y="2" width="16" height="20" rx="3" fill="url(#calc-gradient)" stroke="#3730A3" stroke-width="1"/>
    <rect x="6" y="4" width="12" height="4" rx="2" fill="#1E1B4B" opacity="0.8"/>
    <circle cx="8" cy="12" r="1.5" fill="#FFFFFF"/><circle cx="12" cy="12" r="1.5" fill="#FFFFFF"/><circle cx="16" cy="12" r="1.5" fill="#FFFFFF"/>
    <circle cx="8" cy="16" r="1.5" fill="#FFFFFF"/><circle cx="12" cy="16" r="1.5" fill="#FFFFFF"/><circle cx="16" cy="16" r="1.5" fill="#FFFFFF"/>
  </svg>`,

  // 专用工具图标
  qr_code: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="qr-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#10B981;stop-opacity:1" /><stop offset="100%" style="stop-color:#059669;stop-opacity:1" /></linearGradient></defs>
    <rect x="2" y="2" width="20" height="20" rx="2" fill="url(#qr-gradient)" stroke="#065F46" stroke-width="1"/>
    <rect x="4" y="4" width="6" height="6" rx="1" fill="#FFFFFF"/><rect x="14" y="4" width="6" height="6" rx="1" fill="#FFFFFF"/>
    <rect x="4" y="14" width="6" height="6" rx="1" fill="#FFFFFF"/><rect x="14" y="14" width="6" height="6" rx="1" fill="#FFFFFF"/>
    <rect x="6" y="6" width="2" height="2" fill="#10B981"/><rect x="16" y="6" width="2" height="2" fill="#10B981"/>
    <rect x="6" y="16" width="2" height="2" fill="#10B981"/><rect x="16" y="16" width="2" height="2" fill="#10B981"/>
  </svg>`,

  color_picker: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="color-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" /><stop offset="25%" style="stop-color:#EF4444;stop-opacity:1" /><stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" /><stop offset="75%" style="stop-color:#3B82F6;stop-opacity:1" /><stop offset="100%" style="stop-color:#10B981;stop-opacity:1" /></linearGradient></defs>
    <circle cx="12" cy="12" r="10" fill="url(#color-gradient)" stroke="#1F2937" stroke-width="1"/>
    <circle cx="12" cy="12" r="6" fill="#FFFFFF" opacity="0.9"/>
    <path d="M12 6L14 10L18 10L15 13L16 17L12 15L8 17L9 13L6 10L10 10L12 6Z" fill="#F59E0B"/>
  </svg>`,

  json_formatter: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="json-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F97316;stop-opacity:1" /><stop offset="100%" style="stop-color:#DC2626;stop-opacity:1" /></linearGradient></defs>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#json-gradient)" stroke="#B91C1C" stroke-width="1"/>
    <path d="M8 7C7.44772 7 7 7.44772 7 8V16C7 16.5523 7.44772 17 8 17" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <path d="M16 7C16.5523 7 17 7.44772 17 8V16C17 16.5523 16.5523 17 16 17" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <circle cx="10" cy="10" r="1" fill="#FFFFFF"/><circle cx="14" cy="10" r="1" fill="#FFFFFF"/>
    <circle cx="10" cy="14" r="1" fill="#FFFFFF"/><circle cx="14" cy="14" r="1" fill="#FFFFFF"/>
  </svg>`,

  game_2048: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="2048-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#EC4899;stop-opacity:1" /><stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /></linearGradient></defs>
    <rect x="2" y="2" width="20" height="20" rx="3" fill="url(#2048-gradient)" stroke="#1E1B4B" stroke-width="1"/>
    <rect x="4" y="4" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.9"/>
    <rect x="13" y="4" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.7"/>
    <rect x="4" y="13" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.5"/>
    <rect x="13" y="13" width="7" height="7" rx="2" fill="#FFFFFF" opacity="0.3"/>
    <text x="7.5" y="9" fill="#EC4899" font-size="6" font-weight="bold" text-anchor="middle">2</text>
    <text x="16.5" y="9" fill="#8B5CF6" font-size="6" font-weight="bold" text-anchor="middle">4</text>
    <text x="7.5" y="18" fill="#3B82F6" font-size="6" font-weight="bold" text-anchor="middle">8</text>
  </svg>`,

  ai_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /></linearGradient>
    <filter id="ai-glow"><feGaussianBlur stdDeviation="1" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <circle cx="12" cy="12" r="10" fill="url(#ai-gradient)" filter="url(#ai-glow)"/>
    <path d="M12 6L14 10L18 10L15 13L16 17L12 15L8 17L9 13L6 10L10 10L12 6Z" fill="#FFFFFF"/>
    <circle cx="12" cy="12" r="3" fill="#C084FC" opacity="0.6"/>
  </svg>`,

  pdf_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="pdf-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#DC2626;stop-opacity:1" /><stop offset="100%" style="stop-color:#B91C1C;stop-opacity:1" /></linearGradient></defs>
    <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" fill="url(#pdf-gradient)" stroke="#7F1D1D" stroke-width="1"/>
    <path d="M14 2V8H20" fill="#FEE2E2" stroke="#DC2626" stroke-width="1"/>
    <text x="12" y="15" fill="#FFFFFF" font-size="8" font-weight="bold" text-anchor="middle">PDF</text>
  </svg>`,

  excel_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="excel-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#10B981;stop-opacity:1" /><stop offset="100%" style="stop-color:#059669;stop-opacity:1" /></linearGradient></defs>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="url(#excel-gradient)" stroke="#065F46" stroke-width="1"/>
    <rect x="5" y="5" width="14" height="3" fill="#FFFFFF" opacity="0.9"/>
    <rect x="5" y="10" width="14" height="3" fill="#FFFFFF" opacity="0.7"/>
    <rect x="5" y="15" width="14" height="3" fill="#FFFFFF" opacity="0.5"/>
    <line x1="9" y1="5" x2="9" y2="18" stroke="#10B981" stroke-width="1"/>
    <line x1="15" y1="5" x2="15" y2="18" stroke="#10B981" stroke-width="1"/>
  </svg>`,

  image_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="img-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" /><stop offset="50%" style="stop-color:#EF4444;stop-opacity:1" /><stop offset="100%" style="stop-color:#EC4899;stop-opacity:1" /></linearGradient></defs>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#img-gradient)" stroke="#B91C1C" stroke-width="1"/>
    <circle cx="8" cy="8" r="2" fill="#FFFFFF"/>
    <path d="M3 15L8 10L12 14L16 10L21 15V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V15Z" fill="#FFFFFF" opacity="0.8"/>
  </svg>`,

  text_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#06B6D4;stop-opacity:1" /><stop offset="100%" style="stop-color:#0891B2;stop-opacity:1" /></linearGradient></defs>
    <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#text-gradient)" stroke="#0E7490" stroke-width="1"/>
    <rect x="5" y="7" width="14" height="2" rx="1" fill="#FFFFFF"/>
    <rect x="5" y="11" width="10" height="2" rx="1" fill="#FFFFFF" opacity="0.8"/>
    <rect x="5" y="15" width="12" height="2" rx="1" fill="#FFFFFF" opacity="0.6"/>
  </svg>`,

  code_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="code-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#374151;stop-opacity:1" /><stop offset="100%" style="stop-color:#1F2937;stop-opacity:1" /></linearGradient></defs>
    <rect x="2" y="3" width="20" height="18" rx="3" fill="url(#code-gradient)" stroke="#111827" stroke-width="1"/>
    <path d="M8 9L6 12L8 15" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16 9L18 12L16 15" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 7L10 17" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  health_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="health-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#EF4444;stop-opacity:1" /><stop offset="100%" style="stop-color:#DC2626;stop-opacity:1" /></linearGradient></defs>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="url(#health-gradient)"/>
    <path d="M12 8V16M8 12H16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  data_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="data-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" /><stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" /></linearGradient></defs>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#data-gradient)" stroke="#1E40AF" stroke-width="1"/>
    <rect x="5" y="8" width="3" height="10" fill="#FFFFFF" opacity="0.9"/>
    <rect x="10" y="6" width="3" height="12" fill="#FFFFFF" opacity="0.7"/>
    <rect x="15" y="10" width="3" height="8" fill="#FFFFFF" opacity="0.5"/>
  </svg>`,

  design_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="design-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" /><stop offset="50%" style="stop-color:#EC4899;stop-opacity:1" /><stop offset="100%" style="stop-color:#F59E0B;stop-opacity:1" /></linearGradient></defs>
    <circle cx="12" cy="12" r="10" fill="url(#design-gradient)"/>
    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="#FFFFFF" opacity="0.9"/>
    <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
  </svg>`,

  // 更多专用图标...
  password_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="pass-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" /><stop offset="100%" style="stop-color:#D97706;stop-opacity:1" /></linearGradient></defs>
    <rect x="5" y="11" width="14" height="10" rx="2" fill="url(#pass-gradient)" stroke="#92400E" stroke-width="1"/>
    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#F59E0B" stroke-width="2" fill="none"/>
    <circle cx="12" cy="16" r="2" fill="#FFFFFF"/>
  </svg>`,

  time_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="time-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#10B981;stop-opacity:1" /><stop offset="100%" style="stop-color:#059669;stop-opacity:1" /></linearGradient></defs>
    <circle cx="12" cy="12" r="10" fill="url(#time-gradient)" stroke="#065F46" stroke-width="1"/>
    <path d="M12 6V12L16 16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="1" fill="#FFFFFF"/>
  </svg>`,

  music_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="music-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#EC4899;stop-opacity:1" /><stop offset="100%" style="stop-color:#BE185D;stop-opacity:1" /></linearGradient></defs>
    <circle cx="12" cy="12" r="10" fill="url(#music-gradient)" stroke="#9D174D" stroke-width="1"/>
    <path d="M9 18V8L21 6V16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="6" cy="18" r="3" fill="#FFFFFF"/>
    <circle cx="18" cy="16" r="3" fill="#FFFFFF"/>
  </svg>`,

  weather_tool: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="weather-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" /><stop offset="50%" style="stop-color:#06B6D4;stop-opacity:1" /><stop offset="100%" style="stop-color:#10B981;stop-opacity:1" /></linearGradient></defs>
    <circle cx="12" cy="12" r="5" fill="#F59E0B"/>
    <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9" fill="url(#weather-gradient)" opacity="0.7"/>
  </svg>`,

  // 基础分类图标
  generator: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="gen-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" /><stop offset="100%" style="stop-color:#EF4444;stop-opacity:1" /></linearGradient></defs>
    <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="url(#gen-gradient)"/>
    <circle cx="6" cy="6" r="2" fill="#FBBF24" opacity="0.8"/>
    <circle cx="18" cy="6" r="2" fill="#FBBF24" opacity="0.8"/>
    <circle cx="6" cy="18" r="2" fill="#FBBF24" opacity="0.8"/>
    <circle cx="18" cy="18" r="2" fill="#FBBF24" opacity="0.8"/>
  </svg>`,
  
  converter: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="conv-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#10B981;stop-opacity:1" /><stop offset="100%" style="stop-color:#059669;stop-opacity:1" /></linearGradient></defs>
    <path d="M7 16L17 8" stroke="url(#conv-gradient)" stroke-width="3" stroke-linecap="round"/>
    <path d="M17 16L7 8" stroke="url(#conv-gradient)" stroke-width="3" stroke-linecap="round"/>
    <circle cx="7" cy="8" r="3" fill="#34D399" stroke="#065F46" stroke-width="1"/>
    <circle cx="17" cy="8" r="3" fill="#34D399" stroke="#065F46" stroke-width="1"/>
    <circle cx="7" cy="16" r="3" fill="#34D399" stroke="#065F46" stroke-width="1"/>
    <circle cx="17" cy="16" r="3" fill="#34D399" stroke="#065F46" stroke-width="1"/>
  </svg>`,
  
  editor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="edit-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F97316;stop-opacity:1" /><stop offset="100%" style="stop-color:#DC2626;stop-opacity:1" /></linearGradient></defs>
    <path d="M11 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H16C17.1046 20 18 19.1046 18 18V11" fill="#FED7AA" stroke="#EA580C" stroke-width="1.5"/>
    <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" fill="url(#edit-gradient)" stroke="#B91C1C" stroke-width="1"/>
    <circle cx="20" cy="4" r="1.5" fill="#FBBF24"/>
  </svg>`,
  
  ai: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:1" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /></linearGradient>
    <filter id="ai-glow"><feGaussianBlur stdDeviation="1" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path d="M12 2L15.09 8.26L22 9L15.09 9.74L12 16L8.91 9.74L2 9L8.91 8.26L12 2Z" fill="url(#ai-gradient)" filter="url(#ai-glow)"/>
    <circle cx="12" cy="12" r="4" fill="#C084FC" opacity="0.6"/>
    <circle cx="12" cy="12" r="2" fill="#FFFFFF"/>
  </svg>`,
  
  game: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="game-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#EC4899;stop-opacity:1" /><stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:1" /><stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" /></linearGradient></defs>
    <path d="M6 12C6 9.79086 7.79086 8 10 8H14C16.2091 8 18 9.79086 18 12V16C18 18.2091 16.2091 20 14 20H10C7.79086 20 6 18.2091 6 16V12Z" fill="url(#game-gradient)" stroke="#1E1B4B" stroke-width="1"/>
    <circle cx="9" cy="12" r="1.5" fill="#FFFFFF"/>
    <circle cx="15" cy="12" r="1.5" fill="#FFFFFF"/>
    <circle cx="9" cy="16" r="1.5" fill="#FFFFFF"/>
    <circle cx="15" cy="16" r="1.5" fill="#FFFFFF"/>
  </svg>`,
  
  text: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#06B6D4;stop-opacity:1" /><stop offset="100%" style="stop-color:#0891B2;stop-opacity:1" /></linearGradient></defs>
    <rect x="3" y="4" width="18" height="16" rx="3" fill="url(#text-gradient)" stroke="#0E7490" stroke-width="1"/>
    <rect x="5" y="7" width="14" height="2" rx="1" fill="#FFFFFF"/>
    <rect x="5" y="11" width="10" height="2" rx="1" fill="#FFFFFF" opacity="0.8"/>
    <rect x="5" y="15" width="12" height="2" rx="1" fill="#FFFFFF" opacity="0.6"/>
  </svg>`,
  
  utility: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="util-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#6B7280;stop-opacity:1" /><stop offset="100%" style="stop-color:#374151;stop-opacity:1" /></linearGradient></defs>
    <circle cx="12" cy="12" r="10" fill="url(#util-gradient)" stroke="#1F2937" stroke-width="1"/>
    <path d="M8 12L12 16L16 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 8V16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="8" r="2" fill="#F59E0B"/>
  </svg>`,

  // 默认图标
  default: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="default-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#F59E0B;stop-opacity:1" /><stop offset="50%" style="stop-color:#EF4444;stop-opacity:1" /><stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:1" /></linearGradient></defs>
    <circle cx="12" cy="12" r="10" fill="url(#default-gradient)" stroke="#1F2937" stroke-width="1"/>
    <path d="M8 12L12 16L16 12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 8V16" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="8" r="2" fill="#FFFFFF"/>
  </svg>`
};

// 智能图标选择函数 - 为每个工具创建独特图标
function selectIconTemplate(tool) {
  const name = tool.name.toLowerCase();
  const description = (tool.description || '').toLowerCase();
  const id = String(tool.id).toLowerCase();
  
  // 专用工具图标匹配
  if (id.includes('qr') || name.includes('二维码') || name.includes('qr')) {
    return 'qr_code';
  }
  
  if (id.includes('color') || name.includes('颜色') || name.includes('色彩') || name.includes('调色')) {
    return 'color_picker';
  }
  
  if (id.includes('json') || name.includes('json') || description.includes('json')) {
    return 'json_formatter';
  }
  
  if (id.includes('2048') || name.includes('2048')) {
    return 'game_2048';
  }
  
  if (id.includes('pdf') || name.includes('pdf') || description.includes('pdf')) {
    return 'pdf_tool';
  }
  
  if (id.includes('excel') || name.includes('excel') || name.includes('表格') || description.includes('excel')) {
    return 'excel_tool';
  }
  
  if (id.includes('image') || name.includes('图片') || name.includes('图像') || description.includes('图片')) {
    return 'image_tool';
  }
  
  if (id.includes('code') || name.includes('代码') || description.includes('代码') || name.includes('编程')) {
    return 'code_tool';
  }
  
  if (id.includes('health') || name.includes('健康') || name.includes('医疗') || description.includes('健康')) {
    return 'health_tool';
  }
  
  if (id.includes('data') || name.includes('数据') || description.includes('数据') || name.includes('统计')) {
    return 'data_tool';
  }
  
  if (id.includes('design') || name.includes('设计') || description.includes('设计') || name.includes('美化')) {
    return 'design_tool';
  }
  
  if (id.includes('password') || name.includes('密码') || description.includes('密码')) {
    return 'password_tool';
  }
  
  if (id.includes('time') || name.includes('时间') || description.includes('时间') || name.includes('日期')) {
    return 'time_tool';
  }
  
  if (id.includes('music') || name.includes('音乐') || description.includes('音乐') || name.includes('音频')) {
    return 'music_tool';
  }
  
  if (id.includes('weather') || name.includes('天气') || description.includes('天气')) {
    return 'weather_tool';
  }
  
  // 基础分类匹配
  if (name.includes('计算') || name.includes('calculator') || 
      description.includes('计算') || description.includes('calculator') ||
      name.includes('算') || description.includes('算')) {
    return 'calculator';
  }
  
  if (name.includes('生成') || name.includes('generator') || name.includes('生成器') ||
      description.includes('生成') || description.includes('generator') ||
      name.includes('随机') || description.includes('随机')) {
    return 'generator';
  }
  
  if (name.includes('转换') || name.includes('converter') || name.includes('转换器') ||
      description.includes('转换') || description.includes('converter') ||
      name.includes('编码') || description.includes('编码') ||
      name.includes('解码') || description.includes('解码') ||
      name.includes('格式') || description.includes('格式')) {
    return 'converter';
  }
  
  if (name.includes('编辑') || name.includes('editor') || name.includes('编辑器') ||
      description.includes('编辑') || description.includes('editor') ||
      name.includes('格式化') || description.includes('格式化')) {
    return 'text_tool';
  }
  
  if (name.includes('ai') || name.includes('智能') || name.includes('人工智能') ||
      description.includes('ai') || description.includes('智能') || description.includes('人工智能') ||
      name.includes('机器学习') || description.includes('机器学习')) {
    return 'ai_tool';
  }
  
  if (name.includes('游戏') || name.includes('game') || name.includes('娱乐') ||
      description.includes('游戏') || description.includes('game') || description.includes('娱乐') ||
      id.includes('game')) {
    return 'game_2048';
  }
  
  if (name.includes('文本') || name.includes('text') || name.includes('字符') ||
      description.includes('文本') || description.includes('text') || description.includes('字符') ||
      name.includes('字符串') || description.includes('字符串') ||
      name.includes('文字') || description.includes('文字')) {
    return 'text_tool';
  }
  
  return 'default';
}

// 生成所有工具图标
function generateToolIcons() {
  const iconsDir = path.join(__dirname, 'icons', 'tools');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  let generatedCount = 0;
  
  toolsData.forEach(tool => {
    // 确保ID存在且有效
    if (!tool.id || tool.id === '' || (typeof tool.id === 'string' && tool.id.endsWith('-'))) {
      console.log(`跳过无效ID的工具: ${tool.name} (ID: ${tool.id})`);
      return;
    }
    
    const iconTemplate = selectIconTemplate(tool);
    const iconPath = path.join(iconsDir, `${tool.id}.svg`);
    
    fs.writeFileSync(iconPath, iconTemplate);
    generatedCount++;
  });

  console.log(`✅ 成功生成 ${generatedCount} 个工具图标`);
  
  // 生成图标映射文件
  const iconMapping = {};
  toolsData.forEach(tool => {
    // 只为有效ID的工具生成映射
    if (tool.id && tool.id !== '' && !(typeof tool.id === 'string' && tool.id.endsWith('-'))) {
      iconMapping[tool.id] = `assets/tools/${tool.id}.svg`;
    }
  });
  
  fs.writeFileSync('icon-mapping.json', JSON.stringify(iconMapping, null, 2));
  console.log('✅ 生成图标映射文件: icon-mapping.json');
}

// 执行生成
generateToolIcons();