"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MdBarChart,
  MdSync,
  MdAssignment,
  MdMap,
  MdCheckCircle,
  MdPending,
  MdFileCopy,
  MdDashboard,
  MdTrendingUp,
  MdCloudDone,
  MdSchedule,
  MdPersonAdd,
  MdLocationOn,
  MdDescription,
  MdNotifications,
  MdSettings,
  MdRefresh
} from "react-icons/md"

export default function SurveyDashboard() {
  const [stats, setStats] = useState({
    todaySubmissions: 7,
    pendingSync: 0,
    totalClaims: 142,
    completionRate: 89
  })
  const [isOnline, setIsOnline] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Check online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }
    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    updateOnlineStatus()
    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      clearInterval(timeInterval)
    }
  }, [])

  const StatusIndicator = ({ isOnline }) => (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${isOnline ? 'bg-green-500/20 text-green-200 border-green-400/30' : 'bg-red-500/20 text-red-200 border-red-400/30'}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></span>
      {isOnline ? "Online" : "Offline"}
    </span>
  )

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900 border-b border-slate-700 shadow-lg">
        <div className="max-w-6xl mx-auto px-0 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/15 backdrop-blur-sm rounded-lg flex items-center justify-center text-white text-lg border border-white/20">
              <MdDashboard />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Survey Dashboard</h1>
              <div className="text-xs text-slate-300 flex items-center gap-1">
                <MdSchedule className="text-xs" />
                {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white">
              <MdNotifications className="text-lg" />
            </button>
            <button className="p-1.5 hover:bg-white/10 rounded-lg transition text-slate-300 hover:text-white">
              <MdSettings className="text-lg" />
            </button>
            <div className="text-xs text-slate-300 font-medium flex items-center gap-1">
              <MdSchedule className="text-xs" />
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <StatusIndicator isOnline={isOnline} />
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Primary Action Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-lg mb-8 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <MdPersonAdd className="text-lg" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">New Survey Registration</h2>
            </div>
            <p className="text-gray-600">Document a new FRA claim with our streamlined, guided registration process</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MdLocationOn className="text-blue-500" /> GPS Enabled
              </span>
              <span className="flex items-center gap-1">
                <MdDescription className="text-green-500" /> Document Upload
              </span>
            </div>
          </div>
          <Link href="/register/new" className="inline-block relative z-10">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg px-8 py-3 flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              <MdAssignment className="text-xl" />
              <span>Start New Registration</span>
            </button>
          </Link>
        </section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <MdTrendingUp className="text-blue-600" />
            Today's Performance
          </h3>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition">
            <MdRefresh className="text-lg" />
            Refresh
          </button>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Today's Submissions */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Claims Submitted Today</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.todaySubmissions}</div>
                <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                  <MdCheckCircle />
                  Successfully processed
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                <MdTrendingUp />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          {/* Sync Status */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Data Synchronization</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.pendingSync}</div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${stats.pendingSync === 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
                  {stats.pendingSync === 0 ? <MdCloudDone /> : <MdPending />}
                  {stats.pendingSync === 0 ? 'All synchronized' : 'Items pending'}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg ${stats.pendingSync === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-yellow-500 to-yellow-600'}`}>
                {stats.pendingSync === 0 ? <MdCloudDone /> : <MdPending />}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className={`h-2 rounded-full ${stats.pendingSync === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'}`} style={{ width: stats.pendingSync === 0 ? '100%' : '70%' }}></div>
            </div>
          </div>
          {/* Total Progress */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Total Claims Registered</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stats.totalClaims}</div>
                <div className="flex items-center gap-1 text-xs text-purple-600 font-semibold">
                  <MdCheckCircle />
                  {stats.completionRate}% completion rate
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
                <MdFileCopy />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: `${stats.completionRate}%` }}></div>
            </div>
          </div>
        </section>
        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MdDashboard className="text-blue-600" />
          Quick Actions
        </h3>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* New Registration Card */}
          <Link href="/register/new" className="block group">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 transform group-hover:scale-105 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 text-white text-2xl shadow-lg relative z-10">
                <MdPersonAdd />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">New FRA Claim Registration</h4>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">Document a new Forest Rights Act claim with guided step-by-step process</p>
              <div className="flex items-center justify-between">
                <div className="text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition flex items-center gap-1">
                  Start Registration
                  <MdAssignment className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </Link>
          {/* GPS Survey Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gray-400/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center mb-4 text-white text-2xl shadow-lg relative z-10">
              <MdLocationOn />
            </div>
            <h4 className="text-lg font-bold text-gray-500 mb-2">GPS Land Survey</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">Advanced GPS mapping and boundary survey tools for precise measurements</p>
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm font-semibold flex items-center gap-1">
                Coming Soon
                <MdSchedule />
              </div>
              <div className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">Beta</div>
            </div>
          </div>
          {/* Document Review Card */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gray-400/10 rounded-full -translate-y-8 translate-x-8"></div>
            <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center mb-4 text-white text-2xl shadow-lg relative z-10">
              <MdDescription />
            </div>
            <h4 className="text-lg font-bold text-gray-500 mb-2">Document Review</h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">Review and validate submitted claims and documentation with AI assistance</p>
            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm font-semibold flex items-center gap-1">
                Coming Soon
                <MdSchedule />
              </div>
              <div className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">AI</div>
            </div>
          </div>
        </section>
        <h3 className="text-lg font-bold text-gray-800 mt-8 mb-6 flex items-center gap-2">
          <MdNotifications className="text-purple-600" />
          Recent Activity
        </h3>
        <section className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {[
            { time: "2 mins ago", action: "Claim #FRA-2024-047 registered successfully", status: "success", icon: MdCheckCircle, color: "green" },
            { time: "15 mins ago", action: "Document verification completed", status: "info", icon: MdCloudDone, color: "blue" },
            { time: "1 hour ago", action: "GPS coordinates captured for plot survey", status: "info", icon: MdLocationOn, color: "purple" },
            { time: "2 hours ago", action: "Biometric data processed", status: "success", icon: MdTrendingUp, color: "green" }
          ].map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div key={index} className={`flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors duration-150 relative ${index < 3 ? 'border-b border-gray-100' : ''}`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${activity.color === 'green' ? 'bg-green-500' : activity.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${activity.color === 'green' ? 'bg-gradient-to-br from-green-400 to-green-500' :
                  activity.color === 'blue' ? 'bg-gradient-to-br from-blue-400 to-blue-500' :
                    'bg-gradient-to-br from-purple-400 to-purple-500'
                  }`}>
                  <IconComponent className="text-lg" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-800 font-semibold mb-1">{activity.action}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MdSchedule className="text-xs" />
                    {activity.time}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${activity.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                  {activity.status === 'success' ? 'Completed' : 'Processing'}
                </div>
              </div>
            );
          })}
          <div className="p-4 text-center border-t border-gray-100 bg-gray-50">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 mx-auto transition-colors">
              View All Activities
              <MdRefresh className="text-sm" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}