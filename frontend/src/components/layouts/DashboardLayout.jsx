/* eslint-disable react/prop-types */
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { Outlet } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const navigation = [
    { name: 'Dashboard', href: "/dashboard" },
    { name: 'Books', href: "/dashboard/books" },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardLayout() {
    const location = useLocation();
    const { student, logout } = useAuth();

    return (
        <>

            <div className="min-h-screen w-full">
                <Disclosure as="nav" className="border-b border-gray-200 bg-white">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4">
                                <div className="flex h-16 justify-between">
                                    <div className="flex">
                                        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.href}
                                                    className={classNames(
                                                        location.pathname === item.href
                                                            ? 'border-indigo-500 text-gray-900'
                                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex sm:items-center gap-x-4">
                                        <div className=''>
                                            <p className='font-semibold'>{student?.student_Fname} {student?.student_Lname} </p>
                                            <p className='text-gray-600'>{student?.student_Email}</p>
                                        </div>
                                        <button
                                            className="px-5 py-2 rounded-md text-red-500 border-red-300 border"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                    <div className="-mr-2 flex items-center sm:hidden">
                                        {/* Mobile menu button */}
                                        <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </DisclosureButton>
                                    </div>
                                </div>
                            </div>

                            <DisclosurePanel className="sm:hidden">
                                <div className="space-y-1 pb-3 pt-2">
                                    {navigation.map((item) => (
                                        <DisclosureButton
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                    : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                                                'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </DisclosureButton>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 pb-3 pt-4">
                                    <div className="flex items-center px-4">
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">{student?.student_Fname} {student?.student_Lname}</div>
                                            <div className="text-sm font-medium text-gray-500">{student?.student_Email}</div>
                                        </div>
                                    </div>
                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>

                <div className="pb-10 pt-5">
                    <main>
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}