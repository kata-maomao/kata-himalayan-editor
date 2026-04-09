import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Image as ImageIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Keyboard,
  Globe,
  Palette,
  FileText,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useCallback, useRef, useEffect } from 'react';
import { TibetanKeyboardProcessor } from '@/src/lib/tibetan-keyboard';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import { Languages } from 'lucide-react';

type Language = 'bo' | 'zh' | 'en';

const translations = {
  bo: {
    title: 'ཀ་ཏ་ཧི་མ་ལ་ཡ་རྩོམ་སྒྲིག་ཆས་།',
    inputMode: 'ནང་འཇུག་བྱེད་སྟངས་།',
    himalayan: 'ཧི་མ་ལ་ཡ།',
    system: 'རྒྱུད་ཁོངས་།',
    bold: 'སྦོམ་པོ།',
    italic: 'གཟུར་བྲིས།',
    underline: 'འོག་ཐིག',
    h1: 'ཁ་བྱང་ ༡',
    h2: 'ཁ་བྱང་ ༢',
    zoomIn: 'ཆེར་གཏོང་།',
    zoomOut: 'ཆུང་གཏོང་།',
    bulletList: 'མཚོན་རྟགས་ཐོ་འགོད།',
    orderedList: 'ཨང་རིམ་ཐོ་འགོད།',
    alignLeft: 'གཡོན་སྒྲིག',
    alignCenter: 'དཀྱིལ་སྒྲིག',
    alignRight: 'གཡས་སྒྲིག',
    insertImage: 'འདྲ་པར་བཅུག་པ།',
    textColor: 'ཡི་གེའི་ཚོན་མདོག',
    downloadWord: 'Word ཕབ་ལེན།',
    langBo: 'བོད་ཡིག',
    langZh: '中文',
    langEn: 'English',
    langSwitch: 'སྐད་ཡིག་བརྗེ་བ།'
  },
  zh: {
    title: '卡塔喜马拉雅编辑器',
    inputMode: '输入模式',
    himalayan: '喜马拉雅',
    system: '系统输入',
    bold: '加粗',
    italic: '斜体',
    underline: '下划线',
    h1: '标题 1',
    h2: '标题 2',
    zoomIn: '放大字号',
    zoomOut: '缩小字号',
    bulletList: '无序列表',
    orderedList: '有序列表',
    alignLeft: '左对齐',
    alignCenter: '居中对齐',
    alignRight: '右对齐',
    insertImage: '插入图片',
    textColor: '文字颜色',
    downloadWord: '下载为 Word',
    langBo: 'བོད་ཡིག',
    langZh: '中文',
    langEn: 'English',
    langSwitch: '切换语言'
  },
  en: {
    title: 'Kata Himalayan Editor',
    inputMode: 'Input Mode',
    himalayan: 'Himalayan',
    system: 'System',
    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    h1: 'Heading 1',
    h2: 'Heading 2',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    bulletList: 'Bullet List',
    orderedList: 'Ordered List',
    alignLeft: 'Align Left',
    alignCenter: 'Align Center',
    alignRight: 'Align Right',
    insertImage: 'Insert Image',
    textColor: 'Text Color',
    downloadWord: 'Download Word',
    langBo: 'Tibetan',
    langZh: 'Chinese',
    langEn: 'English',
    langSwitch: 'Switch Language'
  }
};

interface EditorProps {
  initialContent?: string;
}

export default function Editor({ initialContent = '' }: EditorProps) {
  const [inputMode, setInputMode] = useState<'system' | 'himalayan'>('himalayan');
  const [fontSize, setFontSize] = useState(1.5);
  const [uiLang, setUiLang] = useState<Language>(() => {
    const saved = localStorage.getItem('kata-ui-lang');
    return (saved as Language) || 'zh';
  });
  const keyboardProcessor = useRef(new TibetanKeyboardProcessor());

  useEffect(() => {
    localStorage.setItem('kata-ui-lang', uiLang);
  }, [uiLang]);

  const t = translations[uiLang];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg shadow-md max-w-full h-auto my-4',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      localStorage.setItem('kata-editor-content', html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[500px] p-8 bg-white shadow-sm border rounded-md Tibetan-font',
      },
      handleKeyDown: (view, event) => {
        // Toggle input mode shortcut: Shift + K (when not typing content)
        // Note: To avoid conflict with typing uppercase 'K', we check if it's just Shift + K
        if (event.shiftKey && event.key === 'K' && !event.ctrlKey && !event.metaKey && !event.altKey) {
          // If we are in himalayan mode, 'K' would normally produce '༃'
          // To make it a toggle, we've decided to use Shift+K. 
          // However, 'K' is a valid character in the map.
          // Let's use a more unique shortcut or keep it as is if the user insists.
          // User asked for "shift+k".
          setInputMode(prev => prev === 'system' ? 'himalayan' : 'system');
          return true;
        }

        if (inputMode === 'system') return false;

        // Ignore modifier keys
        if (event.ctrlKey || event.altKey || event.metaKey) return false;
        
        // Handle special keys
        if (event.key === 'Backspace' || event.key === 'Enter' || event.key === 'Tab' || event.key === 'Escape') {
          keyboardProcessor.current.reset();
          return false;
        }

        // Process key
        const output = keyboardProcessor.current.processKey(event.key);
        
        if (output !== null) {
          if (output !== '') {
            view.dispatch(view.state.tr.insertText(output));
          }
          return true; // Handled
        }

        return false;
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('请输入图片 URL');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const colors = [
    { name: '默认', value: 'inherit' },
    { name: '红色', value: '#ef4444' },
    { name: '蓝色', value: '#3b82f6' },
    { name: '绿色', value: '#22c55e' },
    { name: '黄色', value: '#eab308' },
    { name: '紫色', value: '#a855f7' },
    { name: '橙色', value: '#f97316' },
    { name: '灰色', value: '#64748b' },
  ];

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 z-20 bg-[#f5f5f5]/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
          <header className="flex items-center justify-between">
            <a 
              href="https://apps.apple.com/app/kata-tibetan-translation/id6757205139" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <h1 className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                {t.title}
              </h1>
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 text-slate-600">
                  <Languages className="w-4 h-4" />
                  <span className="text-xs font-medium hidden sm:inline">
                    {uiLang === 'bo' ? 'བོད་ཡིག' : uiLang === 'zh' ? '中文' : 'English'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setUiLang('bo')} className="text-sm">
                  བོད་ཡིག (Tibetan)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUiLang('zh')} className="text-sm">
                  中文 (Chinese)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUiLang('en')} className="text-sm">
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          <div className="flex flex-wrap items-center gap-1 p-1.5 bg-white border rounded-lg shadow-sm">
            <TooltipProvider>
              <div className="flex items-center gap-2 px-3 mr-2 border-r">
                <Switch 
                  id="input-mode" 
                  checked={inputMode === 'himalayan'}
                  onCheckedChange={(checked) => setInputMode(checked ? 'himalayan' : 'system')}
                />
                <Label htmlFor="input-mode" className="flex items-center gap-1 text-xs font-medium cursor-pointer">
                  {inputMode === 'himalayan' ? <Keyboard className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  <span className="hidden sm:inline">
                    {inputMode === 'himalayan' ? t.himalayan : t.system}
                  </span>
                  <span className="text-[10px] opacity-50 ml-1">(Shift+K)</span>
                </Label>
              </div>

              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive('bold')}
                icon={<Bold className="w-4 h-4" />}
                tooltip={t.bold}
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive('italic')}
                icon={<Italic className="w-4 h-4" />}
                tooltip={t.italic}
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive('underline')}
                icon={<UnderlineIcon className="w-4 h-4" />}
                tooltip={t.underline}
              />

              <Separator orientation="vertical" className="h-6 mx-1" />

              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive('heading', { level: 1 })}
                icon={<Heading1 className="w-4 h-4" />}
                tooltip={t.h1}
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('heading', { level: 2 })}
                icon={<Heading2 className="w-4 h-4" />}
                tooltip={t.h2}
              />

              <Separator orientation="vertical" className="h-6 mx-1" />

              <ToolbarButton 
                onClick={() => setFontSize(prev => Math.min(prev + 0.1, 3))}
                icon={<ZoomIn className="w-4 h-4" />}
                tooltip={t.zoomIn}
              />
              <ToolbarButton 
                onClick={() => setFontSize(prev => Math.max(prev - 0.1, 0.5))}
                icon={<ZoomOut className="w-4 h-4" />}
                tooltip={t.zoomOut}
              />

              <Separator orientation="vertical" className="h-6 mx-1" />

              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
                icon={<List className="w-4 h-4" />}
                tooltip={t.bulletList}
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
                icon={<ListOrdered className="w-4 h-4" />}
                tooltip={t.orderedList}
              />

              <Separator orientation="vertical" className="h-6 mx-1" />

              <ToolbarButton 
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                active={editor.isActive({ textAlign: 'left' })}
                icon={<AlignLeft className="w-4 h-4" />}
                tooltip={t.alignLeft}
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                active={editor.isActive({ textAlign: 'center' })}
                icon={<AlignCenter className="w-4 h-4" />}
                tooltip={t.alignCenter}
              />
              <ToolbarButton 
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                active={editor.isActive({ textAlign: 'right' })}
                icon={<AlignRight className="w-4 h-4" />}
                tooltip={t.alignRight}
              />

              <Separator orientation="vertical" className="h-6 mx-1" />

              <ToolbarButton 
                onClick={addImage}
                icon={<ImageIcon className="w-4 h-4" />}
                tooltip={t.insertImage}
              />

              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" type="button">
                        <Palette className="w-4 h-4" style={{ color: editor.getAttributes('textStyle').color }} />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>{t.textColor}</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start" className="grid grid-cols-4 gap-2 p-2 w-auto">
                  {colors.map((color) => (
                    <DropdownMenuItem
                      key={color.value}
                      onClick={() => editor.chain().focus().setColor(color.value).run()}
                      className="w-6 h-6 p-0 flex items-center justify-center rounded-full border cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.value === 'inherit' ? 'transparent' : color.value }}
                    >
                      {color.value === 'inherit' && <span className="text-[8px]">X</span>}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator orientation="vertical" className="h-6 mx-1" />

              <ToolbarButton 
                onClick={async () => {
                  const html = editor.getHTML();
                  // Add some basic styling for Word
                  const fullHtml = `
                    <!DOCTYPE html>
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                      <head>
                        <meta charset="utf-8">
                        <title>Tibetan Document</title>
                        <!--[if gte mso 9]>
                        <xml>
                          <w:WordDocument>
                            <w:View>Print</w:View>
                            <w:Zoom>100</w:Zoom>
                            <w:DoNotOptimizeForBrowser/>
                          </w:WordDocument>
                        </xml>
                        <![endif]-->
                        <style>
                          p { margin: 0; padding: 0; line-height: 1.2; font-family: 'Microsoft Himalaya', 'Tibetan Machine Uni', serif; font-size: 16pt; }
                          h1 { font-size: 24pt; }
                          h2 { font-size: 20pt; }
                        </style>
                      </head>
                      <body>
                        ${html}
                      </body>
                    </html>
                  `;
                  const blob = await asBlob(fullHtml, { orientation: 'portrait', margins: { top: 720, right: 720, bottom: 720, left: 720 } });
                  saveAs(blob as Blob, 'tibetan-document.docx');
                }}
                icon={<FileText className="w-4 h-4" />}
                tooltip={t.downloadWord}
              />
            </TooltipProvider>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 py-6">
        <div className="relative">
          <EditorContent editor={editor} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .Tibetan-font {
          font-family: 'Microsoft Himalaya', 'Tibetan Machine Uni', 'Noto Sans Tibetan', 'PingFang SC', 'Microsoft YaHei', sans-serif;
          line-height: 1.2;
        }
        .prose {
          max-width: none !important;
        }
        .prose p {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          /* Base font size for mixed content */
          font-size: ${fontSize}rem; 
        }
        /* Specific adjustments for Tibetan characters to make them look larger relative to Chinese */
        .Tibetan-font p, .Tibetan-font h1, .Tibetan-font h2 {
          /* Tibetan characters in these fonts often need a scale-up or larger base size */
        }
        .prose h1 { font-size: ${fontSize * 1.8}rem; }
        .prose h2 { font-size: ${fontSize * 1.5}rem; }
        
        .prose h1, .prose h2 {
          font-family: 'Microsoft Himalaya', 'Tibetan Machine Uni', 'Noto Sans Tibetan', sans-serif;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
      `}} />
    </div>
  );
}

function ToolbarButton({ onClick, active, icon, tooltip }: { onClick: () => void, active?: boolean, icon: React.ReactNode, tooltip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button 
          variant={active ? 'secondary' : 'ghost'} 
          size="icon" 
          onClick={onClick}
          className={active ? 'bg-slate-200' : ''}
          type="button"
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
