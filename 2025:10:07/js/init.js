// ========================================
// js/init.js - LIFF初期化（超シンプル版）
// ========================================

const LIFF_ID = '2008235357-glQqmdnP';

// ========================================
// LIFF初期化
// ========================================
window.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 LIFF初期化開始');
  
  // LIFF SDK確認
  if (typeof liff === 'undefined') {
    console.error('❌ LIFF SDKが読み込まれていません');
    window.location.href = 'error.html';
    return;
  }

  // LIFF初期化
  liff.init({ liffId: LIFF_ID, withLoginOnExternalBrowser: true })
    .then(() => {
      console.log('✅ LIFF初期化成功');
      
      // ログイン確認
      if (!liff.isLoggedIn()) {
        console.log('⚠️ 未ログイン → ログイン画面へ');
        liff.login();
        return;
      }
      
      // プロフィール取得
      return liff.getProfile();
    })
    .then((profile) => {
      if (!profile) return;
      
      console.log('✅ ユーザー情報取得:', profile.displayName);
      
      // sessionStorageに保存
      sessionStorage.setItem('userId', profile.userId);
      sessionStorage.setItem('displayName', profile.displayName);
      
      // main.htmlへ遷移
      console.log('🔄 main.htmlへリダイレクト');
      window.location.href = 'main.html';
    })
    .catch((err) => {
      console.error('❌ LIFF初期化エラー:', err);
      window.location.href = 'error.html';
    });
});