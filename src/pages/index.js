import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const FeatureList = [
  {
    title: 'はじめに',
    description: 'CarSim のインストール、初回シミュレーション、UI の基本操作を学びます。',
    link: '/docs/getting-started/installation',
  },
  {
    title: '車両モデルの基礎',
    description: '車体、パワートレイン、ブレーキ、ステアリング、サスペンション、タイヤの各モデルを解説します。',
    link: '/docs/basic/vehicle-model',
  },
  {
    title: 'シミュレーション実行',
    description: 'ドライバーモデル、道路・地形設定、ADAS センサー、シナリオ設定の方法を学びます。',
    link: '/docs/simulation/driver-model',
  },
  {
    title: 'テストケースガイド',
    description: 'ブレーキ、ハンドリング、ADAS、EV など、カテゴリ別のテストケース設定を解説します。',
    link: '/docs/test-cases/overview',
  },
  {
    title: 'ハンズオン演習',
    description: '実際に CarSim を操作しながら学ぶ 5 つの演習で、操作スキルを身につけます。',
    link: '/docs/hands-on/exercise-1',
  },
  {
    title: '応用・拡張機能',
    description: 'Simulink 連携、VS Commands、Python、REST API、HIL テストを学びます。',
    link: '/docs/advanced/simulink-integration',
  },
];

function Feature({title, description, link}) {
  return (
    <div className="col col--4" style={{marginBottom: '1.5rem'}}>
      <Link to={link} className={styles.featureLink}>
        <div className="feature-card">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--carsim', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button--carsim" to="/docs/getting-started/installation">
            学習を始める
          </Link>
        </div>
      </div>
    </header>
  );
}

function VersionBanner() {
  return (
    <div className={styles.versionBanner}>
      <div className="carsim-infobox">
        <strong>対応バージョン:</strong> CarSim 2026.0
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <strong>リリース日:</strong> 2026年1月29日
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout
      title="ホーム"
      description="CarSim Learning Portal - CarSim ユーザーのための学習ポータル">
      <HomepageHeader />
      <main>
        <VersionBanner />
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
