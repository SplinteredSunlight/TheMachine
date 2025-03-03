import { useState } from 'react'

interface Workflow {
  id: string
  name: string
  description: string
  type: 'sequential' | 'parallel' | 'conditional'
  steps: number
  isActive: boolean
  lastRun?: string
}

export default function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 'code-review-workflow',
      name: 'Code Review Workflow',
      description: 'Automated code review workflow',
      type: 'sequential',
      steps: 3,
      isActive: true,
      lastRun: '2025-03-01T15:30:00Z',
    },
    {
      id: 'design-to-code-workflow',
      name: 'Design to Code Workflow',
      description: 'Convert design mockups to code',
      type: 'sequential',
      steps: 4,
      isActive: true,
    },
    {
      id: 'security-scan-workflow',
      name: 'Security Scan Workflow',
      description: 'Scan code for security vulnerabilities',
      type: 'parallel',
      steps: 5,
      isActive: false,
      lastRun: '2025-02-28T10:15:00Z',
    },
  ])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Workflows</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Create and manage automated AI workflows.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {workflows.map((workflow) => (
            <li key={workflow.id}>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <div className="flex text-sm">
                      <p className="font-medium text-primary-600 dark:text-primary-400 truncate">
                        {workflow.name}
                      </p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500 dark:text-gray-400">
                        ({workflow.type})
                      </p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <p>{workflow.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex -space-x-1 overflow-hidden">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          workflow.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {workflow.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Run
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-750 text-xs text-gray-500 dark:text-gray-400 sm:px-6">
                <div className="flex justify-between">
                  <span>{workflow.steps} steps</span>
                  {workflow.lastRun && (
                    <span>
                      Last run: {new Date(workflow.lastRun).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Create Workflow
        </button>
      </div>
    </div>
  )
}
