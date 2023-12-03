import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n/i18n';
import VisuallLoading from './components/common/VisuallLoading/VisuallLoading';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// 取得index.html 原點
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 創建實體
const queryClient = new QueryClient();
// 渲染組件
root.render(
  <>
  {/* <React.StrictMode>*/}
    {/* Suspense 語言從外部 加載時效果理想 */}
    <Suspense fallback={<VisuallLoading loadText={"Loading..."} />}>
      <QueryClientProvider client={queryClient}>
            <App />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </Suspense>
  {/* </React.StrictMode> */}
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
