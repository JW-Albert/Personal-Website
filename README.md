# 我的個人網站

這是一個現代化的個人網站，使用純HTML、CSS和JavaScript建立，可以在GitHub Pages上免費部署。

## 功能特色

- 🎨 現代化設計和動畫效果
- 📱 完全響應式設計
- ⚡ 快速載入和流暢動畫
- 🎯 單頁面應用程式（SPA）
- 🌟 互動式元素和視覺效果
- 📧 聯絡表單功能
- 🎭 打字機效果
- ✨ 粒子背景動畫

## 網站結構

- **首頁區域**: 個人介紹和主要CTA按鈕
- **關於我**: 個人簡介和統計數據
- **技能專長**: 技能展示和進度條
- **專案作品**: 作品集展示
- **聯絡我**: 聯絡資訊和表單

## 部署到GitHub Pages

### 方法一：使用GitHub Actions（推薦）

1. 將所有文件推送到GitHub倉庫
2. 在倉庫設定中啟用GitHub Pages
3. 選擇"GitHub Actions"作為來源
4. 網站將自動部署到 `https://yourusername.github.io/repository-name`

### 方法二：手動部署

1. 將所有文件推送到GitHub倉庫
2. 在倉庫設定中啟用GitHub Pages
3. 選擇"Deploy from a branch"
4. 選擇main分支和根目錄
5. 網站將部署到 `https://yourusername.github.io/repository-name`

## 自訂化

### 修改個人資訊

1. **姓名**: 在 `index.html` 中修改 `.hero-title .highlight` 的內容
2. **職業**: 修改 `.hero-subtitle` 的內容
3. **聯絡資訊**: 在聯絡我區域修改電子郵件、電話和地址
4. **社交媒體**: 更新社交媒體連結

### 修改技能

在 `index.html` 的技能區域中：
- 修改技能圖標（使用Font Awesome圖標）
- 調整技能進度條的 `data-width` 屬性
- 添加或移除技能卡片

### 修改專案

在 `index.html` 的專案區域中：
- 更新專案名稱和描述
- 修改技術標籤
- 更新專案連結

### 修改顏色主題

在 `styles.css` 中修改CSS變數：
- 主要顏色：`#6366f1`
- 次要顏色：`#8b5cf6`
- 漸層背景：`linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

## 文件結構

```
Personal-Website/
├── index.html          # 主要HTML文件
├── styles.css          # CSS樣式文件
├── script.js           # JavaScript功能文件
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions部署配置
└── README.md           # 說明文件
```

## 技術特色

- **純前端**: 無需後端伺服器
- **現代CSS**: 使用Flexbox、Grid和CSS動畫
- **響應式設計**: 支援各種裝置尺寸
- **無障礙設計**: 支援鍵盤導航和螢幕閱讀器
- **SEO友好**: 語義化HTML結構
- **性能優化**: 輕量級和快速載入

## 瀏覽器支援

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 授權

此專案採用MIT授權條款。

## 聯絡

如有任何問題或建議，歡迎透過以下方式聯絡：

- 電子郵件: your.email@example.com
- GitHub: [yourusername](https://github.com/yourusername)

---

⭐ 如果這個專案對您有幫助，請給它一個星標！