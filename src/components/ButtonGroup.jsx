/**
 * Redux Toolkit + React-Redux 示例組件
 *
 * 這個文件展示了如何在 React 組件中正確使用 Redux Toolkit：
 * - 使用 useSelector 訂閱 Redux 狀態
 * - 使用 useDispatch 派發 actions
 * - 響應式狀態更新和 UI 重新渲染
 *
 * 參考 Redux Toolkit 官方教學：
 * https://redux-toolkit.js.org/tutorials/quick-start
 */

// Material-UI 組件導入
import { ButtonGroup, Button } from "@mui/material";

/**
 * React-Redux hooks 導入
 *
 * useSelector: 用於從 Redux store 中選擇和訂閱狀態
 * - 當選中的狀態改變時，組件會自動重新渲染
 * - 使用淺比較來決定是否重新渲染
 *
 * useDispatch: 用於獲取 dispatch 函數來派發 actions
 * - 返回對 store.dispatch 的引用
 * - 在整個組件生命週期中保持穩定
 */
import { useSelector, useDispatch } from "react-redux";

/**
 * 從 store 導入自動生成的 action creators
 *
 * 這些 action creators 是由 createSlice 自動生成的：
 * - incrementClick: () => ({ type: "buttonGroup/incrementClick" })
 * - clearCount: () => ({ type: "buttonGroup/clearCount" })
 * - toggleDisabled: () => ({ type: "buttonGroup/toggleDisabled" })
 */
import { incrementClick, clearCount, toggleDisabled } from "../app/store";

/**
 * ButtonGroup 組件 - 使用 Redux Toolkit 進行狀態管理
 *
 * 這個組件展示了如何在 React 組件中使用 Redux：
 * 1. 使用 useSelector 讀取狀態
 * 2. 使用 useDispatch 派發 actions
 * 3. 響應狀態變化重新渲染
 */
const ButtonGroupComponent = () => {
  /**
   * useSelector Hook - 從 Redux store 中選擇狀態
   *
   * 工作原理：
   * 1. 接收一個 selector 函數，該函數接收整個 Redux 狀態樹
   * 2. 返回選中的狀態片段
   * 3. 當選中的狀態發生變化時，組件會自動重新渲染
   *
   * state 結構：
   * {
   *   app: { initialized: true },
   *   buttonGroup: { clickCount: 0, isDisabled: false }
   * }
   *
   * 我們選擇 state.buttonGroup，並解構出 clickCount 和 isDisabled
   */
  const { clickCount, isDisabled } = useSelector((state) => state.buttonGroup);

  /**
   * useDispatch Hook - 獲取 dispatch 函數
   *
   * dispatch 函數用於向 Redux store 發送 actions：
   * - dispatch(action) 會觸發對應的 reducer
   * - reducer 更新狀態後，所有訂閱該狀態的組件會重新渲染
   */
  const dispatch = useDispatch();

  /**
   * 處理點擊事件的函數
   * 派發 incrementClick action 來增加點擊次數
   */
  const handleClick = () => {
    // 派發 action: { type: "buttonGroup/incrementClick" }
    // 這會觸發 buttonGroupSlice 中的 incrementClick reducer
    dispatch(incrementClick());
  };

  /**
   * 處理清除事件的函數
   * 派發 clearCount action 來重置點擊次數
   */
  const handleClear = () => {
    // 派發 action: { type: "buttonGroup/clearCount" }
    // 這會觸發 buttonGroupSlice 中的 clearCount reducer
    dispatch(clearCount());
  };

  /**
   * 處理禁用切換事件的函數
   * 派發 toggleDisabled action 來切換按鈕的禁用狀態
   */
  const handleDisableToggle = () => {
    // 派發 action: { type: "buttonGroup/toggleDisabled" }
    // 這會觸發 buttonGroupSlice 中的 toggleDisabled reducer
    dispatch(toggleDisabled());
  };

  /**
   * 渲染 UI
   *
   * 狀態流程：
   * 1. 用戶點擊按鈕 → 觸發事件處理函數
   * 2. 事件處理函數 → dispatch(action)
   * 3. Redux store → 執行對應的 reducer
   * 4. Reducer → 更新狀態
   * 5. useSelector → 檢測到狀態變化
   * 6. React → 重新渲染組件顯示新狀態
   */
  return (
    <ButtonGroup
      variant="outlined"
      orientation="vertical"
      aria-label="outlined primary button group"
    >
      {/* 點擊按鈕 - 顯示當前點擊次數，可以被禁用 */}
      <Button onClick={handleClick} disabled={isDisabled}>
        CLICK:{clickCount}
      </Button>

      {/* 清除按鈕 - 重置點擊次數為 0 */}
      <Button onClick={handleClear}>CLEAR</Button>

      {/* 禁用切換按鈕 - 切換第一個按鈕的禁用狀態 */}
      <Button onClick={handleDisableToggle}>
        {isDisabled ? "ABLE" : "DISABLE"}
      </Button>
    </ButtonGroup>
  );
};

export default ButtonGroupComponent;
