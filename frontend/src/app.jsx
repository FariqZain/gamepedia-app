import React, { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('wiki');
  const [characters, setCharacters] = useState([]);
  const [calcData, setCalcData] = useState([]);
  const [items, setItems] = useState([]);

  // State untuk Kalkulator
  const [currentLvl, setCurrentLvl] = useState(1);
  const [targetLvl, setTargetLvl] = useState(20);
  const [calculation, setCalculation] = useState({ gold: 0, boss: 0, common: 0 });

  // State untuk Checklist (Simpan di LocalStorage agar tidak hilang saat refresh)
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('checked_chests');
    return saved ? JSON.parse(saved) : {};
  });

  // Ambil data dari Backend API saat aplikasi dimuat
  useEffect(() => {
    fetch('http://localhost:5000/api/characters').then(res => res.json()).then(data => setCharacters(data));
    fetch('http://localhost:5000/api/calculator').then(res => res.json()).then(data => setCalcData(data));
    fetch('http://localhost:5000/api/collectibles').then(res => res.json()).then(data => setItems(data));
  }, []);

  // Simpan checklist ke localstorage setiap kali ada perubahan
  useEffect(() => {
    localStorage.setItem('checked_chests', JSON.stringify(checkedItems));
  }, [checkedItems]);

  // Logika Menghitung Kebutuhan Material
  const handleCalculate = () => {
    let totalGold = 0;
    let totalBoss = 0;
    let totalCommon = 0;

    calcData.forEach(cost => {
      if (cost.from_level >= parseInt(currentLvl) && cost.to_level <= parseInt(targetLvl)) {
        totalGold += cost.gold;
        totalBoss += cost.boss_material;
        totalCommon += cost.common_material;
      }
    });

    setCalculation({ gold: totalGold, boss: totalBoss, common: totalCommon });
  };

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Header & Navigasi Utama */}
      <header className="bg-indigo-950 text-white px-8 py-5 flex flex-wrap justify-between items-center gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎮</span>
          <h1 className="font-bold text-xl tracking-wide">GAMEPEDIA HUB</h1>
        </div>
        <nav className="flex gap-2 bg-indigo-900/50 p-1 rounded-xl border border-indigo-800">
          <button onClick={() => setActiveTab('wiki')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'wiki' ? 'bg-white text-indigo-950 shadow' : 'text-indigo-200 hover:text-white'}`}>
            CHARACTER WIKI
          </button>
          <button onClick={() => setActiveTab('calc')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'calc' ? 'bg-white text-indigo-950 shadow' : 'text-indigo-200 hover:text-white'}`}>
            MATERIAL CALCULATOR
          </button>
          <button onClick={() => setActiveTab('map')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'map' ? 'bg-white text-indigo-950 shadow' : 'text-indigo-200 hover:text-white'}`}>
            EXPLORATION CHECKLIST
          </button>
        </nav>
      </header>

      {/* Konten Utama Berdasarkan Tab yang Aktif */}
      <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
        
        {/* TAB 1: CHARACTER WIKI & BUILD */}
        {activeTab === 'wiki' && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Database & Rekomendasi Build Karakter</h2>
            <p className="text-xs text-slate-500 mb-6">Informasi tier list, senjata, dan artefak terbaik dalam satu halaman terpusat.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map(char => (
                <div key={char.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:scale-110 transition-transform">{char.baseImg}</div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">{char.element} • {char.weapon}</span>
                      <h3 className="font-bold text-lg text-slate-900 mt-1">{char.name}</h3>
                    </div>
                    <span className="bg-rose-50 text-rose-500 text-xs font-black px-2 py-1 rounded-lg">{char.tier}</span>
                  </div>
                  <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                    <div><span className="text-slate-400 block font-medium">Senjata Terbaik:</span> <strong className="text-slate-700">{char.bestWeapon}</strong></div>
                    <div><span className="text-slate-400 block font-medium">Set Artefak Utama:</span> <strong className="text-slate-700">{char.bestArtifact}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MATERIAL CALCULATOR */}
        {activeTab === 'calc' && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Kalkulator Anti-Grind Fatigue</h2>
            <p className="text-xs text-slate-500 mb-6">Hitung kebutuhan pasti material farming Anda agar alokasi energi game tidak terbuang sia-sia.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Level Saat Ini</label>
                <select value={currentLvl} onChange={(e) => setCurrentLvl(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white focus:outline-indigo-500">
                  <option value="1">Level 1</option>
                  <option value="20">Level 20</option>
                  <option value="40">Level 40</option>
                  <option value="60">Level 60</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Level</label>
                <select value={targetLvl} onChange={(e) => setTargetLvl(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white focus:outline-indigo-500">
                  <option value="20">Level 20</option>
                  <option value="40">Level 40</option>
                  <option value="60">Level 60</option>
                  <option value="80">Level 80</option>
                </select>
              </div>
            </div>

            <button onClick={handleCalculate} className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-sm mb-8">
              Hitung Total Estimasi Bahan
            </button>

            {/* Kotak Hasil Perhitungan */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Total Komponen yang Dibutuhkan:</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                  <div className="text-xl mb-1">🪙</div>
                  <div className="text-xs text-slate-400">Total Gold</div>
                  <div className="font-bold text-sm text-slate-800 mt-0.5">{calculation.gold.toLocaleString('id-ID')}</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                  <div className="text-xl mb-1">💎</div>
                  <div className="text-xs text-slate-400">Boss Drop</div>
                  <div className="font-bold text-sm text-slate-800 mt-0.5">{calculation.boss} Pcs</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
                  <div className="text-xl mb-1">⚔️</div>
                  <div className="text-xs text-slate-400">Common Drop</div>
                  <div className="font-bold text-sm text-slate-800 mt-0.5">{calculation.common} Pcs</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EXPLORATION CHECKLIST */}
        {activeTab === 'map' && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Pelacak Koleksi & Hidden Chest</h2>
            <p className="text-xs text-slate-500 mb-6">Centang lokasi chest rahasia yang sudah Anda temukan agar tidak membingungkan saat melengkapi eksplorasi map 100%.</p>
            
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-100">
                {items.map(item => (
                  <div key={item.id} className={`p-4 flex items-start gap-4 transition-colors ${checkedItems[item.id] ? 'bg-emerald-50/40' : 'hover:bg-slate-50'}`}>
                    <input 
                      type="checkbox" 
                      checked={!!checkedItems[item.id]} 
                      onChange={() => toggleCheck(item.id)}
                      className="mt-1 w-4 h-4 text-indigo-600 border-slate-300 rounded-sm focus:ring-indigo-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{item.region}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.type === 'Luxurious Chest' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>{item.type}</span>
                      </div>
                      <p className={`text-sm font-semibold text-slate-800 ${checkedItems[item.id] ? 'line-through text-slate-400' : ''}`}>{item.location}</p>
                      <span className="text-xs text-emerald-600 font-medium mt-0.5 block">Hadiah: {item.rewards}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}