"use client";

import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
export * from './Icons';

// Animation variants
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// ============================================
// Button Component
// ============================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
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
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border hover:scale-[1.02] active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-accent border-accent text-[#0a0a0a] hover:bg-accent-hover hover:border-accent-hover',
    secondary: 'bg-card border-border text-foreground hover:border-accent/50 hover:bg-card-hover',
    outline: 'bg-transparent border-border text-foreground hover:border-accent hover:text-accent',
    ghost: 'bg-transparent border-transparent text-[#888] hover:text-foreground hover:bg-border/30',
    danger: 'bg-transparent border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500',
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
        <label className="block text-sm font-medium mb-2 text-[#888]">{label}</label>
      )}
      <input
        className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
          error ? 'border-red-500 focus:border-red-500' : 'border-[#222] focus:border-accent'
        } rounded-xl focus:outline-none transition-colors placeholder:text-[#555] ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {helperText && !error && <p className="text-[#666] text-sm mt-2">{helperText}</p>}
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
        <label className="block text-sm font-medium mb-2 text-[#888]">{label}</label>
      )}
      <select
        className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
          error ? 'border-red-500' : 'border-[#222]'
        } rounded-xl focus:outline-none focus:border-accent transition-colors ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
        <label className="block text-sm font-medium mb-2 text-[#888]">{label}</label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
          error ? 'border-red-500' : 'border-[#222]'
        } rounded-xl focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-[#555] ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
  animate?: boolean;
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  animate = false,
}: CardProps) {
  const paddings = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2 },
  } : {};

  return (
    <Component
      className={`bg-[#111] border border-[#222] rounded-2xl ${paddings[padding]} ${
        hover ? 'hover:border-[#333] transition-colors duration-200 cursor-pointer' : ''
      } ${className}`}
      {...animationProps}
    >
      {children}
    </Component>
  );
}

// ============================================
// Stat Card Component
// ============================================

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  positive?: boolean;
  icon?: string;
}

export function StatCard({
  label,
  value,
  change,
  positive = true,
  icon,
}: StatCardProps) {
  const isIconName = icon && !icon.match(/[\u{1F300}-\u{1F9FF}]/u);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#111] border border-[#222] rounded-2xl p-5 hover:border-accent/50 transition-colors duration-200"
    >
      <div className="flex items-center justify-between mb-4">
        {icon && (
          isIconName ? (
            <div className="w-10 h-10 rounded-xl border border-accent/30 bg-accent/5 flex items-center justify-center text-accent">
              <Icon name={icon} size={18} />
            </div>
          ) : (
            <span className="text-2xl">{icon}</span>
          )
        )}
        {change && (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              positive
                ? 'border-green-500/30 text-green-400'
                : 'border-red-500/30 text-red-400'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold mb-1">{value}</p>
      <p className="text-[#888] text-sm">{label}</p>
    </motion.div>
  );
}

// ============================================
// Badge Component
// ============================================

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
}: BadgeProps) {
  const variants = {
    default: 'border-[#333] text-[#888]',
    success: 'border-green-500/50 text-green-400',
    warning: 'border-yellow-500/50 text-yellow-400',
    error: 'border-red-500/50 text-red-400',
    info: 'border-blue-500/50 text-blue-400',
    accent: 'border-accent/50 text-accent',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border bg-transparent ${variants[variant]} ${sizes[size]}`}
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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors border ${
        checked ? 'bg-accent border-accent' : 'bg-[#222] border-[#333]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <motion.span
        animate={{ x: checked ? 22 : 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="inline-block h-4 w-4 rounded-full bg-white"
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
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`relative w-full ${sizes[size]} bg-[#111] border border-[#222] rounded-2xl p-6 max-h-[90vh] overflow-auto`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {title && (
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#222]">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#222] rounded-xl transition-colors text-[#888] hover:text-foreground"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const isIconName = icon && !icon.match(/[\u{1F300}-\u{1F9FF}]/u);
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-16 h-16 rounded-2xl border border-[#222] bg-[#111] flex items-center justify-center mb-5 text-[#666]">
        {isIconName ? (
          <Icon name={icon} size={28} />
        ) : (
          <span className="text-3xl">{icon}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-[#888] text-sm max-w-sm mb-5">{description}</p>
      )}
      {action}
    </motion.div>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Column<any>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="bg-[#111] border border-[#222] rounded-2xl p-8 text-center">
        <p className="text-[#888]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#222]">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#888] ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <motion.tr
                key={keyExtractor(item)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-[#222] last:border-0 transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-[#161616]' : 'hover:bg-[#161616]'
                }`}
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-6 py-4 ${column.className || ''}`}>
                    {column.render
                      ? column.render(item)
                      : String(item[column.key] ?? '')}
                  </td>
                ))}
              </motion.tr>
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
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
              activeTab === tab.id
                ? 'bg-accent border-accent text-[#0a0a0a]'
                : 'bg-transparent border-[#222] text-[#888] hover:border-[#333] hover:text-foreground'
            }`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 border-b border-[#222]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
            activeTab === tab.id
              ? 'border-accent text-accent'
              : 'border-transparent text-[#888] hover:text-foreground'
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
        <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl border flex items-center justify-center ${
          variant === 'danger' ? 'border-red-500/30 text-red-400' : 'border-accent/30 text-accent'
        }`}>
          <Icon name={variant === 'danger' ? 'exclamation' : 'help'} size={28} />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-[#888] text-sm mb-6">{description}</p>
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
// Alert Component
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
    info: 'border-blue-500/30 text-blue-400',
    success: 'border-green-500/30 text-green-400',
    warning: 'border-yellow-500/30 text-yellow-400',
    error: 'border-red-500/30 text-red-400',
  };

  const icons = {
    info: 'info',
    success: 'check-circle',
    warning: 'exclamation',
    error: 'x-mark',
  };

  return (
    <motion.div 
      className={`border rounded-xl p-4 bg-[#111] ${types[type]}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
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
    </motion.div>
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
    <header className="bg-[#0a0a0a] border-b border-[#222] px-6 py-5 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-[#888] text-sm mt-0.5">{subtitle}</p>}
        </motion.div>
        {children && (
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {children}
          </motion.div>
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
  onLogout,
}: SidebarProps) {
  return (
    <motion.aside 
      className="bg-[#0a0a0a] border-r border-[#222] flex flex-col h-screen"
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-[#222] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-accent bg-accent/10 flex items-center justify-center flex-shrink-0">
          <span className="text-accent font-bold text-lg">M</span>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.span 
              className="font-semibold text-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              Merch Nest
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-[#222]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-accent/50 bg-accent/10 flex items-center justify-center font-semibold text-accent flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="min-w-0"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <p className="font-medium truncate text-sm">{user?.name}</p>
                <p className="text-xs text-accent">{userRole}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border ${
              activeTab === tab.id
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-transparent hover:border-[#222] hover:bg-[#111] text-[#888] hover:text-foreground'
            }`}
          >
            <span className="flex-shrink-0">
              <Icon name={tab.icon} size={20} />
            </span>
            <AnimatePresence>
              {isOpen && (
                <motion.span 
                  className="font-medium text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {tab.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </nav>

      {/* Toggle & Logout */}
      <div className="p-3 border-t border-[#222] space-y-1">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[#111] border border-transparent hover:border-[#222] transition-colors text-[#888]"
        >
          <motion.svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ rotate: isOpen ? 0 : 180 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </motion.svg>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:border-red-500/30 hover:bg-red-500/5 text-red-400 transition-all"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <AnimatePresence>
            {isOpen && (
              <motion.span 
                className="font-medium text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
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
    <motion.button 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative p-2.5 hover:bg-[#111] border border-transparent hover:border-[#222] rounded-xl transition-colors group"
    >
      <svg className="w-5 h-5 text-[#888] group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {count > 0 && (
        <motion.span 
          className="absolute top-1 right-1 w-4 h-4 bg-accent border border-[#0a0a0a] rounded-full text-[10px] font-bold text-[#0a0a0a] flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </motion.button>
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
    <motion.div 
      className={`p-6 space-y-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
