
function cleanAIText(text) {
    if (!text) return "";
    return text.split('\n').filter(line => {
        const low = line.toLowerCase();
        return !low.includes('evaluasi pembelajaran') && !low.includes('materi:') && !low.includes('tema:');
    }).join('\n').trim();
}

function formatMarkdownTable(text) {
    const lines = text.trim().split('\n');
    const tableLines = lines.filter(l => l.includes('|'));
    if (tableLines.length < 2) return text.replace(/\n/g, '<br/>');

    let html = '<table border="1" style="width:100%; border-collapse:collapse;">';
    let hasHeader = false;
    tableLines.forEach(line => {
        const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());
        if (cells.every(c => c.includes('---'))) return;
        if (!hasHeader) {
            html += '<thead><tr style="background:#f2f2f2;">' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
            hasHeader = true;
        } else {
            html += '<tr>' + cells.map(c => `<td>${c.replace(/\n/g, '<br/>')}</td>`).join('') + '</tr>';
        }
    });
    return html + '</tbody></table>';
}

function formatSoalToHtml(text) {
    const lines = text.split('\n');
    let html = '';
    lines.forEach(line => {
        const trimmed = line.trim();
        if (/^[0-9]+\./.test(trimmed)) {
            html += `<div style="font-weight:bold; margin-top:10pt;">${trimmed}</div>`;
        } else if (/^[a-dA-D]\./.test(trimmed)) {
            html += `<div style="margin-left:25pt;">${trimmed}</div>`;
        } else if (trimmed.length > 0) {
            html += `<div>${trimmed}</div>`;
        }
    });
    return html;
}
