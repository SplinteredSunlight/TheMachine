import { useState } from 'react'

interface Agent {
  id: string
  name: string
  type: string
  description: string
  capabilities: string[]
  defaultModelId: string
  isActive: boolean
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'code-agent',
      name: 'Code Generation Agent',
      type: 'code',
      description: 'Generates code based on requirements',
      capabilities: ['code_generation', 'code_review', 'documentation'],
      defaultModelId: 'gpt-4o',
      isActive: true,
    },
    {
      id: 'design-agent',
      name: 'Design Agent',
      type: 'design',
      description: 'Creates design artifacts and mockups',
      capabilities: ['design_creation', 'documentation'],
      defaultModelId: 'gpt-4o',
      isActive: true,
    },
    {
      id: 'test-agent',
      name: 'Testing Agent',
      type: 'test',
      description: 'Generates and executes tests',
      capabilities: ['test_generation', 'code_review'],
      defaultModelId: 'gpt-4o-mini',
      isActive: true,
    },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Agents</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Manage and configure AI agents for specialized tasks.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div
                  className={`flex-shrink-0 rounded-md p-3 
                    ${
                      agent.type === 'code'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                        : agent.type === 'design'
                        ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200'
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {agent.type === 'code' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    ) : agent.type === 'design' ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    )}
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                      {agent.name}
                    </h3>
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        agent.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {agent.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{agent.description}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {agent.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {capability.replace('_', ' ')}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Default model: <span className="font-medium">{agent.defaultModelId}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Execute
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
