// AI工具数据
let aiTools = [];

// 收藏功能相关变量
let favorites = JSON.parse(localStorage.getItem('toolFavorites') || '[]');

// 工具数据（直接嵌入，避免fetch加载问题）
let toolsData = [
  {
    "id": "2048-game",
    "name": "2048游戏",
    "description": "经典的2048数字合并游戏，支持触摸和键盘操作",
    "category": "game",
    "tags": ["游戏", "2048", "数字", "益智"],
    "localPath": "tools/games/2048游戏.html",
    "isOriginal": true,
    "featured": true
  },
  {
    "id": "dice-roller",
    "name": "电子骰子工具",
    "description": "虚拟骰子工具，支持多种骰子类型和数量",
    "category": "game",
    "tags": ["游戏", "骰子", "随机", "娱乐"],
    "localPath": "tools/games/电子骰子工具.html",
    "isOriginal": true,
    "featured": false
  },
  {
    "id": "image-compressor",
    "name": "图片压缩工具",
    "description": "高级图片压缩工具，支持多种格式和压缩质量调节",
    "category": "image",
    "tags": ["图片", "压缩", "优化", "工具"],
    "localPath": "tools/design/图片压缩工具.html",
    "isOriginal": true,
    "featured": true
  },
  {
    "id": "image-format-converter",
    "name": "图片格式转换器",
    "description": "支持多种图片格式之间的相互转换",
    "category": "image",
    "tags": ["图片", "格式转换", "转换器", "工具"],
    "localPath": "tools/design/图片格式转换器.html",
    "isOriginal": true,
    "featured": true
  },
  {
    "id": "pdf-to-image",
    "name": "PDF转图片工具",
    "description": "将PDF文档转换为图片格式，支持多页处理",
    "category": "image",
    "tags": ["PDF", "图片", "转换", "文档"],
    "localPath": "tools/design/PDF转图片工具.html",
    "isOriginal": true,
    "featured": false
  },
  {
    "id": "image-to-pdf",
    "name": "图片转PDF工具",
    "description": "将多张图片合并转换为PDF文档",
    "category": "image",
    "tags": ["图片", "PDF", "转换", "合并"],
    "localPath": "tools/design/图片转PDF工具.html",
    "isOriginal": true,
    "featured": false
  },
  {
    "id": "number-base-converter",
    "name": "多功能进制转换器",
    "description": "支持二进制、八进制、十进制、十六进制等多种进制转换",
    "category": "utility",
    "tags": ["进制", "转换", "数学", "计算"],
    "localPath": "tools/dev/多功能进制转换器.html",
    "isOriginal": true,
    "featured": false
  },
  {
    "id": "qr-code-generator",
    "name": "智能二维码生成器",
    "description": "生成各种类型的二维码，支持自定义样式和颜色",
    "category": "data",
    "tags": ["二维码", "生成器", "QR码", "工具"],
    "localPath": "tools/dev/智能二维码生成器.html",
    "isOriginal": true,
    "featured": true
  },
  {
    "id": "password-generator",
    "name": "随机密码生成器",
    "description": "安全的密码生成工具，支持多种字符组合和长度设置",
    "category": "security",
    "tags": ["密码", "生成器", "安全", "随机"],
    "localPath": "tools/dev/随机密码生成器.html",
    "isOriginal": true,
    "featured": true
  },
  {
    "id": "markdown-editor",
    "name": "Markdown编辑器",
    "description": "优化版Markdown编辑器，支持实时预览和语法高亮",
    "category": "text",
    "tags": ["Markdown", "编辑器", "预览", "文档"],
    "localPath": "tools/text/Markdown编辑器.html",
    "isOriginal": true,
    "featured": true
  },
  {
    "id": "bmi-calculator",
    "name": "BMI计算器",
    "description": "计算体重指数BMI，支持身高体重输入",
    "category": "utility",
    "tags": ["健康", "BMI", "体重指数", "计算器"],
    "localPath": "tools/utilities/BMI计算器.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "multi-calculator",
    "name": "多功能计算器",
    "description": "四则运算与常用函数计算",
    "category": "utility",
    "tags": ["计算器", "数学", "四则运算", "工具"],
    "localPath": "tools/utilities/多功能计算器.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "math-practice",
    "name": "小学生加减乘除练习器",
    "description": "小学算术练习，随机题目与计时",
    "category": "utility",
    "tags": ["学习", "算术", "练习", "教育"],
    "localPath": "tools/games/小学生加减乘除练习器.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "word-count",
    "name": "文字字数统计器",
    "description": "统计字数、字符数与空格等",
    "category": "text",
    "tags": ["文本", "统计", "字数", "字符"],
    "localPath": "tools/text/文字字数统计器.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "timezone-table",
    "name": "时区转换对照表",
    "description": "快速查询并转换各地时区",
    "category": "utility",
    "tags": ["时区", "转换", "时间", "对照表"],
    "localPath": "tools/utilities/时区转换对照表.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "steps-distance",
    "name": "步数换算距离工具",
    "description": "将步数换算为行走距离",
    "category": "utility",
    "tags": ["健康", "步数", "距离", "换算"],
    "localPath": "tools/utilities/步数换算距离工具.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "pomodoro-timer",
    "name": "番茄钟",
    "description": "专注计时法工具，番茄工作法",
    "category": "utility",
    "tags": ["专注", "计时", "效率", "番茄钟"],
    "localPath": "tools/utilities/番茄钟.html",
    "isOriginal": true,
    "featured": true,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "simple-gantt-generator",
    "name": "简易甘特图生成器",
    "description": "创建简单甘特图，任务时间轴",
    "category": "data",
    "tags": ["项目", "甘特图", "时间轴", "可视化"],
    "localPath": "tools/generators/简易甘特图生成器.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "xiaohongshu-cover-generator",
    "name": "自动生成小红书封面工具",
    "description": "生成小红书封面模板与文字排版",
    "category": "image",
    "tags": ["图片", "封面", "模板", "小红书"],
    "localPath": "tools/design/自动生成小红书封面工具.html",
    "isOriginal": true,
    "featured": true,
    "dateAdded": "2025-10-24"
  },
  {
    "id": "calorie-calculator",
    "name": "食物热量计算器",
    "description": "根据食物估算热量与营养",
    "category": "utility",
    "tags": ["健康", "热量", "食物", "营养"],
    "localPath": "tools/utilities/食物热量计算器.html",
    "isOriginal": true,
    "featured": false,
    "dateAdded": "2025-10-24"
  }
];

// 当前显示的工具
let currentTools = [];
let currentPage = 1;
const toolsPerPage = 24;

// 搜索和筛选状态
let currentCategory = 'all';
let currentFilters = {
    price: [],
    rating: null
};
let currentSort = 'newest';
let searchQuery = '';

// DOM元素
const toolsGrid = document.getElementById('toolsGrid');
const searchInput = document.getElementById('searchInput');
const categoryLinks = document.querySelectorAll('.category-link');
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
const sortSelect = document.getElementById('sortSelect');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
const backToTop = document.getElementById('backToTop');

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 页面初始化开始 ===');
    
    loadToolsData();
    initializeEventListeners();
    initializeTheme();
    initializeSidebarState();
    checkScrollPosition();
});

// 加载工具数据
function loadToolsData() {
    try {
        // 数据已经直接嵌入，无需fetch
        aiTools = [];
        
        // 合并所有工具
        let allTools = [...toolsData, ...aiTools];
        
        // 去重逻辑：基于localPath去重，优先保留中文版本
        const uniqueTools = [];
        const seenPaths = new Set();
        const pathMapping = new Map(); // 用于存储路径映射关系
        
        // 首先建立路径映射，识别重复的工具
        allTools.forEach(tool => {
            if (tool.localPath) {
                const normalizedPath = tool.localPath.toLowerCase();
                const fileName = normalizedPath.split('/').pop().replace('.html', '');
                
                // 检查是否是同一个工具的不同版本
                const existingTool = uniqueTools.find(existing => {
                    const existingFileName = existing.localPath.toLowerCase().split('/').pop().replace('.html', '');
                    
                    // 检查文件名相似性（去除语言差异）
                    return (
                        fileName === existingFileName || // 完全相同
                        fileName.includes(existingFileName) || // 包含关系
                        existingFileName.includes(fileName) || // 反向包含关系
                        // 特殊情况：2048游戏
                        (fileName.includes('2048') && existingFileName.includes('2048')) ||
                        // 特殊情况：骰子工具
                        (fileName.includes('dice') && existingFileName.includes('骰子')) ||
                        (fileName.includes('骰子') && existingFileName.includes('dice')) ||
                        // 特殊情况：密码生成器
                        (fileName.includes('password') && existingFileName.includes('密码')) ||
                        (fileName.includes('密码') && existingFileName.includes('password')) ||
                        // 特殊情况：二维码生成器
                        (fileName.includes('qr') && existingFileName.includes('二维码')) ||
                        (fileName.includes('二维码') && existingFileName.includes('qr')) ||
                        // 特殊情况：图片压缩
                        (fileName.includes('image-compressor') && existingFileName.includes('图片压缩')) ||
                        (fileName.includes('图片压缩') && existingFileName.includes('image-compressor')) ||
                        // 特殊情况：Markdown编辑器
                        (fileName.includes('markdown') && existingFileName.includes('markdown')) ||
                        // 特殊情况：进制转换器
                        (fileName.includes('base-converter') && existingFileName.includes('进制转换')) ||
                        (fileName.includes('进制转换') && existingFileName.includes('base-converter')) ||
                        // 特殊情况：格式转换器
                        (fileName.includes('format-converter') && existingFileName.includes('格式转换')) ||
                        (fileName.includes('格式转换') && existingFileName.includes('format-converter')) ||
                        // 特殊情况：PDF转图片
                        (fileName.includes('pdf-to-image') && existingFileName.includes('pdf转图片')) ||
                        (fileName.includes('pdf转图片') && existingFileName.includes('pdf-to-image')) ||
                        // 特殊情况：图片转PDF
                        (fileName.includes('image-to-pdf') && existingFileName.includes('图片转pdf')) ||
                        (fileName.includes('图片转pdf') && existingFileName.includes('image-to-pdf'))
                    );
                });
                
                if (existingTool) {
                    // 如果找到重复工具，优先保留中文版本
                    const currentIsChinese = /[\u4e00-\u9fff]/.test(tool.name) || /[\u4e00-\u9fff]/.test(tool.localPath);
                    const existingIsChinese = /[\u4e00-\u9fff]/.test(existingTool.name) || /[\u4e00-\u9fff]/.test(existingTool.localPath);
                    
                    if (currentIsChinese && !existingIsChinese) {
                        // 当前是中文版，替换现有的英文版
                        const index = uniqueTools.indexOf(existingTool);
                        uniqueTools[index] = tool;
                        console.log(`替换工具: ${existingTool.name} -> ${tool.name}`);
                    } else if (!currentIsChinese && existingIsChinese) {
                        // 当前是英文版，保留现有的中文版
                        console.log(`跳过重复工具: ${tool.name} (保留中文版: ${existingTool.name})`);
                    } else {
                        // 都是中文或都是英文，保留第一个
                        console.log(`跳过重复工具: ${tool.name} (已存在: ${existingTool.name})`);
                    }
                } else {
                    // 没有重复，直接添加
                    uniqueTools.push(tool);
                }
            } else {
                // 没有localPath的工具直接添加
                uniqueTools.push(tool);
            }
        });
        
        currentTools = uniqueTools;
        
        // 默认排序为最新发布，加载时自动应用筛选与排序
        applyFilters();
        
        console.log('工具数据加载成功，原始工具数:', allTools.length, '去重后工具数:', currentTools.length);
        
    } catch (error) {
        console.error('加载工具数据失败:', error);
        
        // 显示错误状态
        if (toolsGrid) {
            toolsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </div>
                    <h3 class="empty-title">加载失败</h3>
                    <p class="empty-description">无法加载工具数据，请刷新页面重试。</p>
                </div>
            `;
        }
    }
}

// 渲染工具卡片
function renderTools(toolsToRender = null) {
    console.log('renderTools called with:', toolsToRender ? toolsToRender.length : 'default tools'); // 调试日志
    
    const targetGrid = document.getElementById('toolsGrid');
    if (!targetGrid) {
        console.error('toolsGrid 元素未找到！');
        return;
    }
    
    // 使用传入的工具列表或默认的currentTools
    const toolsToShow = toolsToRender || currentTools;
    
    // 如果没有工具，显示空状态
    if (toolsToShow.length === 0) {
        targetGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
                        <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </div>
                <h3 class="empty-title">暂无工具</h3>
                <p class="empty-description">当前没有可用的工具，请稍后再试。</p>
            </div>
        `;
        return;
    }
    
    // 清空现有内容
    targetGrid.innerHTML = '';
    
    // 渲染工具卡片
    toolsToShow.forEach((tool, index) => {
        const toolCard = createToolCard(tool);
        targetGrid.appendChild(toolCard);
    });
    
    console.log('Rendered', toolsToShow.length, 'tools'); // 调试日志
}

// 创建工具卡片
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.setAttribute('data-category', tool.category || 'utility');
    
    const icon = tool.icon || getDefaultIcon(tool.category);
    const rating = tool.rating || 4.5;
    const popularity = tool.popularity || 80;
    const usageCount = tool.usageCount || Math.floor(Math.random() * 1000) + 100;
    
    card.innerHTML = `
        <div class="tool-card-header">
            <div class="tool-icon">${icon}</div>
            <div class="tool-meta">
                <h3 class="tool-title">${tool.name}</h3>
                <p class="tool-description">${tool.description}</p>
                <div class="tool-info-row">
                    <span class="tool-category">${getCategoryName(tool.category)}</span>
                    <div class="tool-rating">
                        <span class="rating-stars">${generateStars(rating)}</span>
                        <span class="rating-value">${rating}</span>
                    </div>
                </div>
            </div>
            <button class="favorite-btn ${favorites.includes(tool.id) ? 'favorited' : ''}" onclick="toggleFavorite('${tool.id}', event)" data-tool-id="${tool.id}">
                <svg class="favorite-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.041 1.5487 8.5C1.5487 9.959 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        
        <div class="tool-content">
            <div class="tool-tags">
                ${tool.tags ? tool.tags.slice(0, 3).map(tag => `<span class="tool-tag">${tag}</span>`).join('') : ''}
            </div>
        </div>
        
        <div class="tool-card-footer">
            
            <button class="tool-action-btn" onclick="openTool('${tool.localPath || '#'}', '${tool.name}')">
                <span>使用工具</span>
                <svg class="tool-action-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    `;
    
    return card;
}

// 获取默认图标
function getDefaultIcon(category) {
    const icons = {
        'file': '📁',
        'image': '🖼️',
        'game': '🎮',
        'dev': '💻',
        'life': '🏠',
        'utility': '🔧',
        'security': '🔒',
        'data': '📊',
        'text': '📝'
    };
    return icons[category] || '🔧';
}

// 获取分类名称
function getCategoryName(category) {
    const names = {
        'file': '文件工具',
        'image': '图片处理',
        'game': '娱乐游戏',
        'dev': '开发工具',
        'life': '生活工具',
        'utility': '通用工具',
        'security': '加密安全',
        'data': '数据处理',
        'text': '文本处理'
    };
    return names[category] || '通用工具';
}

// 生成星级评分
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    
    if (hasHalfStar) {
        stars += '☆';
    }
    
    return stars;
}

// 获取价格标签
function getPriceLabel(price) {
    const labels = {
        'free': '免费',
        'freemium': '免费增值',
        'paid': '付费'
    };
    return labels[price] || '免费';
}

// 打开工具
function openTool(path, name) {
    if (path && path !== '#') {
        // 在新窗口中打开工具
        window.open(path, '_blank');
    } else {
        alert(`${name} 工具暂未可用`);
    }
}

// 更新加载更多按钮
function updateLoadMoreButton() {
    if (!loadMoreBtn) return;
    
    const totalTools = currentTools.length;
    const shownTools = currentPage * toolsPerPage;
    
    if (shownTools >= totalTools) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// 初始化事件监听器
function initializeEventListeners() {
    // 搜索功能
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // 分类筛选
    categoryLinks.forEach((link, index) => {
        link.addEventListener('click', handleCategoryFilter);
    });
    
    // 价格筛选
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handlePriceFilter);
    });
    
    // 排序
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // 加载更多
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreTools);
    }
    
    // 主题切换
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 移动端菜单
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // 侧边栏切换
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // 返回顶部
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }
    
    // 滚动监听
    window.addEventListener('scroll', checkScrollPosition);
}

// 搜索处理
function handleSearch(e) {
    searchQuery = e.target.value.toLowerCase();
    applyFilters();
}

// 分类筛选处理
function handleCategoryFilter(e) {
    e.preventDefault();
    
    // 更新活动状态
    categoryLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
    
    currentCategory = e.target.getAttribute('data-category');
    applyFilters();
}

// 价格筛选处理
function handlePriceFilter() {
    currentFilters.price = Array.from(filterCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    applyFilters();
}

// 排序处理
function handleSort(e) {
    currentSort = e.target.value;
    applyFilters();
}

// 应用筛选和排序
function applyFilters() {
    let filteredTools = [...toolsData, ...aiTools];
    
    // 分类筛选
    if (currentCategory !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === currentCategory);
    }
    
    // 搜索筛选
    if (searchQuery) {
        filteredTools = filteredTools.filter(tool =>
            tool.name.toLowerCase().includes(searchQuery) ||
            tool.description.toLowerCase().includes(searchQuery) ||
            (tool.tags && tool.tags.some(tag => 
                tag.toLowerCase().includes(searchQuery)
            ))
        );
    }
    
    // 价格筛选
    if (currentFilters.price.length > 0) {
        filteredTools = filteredTools.filter(tool =>
            currentFilters.price.includes(tool.price || 'free')
        );
    }
    
    // 排序
    filteredTools.sort((a, b) => {
        switch (currentSort) {
            case 'newest':
                return new Date(b.dateAdded || '2024-01-01') - new Date(a.dateAdded || '2024-01-01');
            case 'rating':
                return (b.rating || 4.5) - (a.rating || 4.5);
            case 'name':
                return a.name.localeCompare(b.name);
            case 'popular':
            default:
                return (b.popularity || 80) - (a.popularity || 80);
        }
    });
    
    currentTools = filteredTools;
    currentPage = 1;
    renderTools();
    updateLoadMoreButton();
}

// 加载更多工具
function loadMoreTools() {
    currentPage++;
    renderTools();
    updateLoadMoreButton();
}

// 主题切换
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// 初始化主题
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
    }
}

// 移动端菜单切换
function toggleMobileMenu() {
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// 侧边栏切换
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main');
    const tooltip = document.querySelector('.toggle-tooltip');
    
    sidebar.classList.toggle('collapsed');
    
    // 保存状态到本地存储
    const isCollapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    
    // 更新工具提示文本
    if (tooltip) {
        tooltip.textContent = isCollapsed ? '展开侧边栏' : '收起侧边栏';
    }
    
    // 更新主内容区域
    main.classList.toggle('sidebar-collapsed', isCollapsed);
}

// 初始化侧边栏状态
function initializeSidebarState() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main');
    const tooltip = document.querySelector('.toggle-tooltip');
    
    // 从localStorage恢复侧边栏状态
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState === 'true') {
        sidebar.classList.add('collapsed');
        if (tooltip) {
            tooltip.textContent = '展开侧边栏';
        }
        if (main) {
            main.classList.add('sidebar-collapsed');
        }
    } else {
        if (tooltip) {
            tooltip.textContent = '收起侧边栏';
        }
    }
}

// 返回顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 检查滚动位置
function checkScrollPosition() {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}

// 移除可能的自检UI元素
function removeSelfCheckUI() {
    try {
        // 查找并隐藏包含自检相关文本的元素（不删除，只隐藏）
        const textSelectors = [
            '开启链接自检',
            '链接自检',
            '自检模式',
            'link check',
            'self check'
        ];
        
        textSelectors.forEach(text => {
            // 只查找可能的UI元素，避免查找所有元素
            const possibleElements = document.querySelectorAll('div, span, button, input, label, p');
            possibleElements.forEach(el => {
                if (el.textContent && el.textContent.trim() === text) {
                    el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important;';
                }
            });
        });
        
        // 隐藏可能的调试面板（不删除，只隐藏）
        const debugSelectors = [
            '[data-testid*="link-check"]',
            '[class*="link-check"]',
            '[id*="link-check"]',
            '[class*="self-check"]',
            '[id*="self-check"]',
            '.debug-panel',
            '.developer-tools',
            '.link-checker',
            '.self-check-panel'
        ];
        
        debugSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important;';
                });
            } catch (e) {
                // 忽略选择器错误
            }
        });
    } catch (error) {
        // 静默处理错误，避免影响页面功能
        console.debug('removeSelfCheckUI error:', error);
    }
}

// 定期检查并移除自检UI（降低频率）
let selfCheckInterval = setInterval(removeSelfCheckUI, 5000);

// 页面加载完成后立即执行
document.addEventListener('DOMContentLoaded', function() {
    removeSelfCheckUI();
    // 5秒后停止定期检查，避免持续影响性能
    setTimeout(() => {
        if (selfCheckInterval) {
            clearInterval(selfCheckInterval);
            selfCheckInterval = null;
        }
    }, 30000);
});

// 收藏功能相关函数
function toggleFavorite(toolId, event) {
    console.log('toggleFavorite called with toolId:', toolId); // 调试日志
    event.stopPropagation(); // 阻止事件冒泡
    
    const index = favorites.indexOf(toolId);
    if (index > -1) {
        // 移除收藏
        favorites.splice(index, 1);
        console.log('Removed from favorites:', toolId);
    } else {
        // 添加收藏
        favorites.push(toolId);
        console.log('Added to favorites:', toolId);
    }
    
    // 保存到本地存储
    localStorage.setItem('toolFavorites', JSON.stringify(favorites));
    console.log('Current favorites:', favorites);
    
    // 更新按钮状态
    updateFavoriteButton(toolId);
    
    // 如果当前在收藏页面，需要刷新显示
    if (window.location.hash === '#favorites') {
        showFavorites();
    }
}

function updateFavoriteButton(toolId) {
    const button = document.querySelector(`[data-tool-id="${toolId}"]`);
    console.log('Updating button for toolId:', toolId, 'Button found:', !!button);
    if (button) {
        const isFavorited = favorites.includes(toolId);
        if (isFavorited) {
            button.classList.add('favorited');
        } else {
            button.classList.remove('favorited');
        }
        console.log('Button updated, favorited:', isFavorited);
    }
}

function getFavoriteTools() {
    console.log('getFavoriteTools called, favorites:', favorites); // 调试日志
    const allTools = [...toolsData, ...aiTools];
    console.log('All tools count:', allTools.length); // 调试日志
    const favoriteTools = allTools.filter(tool => favorites.includes(tool.id));
    console.log('Filtered favorite tools:', favoriteTools); // 调试日志
    return favoriteTools;
}

function showFavorites() {
    console.log('showFavorites called'); // 调试日志
    const favoriteTools = getFavoriteTools();
    console.log('Favorite tools found:', favoriteTools.length); // 调试日志
    const toolsGrid = document.getElementById('toolsGrid'); // 修正ID
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    console.log('toolsGrid element:', toolsGrid); // 调试日志
    
    // 清空搜索和筛选
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    
    if (favoriteTools.length === 0) {
        toolsGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💝</div>
                <h3>还没有收藏的工具</h3>
                <p>点击工具卡片右上角的心形图标来收藏你喜欢的工具吧！</p>
            </div>
        `;
    } else {
        renderTools(favoriteTools);
    }
    
    // 更新页面标题
    updatePageTitle('我的收藏');
    
    // 更新导航状态
    updateNavigation('favorites');
}

function updatePageTitle(title) {
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.textContent = title;
    }
}

function showAllTools() {
    // 显示所有工具
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    // 清空搜索和筛选
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'all';
    
    // 重新渲染所有工具
    const allTools = [...toolsData, ...aiTools];
    renderTools(allTools);
    
    // 更新页面标题
    updatePageTitle('杨扬的工具站');
    
    // 更新导航状态
    updateNavigation('home');
}

function updateNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    if (activeSection === 'home') {
        navLinks[0].classList.add('active');
    } else if (activeSection === 'favorites') {
        navLinks[2].classList.add('active');
    }
}

// 监听DOM变化（使用节流）
if (typeof MutationObserver !== 'undefined') {
    let mutationTimeout;
    const observer = new MutationObserver(function(mutations) {
        // 节流处理，避免频繁执行
        if (mutationTimeout) return;
        
        mutationTimeout = setTimeout(() => {
            let hasRelevantChanges = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // 只在有新增节点时才检查
                    for (let node of mutation.addedNodes) {
                        if (node.nodeType === 1) { // 元素节点
                            hasRelevantChanges = true;
                            break;
                        }
                    }
                }
            });
            
            if (hasRelevantChanges) {
                removeSelfCheckUI();
            }
            mutationTimeout = null;
        }, 1000);
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}