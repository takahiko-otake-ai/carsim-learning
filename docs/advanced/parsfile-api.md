---
sidebar_position: 4
title: Parsfile API
---

# Parsfile API

Parsfile API は、CarSim のデータベースにプログラムからアクセスするための REST API です。パラメータファイルの読み書き、データセットの管理、データベース操作の自動化を実現し、CI/CD パイプラインやバッチ処理との統合を可能にします。

## 概要

CarSim のパラメータ管理はファイルベースの Parsfile 形式で行われています。Parsfile API はこの Parsfile データベースに対して HTTP リクエストでアクセスするインターフェースを提供します。

```
クライアント (Python/MATLAB/etc.)
    ↓ HTTP Request
Parsfile API サーバー
    ↓ 読み書き
CarSim Database (.par ファイル群)
```

## API の主な機能

| 機能カテゴリ | 操作 | 説明 |
|-------------|------|------|
| パラメータファイル | 読み取り | `.par` ファイルの内容を取得 |
| パラメータファイル | 書き込み | パラメータ値の変更・新規作成 |
| データセット管理 | 一覧取得 | 利用可能なデータセットの一覧表示 |
| データセット管理 | 複製・削除 | データセットのコピーと削除 |
| データベース操作 | 検索 | 条件に合致するパラメータの検索 |
| データベース操作 | エクスポート | データベースの部分的なエクスポート |

## 認証と接続設定

### 接続の確立

API サーバーへの接続に必要な情報を設定します。

```python
import requests

BASE_URL = "http://localhost:8200"
API_KEY = "your-api-key"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}
```

:::caution セキュリティに関する注意
API キーはソースコードにハードコーディングせず、環境変数や設定ファイルで管理してください。
:::

## 主要な API エンドポイント

### パラメータファイルの取得

```
GET /api/v1/parsfiles/{category}/{id}
```

```python
response = requests.get(
    f"{BASE_URL}/api/v1/parsfiles/vehicles/sedan_01",
    headers=headers
)
vehicle_data = response.json()
```

### パラメータの更新

```
PUT /api/v1/parsfiles/{category}/{id}
```

```python
update_data = {
    "parameters": {
        "sprung_mass": 1500.0,
        "wheelbase": 2.7
    }
}
response = requests.put(
    f"{BASE_URL}/api/v1/parsfiles/vehicles/sedan_01",
    headers=headers,
    json=update_data
)
```

### データセット一覧の取得

```
GET /api/v1/datasets
```

### シミュレーション実行のトリガー

```
POST /api/v1/simulations/run
```

```python
sim_config = {
    "vehicle": "sedan_01",
    "procedure": "double_lane_change",
    "road": "flat_road"
}
response = requests.post(
    f"{BASE_URL}/api/v1/simulations/run",
    headers=headers,
    json=sim_config
)
run_id = response.json()["run_id"]
```

## ユースケース

### 自動パラメータスタディ

パラメータの組み合わせを網羅的に変更しながらシミュレーションを繰り返し実行します。

```python
import itertools

masses = [1200, 1400, 1600]
wheelbases = [2.5, 2.7, 2.9]

for mass, wb in itertools.product(masses, wheelbases):
    update_params(vehicle_id, {"sprung_mass": mass, "wheelbase": wb})
    run_id = trigger_simulation(vehicle_id, procedure_id)
    results = wait_and_fetch_results(run_id)
    save_results(mass, wb, results)
```

### CI/CD パイプラインへの統合

Git リポジトリで管理された制御パラメータの変更に対して、自動的にシミュレーションを実行し、性能基準への適合を検証するワークフローを構築できます。

```yaml
# CI/CD パイプライン例
steps:
  - name: パラメータ検証
    run: python validate_params.py
  - name: シミュレーション実行
    run: python run_simulation.py
  - name: 結果判定
    run: python check_results.py --threshold 0.95
```

### バッチ処理

大量のシミュレーションケースを一括で実行し、結果を集約・分析するバッチ処理を自動化します。

## 他言語との統合

Parsfile API は REST API であるため、HTTP リクエストが可能な任意のプログラミング言語から利用できます。

| 言語 | ライブラリ例 |
|------|------------|
| Python | `requests`, `httpx` |
| MATLAB | `webread`, `webwrite` |
| JavaScript | `fetch`, `axios` |
| C# | `HttpClient` |

:::tip ヒント
Python での利用が最も一般的です。`requests` ライブラリと組み合わせることで、シンプルなスクリプトからパラメータスタディ全体を自動化できます。
:::
