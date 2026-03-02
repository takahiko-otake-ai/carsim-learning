---
sidebar_position: 3
title: Embedded Python
---

# Embedded Python

CarSim では Python スクリプトをシミュレーション内に組み込むことで、VS Commands では対応が難しい複雑なロジックやデータ処理を実現できます。Python の豊富なライブラリ群を活用し、高度な制御アルゴリズムの実装やデータ解析の自動化が可能です。

## 概要

Embedded Python は、CarSim のシミュレーションループ内で Python スクリプトを実行する機能です。各タイムステップで Python 関数が呼び出され、CarSim の車両状態量を入力として受け取り、制御指令を返すことができます。

| 項目 | VS Commands | Embedded Python |
|------|------------|----------------|
| 記述言語 | CarSim 独自構文 | Python |
| 複雑なロジック | 限定的 | 高度な分岐・ループに対応 |
| 外部ライブラリ | 使用不可 | NumPy, SciPy 等を活用可能 |
| デバッグ | 困難 | Python 標準のデバッグツール |
| 実行速度 | 高速（ネイティブ） | やや低速（インタープリタ） |
| 学習コスト | CarSim 固有の知識が必要 | Python の汎用スキルを活用 |

## Python 環境のセットアップ

### 1. Python のインストール

CarSim が対応する Python バージョンをインストールします。システム PATH に Python を追加してください。

### 2. CarSim での Python パス設定

CarSim GUI の設定画面で、Python インタープリタのパスを指定します。仮想環境（venv, conda）を使用する場合は、その環境の Python 実行ファイルを指定します。

### 3. 必要なライブラリのインストール

```bash
pip install numpy scipy matplotlib
```

:::caution 注意
CarSim のバージョンによって対応する Python バージョンが異なります。リリースノートで互換性を確認してください。
:::

## Python スクリプトの構成

CarSim に組み込む Python スクリプトは、所定のインターフェース関数を実装する必要があります。

```python
def initialize(par_path):
    """シミュレーション開始時に1回呼び出される初期化関数"""
    pass

def calc(imports, t, dt):
    """各タイムステップで呼び出される計算関数
    
    Args:
        imports: CarSim からの入力変数辞書
        t: 現在のシミュレーション時刻 [s]
        dt: タイムステップ幅 [s]
    
    Returns:
        exports: CarSim へ返す出力変数辞書
    """
    exports = {}
    return exports

def terminate():
    """シミュレーション終了時に呼び出される終了処理関数"""
    pass
```

## ユースケース

### カスタムコントローラーの実装

PID 制御や MPC（モデル予測制御）など、高度な制御アルゴリズムを Python で実装し、CarSim の車両モデルに接続できます。

```python
import numpy as np

class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp, self.ki, self.kd = kp, ki, kd
        self.integral = 0.0
        self.prev_error = 0.0

    def compute(self, error, dt):
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt if dt > 0 else 0
        self.prev_error = error
        return self.kp * error + self.ki * self.integral + self.kd * derivative

controller = PIDController(kp=1.0, ki=0.1, kd=0.05)

def calc(imports, t, dt):
    speed_error = imports['target_speed'] - imports['Vx_SM']
    throttle = controller.compute(speed_error, dt)
    return {'IMP_THROTTLE': np.clip(throttle, 0, 1)}
```

### データ後処理の自動化

シミュレーション結果のフィルタリング、統計分析、レポート生成などを Python スクリプト内で自動化できます。

### パラメータ最適化

SciPy の最適化ライブラリと連携し、車両パラメータのチューニングを自動化する仕組みを構築できます。目的関数としてラップタイムや乗り心地指標を設定し、パラメータ空間を効率的に探索します。

:::tip VS Commands との使い分け
単純な数式変換や変数定義には VS Commands が適しています。条件分岐が多い複雑なロジック、外部ライブラリの利用、状態を持つ制御アルゴリズムの実装には Embedded Python が有効です。
:::

## まとめ

Embedded Python は、CarSim のシミュレーション機能を Python エコシステムと融合させる強力な手段です。VS Commands の簡潔さと Python の柔軟性を適材適所で使い分けることで、効率的なシミュレーションワークフローを構築できます。
