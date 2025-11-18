// AI工具数据
let aiTools = [];

// 收藏功能相关变量
let favorites = JSON.parse(localStorage.getItem('toolFavorites') || '[]');
let featuredSelected = JSON.parse(localStorage.getItem('featuredTools') || '[]');
let featuredDisabled = JSON.parse(localStorage.getItem('featuredToolsDisabled') || '[]');
let uploadedToolsData = [];
let upSelectedFile = null;
let upSaving = false;
let scrollScheduled = false;
function debounce(fn, delay) { let t = 0; return function(...args){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), delay); }; }
let pendingDeleteId = null;

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

toolsData = toolsData.concat([
  {"id":"iw-001","name":"Base64编码解码器","description":"进行Base64编码与解码","category":"utility","tags":["Base64","编码","解码"],"localPath":"tools/dev/Base64编码解码器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-002","name":"CSS优化工具","description":"优化与压缩CSS样式","category":"dev","tags":["CSS","优化","压缩"],"localPath":"tools/design/CSS优化工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-003","name":"Git命令生成器","description":"快速组合常用Git命令","category":"utility","tags":["Git","命令","开发"],"localPath":"tools/dev/Git命令生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-004","name":"个税计算器","description":"个人所得税估算工具","category":"utility","tags":["税","计算器","财务"],"localPath":"tools/utilities/个税计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-005","name":"临时记事本","description":"临时记录文本内容","category":"text","tags":["记事本","文本","记录"],"localPath":"tools/text/临时记事本.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-006","name":"元素周期表查询工具","description":"查询化学元素信息","category":"data","tags":["化学","元素","查询"],"localPath":"tools/utilities/元素周期表查询工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-007","name":"匿名投票工具","description":"创建并参与匿名投票","category":"data","tags":["投票","匿名","问卷"],"localPath":"tools/utilities/匿名投票工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-008","name":"图片批量调整工具","description":"批量缩放与处理图片","category":"image","tags":["图片","批量","调整"],"localPath":"tools/design/图片批量调整工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-009","name":"宠物年龄换算器","description":"宠物年龄与人类年龄换算","category":"utility","tags":["宠物","年龄","健康"],"localPath":"tools/utilities/宠物年龄换算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-010","name":"密码强度检测器","description":"评估密码强度与安全性","category":"security","tags":["密码","安全","强度"],"localPath":"tools/dev/密码强度检测器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-011","name":"屏幕取色器工具","description":"屏幕取色与调色","category":"image","tags":["取色","颜色","设计"],"localPath":"tools/design/屏幕取色器工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-012","name":"房贷计算器","description":"房贷月供与利息计算","category":"utility","tags":["房贷","计算器","利息"],"localPath":"tools/utilities/房贷计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-013","name":"手机号码归属地查询工具","description":"查询手机号码归属地","category":"utility","tags":["手机","归属地","查询"],"localPath":"tools/utilities/手机号码归属地查询工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-014","name":"摩斯密码转换器","description":"摩斯密码编码与解码","category":"security","tags":["摩斯","编码","解码"],"localPath":"tools/utilities/摩斯密码转换器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-015","name":"文件重命名工具","description":"批量重命名文件","category":"utility","tags":["文件","重命名","批量"],"localPath":"tools/utilities/文件重命名工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-016","name":"智能拼图工具","description":"拼图娱乐与挑战","category":"game","tags":["游戏","拼图","娱乐"],"localPath":"tools/games/智能拼图工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-017","name":"白噪音播放器","description":"专注与放松的白噪音","category":"utility","tags":["白噪音","专注","放松"],"localPath":"tools/utilities/白噪音播放器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-018","name":"艺术字生成器","description":"生成艺术风格文字","category":"image","tags":["艺术字","文字","生成"],"localPath":"tools/design/艺术字生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-019","name":"迷宫生成器","description":"生成迷宫地图与挑战","category":"game","tags":["迷宫","生成器","游戏"],"localPath":"tools/games/迷宫生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-020","name":"音乐节拍器","description":"音乐练习用节拍器","category":"utility","tags":["音乐","节拍器","练习"],"localPath":"tools/utilities/音乐节拍器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"}
]);

toolsData = toolsData.concat([
  {"id":"iw-new-001","name":"AI文案优化工具","description":"智能优化文案内容与风格","category":"text","tags":["AI","文案","优化"],"localPath":"tools/text/AI文案优化工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-002","name":"ASCII艺术生成器","description":"将文本或图片转换为ASCII艺术","category":"text","tags":["ASCII","艺术","生成"],"localPath":"tools/text/ASCII艺术生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-003","name":"CSV多功能转换工具","description":"CSV与多格式互转与处理","category":"data","tags":["CSV","转换","数据"],"localPath":"tools/utilities/CSV多功能转换工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-004","name":"HTTP请求模拟器","description":"构造与测试HTTP请求","category":"dev","tags":["HTTP","请求","调试"],"localPath":"tools/dev/HTTP请求模拟器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-005","name":"JSON格式化与校验工具","description":"格式化、校验JSON数据","category":"dev","tags":["JSON","格式化","校验"],"localPath":"tools/dev/JSON格式化与校验工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-006","name":"PDF压缩工具","description":"压缩PDF文件体积","category":"utility","tags":["PDF","压缩","文件"],"localPath":"tools/utilities/PDF压缩工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-007","name":"SQL格式化工具","description":"美化与格式化SQL语句","category":"dev","tags":["SQL","格式化","数据库"],"localPath":"tools/dev/SQL格式化工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-008","name":"SVG优化工具及代码实现","description":"优化SVG并查看代码实现","category":"dev","tags":["SVG","优化","代码"],"localPath":"tools/dev/SVG优化工具及代码实现.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-009","name":"多功能单位换算工具","description":"长度、重量、温度等单位换算","category":"utility","tags":["单位","换算","工具"],"localPath":"tools/utilities/多功能单位换算工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-010","name":"字体识别工具","description":"识别字体并匹配样式","category":"image","tags":["字体","识别","图像"],"localPath":"tools/design/字体识别工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-011","name":"文件格式转换器","description":"常见文件格式互转","category":"utility","tags":["文件","格式","转换"],"localPath":"tools/utilities/文件格式转换器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-012","name":"文本差异对比工具","description":"对比两段文本差异","category":"text","tags":["文本","对比","差异"],"localPath":"tools/text/文本差异对比工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-013","name":"星座运势查询工具","description":"查询每日星座运势","category":"utility","tags":["星座","运势","查询"],"localPath":"tools/utilities/星座运势查询工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-014","name":"条形码生成器","description":"生成多类型条形码","category":"data","tags":["条形码","生成","编码"],"localPath":"tools/generators/条形码生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-015","name":"汇率换算工具","description":"多币种实时汇率换算","category":"utility","tags":["汇率","换算","金融"],"localPath":"tools/utilities/汇率换算工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-016","name":"电子签名生成工具","description":"生成个性化电子签名","category":"image","tags":["签名","生成","设计"],"localPath":"tools/design/电子签名生成工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-017","name":"虚构角色姓名生成器","description":"生成创意角色姓名","category":"text","tags":["姓名","生成","角色"],"localPath":"tools/generators/虚构角色姓名生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-018","name":"诗歌歌词生成工具","description":"生成诗歌与歌词文本","category":"text","tags":["诗歌","歌词","生成"],"localPath":"tools/text/诗歌歌词生成工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-019","name":"颜色选择器 & 调色板生成工具","description":"取色与调色板生成","category":"image","tags":["颜色","调色","设计"],"localPath":"tools/design/颜色选择器 & 调色板生成工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new-020","name":"食材食谱生成器","description":"基于食材生成食谱建议","category":"utility","tags":["食材","食谱","生成"],"localPath":"tools/generators/食材食谱生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"}
]);

// 批量新增50个工具（第二批），确保主页展示与分类可用
toolsData = toolsData.concat([
  {"id":"iw-new2-001","name":"AI装修风格测试工具","description":"上传房间照片体验不同装修风格","category":"image","tags":["AI","装修","风格"],"localPath":"tools/design/AI装修风格测试工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-002","name":"CSS渐变色生成器","description":"生成CSS渐变背景代码","category":"dev","tags":["CSS","渐变","代码"],"localPath":"tools/design/CSS渐变色生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-003","name":"DIY表情包制作器","description":"在线制作个性化表情包","category":"image","tags":["表情包","图片","制作"],"localPath":"tools/design/DIY表情包制作器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-004","name":"MBTI性格测试工具","description":"快速测试并分析性格类型","category":"utility","tags":["MBTI","测试","性格"],"localPath":"tools/utilities/MBTI性格测试工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-005","name":"SPF防晒时间计算器","description":"根据SPF估算防晒保护时间","category":"utility","tags":["防晒","SPF","时间"],"localPath":"tools/utilities/SPF防晒时间计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-006","name":"Word转HTML工具","description":"将Word文档内容转换为HTML","category":"dev","tags":["Word","HTML","转换"],"localPath":"tools/dev/Word转HTML工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-007","name":"XML转换工具","description":"XML与其他格式相互转换","category":"dev","tags":["XML","转换","格式"],"localPath":"tools/dev/XML转换工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-008","name":"万年历倒计时工具","description":"设置重要日期并查看倒计时","category":"utility","tags":["万年历","倒计时","时间"],"localPath":"tools/utilities/万年历倒计时工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-009","name":"九宫格图片生成器","description":"生成社交平台九宫格图片","category":"image","tags":["九宫格","图片","生成"],"localPath":"tools/design/九宫格图片生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-010","name":"代码注释移除工具","description":"批量移除代码文件中的注释","category":"dev","tags":["代码","注释","移除"],"localPath":"tools/dev/代码注释移除工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-011","name":"冷笑话生成器","description":"在线生成随机冷笑话","category":"text","tags":["笑话","幽默","文本"],"localPath":"tools/text/冷笑话生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-012","name":"压力自测表","description":"评估当前压力水平","category":"utility","tags":["压力","健康","评估"],"localPath":"tools/utilities/压力自测表.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-013","name":"反应速度测试工具","description":"测试点击反应速度","category":"utility","tags":["测试","反应","速度"],"localPath":"tools/utilities/反应速度测试工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-014","name":"名字评分器","description":"为名字打分并给出建议","category":"utility","tags":["名字","评分","建议"],"localPath":"tools/utilities/名字评分器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-015","name":"图片添加水印工具","description":"为图片批量添加水印","category":"image","tags":["图片","水印","批量"],"localPath":"tools/design/图片添加水印工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-016","name":"图片转Icon工具","description":"将图片转换为Icon格式","category":"image","tags":["图片","Icon","转换"],"localPath":"tools/design/图片转Icon工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-017","name":"图片转线稿工具","description":"将图片转换为线稿效果","category":"image","tags":["图片","线稿","效果"],"localPath":"tools/design/图片转线稿工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-018","name":"基础代谢BMR计算器","description":"估算每日基础代谢率","category":"utility","tags":["BMR","健康","计算"],"localPath":"tools/utilities/基础代谢BMR计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-019","name":"宠物健康自检助手","description":"宠物常见症状自检参考","category":"utility","tags":["宠物","健康","自检"],"localPath":"tools/utilities/宠物健康自检助手.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-020","name":"家庭能耗分析工具","description":"家庭用电用水能耗分析","category":"utility","tags":["能耗","分析","家庭"],"localPath":"tools/utilities/家庭能耗分析工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-021","name":"密码管理器","description":"本地密码记录与管理","category":"security","tags":["密码","管理","安全"],"localPath":"tools/security/密码管理器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-022","name":"扫雷游戏","description":"经典扫雷娱乐游戏","category":"game","tags":["游戏","扫雷","娱乐"],"localPath":"tools/games/扫雷游戏.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-023","name":"批量文件名称提取工具","description":"提取并导出文件名列表","category":"utility","tags":["文件","名称","提取"],"localPath":"tools/utilities/批量文件名称提取工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-024","name":"摇号小工具","description":"模拟随机抽签摇号","category":"utility","tags":["随机","抽签","摇号"],"localPath":"tools/utilities/摇号小工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-025","name":"数字华容道","description":"滑块拼图挑战","category":"game","tags":["游戏","华容道","拼图"],"localPath":"tools/games/数字华容道.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-026","name":"文件压缩和解压工具","description":"在线压缩与解压文件","category":"utility","tags":["压缩","解压","文件"],"localPath":"tools/utilities/文件压缩和解压工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-027","name":"文字云生成器","description":"生成词云可视化","category":"data","tags":["词云","可视化","数据"],"localPath":"tools/data/文字云生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-028","name":"时间管理四象限工具","description":"管理任务优先级","category":"utility","tags":["时间管理","优先级","效率"],"localPath":"tools/utilities/时间管理四象限工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-029","name":"星空许愿瓶","description":"记录愿望与心情","category":"utility","tags":["愿望","心情","记录"],"localPath":"tools/utilities/星空许愿瓶.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-030","name":"智能药品相互作用检查器","description":"药品交互风险参考","category":"utility","tags":["药品","交互","风险"],"localPath":"tools/utilities/智能药品相互作用检查器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-031","name":"智能记账工具","description":"简单易用的记账工具","category":"utility","tags":["记账","消费","统计"],"localPath":"tools/utilities/智能记账工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-032","name":"正则表达式交互式学习工具","description":"交互式学习正则表达式","category":"dev","tags":["正则","学习","交互"],"localPath":"tools/dev/正则表达式交互式学习工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-033","name":"每日蛋白质摄入计算器","description":"估算每日蛋白摄入量","category":"utility","tags":["蛋白质","健康","计算"],"localPath":"tools/utilities/每日蛋白质摄入计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-034","name":"毛玻璃图片生成器","description":"生成毛玻璃风格图片","category":"image","tags":["图片","毛玻璃","效果"],"localPath":"tools/design/毛玻璃图片生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-035","name":"法律文书生成器","description":"生成标准法律文书模板","category":"text","tags":["法律","文书","模板"],"localPath":"tools/text/法律文书生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-036","name":"温度换算器","description":"摄氏华氏温度换算","category":"utility","tags":["温度","换算","工具"],"localPath":"tools/utilities/温度换算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-037","name":"滚动弹幕生成器","description":"生成网页滚动弹幕效果","category":"text","tags":["弹幕","文本","效果"],"localPath":"tools/text/滚动弹幕生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-038","name":"点击速度测试器","description":"测试鼠标点击速度","category":"utility","tags":["点击","速度","测试"],"localPath":"tools/utilities/点击速度测试器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-039","name":"皮肤水分流失计算器","description":"评估皮肤水分流失量","category":"utility","tags":["皮肤","水分","计算"],"localPath":"tools/utilities/皮肤水分流失计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-040","name":"目标拆解工具","description":"将目标拆解为任务","category":"utility","tags":["目标","拆解","任务"],"localPath":"tools/utilities/目标拆解工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-041","name":"短链接生成器","description":"生成短链接便于分享","category":"utility","tags":["短链接","生成","分享"],"localPath":"tools/utilities/短链接生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-042","name":"经典力学计算工具","description":"经典力学常用计算","category":"utility","tags":["力学","计算","物理"],"localPath":"tools/utilities/经典力学计算工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-043","name":"藏头诗生成器","description":"生成藏头诗作品","category":"text","tags":["诗歌","藏头","生成"],"localPath":"tools/text/藏头诗生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-044","name":"车牌归属地查询工具","description":"查询车牌归属地信息","category":"utility","tags":["车牌","归属地","查询"],"localPath":"tools/utilities/车牌归属地查询工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-045","name":"连连看小游戏","description":"连连看匹配消除游戏","category":"game","tags":["游戏","连连看","消除"],"localPath":"tools/games/连连看小游戏.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-046","name":"金句收集查找工具","description":"收集并检索金句文本","category":"text","tags":["金句","收集","检索"],"localPath":"tools/text/金句收集查找工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-047","name":"随机数据生成器","description":"生成随机测试数据","category":"data","tags":["随机","数据","生成"],"localPath":"tools/data/随机数据生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-048","name":"颜色混合模拟器","description":"模拟多种颜色混合效果","category":"image","tags":["颜色","混合","模拟"],"localPath":"tools/design/颜色混合模拟器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-049","name":"高级数独游戏","description":"挑战高难度数独","category":"game","tags":["游戏","数独","挑战"],"localPath":"tools/games/高级数独游戏.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new2-050","name":"鼠标性能检测器","description":"测试鼠标性能与稳定性","category":"utility","tags":["鼠标","性能","测试"],"localPath":"tools/utilities/鼠标性能检测器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"}
]);

// 批量新增47个工具（第三批）
toolsData = toolsData.concat([
  {"id":"iw-new3-001","name":"3D模型预览器","description":"在线预览与交互3D模型","category":"image","tags":["3D","模型","预览"],"localPath":"tools/design/3D模型预览器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-002","name":"Excel公式调试器","description":"快速调试与验证Excel公式","category":"dev","tags":["Excel","公式","调试"],"localPath":"tools/dev/Excel公式调试器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-003","name":"Landing Page热图模拟","description":"模拟着陆页热区点击分布","category":"data","tags":["热图","着陆页","可视化"],"localPath":"tools/data/Landing Page热图模拟.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-004","name":"UUID生成器","description":"生成唯一标识UUID","category":"dev","tags":["UUID","标识","生成"],"localPath":"tools/generators/UUID生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-005","name":"专注写作工具","description":"沉浸式写作与专注模式","category":"text","tags":["写作","专注","文本"],"localPath":"tools/text/专注写作工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-006","name":"个人成就记录库","description":"记录个人成就与里程碑","category":"utility","tags":["成就","记录","里程碑"],"localPath":"tools/utilities/个人成就记录库.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-007","name":"个性化语录生成器","description":"生成个性化励志语录","category":"text","tags":["语录","生成","文本"],"localPath":"tools/text/个性化语录生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-008","name":"二维码解码器","description":"解析二维码内容","category":"data","tags":["二维码","解码","解析"],"localPath":"tools/data/二维码解码器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-009","name":"交互式万花筒","description":"交互式万花筒视觉效果","category":"game","tags":["万花筒","交互","视觉"],"localPath":"tools/games/交互式万花筒.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-010","name":"优惠券码批量生成工具","description":"批量生成优惠券码","category":"data","tags":["优惠券","批量","生成"],"localPath":"tools/generators/优惠券码批量生成工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-011","name":"会议背景音乐生成器","description":"生成会议背景音乐","category":"utility","tags":["会议","音乐","生成"],"localPath":"tools/utilities/会议背景音乐生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-012","name":"会议记录生成器","description":"快速生成会议纪要","category":"text","tags":["会议","纪要","文本"],"localPath":"tools/text/会议记录生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-013","name":"促销折扣计算器","description":"计算促销折扣与价格","category":"utility","tags":["促销","折扣","计算"],"localPath":"tools/utilities/促销折扣计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-014","name":"光影绘画","description":"光影效果绘画工具","category":"image","tags":["光影","绘画","效果"],"localPath":"tools/design/光影绘画.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-015","name":"公平分组工具","description":"公平随机分组","category":"utility","tags":["分组","公平","随机"],"localPath":"tools/utilities/公平分组工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-016","name":"分数小数互转工具","description":"分数与小数互相转换","category":"utility","tags":["分数","小数","转换"],"localPath":"tools/utilities/分数小数互转工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-017","name":"化学式分子量计算器","description":"计算化学式分子量","category":"utility","tags":["化学","分子量","计算"],"localPath":"tools/utilities/化学式分子量计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-018","name":"响应式页面测试器","description":"测试页面响应式适配","category":"dev","tags":["响应式","测试","网页"],"localPath":"tools/dev/响应式页面测试器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-019","name":"四色定理小游戏","description":"四色定理相关小游戏","category":"game","tags":["四色定理","数学","小游戏"],"localPath":"tools/games/四色定理小游戏.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-020","name":"图片EXIF信息查看器","description":"查看图片EXIF信息","category":"image","tags":["图片","EXIF","信息"],"localPath":"tools/design/图片EXIF信息查看器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-021","name":"多平台密码生成器","description":"生成多平台密码方案","category":"security","tags":["密码","生成","安全"],"localPath":"tools/security/多平台密码生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-022","name":"多时区会议调度器","description":"跨时区安排会议","category":"utility","tags":["时区","会议","调度"],"localPath":"tools/utilities/多时区会议调度器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-023","name":"字体配对推荐器","description":"推荐搭配字体","category":"image","tags":["字体","配对","推荐"],"localPath":"tools/design/字体配对推荐器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-024","name":"室内空间规划器","description":"规划室内空间布局","category":"image","tags":["室内","空间","规划"],"localPath":"tools/design/室内空间规划器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-025","name":"工作日健康习惯提醒","description":"工作日健康习惯提醒","category":"utility","tags":["健康","习惯","提醒"],"localPath":"tools/utilities/工作日健康习惯提醒.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-026","name":"心流专注计时器","description":"心流专注计时","category":"utility","tags":["心流","专注","计时"],"localPath":"tools/utilities/心流专注计时器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-027","name":"拓扑变形","description":"拓扑变形交互效果","category":"image","tags":["拓扑","变形","交互"],"localPath":"tools/design/拓扑变形.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-028","name":"数列预测小游戏","description":"数列预测小游戏","category":"game","tags":["数列","预测","小游戏"],"localPath":"tools/games/数列预测小游戏.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-029","name":"数字大小写转换工具","description":"数字金额大小写转换","category":"utility","tags":["数字","大小写","转换"],"localPath":"tools/utilities/数字大小写转换工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-030","name":"数学公式可视化工具","description":"可视化数学公式","category":"image","tags":["数学","公式","可视化"],"localPath":"tools/design/数学公式可视化工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-031","name":"数据可视化分析工作台","description":"数据可视化分析工作台","category":"data","tags":["数据","可视化","分析"],"localPath":"tools/data/数据可视化分析工作台.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-032","name":"数据可视化生成器","description":"生成数据可视化图表","category":"data","tags":["数据","图表","生成"],"localPath":"tools/data/数据可视化生成器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-033","name":"文件哈希计算器","description":"计算文件哈希值","category":"dev","tags":["文件","哈希","计算"],"localPath":"tools/dev/文件哈希计算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-034","name":"旅行打包清单工具","description":"生成旅行打包清单","category":"utility","tags":["旅行","打包","清单"],"localPath":"tools/utilities/旅行打包清单工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-035","name":"时间感知测试器","description":"测试时间感知能力","category":"utility","tags":["时间","测试","感知"],"localPath":"tools/utilities/时间感知测试器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-036","name":"智能数据管道设计器","description":"设计数据处理管道","category":"data","tags":["数据","管道","设计"],"localPath":"tools/data/智能数据管道设计器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-037","name":"液体流","description":"液体流动视觉效果","category":"image","tags":["液体","流动","视觉"],"localPath":"tools/design/液体流.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-038","name":"深度单位换算器","description":"深度单位换算","category":"utility","tags":["深度","单位","换算"],"localPath":"tools/utilities/深度单位换算器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-039","name":"点亮所有灯","description":"益智点灯小游戏","category":"game","tags":["点灯","益智","小游戏"],"localPath":"tools/games/点亮所有灯.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-040","name":"电商主图优化建议工具","description":"优化电商主图建议","category":"image","tags":["电商","主图","优化"],"localPath":"tools/design/电商主图优化建议工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-041","name":"粒子系统","description":"粒子系统可视化","category":"image","tags":["粒子","系统","可视化"],"localPath":"tools/design/粒子系统.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-042","name":"群论入门","description":"群论基础互动学习","category":"text","tags":["群论","数学","学习"],"localPath":"tools/text/群论入门.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-043","name":"记忆快闪盒","description":"记忆训练小游戏","category":"game","tags":["记忆","训练","小游戏"],"localPath":"tools/games/记忆快闪盒.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-044","name":"词频统计工具","description":"统计文本词频","category":"text","tags":["词频","统计","文本"],"localPath":"tools/text/词频统计工具.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-045","name":"邮件标题点击率预测器","description":"预测邮件标题点击率","category":"data","tags":["邮件","点击率","预测"],"localPath":"tools/data/邮件标题点击率预测器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-046","name":"链接“保鲜”存档器","description":"链接内容存档与保鲜","category":"utility","tags":["链接","存档","保鲜"],"localPath":"tools/utilities/链接“保鲜”存档器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"},
  {"id":"iw-new3-047","name":"颜色代码转换器","description":"转换颜色代码与格式","category":"image","tags":["颜色","代码","转换"],"localPath":"tools/design/颜色代码转换器.html","isOriginal":true,"featured":false,"dateAdded":"2025-11-17"}
]);

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
    initializeUploadUI();
});

// 加载工具数据
function loadToolsData() {
    try {
        // 数据已经直接嵌入，无需fetch
        aiTools = [];
        
        // 合并所有工具
        uploadedToolsData = buildUploadedTools();
        let allTools = [...toolsData, ...aiTools, ...uploadedToolsData];
        
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
        updateCategoryCounts();
        
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

function buildUploadedTools() {
    try {
        const metas = JSON.parse(localStorage.getItem('uploadedTools') || '[]');
        if (!Array.isArray(metas)) return [];
        return metas.map(m => ({
            id: m.id,
            name: m.name,
            description: m.description,
            category: m.category || 'utility',
            tags: Array.isArray(m.tags) ? m.tags : [],
            localPath: 'uploaded:' + m.id,
            isOriginal: false,
            featured: false,
            source: 'uploaded',
            dateAdded: m.dateAdded || new Date().toISOString().slice(0,10)
        }));
    } catch (e) { return []; }
}

// 渲染工具卡片
function renderTools(toolsToRender = null) {
    console.log('renderTools called with:', toolsToRender ? toolsToRender.length : 'default tools'); // 调试日志
    
    const targetGrid = document.getElementById('toolsGrid');
    if (!targetGrid) {
        console.error('toolsGrid 元素未找到！');
        return;
    }
    
    // 使用传入的工具列表或默认的currentTools（仅渲染当前页之前的数量）
    const base = toolsToRender || currentTools;
    const end = Math.min(base.length, currentPage * toolsPerPage);
    const toolsToShow = base.slice(0, end);
    
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
    
    targetGrid.innerHTML = '';
    const frag = document.createDocumentFragment();
    toolsToShow.forEach((tool) => { frag.appendChild(createToolCard(tool)); });
    targetGrid.appendChild(frag);
    
    console.log('Rendered', toolsToShow.length, 'tools'); // 调试日志
}

// 创建工具卡片
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    if (tool.source === 'uploaded') {
        card.classList.add('uploaded-card');
    }
    card.setAttribute('data-category', tool.category || 'utility');
    
    const icon = tool.icon || getDefaultIcon(tool.category);
    const rating = tool.rating || 4.5;
    const popularity = tool.popularity || 80;
    const usageCount = tool.usageCount || Math.floor(Math.random() * 1000) + 100;
    const isF = isFeatured(tool);
    
    card.innerHTML = `
        <div class="tool-card-header">
            <div class="tool-icon">${icon}</div>
            <div class="tool-meta">
                <h3 class="tool-title">${tool.name}${isF ? '<span class="featured-badge">精选</span>' : ''}</h3>
                <p class="tool-description">${tool.description}</p>
                <div class="tool-info-row">
                    <span class="tool-category">${getCategoryName(tool.category)}</span>
                    <div class="tool-rating">
                        <span class="rating-stars">${generateStars(rating)}</span>
                        <span class="rating-value">${rating}</span>
                    </div>
                </div>
            </div>
            <button class="featured-btn ${isF ? 'active' : ''}" onclick="toggleFeatured('${tool.id}', event)" data-feature-id="${tool.id}">★</button>
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
        
        <div class="tool-card-footer tool-actions-row">
            ${tool.source === 'uploaded' ? `<button class="tool-action-btn small" onclick="openEditUploaded('${tool.id}')"><span>编辑</span></button>` : ''}
            ${tool.source === 'uploaded' ? `<button class="tool-action-btn small" onclick="requestDeleteUploaded('${tool.id}')"><span>删除</span></button>` : ''}
            <button class="tool-action-btn small use-btn" onclick="openTool('${tool.localPath || '#'}', '${tool.name}')">
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
        const p = path.startsWith('/') ? path.slice(1) : path;
        const url = 'tools/tool-viewer.html?path=' + encodeURIComponent(p);
        window.open(url, '_blank');
    } else {
        alert(`${name} 工具暂未可用`);
    }
}

function openContact() {
    const m = document.getElementById('contactModal');
    if (m) m.style.display = 'flex';
}

function closeContact() {
    const m = document.getElementById('contactModal');
    if (m) m.style.display = 'none';
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
        const debouncedSearch = debounce(handleSearch, 250);
        searchInput.addEventListener('input', debouncedSearch);
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
    window.addEventListener('scroll', function(){
        if (scrollScheduled) return;
        scrollScheduled = true;
        requestAnimationFrame(function(){ scrollScheduled = false; checkScrollPosition(); });
    }, { passive: true });

    const logStartInput = document.getElementById('logStart');
    const logEndInput = document.getElementById('logEnd');
    const logExportBtn = document.getElementById('logExportBtn');
    const logShowStatsBtn = document.getElementById('logShowStatsBtn');
    const logStatsModal = document.getElementById('logStatsModal');
    const logStatsClose = document.getElementById('logStatsClose');
    const logStatsContent = document.getElementById('logStatsContent');
    if (logExportBtn) {
        logExportBtn.addEventListener('click', function() {
            exportFilteredLogs();
        });
    }
    if (logShowStatsBtn) {
        logShowStatsBtn.addEventListener('click', function() {
            showLogStats();
        });
    }
    if (logStatsClose && logStatsModal) {
        logStatsClose.addEventListener('click', function() {
            logStatsModal.style.display = 'none';
        });
    }
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
    let filteredTools = [...toolsData, ...aiTools, ...uploadedToolsData];
    
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
    
    // 排序（精选优先）
    filteredTools.sort((a, b) => {
        const fav = (isFeatured(b) ? 1 : 0) - (isFeatured(a) ? 1 : 0);
        if (fav !== 0) return fav;
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
    
    // 保存当前滚动位置
    const currentScrollY = window.scrollY;
    
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
    
    // 使用requestAnimationFrame确保DOM更新后恢复滚动位置
    requestAnimationFrame(() => {
        window.scrollTo(0, currentScrollY);
    });
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

function isFeatured(tool) {
    if (!tool) return false;
    const id = tool.id;
    if (featuredDisabled.includes(id)) return false;
    if (featuredSelected.includes(id)) return true;
    return !!tool.featured;
}

function toggleFeatured(toolId, event) {
    event.stopPropagation();
    const tool = getToolById(toolId);
    const defaultFeatured = !!(tool && tool.featured);
    const currently = isFeatured(tool);

    if (currently) {
        // Turn off
        // If default was featured, record in disabled list; otherwise remove from selected
        if (defaultFeatured) {
            if (!featuredDisabled.includes(toolId)) featuredDisabled.push(toolId);
            const si = featuredSelected.indexOf(toolId);
            if (si > -1) featuredSelected.splice(si, 1);
        } else {
            const si = featuredSelected.indexOf(toolId);
            if (si > -1) featuredSelected.splice(si, 1);
            const di = featuredDisabled.indexOf(toolId);
            if (di > -1) featuredDisabled.splice(di, 1);
        }
    } else {
        // Turn on
        // Ensure not disabled and add to selected
        const di = featuredDisabled.indexOf(toolId);
        if (di > -1) featuredDisabled.splice(di, 1);
        if (!featuredSelected.includes(toolId)) featuredSelected.push(toolId);
    }

    localStorage.setItem('featuredTools', JSON.stringify(featuredSelected));
    localStorage.setItem('featuredToolsDisabled', JSON.stringify(featuredDisabled));
    updateFeaturedButton(toolId);
    applyFilters();
}

function updateFeaturedButton(toolId) {
    const btn = document.querySelector(`[data-feature-id="${toolId}"]`);
    if (!btn) return;
    const t = getToolById(toolId);
    const active = isFeatured(t);
    if (active) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
}

function getToolById(id) {
    const all = [...toolsData, ...aiTools];
    for (let i = 0; i < all.length; i++) {
        if (all[i].id === id) return all[i];
    }
    const up = uploadedToolsData.find(t => t.id === id);
    if (up) return up;
    return null;
}

function initializeUploadUI() {
    const btn = document.getElementById('uploadPageBtn');
    const modal = document.getElementById('uploadModal');
    const closeBtn = document.getElementById('uploadClose');
    const saveBtn = document.getElementById('uploadSave');
    const fileInput = document.getElementById('upFile');
    const drop = document.getElementById('upDrop');
    const fileName = document.getElementById('upFileName');
    if (btn) btn.addEventListener('click', () => { modal.style.display = 'flex'; clearUploadForm(); });
    if (closeBtn) closeBtn.addEventListener('click', () => { modal.style.display = 'none'; clearUploadForm(); });
    if (saveBtn) saveBtn.addEventListener('click', handleUploadSave);
    if (drop) {
        drop.addEventListener('click', () => { if (fileInput) fileInput.click(); });
        drop.addEventListener('dragover', (e) => { e.preventDefault(); drop.style.borderColor = '#6366f1'; });
        drop.addEventListener('dragleave', () => { drop.style.borderColor = '#cbd5e1'; });
        drop.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
                upSelectedFile = e.dataTransfer.files[0];
                try {
                    const dt = new DataTransfer();
                    dt.items.add(upSelectedFile);
                    if (fileInput) fileInput.files = dt.files;
                } catch (_) { /* ignore */ }
                if (fileInput) updateUploadFileUI(fileInput, fileName, drop);
            }
        });
    }
    if (fileInput) fileInput.addEventListener('change', () => { upSelectedFile = (fileInput.files && fileInput.files[0]) || null; updateUploadFileUI(fileInput, fileName, drop); });
    bindConfirmDelete();
}

function clearUploadForm() {
    const ids = ['upId','upMode','upName','upDesc','upCategory','upTags','upFile'];
    ids.forEach(id => { const el = document.getElementById(id); if (el) { if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = ''; } });
    const fileName = document.getElementById('upFileName');
    const drop = document.getElementById('upDrop');
    const err = document.getElementById('upError');
    if (fileName) fileName.textContent = '点击此区域选择文件或拖拽HTML文件到此';
    if (drop) drop.style.borderColor = '#cbd5e1';
    if (err) err.style.display = 'none';
    upSelectedFile = null;
    upSaving = false;
    const saveBtn = document.getElementById('uploadSave');
    if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = '保存'; }
}

function handleUploadSave() {
    if (upSaving) return;
    const idInput = document.getElementById('upId');
    const modeInput = document.getElementById('upMode');
    const nameInput = document.getElementById('upName');
    const descInput = document.getElementById('upDesc');
    const catInput = document.getElementById('upCategory');
    const tagsInput = document.getElementById('upTags');
    const fileInput = document.getElementById('upFile');
    const modal = document.getElementById('uploadModal');
    const mode = (modeInput && modeInput.value) || '';
    const err = document.getElementById('upError');
    const baseMeta = {
        id: (idInput && idInput.value) || ('up-' + Date.now()),
        name: nameInput ? nameInput.value.trim() : '',
        description: descInput ? descInput.value.trim() : '',
        category: catInput ? catInput.value : 'utility',
        tags: tagsInput ? tagsInput.value.split(',').map(t => t.trim()).filter(Boolean) : [],
        dateAdded: new Date().toISOString().slice(0,10)
    };
    // 校验：名称、介绍、分类、文件（新建必须有文件）
    const needFile = mode !== 'edit';
    const file = (fileInput && fileInput.files && fileInput.files[0]) || upSelectedFile;
    const valid = (!!baseMeta.name && !!baseMeta.description && !!baseMeta.category && (!needFile ? true : !!file));
    if (!valid) {
        if (err) err.style.display = 'block';
        return;
    }
    const saveBtn = document.getElementById('uploadSave');
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = '保存中…'; }
    upSaving = true;
    const metas = JSON.parse(localStorage.getItem('uploadedTools') || '[]');
    const readerDone = (html) => {
        localStorage.setItem('uploadedToolContent:' + baseMeta.id, html || '');
        const idx = metas.findIndex(m => m.id === baseMeta.id);
        if (idx > -1) metas[idx] = baseMeta; else metas.push(baseMeta);
        localStorage.setItem('uploadedTools', JSON.stringify(metas));
        uploadedToolsData = buildUploadedTools();
        applyFilters();
        updateCategoryCounts();
        if (modal) modal.style.display = 'none';
        clearUploadForm();
        upSaving = false;
    };
    if (file) {
        const reader = new FileReader();
        reader.onload = () => readerDone(String(reader.result || ''));
        reader.onerror = () => { readerDone(''); };
        reader.onabort = () => { readerDone(''); };
        reader.readAsText(file);
    } else {
        const existing = localStorage.getItem('uploadedToolContent:' + baseMeta.id) || '';
        readerDone(existing);
    }
}

function updateUploadFileUI(fileInput, fileNameEl, dropEl) {
    if (!fileInput) return;
    const f = fileInput.files && fileInput.files[0];
    if (f && fileNameEl) fileNameEl.textContent = f.name;
    if (dropEl) dropEl.style.borderColor = '#6366f1';
    const err = document.getElementById('upError');
    if (err) err.style.display = 'none';
}

function openEditUploaded(id) {
    const metas = JSON.parse(localStorage.getItem('uploadedTools') || '[]');
    const meta = metas.find(m => m.id === id);
    const modal = document.getElementById('uploadModal');
    if (!meta || !modal) return;
    document.getElementById('upId').value = meta.id;
    document.getElementById('upMode').value = 'edit';
    document.getElementById('upName').value = meta.name || '';
    document.getElementById('upDesc').value = meta.description || '';
    document.getElementById('upCategory').value = meta.category || 'utility';
    document.getElementById('upTags').value = (Array.isArray(meta.tags) ? meta.tags.join(',') : '');
    modal.style.display = 'flex';
}

function requestDeleteUploaded(id) {
    pendingDeleteId = id;
    const m = document.getElementById('confirmDeleteModal');
    if (m) m.style.display = 'flex';
}

function bindConfirmDelete() {
    const m = document.getElementById('confirmDeleteModal');
    const yes = document.getElementById('confirmDeleteYes');
    const no = document.getElementById('confirmDeleteNo');
    if (yes) yes.addEventListener('click', () => {
        if (!pendingDeleteId) { if (m) m.style.display = 'none'; return; }
        const metas = JSON.parse(localStorage.getItem('uploadedTools') || '[]');
        const idx = metas.findIndex(mm => mm.id === pendingDeleteId);
        if (idx > -1) metas.splice(idx,1);
        localStorage.setItem('uploadedTools', JSON.stringify(metas));
        localStorage.removeItem('uploadedToolContent:' + pendingDeleteId);
        uploadedToolsData = buildUploadedTools();
        applyFilters();
        updateCategoryCounts();
        pendingDeleteId = null;
        if (m) m.style.display = 'none';
    });
    if (no) no.addEventListener('click', () => { pendingDeleteId = null; if (m) m.style.display = 'none'; });
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

// 平滑滚动到锚点功能
function smoothScrollToAnchor() {
    // 处理所有锚点链接
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;
        
        const href = target.getAttribute('href');
        if (href === '#' || href === '#top') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            // 计算目标位置，考虑固定头部的高度
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            // 平滑滚动
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 更新URL但不触发页面跳转
            if (history.pushState) {
                history.pushState(null, null, href);
            }
        }
    });
}

// 初始化平滑滚动功能
document.addEventListener('DOMContentLoaded', function() {
    smoothScrollToAnchor();
});

function getViewerLogs() {
    try {
        const raw = localStorage.getItem('toolViewerLogs') || '[]';
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        return [];
    }
}

function parseDateInputValue(val) {
    if (!val) return null;
    const d = new Date(val);
    if (isNaN(d.getTime())) return null;
    return d;
}

function getEntryTime(entry) {
    const t = entry && (entry.time || entry.ts || entry.timestamp || entry.date);
    const d = t ? new Date(t) : null;
    if (d && !isNaN(d.getTime())) return d;
    return null;
}

function getFilteredViewerLogs() {
    const logs = getViewerLogs();
    const startEl = document.getElementById('logStart');
    const endEl = document.getElementById('logEnd');
    const start = parseDateInputValue(startEl && startEl.value);
    const end = parseDateInputValue(endEl && endEl.value);
    return logs.filter(function(l) {
        const lt = getEntryTime(l);
        if (!lt) return true;
        if (start && lt < start) return false;
        if (end && lt > end) return false;
        return true;
    });
}

function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportFilteredLogs() {
    const filtered = getFilteredViewerLogs();
    const now = new Date();
    const pad = function(n) { return String(n).padStart(2, '0'); };
    const name = 'viewer-logs-' + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + '-' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds()) + '.json';
    downloadJSON(filtered, name);
}

function formatDate(d) {
    const pad = function(n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
}

function showLogStats() {
    const logs = getFilteredViewerLogs();
    const typeCounts = {};
    const pathCounts = {};
    let minTime = null;
    let maxTime = null;
    logs.forEach(function(l) {
        const t = (l && l.type) ? l.type : 'unknown';
        typeCounts[t] = (typeCounts[t] || 0) + 1;
        const p = (l && l.path) ? String(l.path) : '';
        if (p) {
            pathCounts[p] = (pathCounts[p] || 0) + 1;
        }
        const lt = getEntryTime(l);
        if (lt) {
            if (!minTime || lt < minTime) minTime = lt;
            if (!maxTime || lt > maxTime) maxTime = lt;
        }
    });
    const sortedTypes = Object.keys(typeCounts).sort(function(a, b) { return typeCounts[b] - typeCounts[a]; });
    const sortedPaths = Object.keys(pathCounts).sort(function(a, b) { return pathCounts[b] - pathCounts[a]; }).slice(0, 10);
    const modal = document.getElementById('logStatsModal');
    const content = document.getElementById('logStatsContent');
    if (content) {
        let html = '';
        html += '<div style="margin-bottom:8px;">总条数：' + logs.length + '</div>';
        if (minTime || maxTime) {
            html += '<div style="margin-bottom:8px;">时间范围：' + (minTime ? formatDate(minTime) : '-') + ' ~ ' + (maxTime ? formatDate(maxTime) : '-') + '</div>';
        }
        html += '<div style="margin:8px 0; font-weight:600;">按类型统计</div>';
        sortedTypes.forEach(function(k) {
            html += '<div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px dashed #eee;"><span>' + k + '</span><span>' + typeCounts[k] + '</span></div>';
        });
        html += '<div style="margin:12px 0 6px; font-weight:600;">Top路径</div>';
        sortedPaths.forEach(function(k) {
            html += '<div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px dashed #eee;"><span style="max-width:72%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">' + k + '</span><span>' + pathCounts[k] + '</span></div>';
        });
        content.innerHTML = html;
    }
    if (modal) {
        modal.style.display = 'flex';
    }
}
function updateCategoryCounts() {
    try {
        const links = document.querySelectorAll('.category-link');
        if (!links || links.length === 0) return;
        const all = [...toolsData, ...aiTools, ...uploadedToolsData];
        const seen = new Set();
        const dedup = [];
        for (const t of all) {
            const key = (t.localPath || t.id || '').toLowerCase();
            if (key && !seen.has(key)) { seen.add(key); dedup.push(t); }
        }
        const counts = { all: dedup.length };
        for (const t of dedup) {
            const cat = t.category || 'utility';
            counts[cat] = (counts[cat] || 0) + 1;
        }
        links.forEach(link => {
            const cat = link.dataset.category || 'all';
            const n = counts[cat] || 0;
            let badge = link.querySelector('.category-count');
            if (!badge) { badge = document.createElement('span'); badge.className = 'category-count'; link.appendChild(badge); }
            badge.textContent = String(n);
        });
    } catch (_) {}
}