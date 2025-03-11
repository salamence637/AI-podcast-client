/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000, // 每秒检查文件变更
      aggregateTimeout: 300, // 文件更改后延迟 300 毫秒执行
    };
    return config;
  },
};

export default nextConfig;
