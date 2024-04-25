import React from "react"
import { Sidebar } from "../../../components/sidebar/Sidebar"
import { Link } from "react-router-dom"
import { ResponsiveNavBar } from "../../../components/sidebar/ResponsiveBar"

export default function Groups () {
   
    return (
              <div>
  <div className="max-w-2xl mx-auto">

            <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Seu grupo</h3>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                Ver todos
                </a>
        </div>
        <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Neil Sims
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $320
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Bonnie Green
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $3467
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Michael Gough
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $67
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Neil Sims
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $320
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Bonnie Green
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $3467
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Michael image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Michael Gough
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $67
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Lana image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Lana Byrd
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $367
                            </div>
                        </div>
                    </li>
                    <li className="pt-3 pb-0 sm:pt-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Thomas image" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Thomes Lean
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $2367
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
        </div>
        </div>
                    <Sidebar />
                    <ResponsiveNavBar/>
                </div>
    )
}
