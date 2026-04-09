import { useState } from 'react';
import Editor from './components/Editor';
import { Card } from '@/components/ui/card';

export default function App() {
  const [initialContent, setInitialContent] = useState(() => {
    const saved = localStorage.getItem('kata-editor-content');
    return saved || "<p>བཀྲ་ཤིས་བདེ་ལེགས།</p>";
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main>
        <Editor initialContent={initialContent} />
      </main>

      <footer className="text-center text-slate-400 text-xs py-8 border-t border-slate-200">
        <a 
          href="https://apps.apple.com/app/kata-tibetan-translation/id6757205139" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-slate-600 transition-colors"
        >
          © 2026 卡塔藏译 · 支持喜马拉雅键盘映射
        </a>
      </footer>
    </div>
  );
}
