let current = 'residencia';

function renderTabs(){
  const tabsEl = document.getElementById('tabs');
  tabsEl.innerHTML = '';
  Object.keys(TRAMITES).forEach(key => {
    const b = document.createElement('button');
    b.className = 'tab' + (key === current ? ' active' : '');
    b.textContent = TRAMITES[key].label;
    b.addEventListener('click', () => { current = key; renderTabs(); renderForm(); });
    tabsEl.appendChild(b);
  });
}

function renderForm(){
  const t = TRAMITES[current];
  const card = document.getElementById('formCard');
  card.innerHTML = '';
  t.campos.forEach(c => {
    const lab = document.createElement('label');
    lab.textContent = c.label;
    lab.setAttribute('for', c.id);
    card.appendChild(lab);
    if(c.select){
      const sel = document.createElement('select');
      sel.id = c.id;
      c.select.forEach(opt => {
        const o = document.createElement('option');
        o.textContent = opt;
        sel.appendChild(o);
      });
      card.appendChild(sel);
    } else {
      const inp = document.createElement('input');
      inp.type = 'text'; inp.id = c.id; inp.placeholder = c.placeholder || '';
      card.appendChild(inp);
    }
  });
  const btn = document.createElement('button');
  btn.className = 'primary';
  btn.textContent = 'Generar documento en PDF';
  btn.addEventListener('click', generarPDF);
  card.appendChild(btn);
  const status = document.createElement('p');
  status.className = 'status'; status.id = 'status';
  card.appendChild(status);
  const hint = document.createElement('p');
  hint.className = 'hint';
  hint.textContent = 'Documento de demostración — no tiene validez oficial hasta ser expedido por la Alcaldía.';
  card.appendChild(hint);
}

async function generarPDF(){
  const t = TRAMITES[current];
  const statusEl = document.getElementById('status');
  const btn = document.querySelector('#formCard button.primary');
  const data = {};
  let faltante = false;
  t.campos.forEach(c => {
    const el = document.getElementById(c.id);
    const val = el.value.trim();
    if(!val && !c.select){ faltante = true; }
    data[c.id] = val;
  });
  if(faltante){
    statusEl.textContent = 'Por favor completa todos los campos.';
    statusEl.className = 'status err';
    return;
  }

  btn.disabled = true;
  statusEl.textContent = 'Generando documento...';
  statusEl.className = 'status';

  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:'pt', format:'letter' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 70;
    let y = 90;

    doc.setFont('times','bold'); doc.setFontSize(13);
    doc.text('ALCALDÍA MUNICIPAL DE PUERTO ESCONDIDO, CÓRDOBA', pageWidth/2, y, {align:'center'}); y += 20;
    doc.setFontSize(12);
    doc.text((t.firmante.includes('Hacienda') ? 'SECRETARÍA DE HACIENDA' : t.firmante.includes('Planeación') ? 'SECRETARÍA DE PLANEACIÓN' : 'SECRETARÍA DE GOBIERNO'), pageWidth/2, y, {align:'center'}); y += 50;

    doc.setFontSize(15);
    doc.text(t.titulo, pageWidth/2, y, {align:'center'}); y += 45;

    doc.setFont('times','normal'); doc.setFontSize(11.5);
    doc.text('En uso de sus facultades legales, se', margin, y); y += 18;
    doc.text('procede a expedir el presente documento.', margin, y); y += 34;

    doc.setFont('times','bold');
    doc.text('CERTIFICA / HACE CONSTAR QUE:', margin, y); y += 30;

    doc.setFont('times','normal');
    const lineas = doc.splitTextToSize(t.cuerpo(data), pageWidth - margin*2);
    doc.text(lineas, margin, y);
    y += lineas.length * 16 + 24;

    const cierre = `El presente documento se expide a solicitud del interesado, para los fines que estime convenientes, a los ${fechaLarga}.`;
    const lineasCierre = doc.splitTextToSize(cierre, pageWidth - margin*2);
    doc.text(lineasCierre, margin, y);
    y += lineasCierre.length * 16 + 55;

    doc.text('Cordialmente,', margin, y); y += 55;
    doc.setFont('times','bold');
    doc.text(data.funcionario || '[Pendiente de asignar]', margin, y); y += 15;
    doc.setFont('times','normal');
    doc.text(t.firmante, margin, y); y += 15;
    doc.text('Alcaldía Municipal de Puerto Escondido, Córdoba', margin, y);

    const blob = doc.output('blob');
    const filename = current + '-' + (data.nombre || 'documento').replace(/\s+/g,'-').toLowerCase() + '.pdf';

    let downloads = null;
    try{ downloads = await window.claude?.use?.('downloads'); }catch(e){ downloads = null; }

    if(downloads){
      try{
        await downloads.save({ filename, data: blob });
        statusEl.textContent = 'Documento generado y guardado.';
        statusEl.className = 'status ok';
      }catch(err){
        statusEl.textContent = (err && err.code === 'declined') ? 'Descarga cancelada.' : 'No se pudo guardar el archivo.';
        statusEl.className = 'status err';
      }
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(()=>URL.revokeObjectURL(url), 4000);
      statusEl.textContent = 'Documento generado y descargado.';
      statusEl.className = 'status ok';
    }
  }catch(e){
    statusEl.textContent = 'Ocurrió un error generando el PDF.';
    statusEl.className = 'status err';
  }finally{
    btn.disabled = false;
  }
}

renderTabs();
renderForm();
