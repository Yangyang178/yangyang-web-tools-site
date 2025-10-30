const fs = require('fs');

// 读取工具数据
function loadToolsData() {
  const data = fs.readFileSync('tools-data.json', 'utf8');
  return JSON.parse(data);
}

// 生成唯一ID的函数
function generateUniqueId(tool, existingIds) {
  const category = tool.category || 'utility';
  
  // 处理中文名称，转换为拼音或英文描述
  let name = tool.name.toLowerCase();
  
  // 中文名称映射表
   const chineseToEnglish = {
     '万年历倒计时工具': 'calendar-countdown',
     '代码注释移除工具': 'code-comment-remover',
     '四色定理小游戏': 'four-color-theorem-game',
     '图片格式转换工具': 'image-format-converter',
     '宠物健康自检助手': 'pet-health-checker',
     '数据可视化快捷生成器': 'data-visualization-generator',
     '色彩方案生成器': 'color-scheme-generator',
     '颜色选择器': 'color-picker',
     '颜色选择器 & 调色板生成工具': 'color-picker-palette-generator'
   };
  
  // 如果有映射，使用映射的英文名
  if (chineseToEnglish[tool.name]) {
    name = chineseToEnglish[tool.name];
  } else {
    // 否则生成简单的数字ID
    name = `tool-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  }
  
  // 清理名称
  name = name
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 空格替换为连字符
    .replace(/--+/g, '-') // 多个连字符合并为一个
    .replace(/^-|-$/g, ''); // 移除开头和结尾的连字符
  
  // 生成基础ID
  let baseId = `${category}-${name}`;
  let finalId = baseId;
  let counter = 1;
  
  // 如果ID已存在，添加数字后缀
  while (existingIds.has(finalId)) {
    finalId = `${baseId}-${counter}`;
    counter++;
  }
  
  existingIds.add(finalId);
  return finalId;
}

// 修复工具ID
function fixToolIds() {
  const tools = loadToolsData();
  const existingIds = new Set();
  const invalidIdPattern = /^(utility|game|text|design|code|data|health)--?$/;
  
  // 首先收集所有有效的ID
  tools.forEach(tool => {
    if (tool.id && !invalidIdPattern.test(tool.id)) {
      existingIds.add(tool.id);
    }
  });
  
  let fixedCount = 0;
  
  // 修复无效ID
  tools.forEach(tool => {
    if (!tool.id || invalidIdPattern.test(tool.id)) {
      const newId = generateUniqueId(tool, existingIds);
      console.log(`修复工具ID: "${tool.name}" ${tool.id || '(无ID)'} -> ${newId}`);
      tool.id = newId;
      fixedCount++;
    }
  });
  
  // 保存修复后的数据
  fs.writeFileSync('tools-data.json', JSON.stringify(tools, null, 2));
  console.log(`\n✅ 成功修复 ${fixedCount} 个工具的ID`);
  
  return tools;
}

// 运行修复
if (require.main === module) {
  fixToolIds();
}

module.exports = { fixToolIds };