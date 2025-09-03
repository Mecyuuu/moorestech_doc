import React, { useCallback } from 'react';
import styles from '../InlineEditor.module.css';
import { logout } from '@site/src/auth/github';

interface EditorHeaderProps {
  documentPath: string;
  onExitEditMode: () => void;
}

/**
 * エディターのヘッダーコンポーネント
 */
export default function EditorHeader({ documentPath, onExitEditMode }: EditorHeaderProps) {
  const onLogout = useCallback(() => {
    logout();
    // Reload so DocItem gate re-evaluates auth and shows login prompt if still in edit mode
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h3 className={styles.title}>📝 Document Editor</h3>
        <span className={styles.path}>{documentPath || '/unknown'}</span>
      </div>
      <div className={styles.headerRight}>
        <button 
          className={styles.exitButton}
          onClick={onLogout}
          title="Logout"
        >
          🔓 Logout
        </button>
        <button 
          className={styles.exitButton}
          onClick={onExitEditMode}
          title="Exit Edit Mode"
        >
          👁️ View Mode
        </button>
      </div>
    </div>
  );
}
