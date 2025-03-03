import { Fragment, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  CpuChipIcon,
  UserGroupIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

interface LayoutProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Models', href: '/models', icon: CpuChipIcon },
  { name: 'Agents', href: '/agents', icon: UserGroupIcon },
  { name: 'Workflows', href: '/workflows', icon: ArrowPathIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export default function Layout({ theme, toggleTheme }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white dark:bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">TheMachine</h1>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={clsx(
                        location.pathname === item.href
                          ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={clsx(
                          location.pathname === item.href
                            ? 'text-gray-500 dark:text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                          'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">TheMachine</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={clsx(
                      location.pathname === item.href
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={clsx(
                        location.pathname === item.href
                          ? 'text-gray-500 dark:text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
                <button
                  onClick={toggleTheme}
                  className="flex-shrink-0 group block w-full flex items-center"
                >
                  {theme === 'light' ? (
                    <MoonIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                  ) : (
                    <SunIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-300" />
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {navigation.find((item) => item.href === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>
            <div className="ml-4 flex items-center md:hidden">
              <button
                onClick={toggleTheme}
                className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {theme === 'light' ? (
                  <MoonIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <SunIcon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
