"use client";

import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Icon } from './Icons';
export * from './Icons';

// ============================================
// Button Component
// ============================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent text-background hover:bg-accent-hover hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/25',
    secondary: 'bg-card border border-border text-foreground hover:border-accent/50',
    outline: 'border border-border text-foreground hover:border-accent hover:text-accent hover:bg-accent/5',
    ghost: 'text-foreground/70 hover:text-foreground hover:bg-border/30',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20',
    gradient: 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ============================================
// Input Component
// ============================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Input({
  label,
  error,
  helperText,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-foreground/80">{label}</label>
      )}
      <input
        className={`w-full px-4 py-3 bg-background/50 border ${
          error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
        } rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-foreground/40 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
      {helperText && !error && <p className="text-foreground/50 text-sm mt-1.5">{helperText}</p>}
    </div>
  );
}

// ============================================
// Select Component
// ============================================

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className = '',
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-foreground/80">{label}</label>
      )}
      <select
        className={`w-full px-4 py-3 bg-background/50 border ${
          error ? 'border-red-500' : 'border-border'
        } rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
}

// ============================================
// Textarea Component
// ============================================

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1.5 text-foreground/80">{label}</label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-background/50 border ${
          error ? 'border-red-500' : 'border-border'
        } rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none placeholder:text-foreground/40 ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </div>
  );
}

// ============================================
// Card Component
// ============================================

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  gradient?: boolean;
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  gradient = false,
}: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={`${gradient ? 'bg-gradient-to-br from-card to-card/80' : 'bg-card'} border border-border rounded-2xl ${paddings[padding]} ${
        hover ? 'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ============================================
// Stat Card Component - Updated with gradient option
// ============================================

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon?: string;
  gradient?: 'orange' | 'blue' | 'green' | 'purple' | 'pink';
}

export function StatCard({
  label,
  value,
  change,
  positive = true,
  icon,
  gradient,
}: StatCardProps) {
  const gradients = {
    orange: 'from-orange-500/20 to-pink-500/10 border-orange-500/30',
    blue: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30',
    green: 'from-green-500/20 to-emerald-500/10 border-green-500/30',
    purple: 'from-purple-500/20 to-pink-500/10 border-purple-500/30',
    pink: 'from-pink-500/20 to-rose-500/10 border-pink-500/30',
  };

  // Check if icon is an icon name (no emojis)
  const isIconName = icon && !icon.match(/[\u{1F300}-\u{1F9FF}]/u);

  return (
    <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${
      gradient ? `bg-gradient-to-br ${gradients[gradient]}` : 'bg-card border-border hover:border-accent/30'
    }`}>
      <div className="flex items-center justify-between mb-3">
        {icon && (
          isIconName ? (
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Icon name={icon} size={20} />
            </div>
          ) : (
            <span className="text-2xl">{icon}</span>
          )
        )}
        {change && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              positive
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-foreground/60 text-sm">{label}</p>
    </div>
  );
}

// ============================================
// Badge Component
// ============================================

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
}: BadgeProps) {
  const variants = {
    default: 'bg-border/80 text-foreground/70',
    success: 'bg-green-500/15 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
    error: 'bg-red-500/15 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    accent: 'bg-accent/15 text-accent border border-accent/30',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}

// ============================================
// Toggle Component
// ============================================

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all ${
        checked ? 'bg-gradient-to-r from-orange-500 to-pink-500' : 'bg-border'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// ============================================
// Modal Component
// ============================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${sizes[size]} bg-gradient-to-br from-card to-card/95 border border-border/80 rounded-2xl p-6 animate-scale-in max-h-[90vh] overflow-auto shadow-2xl`}
      >
        {title && (
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-border">
            <h3 className="text-xl font-bold">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-border/50 rounded-xl transition-colors text-foreground/60 hover:text-foreground"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ============================================
// Empty State Component
// ============================================

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  icon = 'chat',
  title,
  description,
  action,
}: EmptyStateProps) {
  // Check if icon is an icon name (no emojis)
  const isIconName = icon && !icon.match(/[\u{1F300}-\u{1F9FF}]/u);
  
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-5 text-accent">
        {isIconName ? (
          <Icon name={icon} size={40} />
        ) : (
          <span className="text-4xl">{icon}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-foreground/60 text-sm max-w-sm mb-5">{description}</p>
      )}
      {action}
    </div>
  );
}

// ============================================
// Table Component
// ============================================

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <p className="text-foreground/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gradient-to-r from-accent/5 to-transparent">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left px-6 py-4 text-sm font-semibold text-foreground/70 ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-border/50 last:border-0 transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-accent/5' : 'hover:bg-border/20'
                } ${index % 2 === 1 ? 'bg-background/30' : ''}`}
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-6 py-4 ${column.className || ''}`}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// Tabs Component
// ============================================

interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills';
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
}: TabsProps) {
  if (variant === 'pills') {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20'
                : 'bg-card border border-border hover:border-accent/50 hover:bg-accent/5'
            }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
            activeTab === tab.id
              ? 'border-accent text-accent'
              : 'border-transparent text-foreground/60 hover:text-foreground'
          }`}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ============================================
// Confirm Dialog Component
// ============================================

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
          variant === 'danger' ? 'bg-red-500/20' : 'bg-accent/20'
        }`}>
          <Icon name={variant === 'danger' ? 'exclamation' : 'help'} size={32} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-foreground/60 text-sm mb-6">{description}</p>
        )}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            onClick={onConfirm}
            loading={loading}
            className="flex-1"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ============================================
// Toast / Alert Component
// ============================================

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  onClose?: () => void;
}

export function Alert({
  type = 'info',
  title,
  children,
  onClose,
}: AlertProps) {
  const types = {
    info: 'bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border-blue-500/30 text-blue-400',
    success: 'bg-gradient-to-r from-green-500/15 to-emerald-500/10 border-green-500/30 text-green-400',
    warning: 'bg-gradient-to-r from-yellow-500/15 to-orange-500/10 border-yellow-500/30 text-yellow-400',
    error: 'bg-gradient-to-r from-red-500/15 to-pink-500/10 border-red-500/30 text-red-400',
  };

  const icons = {
    info: 'info',
    success: 'check-circle',
    warning: 'exclamation',
    error: 'x-mark',
  };

  return (
    <div className={`border rounded-xl p-4 ${types[type]}`}>
      <div className="flex items-start gap-3">
        <Icon name={icons[type]} size={20} />
        <div className="flex-1">
          {title && <p className="font-medium mb-1">{title}</p>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
        {onClose && (
          <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// Dashboard Header Component
// ============================================

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function DashboardHeader({
  title,
  subtitle,
  children,
}: DashboardHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-card via-card/95 to-card/90 border-b border-border px-6 py-4 sticky top-0 z-10 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">{title}</h1>
          {subtitle && <p className="text-foreground/60 text-sm">{subtitle}</p>}
        </div>
        {children && (
          <div className="flex items-center gap-3">
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================
// Sidebar Component
// ============================================

interface SidebarTab {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  tabs: SidebarTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  user?: { name?: string; email?: string };
  userRole: string;
  roleColor?: string;
  onLogout: () => void;
}

export function Sidebar({
  tabs,
  activeTab,
  onTabChange,
  isOpen,
  onToggle,
  user,
  userRole,
  roleColor = 'accent',
  onLogout,
}: SidebarProps) {
  const colorMap: Record<string, string> = {
    accent: 'bg-accent/20 text-accent',
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400',
  };

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-card via-card to-card/95 border-r border-border transition-all duration-300 flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-border/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        {isOpen && <span className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Merch Nest</span>}
      </div>

      {/* User info */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${colorMap[roleColor] || colorMap.accent} flex items-center justify-center font-bold flex-shrink-0`}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          {isOpen && (
            <div className="min-w-0">
              <p className="font-medium truncate">{user?.name}</p>
              <p className={`text-xs truncate ${roleColor === 'accent' ? 'text-accent' : `text-${roleColor}-400`}`}>{userRole}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20'
                : 'hover:bg-border/50 text-foreground/70 hover:text-foreground'
            }`}
          >
            <span className="flex-shrink-0">
              <Icon name={tab.icon} size={20} />
            </span>
            {isOpen && <span className="font-medium text-sm">{tab.label}</span>}
          </button>
        ))}
      </nav>

      {/* Toggle & Logout */}
      <div className="p-3 border-t border-border/50 space-y-1">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl hover:bg-border/50 transition-colors text-foreground/60"
        >
          <svg className={`w-5 h-5 transition-transform ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 transition-all"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {isOpen && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// ============================================
// Notification Bell Component
// ============================================

interface NotificationBellProps {
  count: number;
  onClick?: () => void;
}

export function NotificationBell({ count, onClick }: NotificationBellProps) {
  return (
    <button 
      onClick={onClick}
      className="relative p-2.5 hover:bg-border/50 rounded-xl transition-colors group"
    >
      <svg className="w-5 h-5 text-foreground/60 group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {count > 0 && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}

// ============================================
// Page Container Component
// ============================================

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {children}
    </div>
  );
}
