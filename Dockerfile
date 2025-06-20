FROM oven/bun:latest

WORKDIR /app

# パッケージマネージャーの設定ファイルをコピー
COPY package*.json ./
COPY bun.lock ./

# 依存関係のインストール
RUN bun install

# ソースコードをコピー
COPY . .

# TypeScriptのビルド
RUN bun run build

# 環境変数の設定
ENV NODE_ENV=production

# ポートの公開（Railwayでは自動でポートを設定）
EXPOSE 3000

# アプリケーションの起動
CMD ["bun", "run", "dist/index.js"]