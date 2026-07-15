import React, { useState } from 'react';

const Admin = () => {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const generateLink = () => {
    if (!guestName.trim()) return;
    const urlSafeName = encodeURIComponent(guestName.trim());
    const urlSafePrefix = encodeURIComponent(prefix);
    const link = `${window.location.origin}/?prefix=${urlSafePrefix}&name=${urlSafeName}`;
    setGeneratedLink(link);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const getMessageTemplate = () => {
    return `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Gositha & Rangika`;
  };

  const copyLinkOnly = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const copyFullMessage = () => {
    navigator.clipboard.writeText(getMessageTemplate());
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-8 flex items-center justify-center font-montserrat">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-stone-200">
        <h1 className="text-2xl font-cinzel font-bold text-center text-theme-800 uppercase tracking-widest border-b pb-4">
          Invitation Link Generator
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
              Prefix
            </label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-theme-500 focus:ring-1 focus:ring-theme-500 bg-white"
            >
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Mr. & Mrs.">Mr. & Mrs.</option>
              <option value="Family">Family</option>
              <option value="Dear">Dear</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">
              Guest Name
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sanjaya"
              className="w-full border border-stone-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-theme-500 focus:ring-1 focus:ring-theme-500"
            />
          </div>

          <button
            onClick={generateLink}
            disabled={!guestName.trim()}
            className="w-full bg-[#3e1459] text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-[#2a0a3f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            Generate Link
          </button>
        </div>

        {generatedLink && (
          <div className="pt-6 border-t border-stone-100 space-y-4">
            <div className="bg-stone-100 p-4 rounded-lg break-all">
              <p className="text-xs text-stone-600 font-mono">{generatedLink}</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={copyLinkOnly}
                className="w-full flex items-center justify-center gap-2 bg-theme-100 text-theme-800 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-theme-200 transition-colors border border-theme-200"
              >
                {copiedLink ? "✓ Link Copied!" : "Copy Link Only"}
              </button>
              
              <button
                onClick={copyFullMessage}
                className="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-stone-900 transition-colors"
              >
                {copiedMessage ? "✓ Message Copied!" : "Copy Full Message"}
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-stone-50 border border-stone-200 rounded-lg">
              <p className="text-xs text-stone-500 uppercase tracking-widest mb-2 font-bold">Message Preview:</p>
              <pre className="text-sm text-stone-700 whitespace-pre-wrap font-sans italic">
                {getMessageTemplate()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
