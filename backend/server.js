import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock Data Database GamePedia
const characters = [
  { id: "char-001", name: "Ignis Vance", element: "Fire", weapon: "Sword", tier: "S-Tier", bestWeapon: "Crimson Avenger", bestArtifact: "Hellfire Set (4-Piece)", baseImg: "🔥" },
  { id: "char-002", name: "Aria Frost", element: "Ice", weapon: "Bow", tier: "A-Tier", bestWeapon: "Blizzard Bow", bestArtifact: "Glacial Strayer (4-Piece)", baseImg: "❄️" },
  { id: "char-003", name: "Zephyr Gale", element: "Wind", weapon: "Catalyst", tier: "S-Tier", bestWeapon: "Skyward Atlas", bestArtifact: "Viridescent Venerer", baseImg: "🌀" }
];

const upgradeCosts = [
  { from_level: 1, to_level: 20, gold: 15000, boss_material: 0, common_material: 3 },
  { from_level: 20, to_level: 40, gold: 40000, boss_material: 3, common_material: 12 },
  { from_level: 40, to_level: 60, gold: 100000, boss_material: 8, common_material: 24 },
  { from_level: 60, to_level: 80, gold: 250000, boss_material: 20, common_material: 48 }
];

const collectibles = [
  { id: "chest-001", region: "Arid Desert", location: "Di belakang pilar runtuh timur oasis", type: "Luxurious Chest", rewards: "50 Gold, 5 Gem" },
  { id: "chest-002", region: "Arid Desert", location: "Gua bawah tanah dekat tebing pasir", type: "Precious Chest", rewards: "30 Gold, 2 Gem" },
  { id: "chest-003", region: "Frost Mountain", location: "Mencairkan es di puncak bukit selatan", type: "Luxurious Chest", rewards: "50 Gold, 5 Gem" }
];

// API Endpoints
app.get('/api/characters', (req, res) => res.json(characters));
app.get('/api/calculator', (req, res) => res.json(upgradeCosts));
app.get('/api/collectibles', (req, res) => res.json(collectibles));

app.listen(PORT, () => {
  console.log(`Backend GamePedia aktif di http://localhost:${PORT}`);
});