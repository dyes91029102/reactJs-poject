import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import './i18n/i18n';
// 取得index.html 原點
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// 渲染組件
root.render(
  <React.StrictMode>
    {/* Suspense 語言從外部 加載時效果理想 */}
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
