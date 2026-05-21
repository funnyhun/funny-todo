'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Target, Network, BarChart3, Award, Settings } from 'lucide-react';
import { styles } from './Navigation.style';

const NAV_ITEMS = [
  { label: 'Tasks', href: '/', icon: Target },
  { label: 'Nodes', href: '/nodes', icon: Network },
  { label: 'Stats', href: '#', icon: BarChart3 },
  { label: 'Badges', href: '#', icon: Award },
  { label: 'Settings', href: '#', icon: Settings },
];

export const Navigation = () => {
  const pathname = usePathname();
  const isCanvas = pathname === '/nodes';

  if (isCanvas) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside style={styles.sidebar} className="hidden xl:flex">
        <div style={styles.logoContainer}>
          <h1 style={styles.logoTitle}>IDEA-FLOW</h1>
          <p style={styles.logoSub}>Control Center</p>
        </div>

        <nav style={styles.navContainer}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.label}
                href={item.href}
                className={`sidebar-link w-full ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav style={styles.mobileNav} className="xl:hidden pb-safe">
        <div style={styles.mobileFlex}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.label}
                href={item.href}
                style={{
                  ...styles.mobileItem,
                  color: isActive ? 'var(--primary)' : '#94a3b8',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span style={{
                  ...styles.mobileLabel,
                  color: isActive ? 'var(--primary)' : '#94a3b8',
                }}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="active-dot"
                    className="w-1.5 h-1.5 bg-primary rounded-full mt-0.5"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
