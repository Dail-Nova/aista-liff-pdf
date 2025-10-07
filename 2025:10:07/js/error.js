// ========================================
// js/error.js - エラー表示（超シンプル版）
// ========================================

window.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 error.html 読み込み完了');
  
  // 背景確認（デバッグ）
  console.log('📊 背景確認:', {
    bgContainer: document.getElementById('bg-container'),
    mathSymbols: document.querySelectorAll('.math-symbol').length
  });
  
  // エラーメッセージ表示
  const errorMessage = sessionStorage.getItem('errorMessage') || 'エラーが発生しました';
  const errorDiv = document.getElementById('errorMessage');
  if (errorDiv) {
    errorDiv.textContent = errorMessage;
  }
  
  console.log('✅ エラー表示完了');
});