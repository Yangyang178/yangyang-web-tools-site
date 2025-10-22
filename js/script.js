// AI工具数据
let aiTools = [];

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
  }
];

// 当前显示的工具
let currentTools = [];
let currentPage = 1;
const toolsPerPage = 12;

// 搜索和筛选状态
let currentCategory = 'all';
let currentFilters = {
    price: [],
    rating: null
};
let currentSort = 'popular';
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
        currentTools = [...toolsData, ...aiTools];
        
        renderTools();
        updateLoadMoreButton();
        
        console.log('工具数据加载成功，共', currentTools.length, '个工具');
        
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
function renderTools() {
    if (!toolsGrid) {
        console.error('toolsGrid 元素未找到！');
        return;
    }
    
    // 如果没有工具，显示空状态
    if (currentTools.length === 0) {
        toolsGrid.innerHTML = `
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
    
    // 获取要显示的工具
    const startIndex = 0;
    const endIndex = currentPage * toolsPerPage;
    const toolsToShow = currentTools.slice(startIndex, endIndex);
    
    // 清空现有内容
    toolsGrid.innerHTML = '';
    
    // 渲染工具卡片
    toolsToShow.forEach((tool, index) => {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);
    });
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
        </div>
        
        <div class="tool-content">
            <div class="tool-tags">
                ${tool.tags ? tool.tags.slice(0, 3).map(tag => `<span class="tool-tag">${tag}</span>`).join('') : ''}
            </div>
        </div>
        
        <div class="tool-card-footer">
            <div class="tool-stats">
                <div class="tool-stat">
                    <svg class="tool-stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${usageCount}</span>
                </div>
                <div class="tool-stat">
                    <svg class="tool-stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.041 1.5487 8.5C1.5487 9.959 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${popularity}%</span>
                </div>
            </div>
            
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