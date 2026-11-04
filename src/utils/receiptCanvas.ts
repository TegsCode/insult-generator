import { GeneratedInsult } from '../types/insult';

export async function generateReceiptImage(insult: GeneratedInsult): Promise<{ dataUrl: string; blob: Blob }> {
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 1050;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  // Background: Aged parchment warm ivory
  ctx.fillStyle = '#faf6ed';
  ctx.fillRect(0, 0, width, height);

  // Subtle paper grain noise
  ctx.fillStyle = 'rgba(215, 200, 175, 0.15)';
  for (let i = 0; i < width; i += 4) {
    for (let j = 0; j < height; j += 4) {
      if (Math.random() > 0.6) {
        ctx.fillRect(i, j, 2, 2);
      }
    }
  }

  // Double dashed border / receipt frame
  ctx.strokeStyle = '#8B261E';
  ctx.lineWidth = 3;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  ctx.strokeStyle = 'rgba(139, 38, 30, 0.4)';
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(32, 32, width - 64, height - 64);
  ctx.setLineDash([]); // Reset dash

  // Top Receipt Header
  ctx.fillStyle = '#8B261E';
  ctx.font = 'bold 22px "Cinzel", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ THE ROYAL COURT OF SARCASM ✦', width / 2, 80);

  ctx.fillStyle = '#1c1917';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('OFFICIAL ITEMISED ROAST RECEIPT & CALUMNY WARRANT', width / 2, 110);

  const dateStr = new Date(insult.createdAt || Date.now()).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  ctx.font = '12px "Courier New", monospace';
  ctx.fillStyle = '#78716c';
  ctx.fillText(`RECEIPT NO: CAL-${Math.floor(insult.createdAt % 1000000)}  ·  DATE: ${dateStr.toUpperCase()}`, width / 2, 135);

  // Divider line
  ctx.strokeStyle = '#d6cebe';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(48, 155);
  ctx.lineTo(width - 48, 155);
  ctx.stroke();

  // Offender details (Itemized)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#44403c';
  ctx.font = 'bold 13px "Courier New", monospace';
  ctx.fillText(`CUSTOMER / OFFENDER:`, 50, 185);
  ctx.fillStyle = '#8B261E';
  ctx.font = 'bold 17px "Cinzel", Georgia, serif';
  ctx.fillText(`${(insult.target || 'A Certain Base Knave').toUpperCase()}`, 240, 185);

  ctx.fillStyle = '#78716c';
  ctx.font = '12px "Courier New", monospace';
  ctx.fillText(`STYLE DIALECT:`, 50, 215);
  ctx.fillStyle = '#1c1917';
  ctx.fillText(`${insult.era.toUpperCase()} JURISDICTION`, 240, 215);

  // Itemized Vices Table Header
  ctx.fillStyle = '#f2ece0';
  ctx.fillRect(48, 235, width - 96, 26);
  ctx.fillStyle = '#8B261E';
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.fillText('CHARGE / VICE ITEM', 60, 252);
  ctx.textAlign = 'right';
  ctx.fillText('RATING / SEVERITY', width - 60, 252);

  // Table items
  const lazinessLabels = ['Mild Procrastinator', 'Lazy Couch Potato', 'Heavy Sleeper', 'Total Freeloader'];
  const nonsenseLabels = ['Chatterbox', 'Confidently Wrong', 'Loudmouth Windbag', 'Pure Garbage'];

  const rows = [
    { name: '1. INDOLENCE & LAZINESS', val: `LEVEL ${insult.lazinessLevel}/4 (${lazinessLabels[insult.lazinessLevel - 1] || 'Sloth'})` },
    { name: '2. NONSENSE & BLUSTER', val: `LEVEL ${insult.nonsenseLevel}/4 (${nonsenseLabels[insult.nonsenseLevel - 1] || 'Hot Air'})` },
    { name: '3. GENERAL DISPOSITION', val: insult.vibe.toUpperCase() },
    { name: '4. VERBAL HARSHNESS', val: insult.venom.toUpperCase() }
  ];

  ctx.font = '12px "Courier New", monospace';
  let currentY = 285;
  rows.forEach((row) => {
    ctx.textAlign = 'left';
    ctx.fillStyle = '#292524';
    ctx.fillText(row.name, 60, currentY);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#78350f';
    ctx.fillText(row.val, width - 60, currentY);
    currentY += 28;
  });

  // Divider
  ctx.strokeStyle = '#d6cebe';
  ctx.beginPath();
  ctx.moveTo(48, currentY);
  ctx.lineTo(width - 48, currentY);
  ctx.stroke();

  // The Historical Burn Heading
  currentY += 35;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8B261E';
  ctx.font = 'bold 13px "Cinzel", serif';
  ctx.fillText('✦ FORMAL SENTENCE & CERTIFIED CALUMNY ✦', width / 2, currentY);

  // Draw Burn text with wrapping
  currentY += 30;
  ctx.fillStyle = '#1c1917';
  ctx.font = 'italic 23px "Cormorant Garamond", Georgia, serif';

  const burnText = `“${insult.fullText}”`;
  const words = burnText.split(' ');
  let line = '';
  const maxWidth = width - 120;
  const lineHeight = 34;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, width / 2, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, width / 2, currentY);

  // Modern Translation Box
  currentY += 45;
  const cleanTranslation = insult.modernTranslation.replace(/^Modern Translation:\s*/, '');
  
  ctx.fillStyle = '#f5efe4';
  ctx.strokeStyle = '#dcd5c7';
  ctx.lineWidth = 1;
  ctx.fillRect(50, currentY, width - 100, 75);
  ctx.strokeRect(50, currentY, width - 100, 75);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#8B261E';
  ctx.font = 'bold 11px "Courier New", monospace';
  ctx.fillText('PLAIN ENGLISH TRANSLATION:', 65, currentY + 22);

  ctx.fillStyle = '#44403c';
  ctx.font = '13px "Plus Jakarta Sans", sans-serif';
  // Wrap translation text
  const transWords = cleanTranslation.split(' ');
  let tLine = '';
  let tY = currentY + 44;
  for (let i = 0; i < transWords.length; i++) {
    const test = tLine + transWords[i] + ' ';
    if (ctx.measureText(test).width > width - 140 && i > 0) {
      ctx.fillText(tLine, 65, tY);
      tLine = transWords[i] + ' ';
      tY += 20;
    } else {
      tLine = test;
    }
  }
  ctx.fillText(tLine, 65, tY);

  currentY += 105;

  // Verdict & Penalty Banner
  ctx.fillStyle = '#1c1917';
  ctx.fillRect(48, currentY, width - 96, 38);
  ctx.fillStyle = '#faf6ed';
  ctx.font = 'bold 13px "Courier New", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('TOTAL VERDICT: GUILTY OF BASE FOOLERY', 65, currentY + 24);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fde047';
  ctx.fillText('PENALTY: PUBLIC SCORN', width - 65, currentY + 24);

  // Stamp Seal Emblem if image is loaded, or fallback seal
  currentY += 60;
  const sealImage = new Image();
  sealImage.crossOrigin = 'anonymous';
  sealImage.src = '/src/assets/images/wax_seal_emblem_1793805553644.jpg';

  try {
    await new Promise<void>((resolve) => {
      sealImage.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(width - 120, currentY + 40, 48, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(sealImage, width - 168, currentY - 8, 96, 96);
        ctx.restore();
        resolve();
      };
      sealImage.onerror = () => {
        // Fallback decorative seal circle
        ctx.fillStyle = '#8B261E';
        ctx.beginPath();
        ctx.arc(width - 120, currentY + 40, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#faf6ed';
        ctx.font = 'bold 10px "Cinzel", serif';
        ctx.textAlign = 'center';
        ctx.fillText('OFFICIAL', width - 120, currentY + 36);
        ctx.fillText('SEAL', width - 120, currentY + 50);
        resolve();
      };
      // Timeout fallback
      setTimeout(resolve, 300);
    });
  } catch {
    // resolve anyway
  }

  // Barcode decoration
  ctx.fillStyle = '#1c1917';
  ctx.textAlign = 'left';
  let barX = 65;
  for (let i = 0; i < 48; i++) {
    const barW = (i % 3 === 0) ? 3 : (i % 2 === 0) ? 1.5 : 2;
    ctx.fillRect(barX, currentY + 15, barW, 45);
    barX += barW + 2.5;
  }

  ctx.font = '10px "Courier New", monospace';
  ctx.fillStyle = '#78716c';
  ctx.fillText('||| | |||| ||| ||||| ||| ||| |||| ||||| ||||', 65, currentY + 74);
  ctx.fillText('ORIGINAL WARRANT ISSUED VIA THE HISTORICAL ENGLISH INSULT GENERATOR', 65, currentY + 90);

  // App link
  const currentAppUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ai-studio.google.com';
  ctx.fillStyle = '#8B261E';
  ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(currentAppUrl, 65, currentY + 108);

  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => {
      resolve(b || new Blob());
    }, 'image/png');
  });

  return { dataUrl, blob };
}

export function downloadReceiptPng(dataUrl: string, targetName: string) {
  const link = document.createElement('a');
  link.download = `roast-receipt-${(targetName || 'scoundrel').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  link.href = dataUrl;
  link.click();
}
