const fs = require('fs');
const path = require('path');

// 工具分类映射
const toolCategories = {
    // 实用工具
    utility: [
        'BMI计算器', '二维码生成器', '颜色选择器', 'JSON格式化', '密码生成器', 
        '时间戳转换', 'URL编码解码', 'Base64编码解码', '哈希计算器', '单位转换器',
        '计算器', '倒计时器', '秒表', '随机数生成器', '抽奖轮盘'
    ],
    
    // 设计工具
    design: [
        '颜色代码转换器', '渐变生成器', '阴影生成器', '边框生成器', 'CSS生成器',
        '图标生成器', '二维码美化', '头像生成器', 'Logo生成器', '调色板'
    ],
    
    // 代码工具
    code: [
        'HTML格式化', 'CSS格式化', 'JavaScript格式化', 'SQL格式化', 'XML格式化',
        '代码高亮', '正则表达式测试', 'Markdown编辑器', '代码压缩', '代码美化'
    ],
    
    // 游戏娱乐
    game: [
        '2048', '贪吃蛇', '俄罗斯方块', '扫雷', '五子棋', '井字棋', '拼图游戏',
        '记忆游戏', '打字游戏', '数独', '华容道'
    ],
    
    // 文本处理
    text: [
        '文本对比', '文本统计', '文本加密', '文本解密', '繁简转换', '拼音转换',
        '文本替换', '文本排序', '去重工具', '文本分割', '文本合并'
    ],
    
    // 健康工具
    health: [
        'BMI计算器', '卡路里计算器', '体脂率计算器', '基础代谢计算', '饮水提醒',
        '运动计划', '健康记录', '药物提醒'
    ],
    
    // 数据工具
    data: [
        '图表生成器', '数据可视化', 'Excel转换', 'CSV处理', '数据统计',
        '数据清洗', '数据导出', '表格生成器'
    ]
};

// 获取工具分类
function getToolCategory(filename) {
    const name = path.basename(filename, '.html');
    
    for (const [category, tools] of Object.entries(toolCategories)) {
        if (tools.some(tool => name.includes(tool) || tool.includes(name))) {
            return category;
        }
    }
    
    // 默认分类逻辑
    if (name.includes('游戏') || name.includes('2048') || name.includes('贪吃蛇')) {
        return 'game';
    } else if (name.includes('颜色') || name.includes('CSS') || name.includes('设计')) {
        return 'design';
    } else if (name.includes('代码') || name.includes('格式化') || name.includes('HTML')) {
        return 'code';
    } else if (name.includes('文本') || name.includes('转换')) {
        return 'text';
    } else if (name.includes('健康') || name.includes('BMI') || name.includes('计算器')) {
        return 'health';
    } else if (name.includes('数据') || name.includes('图表')) {
        return 'data';
    }
    
    return 'utility'; // 默认分类
}

// 生成工具目录名
function generateToolDir(filename) {
    const name = path.basename(filename, '.html');
    return name.toLowerCase()
        .replace(/[^\w\s-]/g, '') // 移除特殊字符
        .replace(/\s+/g, '-') // 空格替换为连字符
        .replace(/计算器/g, 'calculator')
        .replace(/生成器/g, 'generator')
        .replace(/转换器/g, 'converter')
        .replace(/格式化/g, 'formatter');
}

// 提取工具信息
function extractToolInfo(htmlContent, filename) {
    const name = path.basename(filename, '.html');
    
    // 提取标题
    const titleMatch = htmlContent.match(/<title[^>]*>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s*-.*$/, '').trim() : name;
    
    // 提取描述
    const descMatch = htmlContent.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i);
    const description = descMatch ? descMatch[1] : `专业的${name}工具，功能强大，使用简便`;
    
    // 提取关键词
    const keywordsMatch = htmlContent.match(/<meta[^>]*name=["']keywords["'][^>]*content=["'](.*?)["']/i);
    const keywords = keywordsMatch ? keywordsMatch[1].split(',').map(k => k.trim()) : [name];
    
    return { title, description, keywords };
}

// 适配HTML内容
function adaptHtmlContent(htmlContent, toolInfo, toolDir, category) {
    // 基础模板
    const template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${toolInfo.title} - AI工具资源站</title>
    <meta name="description" content="${toolInfo.description}">
    <link rel="icon" href="../../../favicon.ico">
    <link rel="stylesheet" href="../../shared/common.css">
    <style>
        /* 工具特定样式 */
        .tool-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .tool-main {
            background: var(--bg-secondary);
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: var(--shadow-medium);
        }
        
        /* 从原文件提取的样式 */
        {{ORIGINAL_STYLES}}
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <nav class="tool-nav">
        <div class="nav-container">
            <a href="../../../index.html" class="nav-brand">🏠 返回主站</a>
            <div class="nav-title">${toolInfo.title}</div>
        </div>
    </nav>

    <!-- 主要内容 -->
    <main class="tool-container">
        <!-- 工具头部 -->
        <div class="tool-header">
            <h1>{{TOOL_ICON}} ${toolInfo.title}</h1>
            <p class="tool-description">${toolInfo.description}</p>
        </div>

        <!-- 工具主体 -->
        <div class="tool-main">
            {{ORIGINAL_CONTENT}}
        </div>
    </main>

    <script src="../../shared/common.js"></script>
    <script>
        // 工具特定脚本
        {{ORIGINAL_SCRIPTS}}
        
        // 初始化
        document.addEventListener('DOMContentLoaded', () => {
            // 工具初始化代码
        });
    </script>
</body>
</html>`;

    // 提取原始样式
    const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    const originalStyles = styleMatch ? styleMatch.map(s => s.replace(/<\/?style[^>]*>/gi, '')).join('\n') : '';
    
    // 提取原始内容（body内容）
    const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const originalContent = bodyMatch ? bodyMatch[1] : htmlContent;
    
    // 提取原始脚本
    const scriptMatch = htmlContent.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    const originalScripts = scriptMatch ? scriptMatch.map(s => s.replace(/<\/?script[^>]*>/gi, '')).join('\n') : '';
    
    // 获取工具图标
    const toolIcons = {
        utility: '🔧',
        design: '🎨',
        code: '💻',
        game: '🎮',
        text: '📝',
        health: '🏥',
        data: '📊'
    };
    
    // 替换模板内容
    return template
        .replace('{{ORIGINAL_STYLES}}', originalStyles)
        .replace('{{ORIGINAL_CONTENT}}', originalContent)
        .replace('{{ORIGINAL_SCRIPTS}}', originalScripts)
        .replace('{{TOOL_ICON}}', toolIcons[category] || '🔧');
}

// 主处理函数
async function integrateTools() {
    const sourceDir = path.join(__dirname, '网页工具库');
    const targetDir = path.join(__dirname, 'tools');
    const toolsData = [];
    
    console.log('开始整合工具...');
    
    try {
        const files = fs.readdirSync(sourceDir);
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        console.log(`发现 ${htmlFiles.length} 个HTML工具文件`);
        
        for (const file of htmlFiles) {
            try {
                const filePath = path.join(sourceDir, file);
                const htmlContent = fs.readFileSync(filePath, 'utf-8');
                
                // 获取工具信息
                const toolInfo = extractToolInfo(htmlContent, file);
                const category = getToolCategory(file);
                const toolDir = generateToolDir(file);
                
                // 创建目标目录
                const targetPath = path.join(targetDir, category, toolDir);
                if (!fs.existsSync(targetPath)) {
                    fs.mkdirSync(targetPath, { recursive: true });
                }
                
                // 适配HTML内容
                const adaptedContent = adaptHtmlContent(htmlContent, toolInfo, toolDir, category);
                
                // 写入文件
                const outputPath = path.join(targetPath, 'index.html');
                fs.writeFileSync(outputPath, adaptedContent, 'utf-8');
                
                // 记录工具数据
                toolsData.push({
                    id: `${category}-${toolDir}`,
                    name: toolInfo.title,
                    description: toolInfo.description,
                    category: category,
                    tags: toolInfo.keywords,
                    localPath: `tools/${category}/${toolDir}/index.html`,
                    isOriginal: true,
                    featured: false
                });
                
                console.log(`✅ 已处理: ${file} -> ${category}/${toolDir}`);
                
            } catch (error) {
                console.error(`❌ 处理文件 ${file} 时出错:`, error.message);
            }
        }
        
        // 生成工具数据文件
        const dataPath = path.join(__dirname, 'tools-data.json');
        fs.writeFileSync(dataPath, JSON.stringify(toolsData, null, 2), 'utf-8');
        
        console.log(`\n🎉 整合完成！`);
        console.log(`- 处理了 ${toolsData.length} 个工具`);
        console.log(`- 工具数据已保存到: ${dataPath}`);
        console.log(`\n分类统计:`);
        
        const categoryStats = {};
        toolsData.forEach(tool => {
            categoryStats[tool.category] = (categoryStats[tool.category] || 0) + 1;
        });
        
        Object.entries(categoryStats).forEach(([category, count]) => {
            console.log(`  ${category}: ${count} 个工具`);
        });
        
    } catch (error) {
        console.error('整合过程中出现错误:', error);
    }
}

// 如果直接运行此脚本
if (require.main === module) {
    integrateTools();
}

module.exports = { integrateTools, toolCategories };