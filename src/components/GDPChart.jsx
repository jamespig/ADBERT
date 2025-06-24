import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";

/**
 * GDP 圖表組件 - 使用 MUI Charts 顯示德國和英國的 GDP 堆疊比較
 *
 * 主要功能：
 * 1. 從世界銀行 API 獲取 GDP 資料
 * 2. 使用堆疊條形圖顯示兩國 GDP 比較
 * 3. 響應式設計適應不同螢幕尺寸
 */
const GDPChart = () => {
  // ===== 響應式設計 Hook =====
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // ===== 狀態管理 =====
  const [data, setData] = useState(null); // 存儲處理後的 GDP 資料
  const [loading, setLoading] = useState(true); // 載入狀態
  const [error, setError] = useState(null); // 錯誤狀態

  // ===== 響應式圖表尺寸配置 =====
  const getChartDimensions = () => {
    if (isMobile) {
      return { width: 350, height: 300 };
    } else if (isTablet) {
      return { width: 600, height: 400 };
    } else {
      return { width: 800, height: 450 };
    }
  };

  const getMargins = () => {
    if (isMobile) {
      return { left: 50, right: 30, top: 20, bottom: 20 };
    } else if (isTablet) {
      return { left: 60, right: 50, top: 30, bottom: 20 };
    } else {
      return { left: 80, right: 80, top: 40, bottom: 20 };
    }
  };

  const getFontSizes = () => {
    if (isMobile) {
      return { tick: 10, axis: 11 };
    } else if (isTablet) {
      return { tick: 11, axis: 12 };
    } else {
      return { tick: 13, axis: 13 };
    }
  };

  // ===== 資料獲取和處理 =====
  useEffect(() => {
    const fetchGDPData = async () => {
      try {
        setLoading(true);

        // 世界銀行 API 端點
        // 參數說明：
        // - DE;GB: 國家代碼（德國和英國）
        // - NY.GDP.MKTP.CD: GDP 指標代碼（以當前美元計算的 GDP）
        // - format=json: 返回 JSON 格式
        // - per_page=100: 每頁返回100條記錄
        const response = await fetch(
          "https://api.worldbank.org/v2/country/DE;GB/indicator/NY.GDP.MKTP.CD?format=json&per_page=100"
        );

        if (!response.ok) {
          throw new Error("無法獲取 GDP 資料");
        }

        const result = await response.json();

        if (!result[1] || result[1].length === 0) {
          throw new Error("資料格式不正確");
        }

        // ===== 資料處理邏輯 =====

        // 1. 提取並排序年份（取最近8年）
        const years = [...new Set(result[1].map((d) => d.date))]
          .filter((year) => year !== null && year !== undefined) // 過濾空值
          .sort((a, b) => b - a) // 降序排列
          .slice(0, 8) // 取前8年
          .reverse(); // 改為升序（時間軸）

        // 2. 處理德國 GDP 資料
        const germanyData = years.map((year) => {
          const item = result[1].find(
            (d) => d.country.id === "DE" && d.date === year
          );
          // 將原始數值（美元）轉換為兆美元，保留兩位小數
          return item ? Math.round((item.value / 1e12) * 100) / 100 : null;
        });

        // 3. 處理英國 GDP 資料
        const ukData = years.map((year) => {
          const item = result[1].find(
            (d) => d.country.id === "GB" && d.date === year
          );
          // 將原始數值（美元）轉換為兆美元，保留兩位小數
          return item ? Math.round((item.value / 1e12) * 100) / 100 : null;
        });

        // 4. 設定最終資料結構
        setData({
          years, // X 軸年份資料
          germany: germanyData, // 德國 GDP 資料陣列
          uk: ukData, // 英國 GDP 資料陣列
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGDPData();
  }, []);

  // ===== 載入狀態顯示 =====
  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
        sx={{ p: 2 }}
      >
        <CircularProgress size={isMobile ? 40 : 60} />
        <Typography
          variant="body1"
          sx={{
            ml: isMobile ? 0 : 2,
            mt: isMobile ? 2 : 0,
            fontSize: { xs: "0.875rem", sm: "1rem" },
            textAlign: "center",
          }}
        >
          正在載入 GDP 資料...
        </Typography>
      </Box>
    );
  }

  // ===== 錯誤狀態顯示 =====
  if (error) {
    return (
      <Alert
        severity="error"
        sx={{
          my: 2,
          mx: isMobile ? 1 : 0,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {error}
      </Alert>
    );
  }

  // ===== 無資料狀態顯示 =====
  if (!data) {
    return (
      <Alert
        severity="info"
        sx={{
          my: 2,
          mx: isMobile ? 1 : 0,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        無可用的 GDP 資料
      </Alert>
    );
  }

  // ===== 輔助函數 =====

  // 數值格式化函數 - 用於工具提示和圖例
  const valueFormatter = (value) => `$${value}兆`;

  // 計算 Y 軸的最大值，用於設定刻度範圍
  const maxValue = Math.max(
    ...data.germany.map((g, i) => (g || 0) + (data.uk[i] || 0))
  );
  const yAxisMax = Math.ceil(maxValue / 5) * 5; // 向上取整到最近的5的倍數

  const chartDimensions = getChartDimensions();
  const margins = getMargins();
  const fontSizes = getFontSizes();

  // ===== 主要圖表渲染 =====
  return (
    <Box
      sx={{
        width: "100%",
        mt: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 圖表標題 */}
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        align="center"
        sx={{
          fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          mb: { xs: 2, sm: 3 },
          px: 1,
        }}
      >
        德國 vs 英國 GDP 堆疊比較 (近8年)
      </Typography>

      {/* 資料來源說明 */}
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          mb: 3,
          fontSize: { xs: "0.75rem", sm: "0.875rem" },
          px: 1,
          wordBreak: "break-all",
        }}
      >
        資料來源:{" "}
        <a
          href="https://api.worldbank.org/v2/country/DE;GB/indicator/NY.GDP.MKTP.CD?format=json"
          style={{
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
          onMouseOut={(e) => (e.target.style.textDecoration = "none")}
        >
          世界銀行 API
        </a>
      </Typography>

      {/* 響應式圖表容器 */}
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          display: "flex",
          justifyContent: "center",
          pb: 2,
        }}
      >
        {/* ===== MUI BarChart 主要配置 ===== */}
        <BarChart
          /*
           * X 軸配置 (橫軸) - 響應式調整
           */
          xAxis={[
            {
              scaleType: "band", // 條形圖專用的 band 尺度
              data: data.years, // 年份資料陣列
              label: "年份", // 軸標籤文字
              tickLabelStyle: {
                fontSize: fontSizes.tick, // 響應式字體大小
                fill: "#000", // 刻度顏色（黑色）
                angle: isMobile ? -45 : 0, // 手機版傾斜文字
                textAnchor: isMobile ? "end" : "middle",
              },
              tickNumber: 8,
              // 強制顯示所有年份標籤，避免 MUI 自動隱藏重疊的標籤
              tickLabelInterval: () => true,
            },
          ]}
          /*
           * 資料系列配置 - 響應式調整
           */
          series={[
            {
              data: data.germany, // 德國 GDP 資料
              label: "德國 GDP", // 圖例顯示名稱
              color: "#2e7d32", // 綠色（Material Design Green 800）
              valueFormatter, // 使用上面定義的格式化函數
              stack: "total", // 堆疊群組（與英國相同，所以會堆疊）
            },
            {
              data: data.uk, // 英國 GDP 資料
              label: "英國 GDP", // 圖例顯示名稱
              color: "#1976d2", // 藍色（Material Design Blue 700）
              valueFormatter, // 使用上面定義的格式化函數
              stack: "total", // 堆疊群組（與德國相同，所以會堆疊）
            },
          ]}
          /*
           * 響應式圖表尺寸配置
           */
          width={chartDimensions.width}
          height={chartDimensions.height}
          /*
           * 響應式邊距配置
           */
          margin={margins}
          /*
           * Y 軸配置 (縱軸) - 響應式調整
           */
          yAxis={[
            {
              label: "GDP (兆美元)", // Y 軸標籤
              tickLabelStyle: {
                fontSize: fontSizes.axis, // 響應式字體大小
                fill: "#000", // 刻度顏色（黑色）
              },
              // 設定 Y 軸的數值範圍和刻度
              max: yAxisMax, // 最大值（自動計算）
              min: 0, // 最小值（從0開始）
              tickNumber: isMobile ? 6 : 8, // 響應式刻度數量
              valueFormatter: (value) => `$${value}兆`, // 刻度格式化
              tickMinStep: 1, // 最小步進（1兆美元）
            },
          ]}
          /*
           * 網格配置
           */
          grid={{
            horizontal: true, // 顯示水平網格線（便於讀取數值）
          }}
          /*
           * 工具提示配置
           */
          tooltip={{
            formatter: (params) => {
              // 自定義工具提示內容格式
              return `${params.seriesName}: ${valueFormatter(params.value)}`;
            },
          }}
          /*
           * 插槽屬性配置 - 響應式圖例
           */
          slotProps={{
            legend: {
              direction: "row", // 水平排列
              position: {
                vertical: "bottom", // 位於圖表下方
                horizontal: "middle", // 水平置中
              },
              padding: {
                top: isMobile ? 10 : 20,
                bottom: 0,
                left: 0,
                right: 0,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default GDPChart;
