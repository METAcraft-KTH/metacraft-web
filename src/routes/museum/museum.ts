import { asset } from '$app/paths';

/**
 * `name` is the in-game team name (used in the chat mock); `epithet` is only for show on this
 * page: "The Best West", "The Humble East", "The Sophisticated South".
 */
export const TEAMS = [
	{ name: 'West', epithet: 'Best', color: '#4F63FF', dark: '#2a37a8', chat: '#6F7BFF' },
	{ name: 'East', epithet: 'Humble', color: '#FF4545', dark: '#a81f1f', chat: '#FF5555' },
	{ name: 'South', epithet: 'Sophisticated', color: '#2FD25B', dark: '#178a37', chat: '#55FF55' }
] as const;

export const fullName = (team: (typeof TEAMS)[number]) => `The ${team.epithet} ${team.name}`;

export const GOLD = '#FFD34D';

/** Item textures that ship with the prize models; [file under static/museum/models, display name]. */
export const ITEMS = [
	['collector_chest_1/diamond_sword', 'Diamond Sword'],
	['collector_chest_1/golden_apple', 'Golden Apple'],
	['collector_chest_1/nether_star', 'Nether Star'],
	['collector_chest_1/emerald', 'Emerald'],
	['collector_chest_1/enchanted_book', 'Enchanted Book'],
	['collector_chest_1/gold_ingot', 'Gold Ingot'],
	['collector_chest_1/diamond', 'Diamond'],
	['collector_chest_4/ender_pearl', 'Ender Pearl'],
	['collector_chest_1/netherite_block', 'Block of Netherite'],
	['collector_chest_1/diamond_block', 'Block of Diamond'],
	['collector_chest_2/tnt_side', 'TNT'],
	['collector_chest_3/amethyst_block', 'Block of Amethyst'],
	['collector_chest_3/glowstone', 'Glowstone'],
	['collector_chest_3/ancient_debris_side', 'Ancient Debris'],
	['collector_chest_2/gold_block', 'Block of Gold'],
	['collector_chest_4/redstone_block', 'Block of Redstone'],
	['collector_chest_4/lapis_block', 'Block of Lapis Lazuli'],
	['collector_chest_2/emerald_block', 'Block of Emerald'],
	['collector_chest_4/iron_block', 'Block of Iron'],
	['collector_chest_5/crying_obsidian', 'Crying Obsidian']
] as const;

/** The first 8 entries are hand-held items, the rest are block textures. */
export const isBlock = (i: number) => i % ITEMS.length >= 8;

export const itemIcon = (i: number) => asset(`/museum/models/${ITEMS[i % ITEMS.length][0]}.png`);
export const itemName = (i: number) => ITEMS[i % ITEMS.length][1];
