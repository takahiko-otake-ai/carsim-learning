---
sidebar_position: 2
title: VS Commands
---

# VS Commands

VS Commands は CarSim に組み込まれたスクリプト機能であり、GUI では対応できない高度なカスタマイズを実現します。新しい I/O 変数の定義、数式処理、タイムステップごとの条件分岐など、シミュレーションの柔軟性を大幅に拡張できます。

## VS Commands の機能

VS Commands を使用すると、以下のような処理が可能です。

| 機能 | 説明 |
|------|------|
| I/O 変数の定義 | 新しい入出力変数をシミュレーションに追加 |
| 変数・パラメータの追加 | カスタム変数やパラメータを定義 |
| 数式処理 | 四則演算、三角関数、条件演算などの数学的表現 |
| タイムステップ処理 | シミュレーションの各ステップで実行されるロジック |
| 単位系の追加 | カスタム単位系を定義して変換に対応 |

## コマンドの記述場所

VS Commands は以下の2箇所に記述できます。

### GUI の黄色フィールド

CarSim GUI の各設定画面には、黄色い入力フィールドがあります。ここに VS Commands を直接記述すると、該当する設定と紐づけてコマンドが実行されます。

### Parsfile キーワード

パラメータファイル（`.par`）内にキーワードとして VS Commands を記述することも可能です。バッチ処理や自動化に適しています。

## 主要なコマンドキーワード

以下に代表的な VS Commands キーワードとその構文を示します。

```
DEFINE_OUTPUT my_variable = IMP_STEER_SW * 0.5 + 1.0
```

| キーワード | 構文例 | 説明 |
|-----------|-------|------|
| `DEFINE_OUTPUT` | `DEFINE_OUTPUT name = expression` | 新しい出力変数を定義 |
| `DEFINE_PARAMETER` | `DEFINE_PARAMETER name = value` | パラメータを定義 |
| `DEFINE_VARIABLE` | `DEFINE_VARIABLE name = expression` | 内部変数を定義 |
| `DEFINE_IMPORT` | `DEFINE_IMPORT name units component` | インポート変数を定義 |
| `EQ_IN` | `EQ_IN target = expression` | 入力チャンネルに数式を適用 |
| `EQ_OUT` | `EQ_OUT target = expression` | 出力チャンネルに数式を適用 |

:::tip 構文のポイント
数式内では CarSim の内部変数名をそのまま使用できます。例えば `Vx_SM`（車両縦速度）や `Yaw`（ヨー角）などの変数を参照可能です。
:::

## ユースケース

### カスタム出力変数の作成

車両の運動エネルギーを出力変数として定義する例を示します。

```
DEFINE_PARAMETER mass = 1500.0
DEFINE_OUTPUT kinetic_energy = 0.5 * mass * Vx_SM * Vx_SM
```

### パラメータスイープ

複数のパラメータ値でシミュレーションを繰り返し実行する際に、VS Commands でパラメータを動的に変更できます。

### 条件分岐ロジック

タイムステップごとに条件を評価し、異なる処理を実行できます。

```
EQ_OUT my_flag = IF(Vx_SM > 30.0, 1.0, 0.0)
```

:::info Events 機能との関係
VS Commands の条件処理は **Events** 機能と密接に関連しています。Events はシミュレーション中に特定の条件が満たされたときにアクションを発火する仕組みであり、VS Commands と組み合わせることで高度なシナリオ制御を実現できます。
:::

## まとめ

VS Commands は、CarSim の標準 GUI では実現が難しい高度なカスタマイズを可能にする強力なツールです。制御ロジックのプロトタイピングや、特殊な出力変数の定義など、幅広い用途に活用できます。より複雑なロジックが必要な場合は、[Embedded Python](./embedded-python.md) の活用も検討してください。
