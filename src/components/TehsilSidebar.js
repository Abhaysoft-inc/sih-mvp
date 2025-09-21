import {
    MdDashboard,
    MdSupport,
    MdAnalytics,
    MdVerified,
    MdMap,
    MdStorage,
    MdHelp,
    MdInfo
} from 'react-icons/md'
import { useTranslation } from '@/translations/TranslationContext'

export default function TehsilSidebar({ activeTab, setActiveTab }) {
    const { t } = useTranslation()

    const menuItems = [
        { id: 'overview', label: t('sidebar.dashboard'), icon: <MdDashboard /> },
        { id: 'verification', label: t('sidebar.verification'), icon: <MdVerified /> },
        { id: 'mapping', label: t('sidebar.mapping'), icon: <MdMap /> },
        { id: 'dss', label: t('sidebar.decisionSupport'), icon: <MdSupport /> },
        { id: 'analytics', label: t('sidebar.analytics'), icon: <MdAnalytics /> },
        // { id: 'data', label: 'Data Management', icon: <MdStorage /> }
    ]

    return (
        <div className="w-48 min-h-[calc(100vh-120px)] bg-white border-r border-gray-200 shadow-sm">
            {/* Sidebar Header */}
            <div className="px-4 pt-4 pb-3 border-b border-gray-200">
                <div className="text-gray-600 text-xs font-bold uppercase tracking-widest">
                    {t('sidebar.navigation')}
                </div>
            </div>

            {/* Menu Items */}
            <nav className="py-2">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`
              flex items-center px-4 py-3 cursor-pointer text-sm font-medium 
              transition-all duration-200 ease-in-out
              border-l-3 hover:bg-gray-50
              ${activeTab === item.id
                                ? 'bg-blue-50 text-blue-600 border-l-blue-600'
                                : 'text-gray-700 border-l-transparent hover:text-gray-900'
                            }
            `}
                    >
                        <span className="mr-3 text-lg">
                            {item.icon}
                        </span>
                        <span className="text-sm">
                            {item.label}
                        </span>
                    </div>
                ))}
            </nav>

            {/* Separator */}
            <div className="h-px bg-gray-200 mx-3 my-4"></div>

            {/* Support Section */}
            <div className="px-4 pb-6">
                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
                    SUPPORT
                </div>

                <div className="flex items-center text-gray-600 text-xs py-2 cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 hover:bg-gray-50 rounded px-2 -mx-2">
                    <MdHelp className="mr-3 text-base" />
                    Help Center
                </div>

                <div className="flex items-center text-gray-600 text-xs py-2 cursor-pointer transition-all duration-200 ease-in-out hover:text-gray-900 hover:bg-gray-50 rounded px-2 -mx-2">
                    <MdInfo className="mr-3 text-base" />
                    Documentation
                </div>
            </div>
        </div>
    )
}