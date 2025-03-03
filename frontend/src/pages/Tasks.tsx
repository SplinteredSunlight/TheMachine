import { useState } from 'react'

export default function Tasks() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Tasks</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Manage and monitor AI tasks in your system.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {isLoading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No tasks found.</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Create a new task to get started.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Create Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
