import { useState } from 'react'

interface Model {
  id: string
  name: string
  provider: string
  capabilities: string[]
  costPerToken: number
  contextWindow: number
  isActive: boolean
}

export default function Models() {
  const [models, setModels] = useState<Model[]>([
    {
      id: 'gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      capabilities: ['text', 'code', 'reasoning', 'planning', 'vision'],
      costPerToken: 0.00001,
      contextWindow: 128000,
      isActive: true,
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
      provider: 'OpenAI',
      capabilities: ['text', 'code', 'reasoning', 'planning'],
      costPerToken: 0.000005,
      contextWindow: 128000,
      isActive: true,
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      capabilities: ['text', 'code', 'reasoning', 'planning', 'vision'],
      costPerToken: 0.000015,
      contextWindow: 200000,
      isActive: true,
    },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Models</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Manage and configure AI models for your tasks.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {models.map((model) => (
            <li key={model.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-300 font-medium">
                        {model.name.substring(0, 2)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{model.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{model.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        model.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {model.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      type="button"
                      className="ml-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <span className="sr-only">Edit</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      Context: {model.contextWindow.toLocaleString()} tokens
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0 sm:ml-6">
                      Cost: ${model.costPerToken.toFixed(6)} per token
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
