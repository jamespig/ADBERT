/**
 * Redux Toolkit Store 配置文件
 *
 * 這個文件負責：
 * 1. 創建和配置 Redux store
 * 2. 定義應用程式的狀態結構和更新邏輯
 * 3. 導出 action creators 供組件使用
 *
 * Redux Toolkit 相比傳統 Redux 的優勢：
 * - 減少樣板代碼量 70-80%
 * - 內建 Immer 支援，允許"可變"風格的狀態更新
 * - 自動生成 action creators 和 action types
 * - 自動配置 Redux DevTools 和常用中間件
 *
 * 參考文檔：
 * https://redux-toolkit.js.org/tutorials/quick-start
 * https://redux-toolkit.js.org/api/createSlice
 */

/**
 * 從 Redux Toolkit 導入核心 API
 *
 * configureStore: 用於創建 Redux store，自動配置最佳實踐
 * - 自動設置 Redux DevTools Extension
 * - 自動包含 redux-thunk 中間件
 * - 自動包含序列化和不變性檢查中間件
 *
 * createSlice: 用於創建 reducer 和 action creators 的一體化 API
 * - 結合 createAction 和 createReducer 的功能
 * - 使用 Immer 內部處理不可變更新
 * - 自動生成 action types 和 action creators
 */
import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * 創建一個簡單的 app slice 作為預設 reducer
 * 這個 slice 用於管理應用程式的基本狀態
 */
const appSlice = createSlice({
  // slice 的名稱，會作為 action type 的前綴
  name: "app",
  // 初始狀態 - 定義這個 slice 的預設值
  initialState: {
    initialized: true,
  },
  // reducers 物件 - 定義如何更新狀態的函數
  // 目前為空，表示這個 slice 只有讀取功能
  reducers: {},
});

/**
 * 創建 ButtonGroup slice 來管理按鈕組的狀態
 * 這是根據 Redux Toolkit 官方文檔的最佳實踐：
 * https://redux-toolkit.js.org/tutorials/quick-start
 */
const buttonGroupSlice = createSlice({
  // slice 名稱 - 生成的 action types 會是 "buttonGroup/incrementClick" 等
  name: "buttonGroup",

  // 初始狀態 - 定義按鈕組的預設狀態
  initialState: {
    clickCount: 0, // 點擊計數器
    isDisabled: false, // 按鈕是否被禁用
  },

  /**
   * reducers 物件 - 定義狀態更新邏輯
   *
   * 重要！Redux Toolkit 使用 Immer 函式庫，讓我們可以寫"看似可變"的代碼：
   * - state.clickCount += 1 看起來像直接修改狀態
   * - 但實際上 Immer 會將其轉換為不可變更新
   * - 這簡化了代碼，避免了手動 {...state, ...} 展開語法
   */
  reducers: {
    /**
     * 增加點擊次數的 reducer
     * @param {Object} state - 當前狀態（由 Immer 包裝的草稿）
     */
    incrementClick: (state) => {
      // 看似可變操作，實際上是不可變更新
      // 等同於傳統 Redux 的：return { ...state, clickCount: state.clickCount + 1 }
      state.clickCount += 1;
    },

    /**
     * 清除點擊次數的 reducer
     * @param {Object} state - 當前狀態
     */
    clearCount: (state) => {
      // 重置計數器為 0
      state.clickCount = 0;
    },

    /**
     * 切換禁用狀態的 reducer
     * @param {Object} state - 當前狀態
     */
    toggleDisabled: (state) => {
      // 切換布林值狀態
      state.isDisabled = !state.isDisabled;
    },
  },
});

/**
 * 導出自動生成的 action creators
 *
 * createSlice 會自動為每個 reducer 函數生成對應的 action creator：
 * - incrementClick() => { type: "buttonGroup/incrementClick" }
 * - clearCount() => { type: "buttonGroup/clearCount" }
 * - toggleDisabled() => { type: "buttonGroup/toggleDisabled" }
 *
 * 這些可以直接在組件中使用 dispatch(incrementClick()) 來調用
 */
export const { incrementClick, clearCount, toggleDisabled } =
  buttonGroupSlice.actions;

/**
 * 創建並配置 Redux Store
 *
 * configureStore 自動提供以下功能（無需手動配置）：
 * 1. Redux DevTools Extension 支援 - 用於時間旅行調試
 * 2. redux-thunk 中間件 - 支援異步 actions
 * 3. 序列化檢查中間件 - 確保狀態可序列化
 * 4. 不變性檢查中間件 - 防止意外的狀態修改
 *
 * 參考：https://redux-toolkit.js.org/api/configureStore
 */
export default configureStore({
  // reducer 配置 - 組合多個 slice reducers
  reducer: {
    // app 狀態會存在 state.app
    app: appSlice.reducer,
    // buttonGroup 狀態會存在 state.buttonGroup
    buttonGroup: buttonGroupSlice.reducer,
  },

  // 其他配置會使用 Redux Toolkit 的預設值：
  // - middleware: 自動包含 thunk、serializability、immutability 檢查
  // - devTools: 自動啟用 Redux DevTools
  // - preloadedState: 無
  // - enhancers: 自動配置
});
