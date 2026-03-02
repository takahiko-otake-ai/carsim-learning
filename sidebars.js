/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  learningSidebar: [
    {
      type: 'category',
      label: 'はじめに',
      items: [
        'getting-started/installation',
        'getting-started/first-simulation',
        'getting-started/ui-overview',
        'getting-started/database-structure',
      ],
    },
    {
      type: 'category',
      label: '車両モデルの基礎',
      items: [
        'basic/vehicle-model',
        'basic/powertrain',
        'basic/brake-system',
        'basic/steering',
        'basic/suspension',
        'basic/tire-model',
        'basic/aerodynamics',
      ],
    },
    {
      type: 'category',
      label: 'シミュレーション実行',
      items: [
        'simulation/driver-model',
        'simulation/roads-terrain',
        'simulation/procedures-events',
        'simulation/results-visualization',
        'simulation/sensors-objects',
        'simulation/traffic-scenarios',
      ],
    },
    {
      type: 'category',
      label: '応用・拡張機能',
      items: [
        'advanced/simulink-integration',
        'advanced/vs-commands',
        'advanced/embedded-python',
        'advanced/parsfile-api',
        'advanced/hil-realtime',
        'advanced/driving-simulator',
      ],
    },
    {
      type: 'category',
      label: 'テストケースガイド',
      items: [
        'test-cases/overview',
        'test-cases/quick-start-examples',
        'test-cases/brake-tests',
        'test-cases/handling-tests',
        'test-cases/adas-tests',
        'test-cases/ev-powertrain',
      ],
    },
    {
      type: 'category',
      label: 'ハンズオン演習',
      items: [
        'hands-on/exercise-1',
        'hands-on/exercise-2',
        'hands-on/exercise-3',
        'hands-on/exercise-4',
        'hands-on/exercise-5',
      ],
    },
    {
      type: 'category',
      label: 'リファレンス',
      items: [
        'reference/parameters',
        'reference/faq',
        'reference/glossary',
        'reference/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
