
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowLeftRight,
  Bell,
  Search,
  Menu,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  MoreHorizontal,
  CalendarDays,
  TrendingUp,
  CreditCard,
  Settings,
  CircleHelp,
} from 'lucide-react'

import './App.css'

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Customers', icon: Users },
  { name: 'Accounts', icon: Wallet },
  { name: 'Transactions', icon: ArrowLeftRight },
  { name: 'Notifications', icon: Bell },
]

const stats = [
  {
    title: 'Total Customers',
    value: '2,450',
    change: '+12.5%',
    description: 'Compared to last month',
    icon: Users,
    color: 'blue',
  },
  {
    title: 'Total Balance',
    value: '845,250 DT',
    change: '+8.2%',
    description: 'Compared to last month',
    icon: Wallet,
    color: 'purple',
  },
  {
    title: 'Transactions',
    value: '12,840',
    change: '+18.4%',
    description: 'Compared to last month',
    icon: ArrowLeftRight,
    color: 'green',
  },
  {
    title: 'Active Accounts',
    value: '1,820',
    change: '+5.6%',
    description: 'Compared to last month',
    icon: CreditCard,
    color: 'orange',
  },
]

const transactions = [
  {
    name: 'Ahmed Ben Ali',
    email: 'ahmed.benali@example.com',
    type: 'Transfer',
    date: '12 Nov 2026',
    amount: '-250.00 DT',
    status: 'Completed',
    direction: 'out',
  },
  {
    name: 'Sami Trabelsi',
    email: 'sami.trabelsi@example.com',
    type: 'Deposit',
    date: '12 Nov 2026',
    amount: '+1,200.00 DT',
    status: 'Completed',
    direction: 'in',
  },
  {
    name: 'Mohamed Salah',
    email: 'mohamed.salah@example.com',
    type: 'Payment',
    date: '11 Nov 2026',
    amount: '-85.00 DT',
    status: 'Pending',
    direction: 'out',
  },
  {
    name: 'Amira Mansour',
    email: 'amira.mansour@example.com',
    type: 'Deposit',
    date: '10 Nov 2026',
    amount: '+500.00 DT',
    status: 'Completed',
    direction: 'in',
  },
]

function Sidebar({ activePage, setActivePage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">
            <Wallet size={23} />
          </div>
          <div>
            <h2>Finova</h2>
            <span>Financial Management</span>
          </div>
        </div>

        <div className="nav-section">
          <p className="nav-label">MENU</p>

          {navigation.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? 'active' : ''
                }`}
                onClick={() => {
                  setActivePage(item.name)
                  setMobileOpen(false)
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>

                {item.name === 'Notifications' && (
                  <span className="notification-count">4</span>
                )}
              </button>
            )
          })}
        </div>

        <div className="sidebar-bottom">
          <p className="nav-label">SUPPORT</p>

          <button className="nav-item">
            <CircleHelp size={19} />
            <span>Help Center</span>
          </button>

          <button className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="sidebar-profile">
            <div className="avatar">AM</div>
            <div className="profile-info">
              <strong>Admin Manager</strong>
              <span>Administrator</span>
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>
    </>
  )
}

function Header({ activePage, setMobileOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="breadcrumb">Pages / {activePage}</p>
          <h2>{activePage}</h2>
        </div>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder="Search anything..." />
          <span>⌘ K</span>
        </div>

        <button className="icon-button notification-button">
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="header-avatar">AM</div>
      </div>
    </header>
  )
}

function StatCard({ stat }) {
  const Icon = stat.icon

  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon ${stat.color}`}>
          <Icon size={21} />
        </div>
        <button className="more-button">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <p className="stat-title">{stat.title}</p>
      <h3>{stat.value}</h3>

      <div className="stat-footer">
        <span className="stat-change">
          <TrendingUp size={14} />
          {stat.change}
        </span>
        <span>{stat.description}</span>
      </div>
    </div>
  )
}

function OverviewChart() {
  const bars = [
    { month: 'May', height: 45 },
    { month: 'Jun', height: 65 },
    { month: 'Jul', height: 52 },
    { month: 'Aug', height: 80 },
    { month: 'Sep', height: 60 },
    { month: 'Oct', height: 92 },
    { month: 'Nov', height: 75 },
  ]

  return (
    <div className="chart-card">
      <div className="card-heading">
        <div>
          <h3>Financial Overview</h3>
          <p>Transaction activity during the last 7 months</p>
        </div>

        <button className="period-button">
          <CalendarDays size={15} />
          Last 7 months
          <ChevronDown size={15} />
        </button>
      </div>

      <div className="chart-summary">
        <h2>245,850 DT</h2>
        <span className="stat-change">
          <TrendingUp size={14} /> +14.8%
        </span>
      </div>

      <div className="chart">
        <div className="chart-grid">
          <span>300K</span>
          <span>200K</span>
          <span>100K</span>
          <span>0</span>
        </div>

        <div className="chart-bars">
          {bars.map((bar) => (
            <div className="chart-column" key={bar.month}>
              <div className="bar-track">
                <div
                  className={`bar ${
                    bar.month === 'Oct' ? 'highlight-bar' : ''
                  }`}
                  style={{ height: `${bar.height}%` }}
                />
              </div>
              <span>{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-legend">
        <span className="legend-dot" />
        Transaction volume
      </div>
    </div>
  )
}

function RecentTransactions() {
  return (
    <div className="transactions-card">
      <div className="card-heading">
        <div>
          <h3>Recent Transactions</h3>
          <p>Latest financial activities</p>
        </div>

        <button className="view-all-button">
          View all <ArrowUpRight size={15} />
        </button>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>
                  <div className="customer-cell">
                    <div className={`transaction-avatar avatar-${index}`}>
                      {transaction.direction === 'in' ? (
                        <ArrowDownLeft size={17} />
                      ) : (
                        <ArrowUpRight size={17} />
                      )}
                    </div>
                    <div>
                      <strong>{transaction.name}</strong>
                      <span>{transaction.email}</span>
                    </div>
                  </div>
                </td>

                <td>{transaction.type}</td>
                <td>{transaction.date}</td>

                <td
                  className={
                    transaction.direction === 'in'
                      ? 'amount-positive'
                      : 'amount-negative'
                  }
                >
                  {transaction.amount}
                </td>

                <td>
                  <span
                    className={`status ${
                      transaction.status === 'Completed'
                        ? 'completed'
                        : 'pending'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <>
      <section className="welcome-section">
        <div>
          <h1>Welcome back, Admin 👋</h1>
          <p>Here is what's happening with your financial system today.</p>
        </div>

        <button className="date-filter">
          <CalendarDays size={17} />
          November 2026
          <ChevronDown size={16} />
        </button>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </section>

      <section className="dashboard-grid">
        <OverviewChart />

        <div className="quick-card">
          <div className="card-heading">
            <div>
              <h3>Quick Overview</h3>
              <p>System summary</p>
            </div>
            <MoreHorizontal size={20} />
          </div>

          <div className="quick-item">
            <div className="quick-icon blue">
              <Users size={19} />
            </div>
            <div>
              <strong>Customers</strong>
              <span>Registered users</span>
            </div>
            <b>2,450</b>
          </div>

          <div className="quick-item">
            <div className="quick-icon purple">
              <Wallet size={19} />
            </div>
            <div>
              <strong>Accounts</strong>
              <span>All bank accounts</span>
            </div>
            <b>1,820</b>
          </div>

          <div className="quick-item">
            <div className="quick-icon green">
              <ArrowLeftRight size={19} />
            </div>
            <div>
              <strong>Transactions</strong>
              <span>Total operations</span>
            </div>
            <b>12,840</b>
          </div>

          <div className="quick-item">
            <div className="quick-icon orange">
              <Bell size={19} />
            </div>
            <div>
              <strong>Notifications</strong>
              <span>System messages</span>
            </div>
            <b>24</b>
          </div>
        </div>
      </section>

      <RecentTransactions />

      <p className="demo-notice">
        Demo interface — displayed figures are temporary and not connected to
        the backend yet.
      </p>
    </>
  )
}

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main-content">
        <Header
          activePage={activePage}
          setMobileOpen={setMobileOpen}
        />

        <div className="page-content">
          {activePage === 'Dashboard' ? (
            <Dashboard />
          ) : (
            <div className="placeholder-page">
              <h1>{activePage}</h1>
              <p>
                The {activePage.toLowerCase()} page will be developed in the
                next steps.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
