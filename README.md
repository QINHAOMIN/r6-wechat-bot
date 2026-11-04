# R6 微信群战绩查询机器人

用 Node.js 和 TypeScript 开发的《彩虹六号：围攻》战绩查询机器人，供小型微信群使用。

An R6 Siege stats bot for a small, non-commercial WeChat community. It currently uses R6Data for player summaries. Recent match history is planned and depends on access to a match-history API.

## 当前状态

- 已在 Linux 云服务器的测试群验证真实 @ 提及识别、R6Data 查询和原群回复。云端使用 Docker 运行微信桌面和 Node.js，由 systemd 管理监听进程。
- 群内指令为 `@机器人 查询 <玩家ID>`。请从微信成员菜单选择机器人账号。
- 本仓库提供查询逻辑、消息适配接口和本地模拟入口。云端微信监听与发送脚本单独维护。
- 当前查询支持 PC 玩家。对局历史查询尚未接入，正在核实 Stats.cc 的接口访问权限。

## 本地运行

使用 Node.js 22，在项目根目录安装依赖：

```powershell
npm ci
```

开发检查和编译：

```powershell
npm test
npm run typecheck
npm run build
```

创建 `.env` 后，运行 `npm run build` 和 `npm start` 可以预览带有虚构数据标记的本地演示。

## 查询真实战绩

在项目根目录创建 `.env`，填写自己的 R6Data API 密钥：

```dotenv
R6DATA_API_KEY=YOUR_R6DATA_API_KEY
```

在项目根目录运行：

```powershell
npm run query -- "YOUR_PC_PLAYER_ID"
```

把 `YOUR_PC_PLAYER_ID` 替换为要查询的 PC 玩家 ID。命令通过模拟群消息输出历史总 K/D、历史总胜率、
当前赛季排位 K/D、胜率、段位，以及排位 3.0 历史最高记录。

历史汇总和最高记录取决于 R6Data 返回的数据覆盖范围。
段位对照表位于 `data/r6data-ranks-v7.json`。`.env` 和本地调试样本目录 `.local/` 由 Git 忽略。
