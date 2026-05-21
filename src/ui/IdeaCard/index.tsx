'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusBadge } from '../Badge';
import { styles } from './IdeaCard.style';

interface IdeaCardProps {
  title: string;
  content: string;
  status: 'locked' | 'ready' | 'smashed' | 'in-progress';
  type?: 'idea' | 'blog';
  onAction?: () => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ 
  title, 
  content, 
  status, 
  type = 'idea',
  onAction 
}) => {
  const isInteractable = status === 'ready' || status === 'in-progress';
  const isSmashed = status === 'smashed';

  // Apply conditional card styles
  const cardStyle: React.CSSProperties = {
    ...styles.card,
    ...(isSmashed ? styles.smashedCard : {}),
    cursor: isInteractable ? 'pointer' : 'default',
  };

  const titleStyle: React.CSSProperties = {
    ...styles.title,
    ...(isSmashed ? styles.smashedTitle : {}),
  };

  const dotStyle: React.CSSProperties = {
    ...styles.indicatorDot,
    ...(isSmashed ? styles.indicatorDotActive : {}),
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isInteractable ? { 
        translateY: -6, 
        boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.08)',
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        borderColor: 'rgba(2, 132, 199, 0.4)',
        transition: { type: 'spring', stiffness: 300, damping: 15 } 
      } : {}}
      className="glass-container"
      style={cardStyle}
      onClick={onAction}
    >
      {/* Level / Status Badge */}
      <div className="absolute -top-4 -left-2 z-10">
        <StatusBadge status={status} />
      </div>
      
      <div style={styles.innerContainer}>
        <h3 style={titleStyle}>
          {title}
        </h3>
        <p style={styles.content}>
          {content}
        </p>
        
        <div style={styles.footer}>
          <div style={styles.indicatorContainer}>
            <div style={dotStyle} />
            <span style={styles.unitLabel}>
              {type} unit
            </span>
          </div>
          
          <AnimatePresence mode="wait">
            {isSmashed ? (
              <motion.div 
                key="smashed"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                style={{
                  ...styles.actionButton,
                  background: 'rgba(16, 185, 129, 0.15)',
                  borderColor: 'rgba(16, 185, 129, 0.3)',
                  color: '#059669',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </motion.div>
            ) : (
              <motion.div 
                key="action"
                whileHover={isInteractable ? { scale: 1.1, backgroundColor: 'rgba(2, 132, 199, 0.25)' } : {}}
                whileTap={isInteractable ? { scale: 0.95 } : {}}
                style={{
                  ...styles.actionButton,
                  ...(isInteractable ? styles.actionButtonInteractable : styles.actionButtonDisabled),
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
