// ========================================
// js/main.js - メイン機能
// ========================================

const LIFF_ID = '2008235357-glQqmdnP';
const WORKER_URL = 'https://aista-pdf-processor.luminalice-reg-tea-sun-red-9b0.workers.dev/upload-pdf';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 5;

let currentUserId = null;
let currentDisplayName = null;
let selectedFiles = [];

// ========================================
// ページ初期化（最優先で数式を生成）
// ========================================
window.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOMContentLoaded');
  
  // ★最優先: 数式を生成
  if (typeof generateMathSymbols === 'function') {
    generateMathSymbols();
  } else {
    console.error('❌ formulas.js が読み込まれていません');
  }
  
  // 背景確認
  setTimeout(() => {
    const bgContainer = document.getElementById('bg-container');
    const mathSymbols = document.querySelectorAll('.math-symbol');
    
    console.log('📊 背景確認:');
    console.log('  - bg-container:', bgContainer);
    console.log('  - 数式の数:', mathSymbols.length);
    
    if (mathSymbols.length === 27) {
      console.log('✅✅✅ 数式27個確認！背景表示成功！');
    } else {
      console.error('❌ 数式が' + mathSymbols.length + '個しかありません');
    }
  }, 500);
});

// ========================================
// 完全読み込み後の初期化
// ========================================
window.addEventListener('load', function() {
  console.log('🚀 完全読み込み完了');
  
  // ユーザー情報取得
  currentUserId = sessionStorage.getItem('userId');
  currentDisplayName = sessionStorage.getItem('displayName');
  
  if (!currentUserId || !currentDisplayName) {
    console.log('❌ ユーザー情報なし → index.htmlへ');
    window.location.href = 'index.html';
    return;
  }
  
  console.log('✅ ユーザー:', currentDisplayName);
  
  // LIFF SDK初期化
  if (typeof liff !== 'undefined') {
    liff.init({ liffId: LIFF_ID }).catch(err => console.error('LIFF初期化エラー:', err));
  }
  
  // ユーザー情報を表示
  const userNameEl = document.getElementById('userName');
  const userIdEl = document.getElementById('userId');
  if (userNameEl) userNameEl.textContent = currentDisplayName;
  if (userIdEl) userIdEl.textContent = currentUserId.substring(0, 20) + '...';
  
  // イベントリスナー設定
  const selectBtn = document.getElementById('selectBtn');
  const fileInput = document.getElementById('fileInput');
  const uploadBtn = document.getElementById('uploadBtn');
  
  if (selectBtn) selectBtn.addEventListener('click', () => fileInput.click());
  if (fileInput) fileInput.addEventListener('change', handleFileSelect);
  if (uploadBtn) uploadBtn.addEventListener('click', uploadFiles);
  
  console.log('✅ 初期化完了');
});

// ========================================
// ファイル選択
// ========================================
function handleFileSelect(event) {
  const files = Array.from(event.target.files);
  console.log(`📂 ${files.length}個のファイル選択`);

  if (selectedFiles.length + files.length > MAX_FILES) {
    alert(`最大${MAX_FILES}ファイルまでです`);
    return;
  }

  for (const file of files) {
    if (file.type !== 'application/pdf') {
      alert(`${file.name}はPDFファイルではありません`);
      continue;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(`${file.name}は10MBを超えています`);
      continue;
    }
    if (selectedFiles.some(f => f.name === file.name)) {
      alert(`${file.name}は既に追加されています`);
      continue;
    }
    selectedFiles.push(file);
  }

  updateFileList();
  event.target.value = '';
}

// ========================================
// ファイルリスト更新
// ========================================
function updateFileList() {
  const fileListDiv = document.getElementById('fileList');
  const uploadBtn = document.getElementById('uploadBtn');
  const fileCountSpan = document.getElementById('fileCount');

  if (selectedFiles.length === 0) {
    if (fileListDiv) fileListDiv.style.display = 'none';
    if (uploadBtn) uploadBtn.style.display = 'none';
    return;
  }

  if (fileListDiv) fileListDiv.style.display = 'block';
  if (uploadBtn) uploadBtn.style.display = 'flex';
  if (fileCountSpan) fileCountSpan.textContent = selectedFiles.length;

  const totalSize = selectedFiles.reduce((sum, f) => sum + f.size, 0);
  
  if (fileListDiv) {
    fileListDiv.innerHTML = `
      <div class="file-list-header">
        <strong>選択中のファイル (${selectedFiles.length}/${MAX_FILES}件)</strong><br>
        <small>合計サイズ: ${(totalSize / 1024 / 1024).toFixed(2)} MB</small>
      </div>
      ${selectedFiles.map((file, index) => `
        <div class="file-item">
          <div class="file-item-info">
            <div class="file-item-name">📎 ${file.name}</div>
            <div class="file-item-size">📊 ${(file.size / 1024).toFixed(2)} KB</div>
          </div>
          <button class="file-item-remove" onclick="window.removeFileAt(${index})">×削除</button>
        </div>
      `).join('')}
      <button class="file-add-more" onclick="document.getElementById('fileInput').click()">
        ➕ ファイルを追加
      </button>
    `;
  }
}

// ========================================
// ファイル削除
// ========================================
window.removeFileAt = function(index) {
  selectedFiles.splice(index, 1);
  updateFileList();
};

// ========================================
// アップロード
// ========================================
async function uploadFiles() {
  if (selectedFiles.length === 0) {
    alert('ファイルが選択されていません');
    return;
  }

  console.log(`🚀 アップロード開始: ${selectedFiles.length}ファイル`);
  
  const uploadBtn = document.getElementById('uploadBtn');
  const selectBtn = document.getElementById('selectBtn');
  const statusDiv = document.getElementById('status');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  
  if (uploadBtn) uploadBtn.disabled = true;
  if (selectBtn) selectBtn.disabled = true;
  
  if (statusDiv) {
    statusDiv.style.display = 'block';
    statusDiv.className = 'status status-info';
    statusDiv.textContent = `📤 ${selectedFiles.length}件のファイルをアップロード中...`;
  }
  
  if (progressBar) progressBar.style.display = 'block';
  if (progressFill) progressFill.style.width = '10%';

  try {
    const filesData = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (statusDiv) statusDiv.textContent = `🔄 変換中... (${i + 1}/${selectedFiles.length})`;
      if (progressFill) progressFill.style.width = (10 + (i / selectedFiles.length) * 40) + '%';
      
      const base64 = await fileToBase64(file);
      filesData.push({
        fileName: file.name,
        fileData: base64,
        fileSize: file.size
      });
    }

    if (progressFill) progressFill.style.width = '60%';
    
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: currentUserId,
        displayName: currentDisplayName,
        files: filesData
      })
    });

    if (progressFill) progressFill.style.width = '90%';

    if (!response.ok) {
      throw new Error(`アップロード失敗 (${response.status})`);
    }

    const result = await response.json();
    console.log('✅ アップロード成功:', result);
    
    if (progressFill) progressFill.style.width = '100%';
    if (statusDiv) {
      statusDiv.className = 'status status-success';
      statusDiv.textContent = '✅ 処理中です。結果はLINEトークで確認してください';
    }
    
    setTimeout(() => {
      if (typeof liff !== 'undefined' && liff.isInClient()) {
        liff.closeWindow();
      } else {
        alert('処理完了しました。LINEアプリで結果を確認してください。');
      }
    }, 2000);

  } catch (error) {
    console.error('❌ アップロードエラー:', error);
    if (statusDiv) {
      statusDiv.className = 'status status-error';
      statusDiv.textContent = '❌ エラー: ' + error.message;
    }
    if (uploadBtn) uploadBtn.disabled = false;
    if (selectBtn) selectBtn.disabled = false;
    if (progressBar) progressBar.style.display = 'none';
  }
}

// ========================================
// Base64変換
// ========================================
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}