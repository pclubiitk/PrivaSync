'use client';

import React, { useState, useEffect, useRef, ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Undo, Redo, FileText, History
} from 'lucide-react';
import { useGContext } from "@/components/ContextProvider";

const PREDICTIONS: Record<string, string[]> = {
  "building":      ["a", "the", "federated", "scalable", "our"],
  "a":             ["privacy", "federated", "local", "decentralized", "new"],
  "privacy":       ["first", "preserving", "focused", "aware", "centric"],
  "first":         ["federated", "approach", "system", "design", "principle"],
  "federated":     ["learning", "model", "aggregation", "averaging", "training"],
  "learning":      ["platform", "model", "algorithm", "pipeline", "system"],
  "platform":      ["that", "for", "where", "which", "ensuring"],
  "decentralized": ["intelligence", "training", "model", "network", "system"],
  "intelligence":  ["without", "that", "preserving", "respecting", "while"],
  "model":         ["trains", "weights", "updates", "learns", "aggregates"],
  "trains":        ["locally", "on", "without", "using", "privately"],
  "locally":       ["on", "without", "preserving", "and", "while"],
  "weights":       ["are", "never", "get", "stay", "remain"],
  "are":           ["aggregated", "never", "sent", "shared", "uploaded"],
  "aggregated":    ["on", "by", "using", "securely", "with"],
  "never":         ["leave", "shared", "sent", "uploaded", "transmitted"],
  "leave":         ["the", "your", "device", "local", "client"],
  "next":          ["word", "token", "sentence", "character", "step"],
  "word":          ["prediction", "predictor", "embedding", "token", "level"],
  "prediction":    ["model", "task", "accuracy", "pipeline", "system"],
  "natural":       ["language", "text", "speech", "gradient", "processing"],
  "language":      ["model", "processing", "generation", "understanding", "modeling"],
  "processing":    ["pipeline", "task", "layer", "module", "unit"],
  "data":          ["never", "stays", "privacy", "on", "remains"],
  "neural":        ["network", "model", "architecture", "layer", "weights"],
  "network":       ["trains", "architecture", "parameters", "model", "weights"],
  "training":      ["data", "round", "process", "loop", "pipeline"],
  "gradient":      ["descent", "updates", "clipping", "accumulation", "flow"],
  "embedding":     ["layer", "vector", "space", "dimension", "matrix"],
  "attention":     ["mechanism", "layer", "head", "weights", "score"],
  "transformer":   ["model", "architecture", "layer", "block", "encoder"],
  "recurrent":     ["neural", "network", "model", "layer", "unit"],
  "loss":          ["function", "decreases", "converges", "value", "curve"],
  "server":        ["aggregates", "receives", "never", "distributes", "stores"],
  "client":        ["trains", "device", "model", "locally", "sends"],
  "the":           ["model", "server", "client", "network", "system"],
  "and":           ["privacy", "security", "performance", "accuracy", "efficiency"],
  "without":       ["sharing", "exposing", "sending", "leaking", "transmitting"],
  "sharing":       ["raw", "your", "any", "personal", "sensitive"],
  "raw":           ["data", "text", "input", "samples", "examples"],
  "each":          ["client", "round", "device", "user", "participant"],
  "round":         ["aggregates", "completes", "updates", "improves", "refines"],
  "secure":        ["aggregation", "training", "protocol", "channel", "computation"],
  "encrypted":     ["gradients", "weights", "communication", "channel", "updates"],
  "this":          ["ensures", "model", "approach", "system", "architecture"],
  "ensures":       ["privacy", "security", "that", "no", "data"],
  "that":          ["the", "no", "data", "your", "each"],
  "on":            ["device", "the", "your", "each", "local"],
  "with":          ["federated", "privacy", "secure", "encrypted", "differential"],
  "while":         ["preserving", "maintaining", "ensuring", "keeping", "protecting"],
  "preserving":    ["privacy", "data", "user", "model", "local"],
  "using":         ["federated", "differential", "secure", "local", "privacy"],
  "differential":  ["privacy", "learning", "noise", "guarantee", "mechanism"],
  "our":           ["model", "system", "approach", "platform", "network"],
  "your":          ["data", "model", "device", "text", "privacy"],
};


const EditorCanvas = React.memo(
  ({ editorRef }: { editorRef: React.RefObject<HTMLDivElement | null> }) => (
    <div
      ref={editorRef}
      contentEditable
      className="flex-1 w-full p-12 md:p-24 focus:outline-none text-lg leading-relaxed text-slate-800 min-h-[800px]"
      spellCheck={false}
      suppressContentEditableWarning
      data-placeholder="Start typing… try: 'building a privacy first federated learning platform'"
    />
  ),
  () => true
);
EditorCanvas.displayName = 'EditorCanvas';

const TBtn = React.memo(({
  active, title, onClick, children,
}: {
  active?: boolean;
  title: string;
  onClick: (e: ReactMouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}) => (
  <Button
    variant="ghost"
    size="icon"
    title={title}
    onMouseDown={onClick}
    className={`h-8 w-8 ${active ? 'bg-slate-200 text-slate-900 shadow-inner' : 'text-slate-600'}`}
  >
    {children}
  </Button>
));
TBtn.displayName = 'TBtn';

export default function LandingEditorPage() {
  const [docTitle, setDocTitle]   = useState('Untitled Document');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [fmt, setFmt] = useState({
    bold: false, italic: false, underline: false, strikethrough: false,
    justifyLeft: false, justifyCenter: false, justifyRight: false, justifyFull: false,
    insertUnorderedList: false, insertOrderedList: false,
  });
  
  // Remove if not needed - added for testing
  const {isLoggedIn, setLoggedIn, isAdmin, setAdmin} = useGContext();
  console.log("Login status", isLoggedIn);
  console.log(setLoggedIn);
  console.log("Adminstatus", isAdmin);
  console.log(setAdmin);

  const editorRef    = useRef<HTMLDivElement>(null);
  const ghostRef     = useRef<HTMLDivElement>(null);
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const suggestionsRef = useRef<string[]>([]);

  useEffect(() => { editorRef.current?.focus(); }, []);


  useEffect(() => { suggestionsRef.current = suggestions; }, [suggestions]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const getLastWord = (): string => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return '';
      const range = sel.getRangeAt(0).cloneRange();
      range.selectNodeContents(editor);
      range.setEnd(sel.getRangeAt(0).startContainer, sel.getRangeAt(0).startOffset);
      const text = range.toString().trimEnd();
      const words = text.split(/\s+/);
      return words[words.length - 1]?.toLowerCase().replace(/[^a-z]/g, '') ?? '';
    };


    const showGhost = (word: string, prependSpace: boolean) => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) return;
      if (document.activeElement !== editor) return;

      const range = sel.getRangeAt(0);
      const rect  = range.getBoundingClientRect();

      if (rect.top === 0 && rect.left === 0) return;

      const ghost = ghostRef.current;
      if (!ghost) return;

      let node: Node = range.startContainer;
      if (node.nodeType === Node.TEXT_NODE && node.parentNode) node = node.parentNode;
      if (node instanceof Element) {
        const cs = window.getComputedStyle(node);
        ghost.style.fontFamily    = cs.fontFamily;
        ghost.style.fontSize      = cs.fontSize;
        ghost.style.fontWeight    = cs.fontWeight;
        ghost.style.fontStyle     = cs.fontStyle;
        ghost.style.letterSpacing = cs.letterSpacing;
        ghost.style.lineHeight    = cs.lineHeight;
      }

      ghost.textContent      = (prependSpace ? ' ' : '') + word;
      ghost.style.top        = `${rect.top  + window.scrollY}px`;
      ghost.style.left       = `${rect.right + window.scrollX}px`;
      ghost.style.opacity    = '1';
    };

    const hideGhost = () => {
      if (ghostRef.current) ghostRef.current.style.opacity = '0';
    };

    const syncFmt = () => {
      const next = {
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikethrough: document.queryCommandState('strikethrough'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
        justifyFull: document.queryCommandState('justifyFull'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
      };
      setFmt(prev => {
        for (const k in next)
          if (next[k as keyof typeof next] !== prev[k as keyof typeof prev]) return next;
        return prev;
      });
    };

    const handleInput = () => {
      hideGhost();
      setSuggestions([]);
      setIsPredicting(true);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setIsPredicting(false);
        const word = getLastWord();
        if (!word) return;

        const preds = PREDICTIONS[word] ?? [];
        setSuggestions(preds);

        if (preds.length > 0) {

          const sel = window.getSelection();
          let endsWithSpace = false;
          if (sel && sel.rangeCount > 0) {
            const r = sel.getRangeAt(0).cloneRange();
            r.selectNodeContents(editor);
            r.setEnd(sel.getRangeAt(0).startContainer, sel.getRangeAt(0).startOffset);
            endsWithSpace = /[\s\u00A0]$/.test(r.toString());
          }
          showGhost(preds[0], !endsWithSpace);
        }
      }, 200);
    };

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === 'Tab') {
        const top = suggestionsRef.current[0];
        if (top) {
          e.preventDefault();
          const ghost = ghostRef.current;
          const textToInsert = (ghost?.textContent ?? (' ' + top)) + ' ';
          document.execCommand('insertText', false, textToInsert);
          hideGhost();
          setSuggestions([]);

          const next = PREDICTIONS[top.toLowerCase()] ?? [];
          if (next.length > 0) {
            setSuggestions(next);
            setTimeout(() => showGhost(next[0], true), 30);
          }
          return;
        }
      }

      if (!['Shift','Control','Alt','Meta','CapsLock','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
        hideGhost();
      }
    };

    const handleSelChange = () => {
      if (document.activeElement === editor) syncFmt();
    };

    editor.addEventListener('input', handleInput);
    editor.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectionchange', handleSelChange);
    return () => {
      editor.removeEventListener('input', handleInput);
      editor.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectionchange', handleSelChange);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []); 


  const insertWord = (word: string) => {
    editorRef.current?.focus();

    const sel = window.getSelection();
    let needSpace = true;
    if (sel && sel.rangeCount > 0) {
      const r = sel.getRangeAt(0).cloneRange();
      r.selectNodeContents(editorRef.current!);
      r.setEnd(sel.getRangeAt(0).startContainer, sel.getRangeAt(0).startOffset);
      needSpace = !/[\s\u00A0]$/.test(r.toString());
    }
    document.execCommand('insertText', false, (needSpace ? ' ' : '') + word + ' ');
    if (ghostRef.current) ghostRef.current.style.opacity = '0';
    setSuggestions([]);

    const next = PREDICTIONS[word.toLowerCase()] ?? [];
    if (next.length > 0) {
      setSuggestions(next);
      setTimeout(() => {
        const nsel = window.getSelection();
        if (nsel && nsel.rangeCount > 0) {
          const rect = nsel.getRangeAt(0).getBoundingClientRect();
          const ghost = ghostRef.current;
          if (ghost && (rect.top !== 0 || rect.left !== 0)) {
            ghost.textContent   = ' ' + next[0];
            ghost.style.top     = `${rect.top  + window.scrollY}px`;
            ghost.style.left    = `${rect.right + window.scrollX}px`;
            ghost.style.opacity = '1';
          }
        }
      }, 30);
    }
  };

  const exec = (
    e: ReactMouseEvent<HTMLButtonElement> | ChangeEvent<HTMLSelectElement> | null,
    cmd: string,
    val?: string
  ) => {
    if (e && 'preventDefault' in e) e.preventDefault();
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    document.dispatchEvent(new Event('selectionchange'));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-sans">

     

      <div className="flex flex-1 overflow-hidden">

        {/*Sidebar*/}
        <aside className="w-56 border-r border-slate-200 bg-white hidden md:flex flex-col p-4 shrink-0 gap-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Documents
          </p>
          <Button variant="secondary" className="w-full justify-start gap-2 text-slate-700 h-9">
            <FileText className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate text-sm">{docTitle || 'Untitled Document'}</span>
          </Button>
          {/* FIX ? better to use other type of navigation insted of <a></a>  */}
          <Button variant="ghost" className="w-full justify-start gap-2 text-slate-500 h-9">
            
            <History className="w-4 h-4 shrink-0" />
                   <a href="/user/training" className="text-sm">
                    Training Logs
                   </a>
            <span className="text-sm">Training Logs</span>
          </Button>
        </aside>

        {/*Main*/}
        <main
          className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center"
          onScroll={() => { if (ghostRef.current) ghostRef.current.style.opacity = '0'; }}
        >
          {/* Toolbar */}
          <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-t-lg shadow-sm px-2 py-1.5 flex items-center gap-0.5 sticky top-0 z-10 flex-wrap">
            <TBtn title="Undo" onClick={(e) => exec(e, 'undo')}><Undo className="w-4 h-4" /></TBtn>
            <TBtn title="Redo" onClick={(e) => exec(e, 'redo')}><Redo className="w-4 h-4" /></TBtn>
            <Separator orientation="vertical" className="h-6 mx-1" />

            <select
              defaultValue="P"
              onChange={(e) => exec(e, 'formatBlock', e.target.value)}
              className="h-8 bg-transparent border border-transparent hover:border-slate-300 text-slate-700 text-sm focus:outline-none focus:border-emerald-500 rounded px-2 cursor-pointer transition-colors"
            >
              <option value="P">Normal text</option>
              <option value="H1">Heading 1</option>
              <option value="H2">Heading 2</option>
              <option value="H3">Heading 3</option>
            </select>
            <Separator orientation="vertical" className="h-6 mx-1" />

            <TBtn title="Bold"          active={fmt.bold}          onClick={(e) => exec(e, 'bold')}><Bold className="w-4 h-4" /></TBtn>
            <TBtn title="Italic"        active={fmt.italic}        onClick={(e) => exec(e, 'italic')}><Italic className="w-4 h-4" /></TBtn>
            <TBtn title="Underline"     active={fmt.underline}     onClick={(e) => exec(e, 'underline')}><Underline className="w-4 h-4" /></TBtn>
            <TBtn title="Strikethrough" active={fmt.strikethrough} onClick={(e) => exec(e, 'strikethrough')}><Strikethrough className="w-4 h-4" /></TBtn>
            <Separator orientation="vertical" className="h-6 mx-1" />

            <TBtn title="Align Left"   active={fmt.justifyLeft}   onClick={(e) => exec(e, 'justifyLeft')}><AlignLeft className="w-4 h-4" /></TBtn>
            <TBtn title="Align Centre" active={fmt.justifyCenter} onClick={(e) => exec(e, 'justifyCenter')}><AlignCenter className="w-4 h-4" /></TBtn>
            <TBtn title="Align Right"  active={fmt.justifyRight}  onClick={(e) => exec(e, 'justifyRight')}><AlignRight className="w-4 h-4" /></TBtn>
            <TBtn title="Justify"      active={fmt.justifyFull}   onClick={(e) => exec(e, 'justifyFull')}><AlignJustify className="w-4 h-4" /></TBtn>
            <Separator orientation="vertical" className="h-6 mx-1" />

            <TBtn title="Bullet list"   active={fmt.insertUnorderedList} onClick={(e) => exec(e, 'insertUnorderedList')}><List className="w-4 h-4" /></TBtn>
            <TBtn title="Numbered list" active={fmt.insertOrderedList}   onClick={(e) => exec(e, 'insertOrderedList')}><ListOrdered className="w-4 h-4" /></TBtn>

            {/*AI status badge*/}
            <div className="ml-auto flex items-center gap-2 pr-1">
              {isPredicting ? (
                <Badge variant="secondary" className="gap-1.5 text-xs font-normal">
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:100ms]" />
                    <span className="w-1 h-1 rounded-full bg-slate-400 animate-bounce [animation-delay:200ms]" />
                  </span>
                  predicting
                </Badge>
              ) : suggestions.length > 0 ? (
                <Badge variant="secondary" className="gap-1.5 text-xs font-normal text-emerald-700 bg-emerald-50">
                  
                  {suggestions.length} suggestions
                </Badge>
              ) : null}
              <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 bg-slate-50 px-1.5 font-mono text-[10px] text-slate-400">
                Tab
              </kbd>
              <span className="text-xs text-slate-400">to accept</span>
            </div>
          </div>

          {/*Suggestion chips bar*/}
          <div className="w-full max-w-5xl border-x border-slate-200 bg-slate-50/80 px-4 py-1.5 flex items-center gap-1.5 min-h-[38px] flex-wrap">
            {suggestions.length > 0 ? (
              <>
                <span className="text-xs text-slate-400 mr-1 shrink-0">Suggestions:</span>
                {suggestions.slice(0, 6).map((w, i) => (
                  <Button
                    key={w}
                    variant={i === 0 ? 'default' : 'outline'}
                    size="sm"
                    className={`h-6 px-2.5 text-xs rounded-full ${i === 0 ? 'bg-slate-800 hover:bg-slate-700' : 'text-slate-600'}`}
                    onMouseDown={(e) => { e.preventDefault(); insertWord(w); }}
                  >
                    {w}
                    {i === 0 && <kbd className="ml-1 text-[9px] opacity-60 font-mono">↹</kbd>}
                  </Button>
                ))}
              </>
            ) : (
              <span className="text-xs text-slate-300 select-none">
                Type a word to see predictions
              </span>
            )}
          </div>

          {/*Document page*/}
          <Card className="w-full max-w-5xl rounded-t-none rounded-b-lg shadow-sm border-t-0 min-h-[800px] flex flex-col mb-24 bg-white relative">
            <EditorCanvas editorRef={editorRef} />
          </Card>
        </main>
      </div>

      {/*ghost text*/}
      <div
        ref={ghostRef}
        className="absolute pointer-events-none text-slate-400/50 z-50 whitespace-pre opacity-0 transition-opacity duration-100"
        style={{ top: 0, left: 0 }}
      />

      {/*editor global styles*/}
      <style dangerouslySetInnerHTML={{ __html: `
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #cbd5e1;
          pointer-events: none;
          display: block;
        }
        ::selection { background-color: #d1fae5; color: #065f46; }
        [contenteditable] h1 { font-size: 2.25rem; font-weight: 700; margin-bottom: 0.5em; }
        [contenteditable] h2 { font-size: 1.875rem; font-weight: 600; margin-bottom: 0.5em; }
        [contenteditable] h3 { font-size: 1.5rem;  font-weight: 600; margin-bottom: 0.5em; }
        [contenteditable] ul { list-style-type: disc;    padding-left: 2rem; margin-bottom: 1em; }
        [contenteditable] ol { list-style-type: decimal; padding-left: 2rem; margin-bottom: 1em; }
      ` }} />
    </div>
  );
}
