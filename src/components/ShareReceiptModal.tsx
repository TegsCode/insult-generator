import React, { useState, useEffect } from 'react';
import { X, Download, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { GeneratedInsult } from '../types/insult';
import { generateReceiptImage, downloadReceiptPng } from '../utils/receiptCanvas';
import { soundEffects } from '../utils/audioSpeech';

interface ShareReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  insult: GeneratedInsult;
}

export const ShareReceiptModal: React.FC<ShareReceiptModalProps> = ({
  isOpen,
  onClose,
  insult,
}) => {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [receiptBlob, setReceiptBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && insult) {
      setIsGenerating(true);
      generateReceiptImage(insult)
        .then(({ dataUrl, blob }) => {
          setReceiptUrl(dataUrl);
          setReceiptBlob(blob);
          setIsGenerating(false);
        })
        .catch(err => {
          console.error('Failed to generate receipt:', err);
          setIsGenerating(false);
        });
    }
  }, [isOpen, insult]);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ai-studio.google.com';

  const tweetText = `📜 Here is the official Historical Roast Receipt for ${(insult.target || 'this scoundrel')}:\n\n"${insult.fullText}"\n\nGenerate your own custom burn:`;
  const shareOnXUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(appUrl)}&hashtags=${encodeURIComponent('HistoricalInsult,OldSchoolBurn')}`;

  const handleCopyImageToClipboard = async () => {
    if (!receiptBlob) return;
    try {
      soundEffects.playParchmentRustle();
      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({ 'image/png': receiptBlob });
        await navigator.clipboard.write([item]);
        setCopiedImage(true);
        setStatusMessage('Receipt image copied to clipboard! Paste it directly into your tweet (Ctrl+V / ⌘+V).');
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        // Fallback: download the image
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  const handleDownload = () => {
    if (!receiptUrl) return;
    soundEffects.playParchmentRustle();
    downloadReceiptPng(receiptUrl, insult.target || 'roast-receipt');
    setStatusMessage('Receipt image downloaded to your device!');
  };

  const handleLaunchTwitterShare = async () => {
    soundEffects.playFanfare();
    // 1. Try to copy image to clipboard so user can just Ctrl+V into the tweet
    if (receiptBlob && navigator.clipboard && typeof ClipboardItem !== 'undefined') {
      try {
        const item = new ClipboardItem({ 'image/png': receiptBlob });
        await navigator.clipboard.write([item]);
      } catch {
        // ignore clipboard error
      }
    }

    // 2. Also download the image as backup
    if (receiptUrl) {
      downloadReceiptPng(receiptUrl, insult.target || 'roast-receipt');
    }

    setStatusMessage('Receipt downloaded & copied to clipboard! Press Ctrl+V in X to attach it.');

    // 3. Open Twitter intent window safely
    window.open(shareOnXUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyText = () => {
    soundEffects.playParchmentRustle();
    const fullShare = `${tweetText}\n${appUrl}`;
    navigator.clipboard.writeText(fullShare);
    setCopiedText(true);
    setStatusMessage('Tweet text and link copied to clipboard!');
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#f7f4ee] dark:bg-[#181513] border border-amber-900/30 dark:border-stone-700 rounded-lg max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-amber-900/15 dark:border-stone-800 flex items-center justify-between bg-amber-50/60 dark:bg-stone-900/60">
          <div>
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-800 dark:text-amber-400" />
              <span>Share Roast Receipt on X (Twitter)</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              An itemized visual receipt has been generated with the burn, itemized vices, wax seal, and app link.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: 2 columns (Receipt Preview on left, Sharing actions on right) */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Receipt Preview */}
          <div className="md:col-span-7 flex flex-col items-center">
            {isGenerating ? (
              <div className="w-full aspect-3/4 bg-stone-200/50 dark:bg-stone-800/50 rounded border border-dashed border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center p-8 text-stone-500 text-xs gap-3">
                <div className="w-6 h-6 border-2 border-amber-800 border-t-transparent rounded-full animate-spin" />
                <span>Inscribing your Roast Receipt onto parchment...</span>
              </div>
            ) : receiptUrl ? (
              <div className="w-full max-w-sm shadow-xl rounded overflow-hidden border border-amber-900/30 bg-white">
                <img
                  src={receiptUrl}
                  alt="Official Roast Receipt"
                  className="w-full h-auto object-contain block"
                />
              </div>
            ) : (
              <div className="text-xs text-rose-600">Failed to generate receipt canvas.</div>
            )}
          </div>

          {/* Right Column: Actions & Instructions */}
          <div className="md:col-span-5 space-y-5">
            {/* Status notice if any */}
            {statusMessage && (
              <div className="p-3 bg-amber-100/70 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-md text-xs text-amber-950 dark:text-amber-200 animate-in fade-in">
                {statusMessage}
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 font-sans">
                Quick 1-Click Post:
              </h4>

              {/* Primary Action Button */}
              <button
                onClick={handleLaunchTwitterShare}
                disabled={isGenerating}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 dark:bg-amber-900 dark:hover:bg-amber-800 text-amber-50 font-cinzel font-bold text-xs uppercase tracking-wider rounded-md shadow transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Post on X with Receipt</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="text-[11px] text-stone-500 dark:text-stone-400 italic leading-relaxed">
                Tip: When you click above, the receipt image is copied to your clipboard and downloaded automatically. Just press <strong>Ctrl+V</strong> (or <strong>⌘+V</strong>) in the X compose window to attach the receipt image!
              </p>
            </div>

            {/* Additional Individual Controls */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-sans block font-semibold">
                Or Save / Copy Individually:
              </span>

              <button
                onClick={handleCopyImageToClipboard}
                disabled={isGenerating}
                className="w-full py-2 px-3 text-xs font-medium bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedImage ? 'Image Copied to Clipboard!' : 'Copy Receipt Image'}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="w-full py-2 px-3 text-xs font-medium bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Receipt PNG</span>
              </button>

              <button
                onClick={handleCopyText}
                className="w-full py-2 px-3 text-xs font-medium bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Text & Link Copied!' : 'Copy Text & App Link'}</span>
              </button>
            </div>

            {/* Preview of tweet text */}
            <div className="p-3 bg-stone-100 dark:bg-stone-900/60 rounded border border-stone-200 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400 space-y-1">
              <div className="font-semibold text-stone-700 dark:text-stone-300">Tweet Text Preview:</div>
              <p className="font-mono text-[10px] break-words">
                {tweetText}
              </p>
              <p className="text-amber-800 dark:text-amber-400 font-mono text-[10px] truncate">
                {appUrl}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-900/15 dark:border-stone-800 bg-amber-50/40 dark:bg-stone-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
