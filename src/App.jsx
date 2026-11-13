
import { useState, useEffect } from 'react'
import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from './services/customerService'
import {
  getAccounts,
  createAccount,
  updateAccountStatus,
} from './services/accountService'
import { getTransactions } from './services/transactionService'
import { getNotifications } from './services/notificationService'
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


function OverviewChart({ transactions = [] }) {
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']

  const bars = months.map((month, index) => {
    const now = new Date()
    const targetMonth = new Date(
      now.getFullYear(),
      now.getMonth() - (6 - index),
      1
    )

    const total = transactions
      .filter((transaction) => {
        if (!transaction.createdAt) return false

        const date = new Date(transaction.createdAt)

        return (
          date.getMonth() === targetMonth.getMonth() &&
          date.getFullYear() === targetMonth.getFullYear()
        )
      })
      .reduce(
        (sum, transaction) => sum + Number(transaction.amount || 0),
        0
      )

    return {
      month,
      total,
    }
  })

  const maxTotal = Math.max(...bars.map((bar) => bar.total), 1)

  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount || 0),
    0
  )

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
        <h2>
          {totalAmount.toLocaleString('fr-TN', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })} DT
        </h2>
        <span className="stat-change">
          {transactions.length} transactions
        </span>
      </div>

      <div className="chart">
        <div className="chart-grid">
          <span>{maxTotal.toFixed(0)}</span>
          <span>{(maxTotal * 0.66).toFixed(0)}</span>
          <span>{(maxTotal * 0.33).toFixed(0)}</span>
          <span>0</span>
        </div>

        <div className="chart-bars">
          {bars.map((bar) => (
            <div className="chart-column" key={bar.month}>
              <div className="bar-track">
                <div
                  className="bar"
                  style={{
                    height: `${(bar.total / maxTotal) * 100}%`,
                  }}
                />
              </div>
              <span>{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-legend">
        <span className="legend-dot" />
        Transaction volume (DT)
      </div>
    </div>
  )
}



function RecentTransactions({
  transactions = [],
  accounts = [],
  customers = [],
}) {
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const getCustomer = (accountId) => {
    const account = accounts.find(
      (item) => Number(item.id) === Number(accountId)
    )

    if (!account) return null

    return customers.find(
      (customer) => Number(customer.id) === Number(account.customerId)
    )
  }

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
            {recentTransactions.length === 0 ? (
              <tr>
                <td colSpan="5">No transactions found.</td>
              </tr>
            ) : (
              recentTransactions.map((transaction, index) => {
                const customer = getCustomer(transaction.sourceAccountId)
                const direction =
                  transaction.sourceAccountId != null ? 'out' : 'in'

                const status =
                  transaction.status?.toUpperCase() || 'PENDING'

                return (
                  <tr key={transaction.id}>
                    <td>
                      <div className="customer-cell">
                        <div className={`transaction-avatar avatar-${index}`}>
                          {direction === 'in' ? (
                            <ArrowDownLeft size={17} />
                          ) : (
                            <ArrowUpRight size={17} />
                          )}
                        </div>

                        <div>
                          <strong>
                            {customer
                              ? `${customer.firstName} ${customer.lastName}`
                              : `Transaction #${transaction.id}`}
                          </strong>
                          <span>
                            {customer?.email || `Account #${transaction.sourceAccountId}`}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>Transfer</td>

                    <td>
                      {transaction.createdAt
                        ? new Date(transaction.createdAt).toLocaleString('fr-TN')
                        : '—'}
                    </td>

                    <td className="amount-negative">
                      -{Number(transaction.amount || 0).toFixed(3)} DT
                    </td>

                    <td>
                      <span
                        className={`status ${
                          status === 'COMPLETED' ? 'completed' : 'pending'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}



function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    customers: [],
    accounts: [],
    transactions: [],
    notifications: [],
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

    const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError('')

      const [customers, accounts, transactions, notifications] =
        await Promise.all([
          getCustomers(),
          getAccounts(),
          getTransactions(),
          getNotifications(),
        ])

      setDashboardData({
        customers,
        accounts,
        transactions,
        notifications,
      })
    } catch (err) {
      console.error('Dashboard error:', err)
      setError('Unable to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const totalBalance = dashboardData.accounts.reduce(
    (total, account) => total + Number(account.balance || 0),
    0
  )

  const activeAccounts = dashboardData.accounts.filter(
    (account) => account.status?.toUpperCase() === 'ACTIVE'
  ).length

  const stats = [
    {
      title: 'Total Customers',
      value: dashboardData.customers.length.toLocaleString(),
      change: 'Live',
      description: 'Real backend data',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Total Balance',
      value: `${totalBalance.toLocaleString('fr-TN', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })} DT`,
      change: 'Live',
      description: 'All account balances',
      icon: Wallet,
      color: 'purple',
    },
    {
      title: 'Transactions',
      value: dashboardData.transactions.length.toLocaleString(),
      change: 'Live',
      description: 'Total operations',
      icon: ArrowLeftRight,
      color: 'green',
    },
    {
      title: 'Active Accounts',
      value: activeAccounts.toLocaleString(),
      change: 'Live',
      description: 'Active bank accounts',
      icon: CreditCard,
      color: 'orange',
    },
  ]

  return (
    <>
      <section className="welcome-section">
  <div>
    <h1>Welcome back, Admin</h1>
    <p>Here is what's happening with your financial system today.</p>
  </div>

  <div className="welcome-actions">
    <button
      className="date-filter"
      onClick={fetchDashboardData}
      disabled={loading}
    >
      <span>{loading ? 'Refreshing...' : 'Refresh Dashboard'}</span>
    </button>
  </div>
</section>

      {loading ? (
        <p className="customers-message">Loading dashboard data...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <section className="stats-grid">
            {stats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </section>

          <section className="dashboard-grid">
            <OverviewChart transactions={dashboardData.transactions} />

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
                <b>{dashboardData.customers.length}</b>
              </div>

              <div className="quick-item">
                <div className="quick-icon purple">
                  <Wallet size={19} />
                </div>
                <div>
                  <strong>Accounts</strong>
                  <span>All bank accounts</span>
                </div>
                <b>{dashboardData.accounts.length}</b>
              </div>

              <div className="quick-item">
                <div className="quick-icon green">
                  <ArrowLeftRight size={19} />
                </div>
                <div>
                  <strong>Transactions</strong>
                  <span>Total operations</span>
                </div>
                <b>{dashboardData.transactions.length}</b>
              </div>

              <div className="quick-item">
                <div className="quick-icon orange">
                  <Bell size={19} />
                </div>
                <div>
                  <strong>Notifications</strong>
                  <span>System messages</span>
                </div>
                <b>{dashboardData.notifications.length}</b>
              </div>
            </div>
          </section>

          <RecentTransactions
  transactions={dashboardData.transactions}
  accounts={dashboardData.accounts}
  customers={dashboardData.customers}
/>
        </>
      )}
    </>
  )
}



function CustomersPage() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [editingCustomer, setEditingCustomer] = useState(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getCustomers()
      setCustomers(data)
    } catch (err) {
      console.error('Error fetching customers:', err)
      setError('Unable to load customers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleEditCustomer = (customer) => {
  setEditingCustomer(customer)

  setFormData({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
  })

  setShowForm(true)
  setError('')
  setSuccess('')
}

  const handleAddCustomer = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)
      setError('')
      setSuccess('')

      await createCustomer(formData)

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      })

      setShowForm(false)
      setSuccess('Customer added successfully!')

      await fetchCustomers()
    } catch (err) {
      console.error('Error adding customer:', err)
      setError(
        err.response?.data?.message || 'Unable to add customer.'
      )
    } finally {
      setSaving(false)
    }
  }
  const handleUpdateCustomer = async (e) => {
  e.preventDefault()

  try {
    setSaving(true)
    setError('')
    setSuccess('')

    await updateCustomer(editingCustomer.id, formData)

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    })

    setEditingCustomer(null)
    setShowForm(false)
    setSuccess('Customer updated successfully!')

    await fetchCustomers()
  } catch (err) {
    console.error('Error updating customer:', err)
    setError(
      err.response?.data?.message || 'Unable to update customer.'
    )
  } finally {
    setSaving(false)
  }
}
const handleDeleteCustomer = async (customer) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`
  )

  if (!confirmed) return

  try {
    setError('')
    setSuccess('')

    await deleteCustomer(customer.id)

    setSuccess('Customer deleted successfully!')

    await fetchCustomers()
  } catch (err) {
    console.error('Error deleting customer:', err)
    setError(
      err.response?.data?.message || 'Unable to delete customer.'
    )
  }
}

  if (loading) {
    return <div className="customers-message">Loading customers...</div>
  }

  return (
    <div className="management-page customers-page">
      <div className="customers-heading">
        <div>
          <h1>Customers Management</h1>
          <p>Manage all registered customers in your system.</p>
        </div>

        <div>
          <span className="customers-total">
            Total: {customers.length}
          </span>

          <button
            className="add-customer-button"
            onClick={() => {
              setError('')
              setSuccess('')
              setShowForm(!showForm)
            }}
          >
            + Add Customer
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {success && (
        <div className="success-message">{success}</div>
      )}

      {showForm && (
        <div className="transactions-card customer-form-card">
          <h3>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</h3>

          <form onSubmit={editingCustomer ? handleUpdateCustomer : handleAddCustomer}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            <button type="submit" disabled={saving}>
              {saving
  ? 'Saving...'
  : editingCustomer
    ? 'Update Customer'
    : 'Save Customer'}
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {customers.length === 0 ? (
        <div className="customers-message">
          No customers found.
        </div>
      ) : (
        <div className="transactions-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>#{customer.id}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
  <div className="customer-actions">
    <button
      className="edit-customer-button"
      onClick={() => handleEditCustomer(customer)}
    >
      Edit
    </button>

    <button
      className="delete-customer-button"
      onClick={() => handleDeleteCustomer(customer)}
    >
      Delete
    </button>
  </div>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}


function AccountsPage() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
const [saving, setSaving] = useState(false)
const [success, setSuccess] = useState('')
const [formData, setFormData] = useState({
  accountNumber: '',
  customerId: '',
  balance: '',
  status: 'ACTIVE',
})

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getAccounts()
        setAccounts(data)
      } catch (err) {
        console.error('Error fetching accounts:', err)
        setError('Unable to load accounts. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])
  const handleInputChange = (e) => {
  const { name, value } = e.target

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }))
}

const handleCreateAccount = async (e) => {
  e.preventDefault()

  try {
    setSaving(true)
    setError('')
    setSuccess('')

    const newAccount = {
      accountNumber: formData.accountNumber.trim(),
      customerId: Number(formData.customerId),
      balance: Number(formData.balance),
      status: formData.status,
    }

    await createAccount(newAccount)

    const updatedAccounts = await getAccounts()
    setAccounts(updatedAccounts)

    setFormData({
      accountNumber: '',
      customerId: '',
      balance: '',
      status: 'ACTIVE',
    })

    setShowForm(false)
    setSuccess('Account created successfully!')
  } catch (err) {
    console.error('Error creating account:', err)
    setError('Unable to create account. Please check the information.')
  } finally {
    setSaving(false)
  }
}

const handleStatusChange = async (account) => {
  const newStatus = account.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'

  try {
    setError('')
    setSuccess('')

    const updatedAccount = await updateAccountStatus(account.id, newStatus)

    setAccounts((prev) =>
      prev.map((item) =>
        item.id === account.id ? updatedAccount : item
      )
    )

    setSuccess(`Account ${newStatus.toLowerCase()} successfully!`)
  } catch (err) {
    console.error('Error updating account status:', err)
    setError('Unable to update account status.')
  }
}

  if (loading) {
    return <div className="customers-message">Loading accounts...</div>
  }

  

  return (
    <div className="management-page accounts-page">
      <div className="customers-heading">
  <div>
    <h1>Accounts Management</h1>
    <p>Manage all bank accounts in your system.</p>
  </div>

  <div className="customers-heading-actions">
    <span className="customers-total">
      Total: {accounts.length}
    </span>

    <button
      className="add-customer-button"
      onClick={() => {
        setShowForm(!showForm)
        setError('')
        setSuccess('')
      }}
    >
      + Add Account
    </button>
  </div>
</div>

{success && (
  <div className="customers-message success-message">
    {success}
  </div>
)}

{error && (
  <div className="customers-message error-message">
    {error}
  </div>
)}

{showForm && (
  <div className="customer-form-card">
    <h3>Add New Account</h3>

    <form onSubmit={handleCreateAccount}>
      <div className="customer-form-grid">
        <div className="form-group">
          <label>Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Example: TN00100004"
            required
          />
        </div>

        <div className="form-group">
          <label>Customer ID</label>
          <input
            type="number"
            name="customerId"
            value={formData.customerId}
            onChange={handleInputChange}
            placeholder="Enter customer ID"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Initial Balance (DT)</label>
          <input
            type="number"
            name="balance"
            value={formData.balance}
            onChange={handleInputChange}
            placeholder="0.000"
            min="0"
            step="0.001"
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="BLOCKED">BLOCKED</option>
          </select>
        </div>
      </div>

      <div className="customer-form-actions">
        <button
          type="submit"
          className="save-customer-button"
          disabled={saving}
        >
          {saving ? 'Creating...' : 'Create Account'}
        </button>

        <button
          type="button"
          className="cancel-button"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

      {accounts.length === 0 ? (
        <div className="customers-message">No accounts found.</div>
      ) : (
        <div className="transactions-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Account Number</th>
                  <th>Customer ID</th>
                  <th>Balance</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account) => (
                  <tr key={account.id}>
                    <td>#{account.id}</td>
                    <td>{account.accountNumber}</td>
                    <td>#{account.customerId}</td>
                    <td>{Number(account.balance).toFixed(2)} DT</td>
                    <td>
  <span className={`account-status ${account.status.toLowerCase()}`}>
    {account.status}
  </span>
</td>
<td>
  <button
    className={
      account.status === 'ACTIVE'
        ? 'delete-customer-button'
        : 'edit-customer-button'
    }
    onClick={() => handleStatusChange(account)}
  >
    {account.status === 'ACTIVE' ? 'Block' : 'Activate'}
  </button>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function TransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getTransactions()
        setTransactions(data)
      } catch (err) {
        console.error('Error fetching transactions:', err)
        setError('Unable to load transactions. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  if (loading) {
    return <div className="customers-message">Loading transactions...</div>
  }

  if (error) {
    return <div className="customers-message error-message">{error}</div>
  }

  return (
    <div className="management-page transactions-page">
      <div className="customers-heading">
        <div>
          <h1>Transactions Management</h1>
          <p>Monitor all financial transactions in your system.</p>
        </div>

        <span className="customers-total">
          Total: {transactions.length}
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="customers-message">No transactions found.</div>
      ) : (
        <div className="transactions-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Source Account</th>
                  <th>Destination Account</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>#{transaction.id}</td>
                    <td>#{transaction.sourceAccountId}</td>
                    <td>#{transaction.destinationAccountId}</td>
                    <td>{Number(transaction.amount).toFixed(2)} DT</td>
                    <td>
                      <span
                        className={`account-status ${transaction.status.toLowerCase()}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td>
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}


function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getNotifications()
        setNotifications(data)
      } catch (err) {
        console.error('Error fetching notifications:', err)
        setError('Unable to load notifications. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  if (loading) {
    return <div className="customers-message">Loading notifications...</div>
  }

  if (error) {
    return <div className="customers-message error-message">{error}</div>
  }

  return (
    <div className="management-page notifications-page">
      <div className="customers-heading">
        <div>
          <h1>Notifications Management</h1>
          <p>Monitor all system notifications.</p>
        </div>

        <span className="customers-total">
          Total: {notifications.length}
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="customers-message">No notifications found.</div>
      ) : (
        <div className="transactions-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Message</th>
                  <th>Recipient</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>

              <tbody>
                {notifications.map((notification) => (
                  <tr key={notification.id}>
                    <td>#{notification.id}</td>
                    <td>{notification.message}</td>
                    <td>{notification.recipient}</td>
                    <td>#{notification.transactionId}</td>
                    <td>
                      <span
                        className={`account-status ${notification.status.toLowerCase()}`}
                      >
                        {notification.status}
                      </span>
                    </td>
                    <td>
                      {new Date(notification.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
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
) : activePage === 'Customers' ? (
  <CustomersPage />
) : activePage === 'Accounts' ? (
  <AccountsPage />
) : activePage === 'Transactions' ? (
  <TransactionsPage />
) : activePage === 'Notifications' ? (
  <NotificationsPage />
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
