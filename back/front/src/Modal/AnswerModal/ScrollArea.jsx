import React, { forwardRef } from 'react';
import styles from './ScrollArea.module.scss';
const ScrollArea = forwardRef(({ children, className, onWheel, ...props }, ref) => {
  return (
    <div 
      ref={ref}
      className={`${styles.scrollArea} ${className || ''}`} 
      onWheel={onWheel}
      {...props}
    >
      <div className={styles.scrollContent}>
        {children}
      </div>
    </div>
  );
});
ScrollArea.displayName = 'ScrollArea';
export default ScrollArea;
