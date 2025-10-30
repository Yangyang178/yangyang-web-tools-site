const fs = require('fs');

// 读取工具数据
const toolsData = JSON.parse(fs.readFileSync('tools-data.json', 'utf-8'));

// 统计分类
const categoryStats = {};
const toolsByCategory = {};

toolsData.forEach(tool => {
  const category = tool.category;
  categoryStats[category] = (categoryStats[category] || 0) + 1;
  
  if (!toolsByCategory[category]) {
    toolsByCategory[category] = [];
  }
  toolsByCategory[category].push(tool.name);
});

console.log('=== 工具分类统计 ===');
Object.entries(categoryStats).forEach(([category, count]) => {
  console.log(`${category}: ${count} 个工具`);
});

console.log('\n=== 各分类代表性工具 ===');
Object.entries(toolsByCategory).forEach(([category, tools]) => {
  console.log(`\n【${category}】:`);
  tools.slice(0, 8).forEach(tool => console.log(`  - ${tool}`));
  if (tools.length > 8) {
    console.log(`  ... 还有 ${tools.length - 8} 个工具`);
  }
});

// 分析特殊工具类型
console.log('\n=== 特殊工具类型分析 ===');
const specialTypes = {
  '计算器类': toolsData.filter(t => t.name.includes('计算器') || t.name.includes('calculator')),
  '生成器类': toolsData.filter(t => t.name.includes('生成器') || t.name.includes('generator')),
  '转换器类': toolsData.filter(t => t.name.includes('转换器') || t.name.includes('converter')),
  '编辑器类': toolsData.filter(t => t.name.includes('编辑器') || t.name.includes('editor')),
  '游戏类': toolsData.filter(t => t.category === 'game'),
  'AI工具类': toolsData.filter(t => t.name.includes('AI') || t.name.includes('智能')),
};

Object.entries(specialTypes).forEach(([type, tools]) => {
  if (tools.length > 0) {
    console.log(`${type}: ${tools.length} 个`);
    tools.slice(0, 3).forEach(tool => console.log(`  - ${tool.name}`));
  }
});