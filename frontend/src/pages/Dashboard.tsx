import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface StatCard {
  title: string
  value: string | number
  description: string
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
  href: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Active Tasks',
      value: 0,
      description: 'Tasks currently in progress',
      href: '/tasks',
    },
    {
      title: 'Models',
      value: 0,
      description: 'Available AI models',
      href: '/models',
    },
    {
      title: 'Agents',
      value: 0,
      description: 'Configured AI agents',
      href: '/agents',
    },
    {
      title: 'Workflows',
      value: 0,
      description: 'Automated workflows',
      href: '/workflows',
    },
  ])

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats([
        {
          title: 'Active Tasks',
          value: 12,
          description: 'Tasks currently in progress',
          change: {
            value: 2,
            type: 'increase',
          },
          href: '/tasks',
        },
        {
          title: 'Models',
          value: 3,
          description: 'Available AI models',
          href: '/models',
        },
        {
          title: 'Agents',
          value: 4,
          description: 'Configured AI agents',
          change: {
            value: 1,
            type: 'increase',
          },
          href: '/agents',
        },
        {
          title: 'Workflows',
          value: 2,
          description: 'Automated workflows',
          href: '/workflows',
        },
      ])
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Welcome to TheMachine, your unified AI development and orchestration platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.href}
            className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md p-3 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200">
                  <span className="text-xl font-medium">{stat.value}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <p className="text-sm text-gray-900 dark:text-gray-200">{stat.description}</p>
                    {stat.change && (
                      <p
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.change.type === 'increase'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {stat.change.type === 'increase' ? '+' : '-'}
                        {stat.change.value}
                      </p>
                    )}
                  </dd>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Tasks</h2>
          <div className="border-t border-gray-200 dark:border-gray-700 -mx-6 px-6 py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent tasks found.</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Status</h2>
          <div className="border-t border-gray-200 dark:border-gray-700 -mx-6 px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">API Status</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Operational
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Database</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Connected
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Model Service</span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
