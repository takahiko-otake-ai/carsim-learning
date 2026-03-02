---
sidebar_position: 1
title: MATLAB/Simulink 連携
---

# MATLAB/Simulink 連携

CarSim は MATLAB/Simulink と緊密に統合されており、制御システムの開発・検証を効率的に行うことができます。本ページでは、Standalone 実行と Simulink 実行の違い、および Simulink 連携の設定手順を解説します。

## Standalone 実行と Simulink 実行の比較

CarSim には2つの主要な実行モードがあります。

| 項目 | Standalone 実行 | Simulink 実行 |
|------|----------------|--------------|
| 実行フロー | `simfile.sim` + `run_all.par` 生成 → 初期化 → Solver DLL 統合 → 終了 | S-Function インターフェース経由で同じ Solver DLL を MEX ファイルから呼び出し |
| 制御モデル | CarSim 内蔵のドライバーモデル | Simulink 上の任意の制御モデル |
| 用途 | 車両単体の挙動確認 | 制御システムとの統合シミュレーション |

Standalone 実行では、CarSim GUI から直接シミュレーションを起動します。`simfile.sim` にシミュレーション設定が記述され、`run_all.par` に全パラメータが集約されます。初期化後、Solver DLL が車両ダイナミクスを計算し、結果が出力されます。

Simulink 実行では、同じ Solver DLL が S-Function として Simulink モデル内から呼び出されます。これにより、Simulink で構築した制御アルゴリズムと CarSim の車両モデルをリアルタイムに連携させることが可能です。

## Simulink 連携の基本フロー

以下の手順で Simulink 連携を設定します。

### 1. Simulink モデルの作成

MATLAB を起動し、新規の Simulink モデルを作成します。制御ロジック（ブレーキ制御、ステアリング制御など）を Simulink 上で構築します。

### 2. Run Control での設定

CarSim GUI の **Run Control** 画面で、**Models: Simulink** を選択します。これにより、CarSim は Simulink 経由でシミュレーションを実行するモードに切り替わります。

### 3. Models: Simulink 画面の設定

**Models: Simulink** 設定画面で以下を構成します。

- **Model path**: Simulink モデルファイル（`.slx` / `.mdl`）のパスを指定
- **I/O variables**: CarSim と Simulink 間で受け渡す入出力変数を定義

### 4. CarSim S-Function ブロックの配置

Simulink の **Library Browser** から CarSim S-Function ブロックを検索し、モデルに配置します。このブロックが CarSim Solver DLL とのインターフェースとなります。

### 5. Simulink への送信と実行

CarSim GUI の **Send to Simulink** ボタンをクリックすると、設定が Simulink に転送され、Simulink モデルが起動します。

## CarSim S-Function ブロック

CarSim S-Function ブロック（`vs_sf`）は、CarSim の車両ダイナミクスソルバーを Simulink のブロックとしてカプセル化したものです。ブロックの入力ポートには制御指令値（スロットル、ブレーキ、ステアリングなど）を接続し、出力ポートから車両状態量（速度、加速度、ヨーレートなど）を取得します。

## Import/Export I/O チャンネル

I/O チャンネルの設定により、CarSim と Simulink 間のデータフローを細かく制御できます。

- **Import チャンネル**: Simulink → CarSim へ入力される信号（制御指令など）
- **Export チャンネル**: CarSim → Simulink へ出力される信号（車両状態量など）

:::tip ヒント
I/O チャンネルの追加・削除は Models: Simulink 画面から行えます。必要な変数のみを選択することで、シミュレーション速度を最適化できます。
:::

## Generate Files for this Run

**Generate Files for this Run** 機能は、シミュレーションを実行せずに `simfile.sim` と `run_all.par` を生成します。この機能は以下の場合に必要です。

- M-file ベースでシミュレーションを実行する場合
- バッチ処理やスクリプトから CarSim を制御する場合
- カスタムワークフローを構築する場合

## MATLAB パスの設定

Simulink 連携を正しく動作させるには、MATLAB のパスに CarSim 関連ファイルを追加する必要があります。

**方法 1: パスの追加**

MATLAB のパスに以下のフォルダを追加します。

```
CarSim Programs\solvers\Matlab
```

**方法 2: ファイルのコピー**

必要なファイルをプロジェクトフォルダにコピーします。

| ファイル名 | 説明 |
|-----------|------|
| `vs_sf.mexw64` | CarSim S-Function MEX ファイル |
| `vs_sf_car.png` | S-Function ブロックのアイコン画像 |
| `Solver_SF.mdl` | CarSim S-Function ライブラリモデル |
| `slblocks.m` | Simulink Library Browser 登録スクリプト |

:::caution 注意
ローカル Windows ディレクトリへの転送を行う場合は、すべての依存ファイルが正しくコピーされていることを確認してください。ネットワークドライブ上での実行は推奨されません。
:::

## デプロイメント

開発環境から別の PC へ展開する場合は、**Transfer to local Windows directory** 機能を使用します。これにより、シミュレーションに必要なすべてのファイルがローカルディレクトリに集約され、MATLAB/Simulink がインストールされた任意の PC で実行可能になります。
