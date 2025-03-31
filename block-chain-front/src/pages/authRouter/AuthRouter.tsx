import { useRouteError, Navigate, useLocation } from 'react-router-dom';

export default function AuthGuard() {
  const error = useRouteError() as Response;
  const location = useLocation();

  console.error('路由错误:', error);

  if (error.status === 401) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  if (error.status === 403) {
    return (
      <div className="p-4">
        <h1>403 - 无权限</h1>
        <p>您没有访问此页面的权限</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1>出错了！</h1>
      <p>{error.statusText || '未知错误'}</p>
    </div>
  );
}