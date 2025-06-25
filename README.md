# ADBERT - 前端工程師面試題

這是一個基於 React + Vite 的前端專案，專為展示前端開發技能而設計。專案實現了一個響應式的 GDP 資料視覺化應用程式，展示了現代前端開發的最佳實務。

## 🚀 專案特色

- **資料視覺化**：使用 MUI X Charts 展示德國和英國的 GDP 比較圖表
- **響應式設計**：完美適配桌面、平板和手機裝置
- **狀態管理**：使用 Redux Toolkit 進行全域狀態管理
- **外部 API 整合**：從世界銀行 API 即時獲取 GDP 資料
- **現代化 UI**：採用 Material-UI 設計系統
- **Loading 與錯誤處理**：完整的載入狀態和錯誤處理機制

## 🛠 技術堆疊

### 核心框架

- **React 19** - 前端框架
- **Vite 6** - 建構工具
- **JavaScript (ES6+)** - 程式語言

### UI 與視覺化

- **Material-UI (MUI) v7** - UI 組件庫
- **MUI X Charts** - 圖表視覺化
- **Emotion** - CSS-in-JS 樣式解決方案

### 狀態管理

- **Redux Toolkit** - 狀態管理
- **React Redux** - React-Redux 綁定

### 開發工具

- **ESLint** - 程式碼品質檢查
- **Vite** - 開發伺服器與熱重載

## 📦 專案結構

```
ADBERT/
├── src/
│   ├── components/
│   │   ├── GDPChart.jsx      # GDP 圖表組件
│   │   └── ButtonGroup.jsx   # 按鈕群組組件
│   │
│   ├── app/
│   │   └── store.js          # Redux store 配置
│   │
│   ├── App.jsx               # 主應用程式組件
│   └── main.jsx              # 應用程式入口點
│
├── public/                   # 靜態資源
│
├── package.json              # 專案依賴和腳本
└── vite.config.js           # Vite 配置
```

## 🚀 快速開始

### 前置需求

- Node.js 16.0 或更高版本
- npm 或 yarn

### 安裝與運行

1. **安裝依賴**

   ```bash
   npm install
   ```

2. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

3. **建構生產版本**

   ```bash
   npm run build
   ```

4. **預覽生產版本**

   ```bash
   npm run preview
   ```

5. **程式碼檢查**
   ```bash
   npm run lint
   ```

## 📊 功能說明

### GDP 資料視覺化

- 即時從世界銀行 API 獲取德國和英國的 GDP 資料
- 顯示最近 8 年的 GDP 趨勢比較
- 支援堆疊條形圖展示
- 資料單位：兆美元

### 響應式設計

- **桌面版**：800x450 圖表尺寸，完整功能顯示
- **平板版**：600x400 圖表尺寸，適配中等螢幕
- **手機版**：350x300 圖表尺寸，優化觸控操作

### 使用者體驗

- 載入狀態指示器
- 錯誤處理和提示訊息
- 流暢的動畫效果
- 無障礙設計支援

## 🔧 開發指南

### 可用腳本

- `npm run dev` - 啟動開發伺服器
- `npm run build` - 建構生產版本
- `npm run preview` - 預覽建構結果
- `npm run lint` - 執行 ESLint 檢查

### API 端點

專案使用世界銀行開放 API：

```
https://api.worldbank.org/v2/country/DE;GB/indicator/NY.GDP.MKTP.CD?format=json&per_page=100
```

## 🎯 開發重點

這個專案展示了以下前端開發技能：

1. **React 開發**：函數組件、Hooks 使用、狀態管理
2. **API 整合**：外部 API 呼叫、錯誤處理、載入狀態
3. **資料視覺化**：圖表庫使用、資料處理和格式化
4. **響應式設計**：多裝置適配、彈性佈局
5. **狀態管理**：Redux 模式、全域狀態設計
6. **程式碼品質**：ESLint 配置、程式碼規範
7. **現代化建構**：Vite 工具鏈、模組化開發

## �� 授權

此專案僅供面試展示使用。
