import React, { useCallback } from 'react';
import styles from '../InlineEditor.module.css';
import { useAuth } from '@site/src/auth/contexts/AuthContext';

interface EditorHeaderProps {
  documentPath: string;
  repoInfo?: { owner: string; repo: string } | null;
}

/**
 * エディターのヘッダーコンポーネント
 */
export default function EditorHeader({ documentPath, repoInfo }: EditorHeaderProps) {
  const { logout } = useAuth();
  
  const onLogout = useCallback(() => {
    logout();
    // Reload so DocItem gate re-evaluates auth and shows login prompt if still in edit mode
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, [logout]);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h3 className={styles.title}>📝 Document Editor</h3>
        <span className={styles.path}>{documentPath || '/unknown'}</span>
        {repoInfo && (
          <span className={styles.repoIndicator}>
            {repoInfo.owner === 'moorestech' ? (
              <>
                <span className={styles.repoIcon}>📚</span>
                <span className={styles.repoText}>Original</span>
              </>
            ) : (
              <>
                <span className={styles.repoIcon}>🍴</span>
                <span className={styles.repoText}>Fork: {repoInfo.owner}/{repoInfo.repo}</span>
              </>
            )}
          </span>
        )}
      </div>
      <div className={styles.headerRight}>
        <button 
          className={styles.exitButton}
          onClick={onLogout}
          title="Logout"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
}
