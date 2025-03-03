import { useState } from 'react'

interface ApiSettings {
  openaiApiKey: string
  anthropicApiKey: string
  defaultModel: string
  costLimit: number
}

interface UiSettings {
  theme: 'light' | 'dark' | 'system'
  animationsEnabled: boolean
  compactMode: boolean
}

export default function Settings() {
  const [apiSettings, setApiSettings] = useState<ApiSettings>({
    openaiApiKey: '••••••••••••••••••••••••••••••',
    anthropicApiKey: '••••••••••••••••••••••••••••••',
    defaultModel: 'gpt-4o-mini',
    costLimit: 10,
  })

  const [uiSettings, setUiSettings] = useState<UiSettings>({
    theme: 'system',
    animationsEnabled: true,
    compactMode: false,
  })

  const [activeTab, setActiveTab] = useState<'api' | 'ui' | 'system'>('api')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Configure TheMachine to suit your needs.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('api')}
              className={`${
                activeTab === 'api'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              API Settings
            </button>
            <button
              onClick={() => setActiveTab('ui')}
              className={`${
                activeTab === 'ui'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              UI Settings
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`${
                activeTab === 'system'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              } w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm`}
            >
              System
            </button>
          </nav>
        </div>

        <div className="px-4 py-5 sm:p-6">
          {activeTab === 'api' && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="openai-api-key"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  OpenAI API Key
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="password"
                    name="openai-api-key"
                    id="openai-api-key"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                    value={apiSettings.openaiApiKey}
                    onChange={(e) =>
                      setApiSettings({ ...apiSettings, openaiApiKey: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Show
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="anthropic-api-key"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Anthropic API Key
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="password"
                    name="anthropic-api-key"
                    id="anthropic-api-key"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500"
                    value={apiSettings.anthropicApiKey}
                    onChange={(e) =>
                      setApiSettings({ ...apiSettings, anthropicApiKey: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Show
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="default-model"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Default Model
                </label>
                <select
                  id="default-model"
                  name="default-model"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={apiSettings.defaultModel}
                  onChange={(e) =>
                    setApiSettings({ ...apiSettings, defaultModel: e.target.value })
                  }
                >
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4o-mini">GPT-4o Mini</option>
                  <option value="claude-3-opus">Claude 3 Opus</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="cost-limit"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Daily Cost Limit (USD)
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    $
                  </span>
                  <input
                    type="number"
                    name="cost-limit"
                    id="cost-limit"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={apiSettings.costLimit}
                    onChange={(e) =>
                      setApiSettings({
                        ...apiSettings,
                        costLimit: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ui' && (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                  value={uiSettings.theme}
                  onChange={(e) =>
                    setUiSettings({
                      ...uiSettings,
                      theme: e.target.value as 'light' | 'dark' | 'system',
                    })
                  }
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="animations"
                    name="animations"
                    type="checkbox"
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                    checked={uiSettings.animationsEnabled}
                    onChange={(e) =>
                      setUiSettings({ ...uiSettings, animationsEnabled: e.target.checked })
                    }
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="animations"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Enable animations
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Disable for improved performance on lower-end devices.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="compact-mode"
                    name="compact-mode"
                    type="checkbox"
                    className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded"
                    checked={uiSettings.compactMode}
                    onChange={(e) =>
                      setUiSettings({ ...uiSettings, compactMode: e.target.checked })
                    }
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="compact-mode"
                    className="font-medium text-gray-700 dark:text-gray-300"
                  >
                    Compact mode
                  </label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Reduce padding and spacing for a more dense interface.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                  System Information
                </h3>
                <div className="mt-5 border-t border-gray-200 dark:border-gray-700">
                  <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Version
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                        0.1.0
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Database Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Connected
                        </span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Vector Database
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Operational
                        </span>
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        API Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Operational
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Clear All Data
                </button>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This will reset all settings and clear all cached data. This action cannot be
                  undone.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 text-right sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
