---
sidebar_position: 5
title: HIL/リアルタイム連携
---

# HIL/リアルタイム連携

CarSim は MILS（Model-in-the-Loop Simulation）から HILS（Hardware-in-the-Loop Simulation）まで、**同一モデルを劣化なく使用**できることが大きな特長です。デスクトップでの検証からリアルタイムターゲットでの HIL テストまで、シームレスに移行できます。

## MILS から HILS への一貫性

CarSim の最大の強みの一つは、モデルの一貫性にあります。

```
MILS (デスクトップ)  →  SILS (SoftwareIL)  →  HILS (HardwareIL)
        同一モデル ─────── 同一モデル ─────── 同一モデル
```

:::info 重要なポイント
MILS で使用した車両モデルを HILS でもそのまま使用できます。モデルの簡略化や再チューニングは不要であり、開発プロセス全体を通じた結果の一貫性が保証されます。
:::

## 対応するリアルタイムターゲット

CarSim は幅広いリアルタイムプラットフォームをサポートしています。

| プラットフォーム | 対応製品 | 備考 |
|----------------|---------|------|
| **dSPACE** | SCALEXIO, DS6001 | 最も広く使用される RT ターゲット |
| **Concurrent** | iHawk シリーズ | Linux ベース RT システム |
| **A&D** | ADX シリーズ | 自動車業界向け HIL |
| **National Instruments** | PXI, VeriStand | NI RT エンジン対応 |
| **Opal-RT** | OP4510, OP5700 | FPGA ベース RT シミュレーション |
| **Speedgoat** | Baseline, Performance | MATLAB/Simulink との親和性が高い |
| **Vector** | CANoe RT | 車載ネットワーク連携に最適 |

## サードパーティツール連携

一部のリアルタイムターゲットでは、以下のサードパーティツールとの連携が可能です。

- **MF-Tyre/MF-Swift**: 高精度タイヤモデル（Magic Formula）との連携により、タイヤ挙動の再現性を向上
- **Unreal Engine**: VS Connect プロトコルを使用したビジュアライゼーション連携

## dSPACE SCALEXIO 連携手順

dSPACE SCALEXIO は CarSim との HIL 連携で最も一般的に使用されるプラットフォームです。

### セットアップガイドへのアクセス

CarSim の **Help > Real-Time Systems > dSPACE RT Guide** から、詳細なセットアップガイドおよびビデオチュートリアルにアクセスできます。

### 設定手順の概要

#### 1. OS の選択

dSPACE Release のバージョンに基づいて、適切な OS を選択します。

| dSPACE Release | 対応 OS |
|---------------|---------|
| 2021-B 以降 | QNX 7.1 |
| 2020-A ～ 2021-A | QNX 7.0 |

#### 2. ネットワーク設定

以下の IP アドレスを正しく設定する必要があります。

- **ホスト PC の IP アドレス**: dSPACE ConfigurationDesk で設定
- **SCALEXIO の IP アドレス**: SCALEXIO 本体のネットワーク設定

:::caution DS6001 の注意事項
DS6001 を使用する場合は、**2番目のネットワークポート**を使用して接続します。1番目のポートは dSPACE 内部通信用に予約されています。
:::

#### 3. Run Control の設定

CarSim GUI の **Run Control** 画面で、dSPACE SCALEXIO 用の設定を行います。

**Run Control for dSPACE SCALEXIO** 画面では以下を設定します。

- ターゲット IP アドレス
- Solver DLL のパス（リアルタイム用ビルド）
- I/O マッピング（CarSim 変数 ↔ dSPACE I/O チャンネル）

#### 4. ビルドとデプロイ

設定完了後、リアルタイムアプリケーションをビルドし、SCALEXIO ターゲットにデプロイします。

```
CarSim モデル設定 → Simulink RTW ビルド → SCALEXIO へデプロイ → リアルタイム実行
```

## ベストプラクティス

- **デスクトップで十分な検証を行ってから** HIL に移行する
- I/O チャンネルのマッピングは**事前にドキュメント化**する
- リアルタイム制約を満たすため、**モデルの実行時間を測定・監視**する
- HILS テスト前に、**Standalone モードで同一条件のリファレンス結果**を取得しておく

:::tip ヒント
MILS での結果と HILS での結果を比較することで、リアルタイム環境での実行精度を検証できます。理論上、結果は完全に一致するはずです。
:::
