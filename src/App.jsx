// src/App.jsx
import React from "react";
import { Typography } from "@mui/material";
import GDPChart from "./components/GDPChart";
import ButtonGroupComponent from "./components/ButtonGroup";
const App = () => {
  return (
    <div className="app-container">
      <Typography
        variant="h3"
        component="h1"
        align="center"
        className="main-title"
      >
        ADBERT 前端工程師面試題目
      </Typography>

      {/* 第一題：按鈕群組 */}
      <div className="question-section">
        <Typography variant="h4" component="h2" className="question-title">
          第一題: 按鈕群組
        </Typography>
        <div className="button-group-container">
          <ButtonGroupComponent />
        </div>
      </div>

      {/* GDP 圖表 */}
      <div className="question-section">
        <Typography variant="h4" component="h2" className="question-title">
          第二題: GDP 資料視覺化
        </Typography>
        <div className="chart-container">
          <GDPChart />
        </div>
      </div>
    </div>
  );
};

export default App;
