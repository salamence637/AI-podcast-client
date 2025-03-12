// /src/app/api/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { pathname, search } = new URL(request.url);
  // 去掉路径中 "/api/proxy" 前缀，得到实际转发的路径
  const path = pathname.replace(/^\/api\/proxy/, '');
  // 从环境变量中获取后端 URL（请在 Vercel 环境变量中配置 BACKEND_URL）
  const backendUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!backendUrl) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_BASE_URL 未配置' }, { status: 500 });
  }
  const url = `${backendUrl}${path}${search}`;
  
  // 代理 GET 请求到后端
  const res = await fetch(url, {
    method: 'GET',
    headers: request.headers,
  });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: res.headers,
  });
}

// 如果需要支持 POST、PUT、DELETE 等方法，也可类似添加处理函数
