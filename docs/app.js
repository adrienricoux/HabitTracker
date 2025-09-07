(function(){
  const STORAGE_KEY = 'habit-tracker:data:v1';
  const form = document.getElementById('habitForm');
  const nameEl = document.getElementById('habitName');
  const freqEl = document.getElementById('habitFreq');
  const list = document.getElementById('habitList');

  let data = load();

  render();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameEl.value.trim();
    const freq = freqEl.value;
    if(!name) return;
    data.habits.push({ id: crypto.randomUUID(), name, freq, doneDates: [] });
    save();
    form.reset();
    render();
  });

  function load(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { habits: [] }; }
    catch { return { habits: [] }; }
  }
  function save(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function isDoneToday(h){
    const today = new Date().toISOString().slice(0,10);
    return h.doneDates.includes(today);
  }

  function toggleToday(h){
    const today = new Date().toISOString().slice(0,10);
    const idx = h.doneDates.indexOf(today);
    if(idx >= 0) h.doneDates.splice(idx,1);
    else h.doneDates.push(today);
    save();
    render();
  }

  function removeHabit(id){
    data.habits = data.habits.filter(h => h.id !== id);
    save();
    render();
  }

  function render(){
    list.innerHTML = '';
    if(data.habits.length === 0){
      const empty = document.createElement('div');
      empty.className = 'badge';
      empty.textContent = 'No habits yet. Add one above.';
      list.appendChild(empty);
      return;
    }
    data.habits.forEach(h => {
      const row = document.createElement('div');
      row.className = 'item';

      const left = document.createElement('div');
      left.className = 'item-left';

      const box = document.createElement('div');
      box.className = 'checkbox' + (isDoneToday(h) ? ' checked' : '');
      box.setAttribute('role','checkbox');
      box.setAttribute('aria-checked', isDoneToday(h));
      box.addEventListener('click', () => toggleToday(h));

      const name = document.createElement('div');
      name.className = 'habit-name';
      name.textContent = h.name;

      const freq = document.createElement('span');
      freq.className = 'badge';
      freq.textContent = h.freq;

      left.appendChild(box);
      left.appendChild(name);
      left.appendChild(freq);

      const actions = document.createElement('div');
      actions.className = 'actions';

      const del = document.createElement('button');
      del.className = 'iconbtn';
      del.textContent = 'Delete';
      del.addEventListener('click', () => removeHabit(h.id));

      actions.appendChild(del);

      row.appendChild(left);
      row.appendChild(actions);

      list.appendChild(row);
    });
  }

  // PWA install prompt (iOS shows Add to Home Screen via Share)
  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });
  installBtn?.addEventListener('click', async () => {
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.hidden = true;
  });
})();