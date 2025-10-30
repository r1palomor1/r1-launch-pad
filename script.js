﻿﻿﻿﻿/*
 Working app: 
    YT Modes, Controls & Fade, Playlist Fetch, Player UI, Icons (Now Playing, Home, Speaker),
    Saved Theme, is.gd Code, Shuffle, Fav YT Fix, Playlist focus, 
    
 */
const mainView = document.getElementById('mainView');
const searchInput = document.getElementById('searchInput');
const logo = document.getElementById('logo');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const searchBtn = document.getElementById('searchBtn');
const cardContainer = document.getElementById('cardContainer');
const toggleViewBtn = document.getElementById('toggleViewBtn');
const quickLaunchBtn = document.getElementById('quickLaunchBtn');
const toggleAllLink = document.getElementById('toggleAllLink');
const cancelSearchBtn = document.getElementById('cancelSearchBtn');
const themeBtn = document.getElementById('themeBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const themeDialogOverlay = document.getElementById('themeDialogOverlay');
const themeDialogTitle = document.getElementById('themeDialogTitle');
const themeDialogError = document.getElementById('themeDialogError');
const themeColorList = document.getElementById('themeColorList');
const themeDialogInput = document.getElementById('themeDialogInput');
const clearThemeInputBtn = document.getElementById('clearThemeInputBtn');
const themeDialogOk = document.getElementById('themeDialogOk');
const themeDialogCancel = document.getElementById('themeDialogCancel');
const themeDialogReset = document.getElementById('themeDialogReset');
const themeModeToggleBtn = document.getElementById('themeModeToggleBtn');
const themeLabToggle = document.getElementById('themeLabToggle');
const labCheckbox = document.getElementById('lab-checkbox');
const deletePromptOverlay = document.getElementById('deletePromptOverlay');
const deleteLinksList = document.getElementById('deleteLinksList');
const deletePromptCancel = document.getElementById('deletePromptCancel');
const deletePromptOk = document.getElementById('deletePromptOk');
const favoritesPromptOverlay = document.getElementById('favoritesPromptOverlay');
const favoritesList = document.getElementById('favoritesList');
const favoritesPromptClose = document.getElementById('favoritesPromptClose');
const genericPromptOverlay = document.getElementById('genericPromptOverlay');
const genericPromptMessage = document.getElementById('genericPromptMessage');
const genericPromptActions = document.getElementById('genericPromptActions');
const internalPlayerOverlay = document.getElementById('internalPlayerOverlay');
const nowPlayingBar = document.getElementById('nowPlayingBar');
const nowPlayingIcon = document.getElementById('nowPlayingIcon'); // <-- ADD THIS
const nowPlayingTitle = document.getElementById('nowPlayingTitle');
const stopPlayingBtn = document.getElementById('stopPlayingBtn');
const nowPlayingBarIcon = document.getElementById('nowPlayingBarIcon'); // <-- ADD THIS
const playerVideoTitle = document.getElementById('playerVideoTitle');
const youtubePlayerContainer = document.getElementById('youtubePlayer');
const playerContainer = document.querySelector('.player-container');

// Player Controls - Song Mode
const playerSongControls = document.getElementById('playerSongControls');
const playerPlayPauseBtn = document.getElementById('playerPlayPauseBtn');
const playerAudioOnlyBtn = document.getElementById('playerAudioOnlyBtn');
const playerBackBtn = document.getElementById('playerBackBtn');
const playerSearchBtn = document.getElementById('playerSearchBtn');

// Player Controls - Playlist Mode
const playerPlaylistControls = document.getElementById('playerPlaylistControls');
const playerPlayPauseBtn_playlist = document.getElementById('playerPlayPauseBtn_playlist');
const playerAudioOnlyBtn_playlist = document.getElementById('playerAudioOnlyBtn_playlist');
const playerBackBtn_playlist = document.getElementById('playerBackBtn_playlist');
const playerSearchBtn_playlist = document.getElementById('playerSearchBtn_playlist');
const playerPrevBtn = document.getElementById('playerPrevBtn');
const playerNextBtn = document.getElementById('playerNextBtn');
const playerShuffleBtn = document.getElementById('playerShuffleBtn');
const playerPlayAllBtn = document.getElementById('playerPlayAllBtn');
const playerHomeIcon = document.getElementById('playerHomeIcon');

const searchModeVideosBtn = document.getElementById('searchModeVideos');
const searchModeIsGdBtn = document.getElementById('searchModeIsGd');
const isGdInfoBtn = document.getElementById('isGdInfoBtn');
const youtubeSearchViewOverlay = document.getElementById('youtubeSearchViewOverlay');
const youtubeSearchInput = document.getElementById('youtubeSearchInput');
const youtubeSearchCancelBtn = document.getElementById('youtubeSearchCancelBtn');
const youtubeSearchGoBtn = document.getElementById('youtubeSearchGoBtn');
const youtubeSearchResultsContainer = document.getElementById('youtubeSearchResultsContainer');
const youtubeSearchView = document.getElementById('youtubeSearchView');
const youtubeSearchLoader = document.getElementById('youtubeSearchLoader');
const clearYoutubeSearchBtn = document.getElementById('clearYoutubeSearchBtn');
const SUN_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.55 4.95l1.414-1.414L7.05 5.636 5.636 7.05 3.55 4.95zm12.728 12.728l1.414-1.414L19.778 18.364l-1.414 1.414-2.086-2.086zM1 11h3v2H1v-2zm19 0h3v2h-3v-2zM4.95 20.45l-1.414-1.414L5.636 17l1.414 1.414-2.086 2.036zM18.364 7.05l1.414-1.414L21.864 7.05l-1.414 1.414-2.086-2.086z"/></svg>`;
const MOON_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 8 8 .5.5 0 0 1 .5.5v.5a10 10 0 1 1 0-20 .5.5 0 0 1 .5.5V4a8 8 0 0 0-8 8z"/></svg>`;

let player; // Will hold the YouTube player instance
const PLAY_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const STOP_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>`;
const AUDIO_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1a7 7 0 0 1 14 0v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg>`;
let isAudioOnly = false;
let isShuffleActive = false; // Add this line
let youtubeNextPageUrl = null;
let isFetchingYoutubeResults = false;
let uiHideTimeout = null;
let isUIVisible = true;
let tapHintTimeout = null;
let isIntentionalPause = false; // <-- ADD THIS FLAG
let currentlyPlayingPlaylistId = null; // <-- ADD THIS

// --- ⬇️ ADDED FOR MANUAL PLAYLIST CONTROL ⬇️ ---
let currentPlaylist = [];       // The active playlist (can be shuffled)
let originalPlaylist = [];      // A copy of the original, unshuffled playlist
let currentPlaylistIndex = 0;   // The index of the video currently playing
let isManualPlaylist = false;   // Flag to check if we are in manual mode
// --- ⬆️ END OF ADDED CODE ⬆️ ---

let originalThemeState = { theme: 'rabbit', mode: 'dark' };
let suggestionRequestCount = 0;
let currentSearchMode = 'videos';
const SAVED_PLAYLISTS_KEY = 'launchPadR1SavedPlaylists';
let savedPlaylists = [];
const GENERIC_FAVICON_SRC = 'data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23888\'%3e%3cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z\'/%3e%3c/svg%3e';

async function launchUrlOnRabbit(url, name) {
    try {
        if (window.rabbit && window.rabbit.core && window.rabbit.core.launchUrl) {
            await window.rabbit.core.launchUrl({ url: url });
        } else {
            console.log(`[Browser Mode] Launching: ${name} at ${url}`);
            window.open(url, '_blank');
        }
    } catch (error) {
        console.error("Error launching URL on Rabbit:", error);
        await showAlert("Failed to launch URL.");
    }
}

function triggerHaptic() {
    try {
        if (window.rabbit && window.rabbit.core && window.rabbit.core.vibrate) {
            window.rabbit.core.vibrate({ pattern: [50] });
        }
    } catch (e) { console.error("Haptic feedback failed:", e); }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goHome() {
    themeDialogOverlay.style.display = 'none';
    deletePromptOverlay.style.display = 'none';
    favoritesPromptOverlay.style.display = 'none';
    genericPromptOverlay.style.display = 'none';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    mainView.classList.remove('input-mode-active');
    renderLinks();
    scrollToTop();

    // ⬇️ ADD THIS ⬇️
    // Tell the UI to update when we return to the main view
    if (player && player.getPlayerState) {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            updateNowPlayingUI('playing');
        } else if (state === YT.PlayerState.PAUSED) {
            updateNowPlayingUI('paused');
        }
    }
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function showGenericPrompt({ message, buttons }) {
    return new Promise(resolve => {
        genericPromptMessage.textContent = message;
        genericPromptActions.innerHTML = '';
        const sortedButtons = buttons.sort((a, b) => (a.order || 0) - (b.order || 0));
        sortedButtons.forEach(btnConfig => {
            const button = document.createElement('button');
            button.textContent = btnConfig.text;
            if (btnConfig.class) {
                button.className = btnConfig.class;
            }
            button.onclick = () => {
                genericPromptOverlay.style.display = 'none';
                resolve(btnConfig.value);
            };
            genericPromptActions.appendChild(button);
        });
        genericPromptActions.style.justifyContent = buttons.length === 1 ? 'center' : 'space-between';
        genericPromptOverlay.style.display = 'flex';
    });
}

async function showAlert(message) {
    return showGenericPrompt({
        message,
        buttons: [ { text: 'OK', value: true, class: '' } ]
    });
}

async function showConfirm(message) {
    return showGenericPrompt({
        message,
        buttons: [
            { text: 'Cancel', value: false, class: 'secondary', order: 1 },
            { text: 'OK', value: true, class: '', order: 2 }
        ]
    });
}

async function sayOnRabbit(message) {
    try {
        if (window.rabbit && window.rabbit.core) {
            await window.rabbit.core.say({ text: message });
        }
    } catch (e) { console.error("Say feedback failed:", e); }
}

// --- ⬇️ ADDED FOR DEBUG PANEL ⬇️ ---
// Debug functions removed
// --- ⬆️ END OF ADDED CODE ⬆️ ---

function normalizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    let trimmedUrl = url.trim();
    if (trimmedUrl === '' || trimmedUrl.toLowerCase().startsWith('javascript:') || trimmedUrl === 'https://') {
        return '';
    }
    if (!/^(https?:\/\/)/i.test(trimmedUrl)) {
        trimmedUrl = `https://${trimmedUrl}`;
    }
    return trimmedUrl;
}

const categories = ['Education', 'Entertainment', 'Finance', 'Gaming', 'Health', 'Music', 'News', 'Personal', 'Reference', 'Shopping', 'Social', 'Sports', 'Tech', 'Tools', 'Travel', 'Work', 'Other'];

let links = JSON.parse(localStorage.getItem('launchPadR1Links')) || [
    { description: 'Youtube', url: 'https://m.youtube.com', category: 'Entertainment' },
    { description: 'Copilot', url: 'https://copilot.microsoft.com/', category: 'Tools' },
    { description: 'Radio.net', url: 'https://www.radio.net/', category: 'Music' }
];

let needsSave = false;
const urlMigrationFlag = 'launchPadR1UrlNormalized_v1';
if (!localStorage.getItem(urlMigrationFlag)) {
    links.forEach(link => {
        const originalUrl = link.url;
        const normalizedUrl = normalizeUrl(originalUrl);
        if (originalUrl !== normalizedUrl && normalizedUrl) {
            link.url = normalizedUrl;
            needsSave = true;
        }
    });
    if (needsSave) {
        localStorage.setItem('launchPadR1Links', JSON.stringify(links));
    }
}

// R1 Storage Integration
async function loadLinksFromR1() {
    let loadedFromR1 = false;
    if (window.creationStorage) {
        try {
            const stored = await window.creationStorage.plain.get('launchPadR1Links');
            if (stored) {
                links = JSON.parse(stored);
                loadedFromR1 = true;
            }
        } catch (e) {
            console.log('Could not load from R1 storage, using localStorage fallback');
        }
    }

    if (!loadedFromR1) {
        const localData = localStorage.getItem('launchPadR1Links');
        if (localData) {
            links = JSON.parse(localData);
        }
    }
    
    // Ensure default links are always available if no storage exists
    if (!links || links.length === 0) {
        links = [
            { description: 'Youtube', url: 'https://m.youtube.com', category: 'Entertainment', id: 'default-1' },
            { description: 'Copilot', url: 'https://copilot.microsoft.com/', category: 'Tools', id: 'default-2' },
            { description: 'Radio.net', url: 'https://www.radio.net/', category: 'Music', id: 'default-3' }
        ];
    }
}

async function saveLinksToR1() {
    if (window.creationStorage) {
        try {
            await window.creationStorage.plain.set('launchPadR1Links', JSON.stringify(links));
            await window.creationStorage.plain.set('launchPadR1FavoriteLinkIds', JSON.stringify(Array.from(favoriteLinkIds)));
        } catch (e) {
            console.log('Using localStorage fallback');
        }
    }
    // Fallback to localStorage
    localStorage.setItem('launchPadR1Links', JSON.stringify(links));
    localStorage.setItem('launchPadR1FavoriteLinkIds', JSON.stringify(Array.from(favoriteLinkIds)));
}

// URL Migration and links initialization
if (!localStorage.getItem(urlMigrationFlag)) {
    localStorage.setItem(urlMigrationFlag, 'true');
}
links.forEach((link, index) => {
    if (!link.id) {
        link.id = `link-${Date.now()}-${index}`;
        needsSave = true;
    }
});
const oldFavoriteIndex = parseInt(localStorage.getItem('launchPadR1FavoriteLinkIndex') || '-1', 10);
const oldFavoriteLinkId = localStorage.getItem('launchPadR1FavoriteLinkId');
let favoriteLinkIds = new Set(JSON.parse(localStorage.getItem('launchPadR1FavoriteLinkIds')) || []);
if (oldFavoriteLinkId && favoriteLinkIds.size === 0) {
    favoriteLinkIds.add(oldFavoriteLinkId);
} else if (oldFavoriteIndex !== -1 && links[oldFavoriteIndex] && favoriteLinkIds.size === 0) {
    favoriteLinkIds.add(links[oldFavoriteIndex].id);
}
if (localStorage.getItem('launchPadR1FavoriteLinkIndex') || localStorage.getItem('launchPadR1FavoriteLinkId')) {
    localStorage.removeItem('launchPadR1FavoriteLinkIndex');
    localStorage.removeItem('launchPadR1FavoriteLinkId');
    needsSave = true;
}
if (needsSave) {
    localStorage.setItem('launchPadR1Links', JSON.stringify(links));
}
links.forEach(link => {
    if (!link.category) {
        link.category = 'Other';
    }
});

let currentView = localStorage.getItem('launchPadR1View') || 'list';
let collapsedCategories = JSON.parse(localStorage.getItem('launchPadR1CollapsedCategories')) || [];
let currentThemeName = localStorage.getItem('launchPadR1Theme') || 'rabbit';
let currentLuminanceMode = localStorage.getItem('launchPadR1LuminanceMode') || 'dark';
let customTheme = JSON.parse(localStorage.getItem('launchPadR1CustomTheme')) || null;

// Prefer Creation Storage values when present; fall back to the local defaults above.
async function loadThemeFromR1() {
  if (!window.creationStorage?.plain?.get) return;

  try {
    const [t, m, c] = await Promise.all([
      window.creationStorage.plain.get('launchPadR1Theme'),
      window.creationStorage.plain.get('launchPadR1LuminanceMode'),
      window.creationStorage.plain.get('launchPadR1CustomTheme'),
    ]);

    if (t?.value) currentThemeName = t.value;
    if (m?.value) currentLuminanceMode = m.value;
    if (c?.value) {
      try { customTheme = JSON.parse(c.value); } catch { /* ignore */ }
    }
  } catch (e) {
    // Silent fallback to localStorage-derived defaults
  }
}

function updateToggleAllLinkState() {
    if (currentView !== 'group') {
        toggleAllLink.style.display = 'none';
        return;
    }
    const allCategoriesInApp = [...new Set(links.map(link => link.category || 'Other'))];
    const hasExpandedCategory = allCategoriesInApp.some(cat => !collapsedCategories.includes(cat));
    if (hasExpandedCategory) {
        toggleAllLink.textContent = 'Collapse All';
        toggleAllLink.style.display = 'block';
    } else {
        toggleAllLink.style.display = 'none';
    }
}

function renderLinks(linksToRender = links) {
    if (currentView === 'list') {
        toggleViewBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 3h8v8H3V3zM13 3h8v8h-8V3zM3 13h8v8H3v-8zM13 13h8v8h-8v-8z"/></svg>`;
        toggleViewBtn.title = 'Group View';
    } else {
        toggleViewBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" /></svg>`;
        toggleViewBtn.title = 'List View';
    }
    quickLaunchBtn.classList.toggle('active', favoriteLinkIds.size > 0);
    cardContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    if (linksToRender.length === 0) {
        cardContainer.innerHTML = '<p style="text-align:center; color: #6c757d;">No links saved. Type in the search box to add a new link.</p>';
        return;
    }
    const groupedLinks = linksToRender.reduce((acc, link) => {
        const category = link.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(link);
        return acc;
    }, {});
    for (const category in groupedLinks) {
    groupedLinks[category].sort((a, b) => a.description.localeCompare(b.description));
}
const sortedCategories = Object.keys(groupedLinks).sort((a, b) => {
    if (a === 'Other') return 1;
    if (b === 'Other') return -1;
    return a.localeCompare(b);
});
// Removed: favoriteCategories logic (no more category-level stars)
updateToggleAllLinkState();
if (currentView === 'list') {
    sortedCategories.forEach(category => {
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = category; // simplified
        fragment.appendChild(categoryHeader);
        groupedLinks[category].forEach(link => fragment.appendChild(renderLinkItem(link)));
    });
} else {
    sortedCategories.forEach(category => {
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'category-header collapsible';
        categoryHeader.textContent = category; // simplified
        fragment.appendChild(categoryHeader);
        const linksContainer = document.createElement('div');
        linksContainer.className = 'links-container';
        groupedLinks[category].forEach(link => linksContainer.appendChild(renderLinkItem(link)));
        fragment.appendChild(linksContainer);
        const isSearching = searchInput.value.trim() !== '';
        const isCollapsed = collapsedCategories.includes(category);
        if (isSearching || !isCollapsed) {
            categoryHeader.classList.add('expanded');
            linksContainer.classList.add('expanded');
        }
    });
}
cardContainer.appendChild(fragment);
}

function getHostname(url) {
    try {
        return new URL(url).hostname;
    } catch (e) { return url; }
}

function renderLinkItem(link) {
    const div = document.createElement('div');
    div.className = 'card';
    div.dataset.id = link.id;
    const isFavorite = favoriteLinkIds.has(link.id);
    div.innerHTML = `
        <img src="https://www.google.com/s2/favicons?sz=64&domain_url=${getHostname(link.url)}" class="link-favicon" alt="Favicon" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}'; this.style.padding='3px';">
        <div class="link-description">${link.description}</div>
        <div class="link-actions">
            <span class="favorite-btn" title="Set as favorite"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"></path></svg></span>
            <span class="edit-btn" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5.82842 16.6473V18H7.18263L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20H3V15.7574L14.435 4.32233C14.8256 3.93181 15.4587 3.93181 15.8492 4.32233L19.6777 8.15076C20.0682 8.54128 20.0682 9.17445 19.6777 9.56497L8.24264 21H7.24264V20Z"></path></svg></span>
            <span class="delete-btn" title="Delete"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg></span>
        </div>`;
    if (isFavorite) {
        div.querySelector('.favorite-btn')?.classList.add('is-favorite');
    }
    return div;
}

function setView(view) {
    currentView = view;
    localStorage.setItem('launchPadR1View', view);
    renderLinks();
}

function saveLinks() {
    saveLinksToR1();
}

function handleCategoryToggle(headerElement) {
    const linksContainer = headerElement.nextElementSibling;
    if (!linksContainer || !linksContainer.classList.contains('links-container')) return;
    linksContainer.classList.toggle('expanded');
    headerElement.classList.toggle('expanded');
    const categoryName = headerElement.textContent.replace(' ★', '');
    const isNowExpanded = linksContainer.classList.contains('expanded');
    if (isNowExpanded) {
        collapsedCategories = collapsedCategories.filter(c => c !== categoryName);
    } else {
        if (!collapsedCategories.includes(categoryName)) {
            collapsedCategories.push(categoryName);
        }
    }
    localStorage.setItem('launchPadR1CollapsedCategories', JSON.stringify(collapsedCategories));
    updateToggleAllLinkState();
}

function handleDeleteLink(idToDelete) {
    const index = links.findIndex(l => l.id === idToDelete);
    if (index === -1) return;
    const [deletedLink] = links.splice(index, 1);
    favoriteLinkIds.delete(deletedLink.id);
    saveLinks();
    searchHandler(searchInput.value);
}

cardContainer.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.matches('input.new-description')) {
        if (!target.dataset.hasBeenInteracted) {
            target.dataset.hasBeenInteracted = 'true';
            setTimeout(() => {
                const len = target.value.length;
                target.setSelectionRange(len, len);
            }, 0);
        }
        return;
    }
    const li = target.closest('.card');
    const categoryHeader = target.closest('.category-header.collapsible');
    if (currentView === 'group' && categoryHeader) {
        handleCategoryToggle(categoryHeader);
        return;
    }
    if (!li) return;
    const id = li.dataset.id;
    if (target.closest('.delete-btn')) {
        const link = links.find(l => l.id === id);
        if (link && await showConfirm(`Are you sure you want to delete "${link.description}"?`)) {
            handleDeleteLink(id);
        }
    } else if (target.closest('.edit-btn')) {
        const index = links.findIndex(l => l.id === id);
        if (index !== -1) editLink(li, index);
    } else if (target.closest('.favorite-btn')) {
    const favoriteBtn = target.closest('.favorite-btn'); // Get the button that was clicked
    if (favoriteLinkIds.has(id)) {
        favoriteLinkIds.delete(id);
    } else {
        favoriteLinkIds.add(id);
    }
    favoriteBtn.classList.toggle('is-favorite'); // ADDED: This directly toggles the color!
    triggerHaptic();
    saveLinks();
    searchHandler(searchInput.value); // This still runs to update the category star
} else if (target.closest('.link-description') || target.closest('.link-favicon')) {
        if (li.querySelector('.edit-description')) return;
        const link = links.find(l => l.id === id);
        if (!link) return;

        const isYouTube = getHostname(link.url).includes('youtube.com') || getHostname(link.url).includes('youtu.be');

        if (isYouTube) {
            const choice = await showGenericPrompt({
                message: `How would you like to launch "${link.description}"?`,
                buttons: [
                    { text: 'Internally', value: 'internal', class: '', order: 2 },
                    { text: 'Externally', value: 'external', class: 'secondary', order: 1 }
                ]
            });
            
            if (choice === 'internal') {
    const videoId = getYoutubeVideoId(link.url);
    const playlistId = getYoutubePlaylistId(link.url); // 🔹 NEW helper below

    if (playlistId) {
        console.log(`[YouTube] Playlist ID detected: ${playlistId}`);
        // ✅ If it’s a YouTube playlist, open as playlist
        openPlayerView({ playlistId, title: link.description });
    } else if (videoId) {
        console.log(`[YouTube] Video ID detected: ${videoId}`);
        // ✅ Normal single video behavior
        openPlayerView({ videoId, title: link.description });
    } else {
        // Generic or channel link → open search
        openYouTubeSearchView();
    }
} else if (choice === 'external') {
    triggerHaptic();
    launchUrlOnRabbit(link.url, link.description);
}

        } else {
            // Default behavior for all other links (including non-video YouTube links)
            triggerHaptic();
            launchUrlOnRabbit(link.url, link.description);
        }
    }
});

function getYoutubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function getYoutubePlaylistId(url) {
    const match = url.match(/[?&]list=([^&]+)/);
    return match ? match[1] : null;
}

// --- ⬇️ ADDED FOR is.gd LINK RESOLVING & SAVING ⬇️ ---

/**
 * Tries to resolve a short URL to its final destination URL.
 * Uses allorigins.win and parses the HTML 'contents' it returns.
 */
async function resolveShortUrl(shortUrl) {
    console.log(`[Resolve] Attempting to resolve: ${shortUrl}`);
    const proxyApiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(shortUrl)}`;
    
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);
        const response = await fetch(proxyApiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        // THIS IS THE FIX: We are now searching data.contents
        if (data && data.contents) {
            // Regex to find the first full YouTube playlist URL in the HTML
            // This pattern handles http/https, www, escaped chars, and dirty endings.
            const match = data.contents.match(/(https?:\/\/(?:www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_-]+)/);
            
            if (match && match[1]) {
                const resolved = match[1].replace(/&amp;/g, '&');
                console.log(`[Resolve] Parsed from contents: ${resolved}`);
                return resolved;
            }
        }
        
        // Fallback check (the original logic) just in case
        if (data && data.status && data.status.url && data.status.http_code >= 200 && data.status.http_code < 400) {
            console.log(`[Resolve] Resolved from status.url: ${data.status.url}`);
            return data.status.url;
        }

        console.warn('[Resolve] Could not find YouTube URL in proxy response.');
        return null;
    } catch (error) {
        console.error('[Resolve] Error resolving short URL:', error);
        return null;
    }
}

/**
 * Fetches metadata for a playlist (title and first video thumbnail).
 */
async function fetchPlaylistMetadata(playlistId) {
    const feed = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const url = `https://corsproxy.io/?${encodeURIComponent(feed)}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        
        const title = xmlDoc.getElementsByTagName('title')[0]?.textContent || 'YouTube Playlist';
        const firstEntry = xmlDoc.getElementsByTagName('entry')[0];
        const thumb = firstEntry?.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url') || GENERIC_FAVICON_SRC;
        
        return { title, thumb };
    } catch (error) {
        console.error('Error fetching playlist metadata:', error);
        return null;
    }
}

/**
 * Renders the list of saved playlists in the search results container.
 */
function renderSavedPlaylists() {
    youtubeSearchResultsContainer.innerHTML = '';
    if (savedPlaylists.length === 0) {
        youtubeSearchResultsContainer.innerHTML = '<p>Your saved playlists will appear here. Add one using the input above.</p>';
        return;
    }

    // --- ⬇️ THIS IS THE NEW LOGIC ⬇️ ---
    const sortedPlaylists = [...savedPlaylists].sort((a, b) => {
        return a.title.localeCompare(b.title);
    });
    // --- ⬆️ END OF NEW LOGIC ⬆️ ---

    const fragment = document.createDocumentFragment();
    // --- ⬇️ MODIFIED: Use the new sorted array ⬇️ ---
    sortedPlaylists.forEach(playlist => {
        const itemCard = document.createElement('div');
        itemCard.className = 'card youtube-result-card';
        itemCard.dataset.playlistId = playlist.id;
        
        if (playlist.id === currentlyPlayingPlaylistId) { // <-- ADD THIS
            itemCard.classList.add('currently-playing'); // <-- ADD THIS
        } // <-- ADD THIS
        itemCard.dataset.title = playlist.title;
        
        itemCard.innerHTML = `
            <img src="${playlist.thumb}" class="link-favicon" alt="Playlist thumbnail" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}';">
            <div class="link-description">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:-0.15em; margin-right:4px; opacity:0.7;"><path d="M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm13-1v8l6-4z"></path></svg>
                ${playlist.title}
            </div>
            <div class="delete-playlist-btn" title="Delete Playlist">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path></svg>
            </div>`;
        fragment.appendChild(itemCard);
    });
    youtubeSearchResultsContainer.appendChild(fragment);
}

/**
 * Saves the playlist array to local and creation storage.
 */
async function savePlaylistsToStorage() {
    const data = JSON.stringify(savedPlaylists);
    if (window.creationStorage) {
        try {
            await window.creationStorage.plain.set(SAVED_PLAYLISTS_KEY, data);
        } catch (e) {
            console.log('Using localStorage fallback for playlists');
        }
    }
    localStorage.setItem(SAVED_PLAYLISTS_KEY, data);
}
// --- ⬆️ END OF ADDED CODE ⬆️ ---


// --- ⬇️ ADDED FOR MANUAL PLAYLIST CONTROL ⬇️ ---

/**
 * Loads a specific video from the currentPlaylist array into the player.
 */
function loadVideoFromPlaylist(video) {
    if (!video) {
        console.warn("loadVideoFromPlaylist: No video provided.");
        return;
    }
    playerVideoTitle.textContent = video.title;
    
    // ⬇️ THIS IS THE FIX ⬇️
    // We must ALWAYS load the new video ID.
    // The onStateChange listener will handle playing it if audio-only is on.
    player.loadVideoById(video.id);
    
    /* // OLD BROKEN LOGIC
    if (isAudioOnly) {
        player.playVideo(); // This was the bug. It didn't load the new video.
    } else {
        player.loadVideoById(video.id);
    }
    */
    // ⬆️ END OF FIX ⬆️
}

/**
 * Plays the next video in the list, looping to the start if at the end.
 */
function playNextVideoInList() {
    if (!currentPlaylist || currentPlaylist.length === 0) return;

    // Advance index and wrap if needed
    currentPlaylistIndex++;
    if (currentPlaylistIndex >= currentPlaylist.length) {
        currentPlaylistIndex = 0;
    }

    const nextVideo = currentPlaylist[currentPlaylistIndex];
    if (nextVideo) {
        loadVideoFromPlaylist(nextVideo);
        if (player) player.playVideo();
        sayOnRabbit(`Now playing ${nextVideo.title}`);
    }
    triggerHaptic();
}

/**
 * Plays the previous video in the list, looping to the end if at the start.
 */
function playPreviousVideoInList() {
    if (!currentPlaylist || currentPlaylist.length === 0) return;

    // Step back index and wrap if needed
    currentPlaylistIndex--;
    if (currentPlaylistIndex < 0) {
        currentPlaylistIndex = currentPlaylist.length - 1;
    }

    const prevVideo = currentPlaylist[currentPlaylistIndex];
    if (prevVideo) {
        loadVideoFromPlaylist(prevVideo);
        if (player) player.playVideo();
        sayOnRabbit(`Now playing ${prevVideo.title}`);
    }
    triggerHaptic();
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// --- ⬆️ END OF ADDED CODE ⬆️ ---

// --- ⬇️ ADDED FROM YOUR WORKING SMALL APP ⬇️ ---

/**
 * Parses the XML feed from YouTube.
 */
function parseXMLPlaylist(xmlText) {
    const videos = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const entries = xmlDoc.getElementsByTagName('entry');

    for (const entry of entries) {
        const videoId = entry.getElementsByTagName('yt:videoId')[0]?.textContent;
        const title = entry.getElementsByTagName('media:title')[0]?.textContent;
        const thumb = entry.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url');
        
        if (videoId && title) {
            videos.push({ id: videoId, title: title, thumb: thumb });
        }
    }
    return videos;
}

/**
 * Fetches the playlist data directly, just like your small app.
 * This is called by openPlayerView.
 */
async function fetchManualPlaylist(playlistId) {
    // --- ⬇️ MODIFIED: ADDED ENCODEURICOMPONENT (FROM SMALL APP) ⬇️ ---
    const feed = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const url = `https://corsproxy.io/?${encodeURIComponent(feed)}`;
    // --- ⬆️ END OF MODIFIED CODE ⬆️ ---
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const xmlText = await response.text();
        const videos = parseXMLPlaylist(xmlText);
        
        if (videos.length > 0) {
            // SUCCESS! We got the list.
            console.log(`[Manual Playlist] Fetched ${videos.length} videos.`);
            currentPlaylist = videos;
            originalPlaylist = [...videos]; // Save an unshuffled copy
            currentPlaylistIndex = 0;
            
            // --- ⬇️ REMOVED ⬇️ ---
            // loadVideoFromPlaylist(0); // This is now called by onPlayerReady
            // --- ⬆️ END OF REMOVED ⬆️ ---

        } else {
            playerVideoTitle.textContent = 'Empty or invalid playlist.';
        }
        
    } catch (error) {
        console.error('Error fetching manual playlist:', error);
        playerVideoTitle.textContent = 'Failed to load playlist.';
    }
}
// --- ⬆️ END OF ADDED CODE ⬆️ ---

async function openPlayerView(options) {
    nowPlayingBar.style.display = 'none';
    // playerVideoTitle.textContent = options.title; // We set this later
    internalPlayerOverlay.style.display = 'flex';

    showPlayerUI(); // <-- ADD THIS LINE

    // --- ⬇️ MODIFIED: RESET TAP HINT ICON SESSION ⬇️ ---
    const hintElement = document.getElementById('tapHint');
    const hintIcon = document.querySelector('#tapHint img');
    if (hintIcon && hintElement) {
        hintIcon.dataset.shown = 'false';
        hintIcon.style.opacity = '0'; // Ensure it's hidden
        hintIcon.style.width = '0px'; // Ensure it's shrunk
        hintIcon.style.animationPlayState = 'paused'; // Also pause animation
        hintElement.style.gap = '0px'; // Ensure gap is 0
    }
    // --- ⬆️ END OF MODIFIED CODE ⬆️ ---

    // --- ⬇️ MODIFIED FOR MANUAL PLAYLIST CONTROL ⬇️ ---
    // isManualPlaylist = false; // <-- THIS LINE IS NOW GONE FROM HERE
    currentPlaylist = [];
    originalPlaylist = [];
    currentPlaylistIndex = 0;
    
    if (options.playlistId) {
        // --- THIS IS A MANUAL PLAYLIST ---
        currentlyPlayingPlaylistId = options.playlistId; // <-- ADD THIS
        isManualPlaylist = true;
        playerVideoTitle.textContent = 'Loading Playlist...'; // Show loading state
        
        playerSongControls.style.display = 'none';
        playerPlaylistControls.style.display = 'flex';
        playerPlayPauseBtn_playlist.innerHTML = PLAY_ICON_SVG;
        playerAudioOnlyBtn_playlist.innerHTML = AUDIO_ICON_SVG;
        playerAudioOnlyBtn_playlist.classList.remove('active');
        playerShuffleBtn.classList.remove('active'); // Ensure shuffle UI is reset
        isShuffleActive = false;
        
        // --- ⬇️ MODIFIED: AWAIT THE FETCH FUNCTION ⬇️ ---
        // We wait for the fetch to finish before creating the player
        await fetchManualPlaylist(options.playlistId);
        // --- ⬆️ END OF MODIFIED CODE ⬆️ ---

    } else {
        // --- THIS IS A SINGLE SONG ---
        currentlyPlayingPlaylistId = null; // <-- ADD THIS
        isManualPlaylist = false; // <-- IT IS NOW PASTED HERE
        playerVideoTitle.textContent = options.title;
        playerSongControls.style.display = 'flex';
        playerPlaylistControls.style.display = 'none';
        // Set initial state for song controls
        playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG;
        playerAudioOnlyBtn.innerHTML = AUDIO_ICON_SVG;
        playerAudioOnlyBtn.classList.remove('active');
    }
    
    isAudioOnly = false;
    playerContainer.classList.remove('audio-only');
    // --- ⬆️ END OF MODIFIED CODE ⬆️ ---

    const createPlayer = () => {
        if (player) {
            player.destroy();
        }
        try {
            // existing player config

            // This is the core change: It now creates the player differently
            // based on whether it receives a videoId or a playlistId.
            let playerConfig = {
    height: '100%',
    width: '100%',
    playerVars: {
        'playsinline': 1,
        'controls': 1,
        // Autoplay single songs, but wait for manual playlists
        'autoplay': options.videoId && !isManualPlaylist ? 1 : 0,

        // === 🧩 Added for cleaner YouTube embeds ===
        'rel': 0,              // Limit related videos to same channel
        'modestbranding': 1,   // Reduce YouTube logo visibility
        'showinfo': 0          // (Deprecated, harmless to leave in)
    },
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
};

            // --- ⬇️ MODIFIED FOR MANUAL PLAYLIST CONTROL ⬇️ ---
            if (options.videoId && !isManualPlaylist) {
                playerConfig.videoId = options.videoId;
            } 
            // --- We NO LONGER pass listType or list ---
            // The player is created EMPTY in manual playlist mode,
            // waiting for the onPluginMessage response.
            // --- ⬆️ END OF MODIFIED CODE ⬆️ ---

            player = new YT.Player('youtubePlayer', playerConfig);

        } catch (e) {
            console.error("Error creating YouTube player:", e);
        }
    };

    if (window.YT && window.YT.Player) {
        createPlayer();
    } else {
        window.onYouTubeIframeAPIReady = createPlayer;
    }
}

function closePlayerView() {
    internalPlayerOverlay.style.display = 'none';
    currentlyPlayingPlaylistId = null; // <-- ADD THIS
    if (player && typeof player.destroy === 'function') {
        player.destroy();
    }
    player = null;
    playerVideoTitle.textContent = '';
    // Reset player UI elements
    playerPlayPauseBtn.innerHTML = '';
    isAudioOnly = false;
    playerContainer.classList.remove('audio-only');
    playerAudioOnlyBtn.classList.remove('active');
    youtubePlayerContainer.innerHTML = '';
    clearTimeout(uiHideTimeout);
    showPlayerUI();
}

function hidePlayerUI() {
    isUIVisible = false;
    const header = document.querySelector('#internalPlayerOverlay .player-header');
    const controls = document.querySelector('#internalPlayerOverlay .player-controls');
    
    // 1. Collapse header
    if (header) {
        header.style.transition = 'opacity 0.35s ease, height 0.35s ease, padding 0.35s ease, visibility 0.35s ease';
        header.style.opacity = '0';
        header.style.height = '0';
        header.style.padding = '0'; 
        header.style.visibility = 'hidden';
        header.style.pointerEvents = 'none';
    }
    
    // 2. Collapse controls partially
    if (controls) {
        controls.style.transition = 'opacity 0.35s ease, height 0.35s ease, padding 0.35s ease, visibility 0.35s ease';
        controls.style.opacity = '0';
        controls.style.height = '35px'; 
        controls.style.padding = '0'; 
        controls.style.visibility = 'hidden';
        controls.style.pointerEvents = 'none';
    }

    // --- ⬇️ ADDED: Show Home Icon ⬇️ ---
    if (playerHomeIcon) {
        playerHomeIcon.style.opacity = '1';
        playerHomeIcon.style.pointerEvents = 'auto';
    }
    // --- ⬆️ END OF ADDED CODE ⬆️ ---
    
    // Show tap hint after UI fades
    showTapHint();
}

function showPlayerUI() {
    isUIVisible = true;
    const header = document.querySelector('#internalPlayerOverlay .player-header');
    const controls = document.querySelector('#internalPlayerOverlay .player-controls');
    
    // Restore header
    if (header) {
        header.style.opacity = '1';
        header.style.height = ''; 
        header.style.padding = ''; 
        header.style.visibility = ''; 
        header.style.pointerEvents = 'auto';
    }
    // Restore controls
    if (controls) {
        controls.style.opacity = '1';
        controls.style.height = ''; 
        controls.style.padding = ''; 
        controls.style.visibility = ''; 
        controls.style.pointerEvents = 'auto';
    }

    // --- ⬇️ ADDED: Hide Home Icon ⬇️ ---
    if (playerHomeIcon) {
        playerHomeIcon.style.opacity = '0';
        playerHomeIcon.style.pointerEvents = 'none';
    }
    // --- ⬆️ END OF ADDED CODE ⬆️ ---
    
    // Hide tap hint when UI shows again
    hideTapHint();    
    // Sync audio button state when UI reappears
    if (isAudioOnly) {
        playerAudioOnlyBtn.classList.add('active');
        playerAudioOnlyBtn_playlist.classList.add('active');
    } else {
        playerAudioOnlyBtn.classList.remove('active');
        playerAudioOnlyBtn_playlist.classList.remove('active');
    }
}

function showTapHint() {
    const hintElement = document.getElementById('tapHint');
    if (!hintElement) return;
    const hintIcon = hintElement.querySelector('img');
    if (!hintIcon) return;

    // Fade in the whole hint bar (which contains the text)
    hintElement.style.opacity = '1'; 
    hintElement.style.gap = '8px'; // Set the gap

    // Check if the icon has been shown this session (it's reset on openPlayerView)
    if (hintIcon.dataset.shown !== 'true') {
        // Mark as shown
        hintIcon.dataset.shown = 'true';
        
        // Fade in the icon, set its width, AND start its animation
        hintIcon.style.opacity = '1';
        hintIcon.style.width = '20px';
        hintIcon.style.animationPlayState = 'running';
        
        // Set timer to fade *only the icon* out, shrink it, and pause its animation
        clearTimeout(tapHintTimeout);
        tapHintTimeout = setTimeout(() => {
            hintIcon.style.opacity = '0';
            hintIcon.style.width = '0px';
            hintElement.style.gap = '0px';
            hintIcon.style.animationPlayState = 'paused';
        }, 3000);
    }
}

function hideTapHint() {
    const hintElement = document.getElementById('tapHint');
    if (hintElement) {
        // Fade out the entire bar (text) and shrink the gap
        hintElement.style.opacity = '0'; 
        hintElement.style.gap = '0px';
        
        // Also ensure the icon is faded out, shrunk, and its animation is paused
        const hintIcon = hintElement.querySelector('img');
        if (hintIcon) {
            hintIcon.style.opacity = '0';
            hintIcon.style.width = '0px';
            hintIcon.style.animationPlayState = 'paused';
        }
    }
    clearTimeout(tapHintTimeout);
}

// --- ⬇️ ADD THIS NEW FUNCTION ⬇️ ---
/**
 * Controls the visibility of all "Now Playing" UI elements
 * based on player state and current view.
 * @param {'playing' | 'paused' | 'stopped'} state 
 */
function updateNowPlayingUI(state) {
    // Check which view is active
    const isMainView = (mainView.style.display !== 'none' || mainView.classList.contains('input-mode-active')) &&
                       youtubeSearchViewOverlay.style.display === 'none';
    
    if (state === 'stopped') {
        nowPlayingBar.style.display = 'none';
        nowPlayingIcon.style.display = 'none';
        nowPlayingIcon.classList.remove('pulsating');
        nowPlayingBarIcon.classList.remove('pulsating');
    } else if (state === 'paused') {
        nowPlayingIcon.classList.remove('pulsating');
        nowPlayingBarIcon.classList.remove('pulsating');
        if (isMainView) {
            nowPlayingIcon.style.display = 'flex';
            nowPlayingBar.style.display = 'none';
        } else {
            nowPlayingIcon.style.display = 'none';
            nowPlayingBar.style.display = 'flex';
        }
    } else if (state === 'playing') {
        nowPlayingIcon.classList.add('pulsating');
        nowPlayingBarIcon.classList.add('pulsating');
        if (isMainView) {
            nowPlayingIcon.style.display = 'flex';
            nowPlayingBar.style.display = 'none';
        } else {
            nowPlayingIcon.style.display = 'none';
            nowPlayingBar.style.display = 'flex';
        }
    }
}
// --- ⬆️ END OF ADDED FUNCTION ⬆️ ---

function startUIHideTimer() {
    clearTimeout(uiHideTimeout);
    uiHideTimeout = setTimeout(() => {
        if (player && player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
            hidePlayerUI();
        }
    }, 4000);
}

// Reset the 4s UI fade timer on ANY control interaction (Songs & Playlists)
(function wireUiHideTimerResets() {
    const ids = [
        // Songs mode
        'playerBackBtn','playerSearchBtn','playerPlayPauseBtn','playerAudioOnlyBtn',

        // Playlist mode
        'playerBackBtn_playlist','playerSearchBtn_playlist',
        'playerPlayPauseBtn_playlist','playerAudioOnlyBtn_playlist',
        'playerPrevBtn','playerNextBtn','playerShuffleBtn','playerPlayAllBtn',

        // Shared/overlay bits
        'playerHomeIcon','stopPlayingBtn'
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            showPlayerUI();      // ensure visible after interaction
            startUIHideTimer();  // restart the 4s countdown
        });
    });
})();

function resetYouTubeSearch() {
    youtubeSearchInput.value = '';
    youtubeSearchResultsContainer.innerHTML = '';
    youtubeNextPageUrl = null; // Also reset pagination
}

function openYouTubeSearchView() {
    youtubeSearchViewOverlay.style.display = 'flex';
    
    // This function now just sets the state, it doesn't reset.
    if (currentSearchMode === 'isGd') {
        youtubeSearchInput.placeholder = 'Enter is.gd code...';
        youtubeSearchGoBtn.textContent = 'Load';
        renderSavedPlaylists(); // This is still needed for highlighting
    } else {
        youtubeSearchInput.placeholder = 'Search YouTube...';
        youtubeSearchGoBtn.textContent = 'Search';
        // We NO LONGER clear the input or results here.
    }
}

function closeYouTubeSearchView() {
    youtubeSearchViewOverlay.style.display = 'none';
    youtubeSearchInput.value = '';
    youtubeSearchInput.placeholder = 'Search YouTube...'; // Reset placeholder
    youtubeSearchResultsContainer.innerHTML = '';

    // ⬇️ ADD THIS ⬇️
    // Tell the UI to update when we return to the main view
    if (player && player.getPlayerState) {
        const state = player.getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
            updateNowPlayingUI('playing');
        } else if (state === YT.PlayerState.PAUSED) {
            updateNowPlayingUI('paused');
        }
    }
}

function hideYouTubeSearchView() {
    youtubeSearchViewOverlay.style.display = 'none';
}

function renderYouTubeResults(results, mode) {
    if (!results || results.length === 0) {
        if (youtubeSearchResultsContainer.innerHTML.includes('Searching...')) {
            youtubeSearchResultsContainer.innerHTML = '<p>No results found.</p>';
        }
        return;
    }

    const fragment = document.createDocumentFragment();
    results.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'card youtube-result-card';

        if (mode === 'videos') {
            itemCard.dataset.videoLink = item.link; 
            itemCard.dataset.title = item.title;
            const thumbnailUrl = item.thumbnail?.static || GENERIC_FAVICON_SRC;
            itemCard.innerHTML = `
                <img src="${thumbnailUrl}" class="link-favicon" alt="Video thumbnail" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}';">
                <div class="link-description">${item.title}</div>`;
        } else if (mode === 'playlists') {
            itemCard.dataset.playlistId = item.playlist_id;
            itemCard.dataset.title = item.title;
            const thumbnailUrl = item.thumbnail || GENERIC_FAVICON_SRC;
            // Add a playlist icon to distinguish it
            itemCard.innerHTML = `
                <img src="${thumbnailUrl}" class="link-favicon" alt="Playlist thumbnail" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}';">
                <div class="link-description">
                    <svg viewBox="0 0 24 24" fill="currentColor" style="width:1em; height:1em; vertical-align:-0.15em; margin-right:4px; opacity:0.7;"><path d="M3 10h11v2H3zm0-4h11v2H3zm0 8h7v2H3zm13-1v8l6-4z"></path></svg>
                    ${item.title}
                    <div style="font-size:0.8em; color:var(--icon-color); font-weight:normal;">${item.video_count} videos</div>
                </div>`;
        }
        fragment.appendChild(itemCard);
    });
    youtubeSearchResultsContainer.appendChild(fragment);
}

function handleYouTubeSearch(query, nextPageUrl = null) {
    // --- Guard clause to handle empty searches ---
    if (!query && !nextPageUrl) {
        youtubeSearchResultsContainer.innerHTML = ''; // Clear any "Searching..." message
        return; // Stop the function immediately
    }
    // --- END OF ADDED CODE ---

    if (isFetchingYoutubeResults) return; // Prevent multiple requests
    isFetchingYoutubeResults = true;

    if (!nextPageUrl) { // This is a new search
        youtubeSearchResultsContainer.innerHTML = '<p>Searching...</p>';
        youtubeNextPageUrl = null; // Reset pagination
    }

    if (nextPageUrl) { // This is an infinite scroll fetch
        const loader = document.createElement('div');
        loader.id = 'youtubeSearchLoader';
        loader.textContent = 'Loading...';
        loader.className = 'youtube-search-loader';
        youtubeSearchResultsContainer.appendChild(loader);
    }

    if (typeof PluginMessageHandler !== "undefined") {
        // This function is now ONLY for 'videos' mode
        const baseParams = { engine: "youtube", search_query: query, num: 50 };

        // --- Handle pagination ---
        if (nextPageUrl) {
            const url = new URL(nextPageUrl);
            const spToken = url.searchParams.get('sp');
            baseParams.sp = spToken || undefined;
        }

        PluginMessageHandler.postMessage(JSON.stringify({
            message: JSON.stringify({ query_params: baseParams }),
            useSerpAPI: true
        }));
        return;

    } else {
        // Mock data for browser testing remains unchanged
        console.log(`[Browser Mode] Searching YouTube for: ${query}`);
        const mockResults = [
            { link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: `Mock Result 1 for ${query}`, thumbnail: { static: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg' } },
            { link: 'https://www.youtube.com/watch?v=o-YBDTqX_ZU', title: `Mock Result 2 for ${query}`, thumbnail: { static: 'https://i.ytimg.com/vi/o-YBDTqX_ZU/hqdefault.jpg' } }
        ];
        if (youtubeSearchResultsContainer.innerHTML.includes('Searching...')) {
            youtubeSearchResultsContainer.innerHTML = '';
        }
        renderYouTubeResults(mockResults);
        isFetchingYoutubeResults = false;
    }
}


// ✅  Option B: Auto-scan for Playlists
window.onPluginMessage = async (e) => {
    try {
        const data = e.data
            ? typeof e.data === "string"
                ? JSON.parse(e.data)
                : e.data
            : null;

        if (youtubeSearchResultsContainer.innerHTML.includes("Searching...")) {
            youtubeSearchResultsContainer.innerHTML = "";
        }

        if (!data) {
            youtubeSearchResultsContainer.innerHTML = "<p>No results found.</p>";
            return;
        }

        // This function now ONLY handles 'videos' mode
        if (currentSearchMode === "videos") {
            if (Array.isArray(data.video_results) && data.video_results.length > 0) {
                renderYouTubeResults(data.video_results, "videos");
            } else {
                youtubeSearchResultsContainer.innerHTML = "<p>No results found.</p>";
            }
        }
        // No 'else if' for playlists is needed anymore

        youtubeNextPageUrl = data.serpapi_pagination?.next || null;
    } catch (err) {
        console.error("Error parsing YouTube plugin message:", err);
        youtubeSearchResultsContainer.innerHTML = "<p>Error loading results.</p>";
    } finally {
        isFetchingYoutubeResults = false;
        const loader = document.getElementById("youtubeSearchLoader");
        if (loader) loader.remove();
    }
};


youtubeSearchView.addEventListener('scroll', () => {
    if (isFetchingYoutubeResults || !youtubeNextPageUrl) return;

    const { scrollTop, scrollHeight, clientHeight } = youtubeSearchView;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
        const query = youtubeSearchInput.value.trim();
        handleYouTubeSearch(query, youtubeNextPageUrl);
    }
});

youtubeSearchInput.addEventListener('focus', () => youtubeSearchViewOverlay.classList.add('input-focused'));
youtubeSearchInput.addEventListener('blur', () => youtubeSearchViewOverlay.classList.remove('input-focused'));

function createFormHTML(linkData = {}, isForEditing = false) {
    const { description = '', url = 'https://', category = 'Other' } = linkData;
    const categoryOptions = categories.map(cat => `<option value="${cat}" ${category === cat ? 'selected' : ''}>${cat}</option>`).join('');
    const inputClassPrefix = isForEditing ? 'edit' : 'new';
    const saveButtonClass = isForEditing ? 'save-btn' : 'save-new-btn';
    return `
        <div class="link-info">
            <input type="text" class="${inputClassPrefix}-description" value="${description}" placeholder="Description">
            <input type="text" class="${inputClassPrefix}-url" value="${url}" placeholder="URL (e.g., https://...)">
            <select class="${inputClassPrefix}-category">${categoryOptions}</select>
            <div class="form-actions">
                <button class="cancel-btn secondary">Cancel</button>
                <button class="${saveButtonClass}">${isForEditing ? 'Save' : 'Add'}</button>
            </div>
        </div>`;
}

function editLink(li, index) {
    const link = links[index];
    li.innerHTML = createFormHTML(link, true);
    li.querySelector('.save-btn').addEventListener('click', async () => {
        const newDescription = li.querySelector('.edit-description').value.trim();
        const newUrl = normalizeUrl(li.querySelector('.edit-url').value.trim());
        const newCategory = li.querySelector('.edit-category').value;
        if (newDescription && newUrl) {
            links[index] = { ...links[index], description: newDescription, url: newUrl, category: newCategory };
            saveLinks();
            searchHandler(searchInput.value);
        } else {
            await showAlert('Description and URL cannot be empty or invalid.');
        }
    });
    li.querySelector('.cancel-btn').addEventListener('click', () => searchHandler(searchInput.value));
}

async function showAddForm(prefillData = {}) {
    const existingNewInput = document.querySelector('.new-description');
    if (existingNewInput) {
        const existingForm = existingNewInput.closest('.link-item');
        if (prefillData.description) existingForm.querySelector('.new-description').value = prefillData.description;
        if (prefillData.url) existingForm.querySelector('.new-url').value = prefillData.url;
        existingForm.querySelector('.new-description').focus();
        return;
    }
    const li = document.createElement('li');
    li.className = 'card';
    li.innerHTML = createFormHTML(prefillData, false);
    cardContainer.appendChild(li);
    li.scrollIntoView({ behavior: 'smooth' });
    if (prefillData.description) {
        li.querySelector('.new-category').focus();
    } else {
        li.querySelector('.new-description')?.focus();
    }
    const saveHandler = async () => {
        const description = li.querySelector('.new-description').value.trim();
        const url = li.querySelector('.new-url').value.trim();
        const category = li.querySelector('.new-category').value;
        await addNewLink({ description, url, category });
    };
    li.querySelector('.save-new-btn').addEventListener('click', saveHandler);
    li.querySelector('.cancel-btn').addEventListener('click', () => {
        li.remove();
        searchInput.value = ''; // Clear search on cancel
        cardContainer.innerHTML = `<div class="search-prompt">Search your links or add from the web.</div>`;
        clearSearchBtn.style.display = 'none';
        cancelSearchBtn.style.display = 'flex';
        searchInput.focus();
    });
}

async function handleAddFromQuery(description, url) {
    if (!description) return;
    cardContainer.innerHTML = '';
    let prefillData = {};
    if (description.includes(' ')) {
        prefillData = { description: description.replace(/\b\w/g, l => l.toUpperCase()), url: url || 'https://' };
    } else {
        const finalUrl = url || (() => {
            const hasProtocol = description.startsWith('http://') || description.startsWith('https://');
            const looksLikeDomain = description.includes('.');
            return hasProtocol ? description : (looksLikeDomain ? `https://${description}` : `https://www.${description}.com`);
            // R1 Hardware Events
    window.addEventListener('sideButtonSinglePress', (event) => {
        if (internalPlayerOverlay.style.display === 'flex') {
            event.preventDefault();
            togglePlayback();
        } else if (favoriteLinkIds.size > 0) {
            event.preventDefault();
            openFavoritesDialog();
        }
    });

    window.addEventListener('sideButtonDoublePress', (event) => {
        event.preventDefault();
        goHome();
    });

    async function init() {
        await loadLinksFromR1();
        renderLinks();
        applyTheme({ name: currentThemeName, mode: currentLuminanceMode }, true);
    }

    document.addEventListener('DOMContentLoaded', init);

})();
        const finalDescription = description.split('.')[0].replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\b\w/g, l => l.toUpperCase());
        prefillData = { description: finalDescription, url: finalUrl, category: 'Other' };
    }
    prefillData.url = normalizeUrl(prefillData.url);
    await showAddForm(prefillData);
}

async function addNewLink(linkData) {
    const normalizedUrl = normalizeUrl(linkData.url);
    if (!linkData || !linkData.description || !normalizedUrl) {
        await showAlert('Please provide a description and a full URL.');
        return false;
    }
    links.push({ ...linkData, url: normalizedUrl, id: `link-${Date.now()}` });
    saveLinks();
    const newCategory = linkData.category || 'Other';
    collapsedCategories = collapsedCategories.filter(c => c !== newCategory);
    localStorage.setItem('launchPadR1CollapsedCategories', JSON.stringify(collapsedCategories));
    searchInput.value = '';
    renderLinks();
    await sayOnRabbit(`Added ${linkData.description}`);
    return true;
}

async function performExternalSearch(queryOverride) {
    const query = queryOverride || searchInput.value.trim();
    if (query) {
        cardContainer.innerHTML = `<div class="search-prompt">Launching web search for "${query}"...</div>`;
        const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        await launchUrlOnRabbit(searchUrl, `search for ${query}`);
    } else {
        searchHandler('');
    }
}

function renderCombinedResults(query, apiSuggestions, localResults) {
    const fragment = document.createDocumentFragment();
    let hasContent = false;
    if (localResults.length > 0) {
        const header = document.createElement('h3');
        header.className = 'category-header';
        header.textContent = 'In Your Links';
        fragment.appendChild(header);
        hasContent = true;
        localResults.forEach(link => fragment.appendChild(renderLinkItem(link)));
    }
    const existingUrls = new Set(links.map(link => link.url.replace(/\/$/, '')));
    const filteredApiSuggestions = apiSuggestions.filter(sugg => !existingUrls.has(sugg.link.replace(/\/$/, '')));
    if (filteredApiSuggestions.length > 0) {
        const header = document.createElement('h3');
        header.className = 'category-header';
        header.textContent = 'Web Suggestions';
        if (hasContent) header.style.marginTop = '15px';
        fragment.appendChild(header);
        hasContent = true;
        filteredApiSuggestions.slice(0, 4).forEach(sugg => {
            const suggLi = document.createElement('li');
            suggLi.className = 'card add-suggestion-item';
            suggLi.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain_url=${getHostname(sugg.link)}" class="link-favicon" alt="Favicon" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}'; this.style.padding='3px';"><div class="link-description">Add: ${sugg.title}</div>`;
            suggLi.addEventListener('click', () => handleAddFromQuery(sugg.title, sugg.link));
            fragment.appendChild(suggLi);
        });
    }
    const webSearchLi = document.createElement('li');
    webSearchLi.className = 'card web-search-item';
    webSearchLi.innerHTML = `<div class="link-favicon" style="display: flex; align-items: center; justify-content: center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--primary-color)" width="20" height="20"><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg></div><div class="link-description">Search for "${query}" on the web</div>`;
    webSearchLi.addEventListener('click', () => performExternalSearch(query));
    fragment.appendChild(webSearchLi);
    cardContainer.innerHTML = '';
    cardContainer.appendChild(fragment);
}

function handleOSMessage(e, requestQuery) {
    const currentQueryInBox = searchInput.value.trim();
    if (requestQuery.toLowerCase() !== currentQueryInBox.toLowerCase()) return; // Ignore stale results

    try {
        const data = e.data ? (typeof e.data == "string" ? JSON.parse(e.data) : e.data) : null;
        if (data && data.organic_results) {
            const localResults = links.filter(link => link.description.toLowerCase().includes(requestQuery.toLowerCase()) || link.url.toLowerCase().includes(requestQuery.toLowerCase()));
            renderCombinedResults(requestQuery, data.organic_results, localResults);
        } else {
            renderCombinedResults(requestQuery, [], localResults);
        }
    } catch (err) { console.error("Error parsing plugin message:", err); }
}

function searchHandler(query) {
    query = query.trim();
    if (!query) {
        renderLinks(links);
        return;
    }
    if (typeof PluginMessageHandler !== "undefined") {
        window.onPluginMessage = (e) => handleOSMessage(e, query);
        PluginMessageHandler.postMessage(JSON.stringify({
            message: JSON.stringify({ query_params: { engine: "google", q: query, hl: "en" }, useLocation: false }),
            useSerpAPI: true
        }));
    } else {
        const mockApiResults = [{ title: `Mock Result for '${query}'`, link: `https://www.example.com/search?q=${query}` }, { title: "The Verge - Tech News", link: "https://www.theverge.com" }, { title: "Hacker News", link: "https://news.ycombinator.com" }];
        const localResults = links.filter(link => link.description.toLowerCase().includes(query.toLowerCase()) || link.url.toLowerCase().includes(query.toLowerCase()));
        setTimeout(() => {
            if (query.toLowerCase() === searchInput.value.trim().toLowerCase()) {
                renderCombinedResults(query, mockApiResults, localResults);
            }
        }, 200);
    }
}

searchBtn.addEventListener('click', () => performExternalSearch());
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performExternalSearch();
});

const debouncedSearch = debounce(searchHandler, 400);
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
    if (mainView.classList.contains('input-mode-active')) {
        cancelSearchBtn.style.display = query.length > 0 ? 'none' : 'flex';
    }
    debouncedSearch(query);
});

cancelSearchBtn.addEventListener('click', () => {
    if (window.getComputedStyle(cancelSearchBtn).display === 'none') return;
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    cancelSearchBtn.style.display = 'none';
    searchHandler('');
    searchInput.blur();
    scrollToTop();
});

mainView.addEventListener('focusin', (e) => {
    if (e.target.id === 'searchInput') {
        mainView.classList.add('input-mode-active');
        const query = e.target.value.trim();
        cancelSearchBtn.style.display = query.length > 0 ? 'none' : 'flex';
        clearSearchBtn.style.display = query.length > 0 ? 'flex' : 'none';
        if (query === '') {
            cardContainer.innerHTML = `<div class="search-prompt">Search your links or add from the web.</div>`;
        }
        setTimeout(() => {
            document.querySelector('.search-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
});

mainView.addEventListener('focusout', (e) => {
    if (e.target.id === 'searchInput') {
        setTimeout(() => {
            const isADialogOpen = ['flex', 'block'].includes(themeDialogOverlay.style.display) ||
                                  ['flex', 'block'].includes(deletePromptOverlay.style.display) ||
                                  ['flex', 'block'].includes(favoritesPromptOverlay.style.display) ||
                                  ['flex', 'block'].includes(genericPromptOverlay.style.display);
            if (isADialogOpen) return;
            const isSearchInputEmpty = searchInput.value.trim() === '';
            const isEditingOrAdding = !!document.querySelector('.edit-description, .new-description');
            if (!isEditingOrAdding && isSearchInputEmpty) {
                mainView.classList.remove('input-mode-active');
                searchHandler('');
            }
        }, 150);
    }
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    cancelSearchBtn.style.display = 'flex';
    searchHandler('');
    searchInput.focus();
    triggerHaptic();
});

toggleViewBtn.addEventListener('click', () => {
    setView(currentView === 'list' ? 'group' : 'list');
});

toggleAllLink.addEventListener('click', (e) => {
    e.preventDefault();
    collapsedCategories = [...new Set(links.map(link => link.category || 'Other'))];
    localStorage.setItem('launchPadR1CollapsedCategories', JSON.stringify(collapsedCategories));
    searchHandler(searchInput.value);
});

function openFavoritesDialog() {
    function renderFavoritesList() {
        favoritesList.innerHTML = '';
        const favoriteLinks = links.filter(l => favoriteLinkIds.has(l.id)).sort((a, b) => a.description.localeCompare(b.description));
        if (favoriteLinks.length === 0) {
            favoritesList.innerHTML = `<p class="no-favorites-message">No favorites set yet.<br>Click the star on any link to add it here.</p>`;
            quickLaunchBtn.classList.remove('active');
        } else {
            const fragment = document.createDocumentFragment();
            favoriteLinks.forEach(link => {
                const li = document.createElement('li');
                li.className = 'favorite-list-item';
                li.dataset.id = link.id;
                li.dataset.url = link.url;
                li.dataset.name = link.description;
                li.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain_url=${getHostname(link.url)}" class="link-favicon" alt="Favicon" onerror="this.onerror=null; this.src='${GENERIC_FAVICON_SRC}'; this.style.padding='3px';"><span class="favorite-list-item-description">${link.description}</span><span class="remove-favorite-btn" title="Remove from favorites"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"></path></svg></span>`;
                fragment.appendChild(li);
            });
            favoritesList.appendChild(fragment);
        }
    }
    renderFavoritesList();
    favoritesPromptOverlay.style.display = 'flex';
    favoritesList.focus();
    const closeDialog = () => {
        favoritesPromptOverlay.style.display = 'none';
        scrollToTop();
    };
    favoritesList.onclick = async (e) => {
    const removeBtn = e.target.closest('.remove-favorite-btn');
    if (removeBtn) {
        const li = removeBtn.closest('.favorite-list-item');
        if (await showConfirm(`Remove "${li.dataset.name}" from favorites?`)) {
            favoriteLinkIds.delete(li.dataset.id);
            saveLinks();
            triggerHaptic();
            renderFavoritesList();
            renderLinks();
        }
    } else {
        const li = e.target.closest('.favorite-list-item');
        if (li) {
            closeDialog();

            const url = li.dataset.url;
            const name = li.dataset.name;
            const hostname = getHostname(url);
            const isYouTube = hostname.includes('youtube.com') || hostname.includes('youtu.be');

            if (isYouTube) {
                const choice = await showGenericPrompt({
                    message: `How would you like to launch "${name}"?`,
                    buttons: [
                        { text: 'Internally', value: 'internal', class: '', order: 2 },
                        { text: 'Externally', value: 'external', class: 'secondary', order: 1 }
                    ]
                });

                if (choice === 'internal') {
                    const videoId = getYoutubeVideoId(url);
                    const playlistId = getYoutubePlaylistId(url);
                    if (playlistId) {
                        openPlayerView({ playlistId, title: name });
                    } else if (videoId) {
                        openPlayerView({ videoId, title: name });
                    } else {
                        openYouTubeSearchView();
                    }
                } else if (choice === 'external') {
                    triggerHaptic();
                    launchUrlOnRabbit(url, name);
                }
            } else {
                // Default behavior for non-YouTube favorites
                triggerHaptic();
                launchUrlOnRabbit(url, name);
            }
        }
    }
};
favoritesPromptClose.onclick = closeDialog;

}

quickLaunchBtn.addEventListener('click', async () => {
    if (favoriteLinkIds.size === 0) {
        await sayOnRabbit("No favorite link set.");
        await showAlert("No favorite link set. Click the star on any link to set it as a favorite.");
        return;
    }
    triggerHaptic();
    openFavoritesDialog();
});

const CSS_COLOR_NAMES = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen'].sort();
const STUDIO_BASE_COLORS = ['Beige', 'Blue', 'Brown', 'Coral', 'Crimson', 'Cyan', 'Gold', 'Gray', 'Green', 'Indigo', 'Lavender', 'Lime', 'Magenta', 'Maroon', 'Olive', 'Orange', 'Pink', 'Purple', 'Red', 'SkyBlue', 'Teal', 'Turquoise', 'Violet', 'Yellow'];
const STUDIO_MODIFIERS = ['Bold', 'Cool', 'Darker', 'Glow', 'Invert', 'Lighter', 'Metallic', 'Monochrome', 'Muted', 'Neon', 'Pastel', 'Vibrant', 'Vintage', 'Warm'];

let isStudioMode = false;
let studioStage = 1;
let studioBaseColor = null;
let studioActiveModifier = null;

function updateModifierSelectionUI() {
    const listItems = themeColorList.querySelectorAll('.theme-color-item');
    listItems.forEach(item => {
        item.classList.toggle('selected', item.dataset.modifierName?.toLowerCase() === studioActiveModifier);
    });
}

// *** DEFINITIVE FIX: Central function for all Studio previews ***
async function updateStudioPreview() {
    if (!isStudioMode || !studioBaseColor) return;
    
    // In the new streamlined flow, if we are in studio mode, we always apply the active modifier.
    const themeToApply = { name: `custom:${studioBaseColor}`, modifier: studioActiveModifier || 'bold' };
    
    // Update the master theme name variable every time a preview is generated
    currentThemeName = themeToApply.modifier 
        ? `${themeToApply.name}:${themeToApply.modifier}` 
        : themeToApply.name;

    const applyResult = await applyTheme(themeToApply, false); // false = isConfirmation
    if (applyResult && !applyResult.success) {
        themeDialogError.textContent = applyResult.error;
    }
}

async function applyTheme(themeIdentifier, silent = false, isConfirmation = false) {
    let themeColors;
    let friendlyName;
    let error = null;
    let themeToApply = { ...themeIdentifier }; // Make a mutable copy

    // If applying "My Custom Theme", load its full definition
    if (customTheme && (themeToApply.name === `custom:My Custom Theme` || themeToApply.name === 'My Custom Theme')) {
        // If a mode is saved with the custom theme, apply it first.
        if (customTheme.mode && customTheme.mode !== currentLuminanceMode) {
            await setLuminanceMode(customTheme.mode, true); // Silently set the mode
        }
        themeToApply.name = `custom:${customTheme.baseColor}`; // Use the base color for generation
        themeToApply.modifier = customTheme.modifier; // Use the saved modifier
    }

    if (themeToApply.name.startsWith('custom:')) {
        const themeParts = themeToApply.name.split(':');
        const colorName = themeParts[1];
        const modifierFromName = themeParts.length > 2 ? themeParts[2] : null;
        const primaryRgb = colorNameToRgb(colorName);
        if (!primaryRgb) {
            error = `'${colorName}' is not a valid color.`;
        } else {
            themeColors = generatePaletteFromRgb(primaryRgb, currentLuminanceMode, themeToApply.modifier || modifierFromName);
            if (!themeColors) {
                error = currentLuminanceMode === 'dark' ? "This color is too dark." : "This color is too light.";
            } else {
                friendlyName = colorName;
            }
        }
    } else {
        themeColors = defaultTheme[currentLuminanceMode] || defaultTheme.dark;
        friendlyName = defaultTheme.name || 'Rabbit';
    }
    if (error) return { success: false, error: error };
    if (!themeColors) return { success: true };
    themeDialogTitle.style.color = themeColors['--primary-color'];
    const finalThemeName = themeToApply.modifier ? `${themeToApply.name}:${themeToApply.modifier}` : themeToApply.name;
    if (isConfirmation) {
        Object.entries(themeColors).forEach(([key, value]) => document.documentElement.style.setProperty(key, value));
        currentThemeName = finalThemeName;

// Persist on device (Creation Storage) when available
if (window.creationStorage?.plain?.set) {
  try {
    await window.creationStorage.plain.set('launchPadR1Theme', currentThemeName);
    await window.creationStorage.plain.set('launchPadR1LuminanceMode', currentLuminanceMode);
  } catch (e) {
    // fall through to localStorage
  }
}

// Fallback for webview
localStorage.setItem('launchPadR1Theme', currentThemeName);

if (!silent) await sayOnRabbit(`Theme set to ${friendlyName}`);

// === 🔆 Apply Alternate Theme to Speaker Icon ===
const icon = document.getElementById('nowPlayingIcon');
if (icon) {
  icon.classList.remove('alt-theme-rabbit', 'alt-theme-glow');
  if (currentThemeName === 'rabbit') {
    // Rabbit Me active → use Glow Forest Green accent
    icon.classList.add('alt-theme-glow');
  } else {
    // Any other theme → use Rabbit Me accent
    icon.classList.add('alt-theme-rabbit');
  }
}
// === 🔆 End Speaker Icon Theme Update ===

} else {
  const dialog = themeDialogOverlay.querySelector('.custom-prompt-dialog');
  dialog.style.cssText = '';
  Object.entries(themeColors).forEach(([key, value]) => dialog.style.setProperty(key, value));
  currentThemeName = finalThemeName;
}
return { success: true };

}

function openThemeEditor() {
    isStudioMode = false;
    studioStage = 1;
    studioBaseColor = null;
    studioActiveModifier = null;
    originalThemeState = { theme: currentThemeName, mode: currentLuminanceMode };
    themeLabToggle.style.display = 'none'; // Always hide on open
    themeDialogTitle.parentElement.classList.remove('lab-toggle-active');
    labCheckbox.checked = false; // Ensure lab mode is off when opening
    renderThemeDialog();
    themeDialogTitle.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    updateModeToggleUI();
    updateThemeListDisabledState();
}

function formatColorNameForDisplay(name) {
    // Add a space before capital letters in a compound word (e.g., "DarkGreen" -> "Dark Green")
    // but not for the first letter.
    return name.replace(/([A-Z])/g, ' $1').trim();
}

function renderThemeDialog() {
    themeDialogOverlay.style.display = 'flex';
    themeDialogInput.value = '';
    themeDialogInput.parentElement.style.display = 'block'; // Ensure it's visible by default
    themeDialogError.textContent = '';
    clearThemeInputBtn.style.display = 'none';
    themeColorList.innerHTML = '';
    themeColorList.scrollTop = 0;
    const fragment = document.createDocumentFragment();

    if (isStudioMode) {
        themeDialogTitle.textContent = 'Apply Modifier';
        themeDialogOk.textContent = 'Save';
        themeDialogCancel.textContent = 'Back';
        themeDialogReset.style.display = 'none'; // Not applicable in lab mode
        themeDialogInput.parentElement.style.display = 'none'; // Hide input in lab mode
        STUDIO_MODIFIERS.forEach(name => {
            const li = document.createElement('li');
            li.className = 'theme-color-item';
            li.textContent = name;
            li.dataset.modifierName = name;
            fragment.appendChild(li);
        });
    } else {
        themeDialogTitle.textContent = 'Change Theme';
        themeDialogOk.textContent = 'OK';
        themeDialogCancel.textContent = 'Cancel';
        themeDialogReset.style.display = 'block';
        if (customTheme) {
            const li = document.createElement('li');
            li.className = 'theme-color-item';
            li.innerHTML = `My Custom Theme <span class="favorite-indicator">★</span>`;
            li.dataset.colorName = customTheme.baseColor;
            li.dataset.isCustom = 'true';
            fragment.appendChild(li);
        }
        CSS_COLOR_NAMES.forEach(name => {
            const li = document.createElement('li');
            li.className = 'theme-color-item';
            li.textContent = formatColorNameForDisplay(name);
            li.dataset.colorName = name;
            fragment.appendChild(li);
        });
    }

    themeColorList.appendChild(fragment);
    themeColorList.focus();
    themeDialogOverlay.classList.remove('input-focused');
}

function updateThemeListDisabledState() {
    const listItems = themeColorList.querySelectorAll('.theme-color-item');
    listItems.forEach(item => {
        const colorName = item.dataset.colorName;
        if (colorName) { // Only check colors, not modifiers
            const rgb = colorNameToRgb(colorName);
            item.classList.toggle('disabled', !rgb || !generatePaletteFromRgb(rgb, currentLuminanceMode));
        }
    });
}

function updateModeToggleUI() {
    themeModeToggleBtn.innerHTML = currentLuminanceMode === 'light' ? MOON_ICON_SVG : SUN_ICON_SVG;
    themeModeToggleBtn.title = `Switch to ${currentLuminanceMode === 'light' ? 'Dark' : 'Light'} Mode`;
}

// *** DEFINITIVE FIX: Re-architected luminance mode function ***
async function setLuminanceMode(mode, silent = false) {
    if (currentLuminanceMode === mode) return;
    currentLuminanceMode = mode;
    localStorage.setItem('launchPadR1LuminanceMode', mode);
    updateModeToggleUI();
    updateThemeListDisabledState();

    if (isStudioMode) {
        // In the studio, all preview updates go through the central function.
        await updateStudioPreview();
    } else {
        // In normal mode, re-apply the last known theme with the new mode.
        const themeToApply = { name: currentThemeName };
        const applyResult = await applyTheme(themeToApply, silent);
        if (applyResult && !applyResult.success) {
            themeDialogError.textContent = applyResult.error;
        }
    }
}

async function toggleLuminanceMode() {
    triggerHaptic();
    const newMode = currentLuminanceMode === 'light' ? 'dark' : 'light';
    await setLuminanceMode(newMode);
}

function filterThemeList(query) {
    const lowerCaseQuery = query.trim().toLowerCase().replace(/\s+/g, '');
    const listItems = themeColorList.querySelectorAll('.theme-color-item');
    const noMatchesEl = themeColorList.querySelector('.no-matches-message');
    if (noMatchesEl) noMatchesEl.remove();

    let visibleCount = 0;

    listItems.forEach(item => {
        const isVisible = !lowerCaseQuery || (item.dataset.colorName || item.dataset.modifierName || '').toLowerCase().includes(lowerCaseQuery);
        item.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });

    if (visibleCount === 0 && listItems.length > 0) {
        const li = document.createElement('li');
        li.className = 'no-matches-message';
        li.textContent = `No matches for "${query}"`;
        themeColorList.appendChild(li);
    }
}

async function closeThemeDialog(shouldRevert = false) {
    if (shouldRevert && (currentLuminanceMode !== originalThemeState.mode || currentThemeName !== originalThemeState.theme)) {
        await setLuminanceMode(originalThemeState.mode, true);
        await applyTheme({ name: originalThemeState.theme }, true, true);
    }
    themeDialogOverlay.style.display = 'none';
    scrollToTop();
}

function setupThemeDialogListeners() {
    themeDialogInput.addEventListener('input', () => {
        const query = themeDialogInput.value;
        clearThemeInputBtn.style.display = query.length > 0 ? 'flex' : 'none';
        if (themeDialogError.textContent) themeDialogError.textContent = '';
        filterThemeList(query);
    });

    themeDialogOverlay.addEventListener('click', (e) => e.stopPropagation());

    themeDialogInput.addEventListener('focus', () => themeDialogOverlay.classList.add('input-focused'));
    themeDialogInput.addEventListener('blur', () => themeDialogOverlay.classList.remove('input-focused'));

    clearThemeInputBtn.addEventListener('mousedown', (e) => {
        // Prevent the mousedown from blurring the input field
        e.preventDefault(); 
        themeDialogInput.value = '';
        clearThemeInputBtn.style.display = 'none';
        filterThemeList('');
        triggerHaptic();
        // Manually re-focus the input, as some interactions might still cause a blur
        themeDialogInput.focus();
    });

    // *** DEFINITIVE FIX: Re-architected theme dialog click handlers ***
    themeColorList.addEventListener('click', async (e) => {
        const li = e.target.closest('.theme-color-item');
        if (!li || li.classList.contains('disabled')) return;
        triggerHaptic();
        themeDialogError.textContent = '';

        if (isStudioMode) { // In Lab/Modifier mode
            studioActiveModifier = li.dataset.modifierName.toLowerCase();
            // Capitalize first letter for display
            const displayModifier = studioActiveModifier.charAt(0).toUpperCase() + studioActiveModifier.slice(1);
            themeDialogInput.value = `${displayModifier} ${studioBaseColor}`;
            updateModifierSelectionUI();
            await updateStudioPreview();
        } else { // In standard color selection mode
            const colorName = li.dataset.colorName;
            if (li.dataset.isCustom && customTheme) {
                const displayModifier = customTheme.modifier.charAt(0).toUpperCase() + customTheme.modifier.slice(1);
                themeDialogInput.value = `${displayModifier} ${customTheme.baseColor}`;
            } else {
                themeDialogInput.value = colorName;
            }
            const themeToPreview = li.dataset.isCustom ? { name: `custom:My Custom Theme` } : { name: `custom:${colorName}` };
            const applyResult = await applyTheme(themeToPreview);
            if (!applyResult.success) themeDialogError.textContent = applyResult.error;
            const wrapper = themeDialogTitle.parentElement;
            // Show the Lab toggle only if a standard color is selected, not the custom theme.
            if (li.dataset.isCustom) {
                themeLabToggle.style.display = 'none';
                wrapper.classList.remove('lab-toggle-active'); // Remove class
            } else {
                themeLabToggle.style.display = 'flex';
                wrapper.classList.add('lab-toggle-active'); // Add class
            }
        }
        clearThemeInputBtn.style.display = themeDialogInput.value.length > 0 ? 'flex' : 'none';
    });

    // *** DEFINITIVE FIX: Re-architected OK/Next/Save button handler ***
    themeDialogOk.addEventListener('click', async () => {
        if (isStudioMode) {
            // "Save" button logic
            if (studioBaseColor) {
                const themeToSave = { name: 'My Custom Theme', baseColor: studioBaseColor, modifier: studioActiveModifier || 'bold' };
                // *** FIX: Save the current luminance mode with the custom theme ***
                customTheme = {
  ...themeToSave,
  mode: currentLuminanceMode
};

// Persist on device first
if (window.creationStorage?.plain?.set) {
  try {
    await window.creationStorage.plain.set('launchPadR1CustomTheme', JSON.stringify(customTheme));
  } catch (e) {
    // ignore and use localStorage fallback
  }
}

// Webview fallback
localStorage.setItem('launchPadR1CustomTheme', JSON.stringify(customTheme));

await applyTheme({ name: `custom:${customTheme.baseColor}`, modifier: customTheme.modifier }, true, true);
await sayOnRabbit("Custom theme saved.");
isStudioMode = false;
closeThemeDialog();

            } else {
                themeDialogError.textContent = 'Error: No base color selected.';
            }
        } else { // Default "OK" button
            // *** FIX: Always confirm the theme that is currently being previewed. ***
            // The input box is for display/filtering; currentThemeName holds the true state.
            const themeToConfirm = currentThemeName;
            triggerHaptic();
            const applyResult = await applyTheme({ name: themeToConfirm }, false, true);
            if (applyResult.success) {
                closeThemeDialog();
            } else {
                themeDialogError.textContent = applyResult.error;
            }
        }
    });

    themeDialogInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            themeDialogOk.click();
        }
    });

    themeDialogCancel.addEventListener('click', async () => {
        if (isStudioMode) { // "Back" button
            labCheckbox.checked = false; // This will trigger the change event to exit lab mode
            isStudioMode = false;
            studioActiveModifier = null;
            renderThemeDialog();
            themeLabToggle.style.display = 'none'; // Hide the lab toggle on back
            await applyTheme({ name: `custom:${studioBaseColor}` }); // Revert preview
        } else { // "Cancel" button
            isStudioMode = false;
            closeThemeDialog(true);
        }
    });

    themeDialogReset.addEventListener('click', async () => {
        triggerHaptic();
        await setLuminanceMode('dark', true);
        await applyTheme({ name: 'rabbit' }, false, true);
        closeThemeDialog();
    });

    themeModeToggleBtn.addEventListener('click', toggleLuminanceMode);

    labCheckbox.addEventListener('change', async () => {
        if (labCheckbox.checked) {
            // Entering Lab Mode
            isStudioMode = true;
            studioBaseColor = themeDialogInput.value.trim();
            studioActiveModifier = 'bold'; // Default modifier on enter
            renderThemeDialog();
            themeDialogInput.value = studioBaseColor; // Set input to the base color on entering lab
            updateModifierSelectionUI();
            await updateStudioPreview();
        } else {
            // Exiting Lab Mode (handled by the "Back" button logic in themeDialogCancel)
            themeDialogCancel.click();
        }
    });
}

function openDeleteDialog() {
    const deleteModeRadios = document.querySelectorAll('input[name="delete-mode"]');
    const CHECKBOX_UNCHECKED_SVG = `<svg class="icon-checkbox-unchecked" viewBox="0 0 24 24" fill="currentColor"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>`;
    const CHECKBOX_CHECKED_SVG = `<svg class="icon-checkbox-checked" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
    const FAVORITE_SVG = `<svg class="icon-favorite" viewBox="0 0 24 24" fill="currentColor"><path d="M12 18.26l-7.053 3.948 1.575-7.928L.587 8.792l8.027-.952L12 .5l3.386 7.34 8.027.952-5.935 5.488 1.575 7.928z"></path></svg>`;
    let selectedIds = new Set();
    function renderDeleteList() {
    deleteLinksList.innerHTML = ''; // Clear the list first

    if (links.length === 0) { // ADDED: Check if there are any links
        // ADDED: Display a helpful message
        deleteLinksList.innerHTML = `<p class="no-favorites-message">No links available to delete.</p>`;
        return; // ADDED: Stop the function here
    }

    const fragment = document.createDocumentFragment();
    [...links].sort((a, b) => a.description.localeCompare(b.description)).forEach(link => {
        const li = document.createElement('li');
        li.className = 'delete-link-item';
        li.dataset.id = link.id;
        const isFav = favoriteLinkIds.has(link.id);
        const isSelected = selectedIds.has(link.id);
        let icon = isSelected ? CHECKBOX_CHECKED_SVG : (isFav ? FAVORITE_SVG : CHECKBOX_UNCHECKED_SVG);
        li.innerHTML = `<span class="delete-checkbox">${icon}</span><span class="delete-link-item-description">${link.description}</span>`;
        fragment.appendChild(li);
    });
    deleteLinksList.appendChild(fragment);
}
    function updateSelectionFromMode() {
        const mode = document.querySelector('input[name="delete-mode"]:checked').value;
        selectedIds.clear();
        if (mode === 'all') links.forEach(link => selectedIds.add(link.id));
        else if (mode === 'keep-favs') links.forEach(link => !favoriteLinkIds.has(link.id) && selectedIds.add(link.id));
        renderDeleteList();
    }
    function updateButtonState() {
        const mode = document.querySelector('input[name="delete-mode"]:checked').value;
        deletePromptOk.disabled = mode === 'selected' && selectedIds.size === 0;
    }
    return new Promise((resolve) => {
        document.querySelector('input[name="delete-mode"][value="selected"]').checked = true;
        selectedIds.clear();
        renderDeleteList();
        deletePromptOverlay.style.display = 'flex';
        deleteLinksList.scrollTop = 0;
        deleteLinksList.focus();
        updateButtonState();
        const handleItemClick = (e) => {
            const li = e.target.closest('.delete-link-item');
            if (!li) return;
            document.querySelector('input[name="delete-mode"][value="selected"]').checked = true;
            const id = li.dataset.id;
            if (selectedIds.has(id)) selectedIds.delete(id); else selectedIds.add(id);
            renderDeleteList();
            updateButtonState();
        };
        const handleModeChange = () => { updateSelectionFromMode(); updateButtonState(); };
        deleteLinksList.addEventListener('click', handleItemClick);
        deleteModeRadios.forEach(radio => radio.addEventListener('change', handleModeChange));
        const closeDialog = (value) => {
            deleteLinksList.removeEventListener('click', handleItemClick);
            deleteModeRadios.forEach(radio => radio.removeEventListener('change', handleModeChange));
            deletePromptOverlay.style.display = 'none';
            resolve(value);
        };
        deletePromptOk.onclick = () => closeDialog({ mode: document.querySelector('input[name="delete-mode"]:checked').value, ids: Array.from(selectedIds) });
        deletePromptCancel.onclick = () => closeDialog(null);
    });
}

deleteAllBtn.addEventListener('click', async () => {
    let keepLooping = true;
    while (keepLooping) {
        const result = await openDeleteDialog();
        if (!result || (result.mode === 'selected' && result.ids.length === 0)) {
            keepLooping = false;
            continue;
        }
        let confirmMessage = '';
        let linksToDelete = new Set(result.ids);
        if (result.mode === 'all') confirmMessage = `Are you sure you want to delete all ${links.length} link(s)?`;
        else if (result.mode === 'keep-favs') {
            if (linksToDelete.size === 0) {
                await showAlert("No links to delete (all links are favorites).");
                continue;
            }
            confirmMessage = `Are you sure you want to delete ${linksToDelete.size} non-favorite link(s)?`;
        } else if (result.mode === 'selected') confirmMessage = `Are you sure you want to delete ${linksToDelete.size} selected link(s)?`;
        if (await showConfirm(confirmMessage)) {
            links = links.filter(link => !linksToDelete.has(link.id));
            const remainingLinkIds = new Set(links.map(l => l.id));
            favoriteLinkIds = new Set([...favoriteLinkIds].filter(id => remainingLinkIds.has(id)));
            saveLinks();
            renderLinks();
            scrollToTop();
            await sayOnRabbit("Links deleted.");
            keepLooping = false;
        }
    }
});

document.addEventListener('click', (e) => {
    if (themeDialogOverlay.style.display === 'flex' && !e.target.closest('.custom-prompt-dialog') && !themeBtn.contains(e.target)) {
        closeThemeDialog(true);
    }
});
themeBtn.addEventListener('click', openThemeEditor);
logo.addEventListener('click', goHome);

(async function() {
    await loadLinksFromR1();

    // --- ⬇️ ADDED: Load Saved Playlists ⬇️ ---
    try {
        let storedPlaylists = localStorage.getItem(SAVED_PLAYLISTS_KEY);
        if (window.creationStorage) {
            const r1Playlists = await window.creationStorage.plain.get(SAVED_PLAYLISTS_KEY);
            if (r1Playlists) storedPlaylists = r1Playlists;
        }
        if (storedPlaylists) {
            savedPlaylists = JSON.parse(storedPlaylists);
        }
    } catch (e) {
        console.error("Could not load saved playlists:", e);
        savedPlaylists = [];
    }
    // --- ⬆️ END OF ADDED CODE ⬆️ ---

    // --- THIS IS THE FIX ---
    // Force all categories to be collapsed on every app load.
    collapsedCategories = [...new Set(links.map(link => link.category || 'Other'))];
    // --- END OF FIX ---

    await loadThemeFromR1();            // <-- NEW: pull theme from Creation Storage if available
    setupThemeDialogListeners();
    await applyTheme({ name: currentThemeName }, true, true);
    updateModeToggleUI();
deletePromptOverlay.addEventListener('click', e => e.stopPropagation());
function returnToSearchFromPlayer(focusInput = false) {
    internalPlayerOverlay.style.display = 'none';
    hideTapHint();

    if (focusInput) {
        // "Search" button: Reset the view for a new search
        resetYouTubeSearch(); // <-- EXPLICITLY RESET
        openYouTubeSearchView();
        youtubeSearchInput.focus();
    } else {
        // "Back" button: Just show the existing view
        // We MUST call openYouTubeSearchView to set placeholders AND
        // to re-render the playlists for highlighting.
        openYouTubeSearchView();
    }

    nowPlayingTitle.textContent = playerVideoTitle.textContent;
    updateNowPlayingUI(player.getPlayerState() === YT.PlayerState.PLAYING ? 'playing' : 'paused');
}
    favoritesPromptOverlay.addEventListener('click', e => e.stopPropagation());
    genericPromptOverlay.addEventListener('click', e => e.stopPropagation());
    
playerBackBtn.addEventListener('click', () => returnToSearchFromPlayer(false));

    // Use a more specific listener on the container for result clicks
    youtubeSearchResultsContainer.addEventListener('click', async (e) => {
    const card = e.target.closest('.youtube-result-card');
    
    // --- ⬇️ ADDED: Handle Playlist Delete Button ⬇️ ---
    const deleteBtn = e.target.closest('.delete-playlist-btn');
    if (deleteBtn && card) {
        e.stopPropagation(); // Stop the click from launching the player
        // ... (delete button logic remains the same) ...
        return; // Stop further execution
    }
    // --- ⬆️ END OF ADDED CODE ⬆️ ---
    
    if (card) {
        // hideYouTubeSearchView(); // <-- REMOVED FROM HERE
        const title = card.dataset.title;

        if (card.dataset.videoLink) {
            // This is for a single video
            hideYouTubeSearchView(); // <-- MOVED HERE
            const videoId = getYoutubeVideoId(card.dataset.videoLink);
            if (videoId) {
                openPlayerView({ videoId: videoId, title: title });
            } else {
                showAlert(`Could not find a valid video ID in the link: ${card.dataset.videoLink}`);
            }
        } else if (card.dataset.playlistId) {
            // This is our new logic for a playlist
            const playlistId = card.dataset.playlistId;
            
            // --- ⬇️ THIS IS THE NEW LOGIC ⬇️ ---
            if (playlistId === currentlyPlayingPlaylistId && player) {
                // This playlist is already playing, just show the player.
                // We can re-use the function from the 'Now Playing' bar!
                openPlayerFromNowPlaying();
            } else {
                // This is a new playlist, so start it fresh.
                hideYouTubeSearchView(); // <-- MOVED HERE
                openPlayerView({ playlistId: playlistId, title: title });
            }
            // --- ⬆️ END OF NEW LOGIC ⬆️ ---
        }
    }
});

    const triggerYoutubeSearch = () => handleYouTubeSearch(youtubeSearchInput.value);
    youtubeSearchCancelBtn.addEventListener('click', closeYouTubeSearchView);
    
    // --- ⬇️ MODIFIED: New Go Button Logic ⬇️ ---
    youtubeSearchGoBtn.addEventListener('click', async () => {
        const query = youtubeSearchInput.value.trim();
        if (!query) return; // Do nothing if input is empty
    
        if (currentSearchMode === 'videos') {
            triggerYoutubeSearch();
        } else if (currentSearchMode === 'isGd') {
            youtubeSearchResultsContainer.innerHTML = '<p>Resolving link...</p>';
            const fullUrl = `https://is.gd/${query}`;
            const resolvedUrl = await resolveShortUrl(fullUrl);
    
            if (!resolvedUrl) {
                youtubeSearchResultsContainer.innerHTML = '<p>Failed to resolve link. Check the code and try again.</p>';
                return;
            }
            
            const host = getHostname(resolvedUrl);
            if (!host.includes('youtube.com') && !host.includes('youtu.be')) {
                youtubeSearchResultsContainer.innerHTML = "<p>This link does not lead to YouTube.</p>";
                return;
            }

            const playlistId = getYoutubePlaylistId(resolvedUrl);
            if (!playlistId) {
                youtubeSearchResultsContainer.innerHTML = "<p>This link is not a valid playlist. Please use 'Songs' mode for single videos.</p>";
                return;
            }
            
            // Check if already saved
            if (savedPlaylists.some(p => p.id === playlistId)) {
                youtubeSearchResultsContainer.innerHTML = '<p>This playlist is already in your library.</p>';
                setTimeout(renderSavedPlaylists, 2000); // Show existing list
                youtubeSearchInput.value = '';
                return;
            }

            // Not saved, so let's fetch, save, and render
            youtubeSearchResultsContainer.innerHTML = '<p>Fetching playlist info...</p>';
            const metadata = await fetchPlaylistMetadata(playlistId);
            
            if (!metadata) {
                youtubeSearchResultsContainer.innerHTML = '<p>Could not fetch playlist info. Please try again.</p>';
                return;
            }

            savedPlaylists.push({ id: playlistId, title: metadata.title, thumb: metadata.thumb });
            await savePlaylistsToStorage();
            renderSavedPlaylists(); // Re-render the list with the new item
            youtubeSearchInput.value = ''; // Clear input on success
        }
    });
    // --- ⬆️ END OF MODIFIED CODE ⬆️ ---
    
    youtubeSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Prevent form submission if it's in a form
            e.preventDefault();
            // --- ⬇️ MODIFIED: Trigger the new Go button logic ⬇️ ---
            youtubeSearchGoBtn.click();
            // --- ⬆️ END OF MODIFIED CODE ⬆️ ---
        }
    });

youtubeSearchInput.addEventListener('input', () => {
        clearYoutubeSearchBtn.style.display = youtubeSearchInput.value.length > 0 ? 'flex' : 'none';
});

clearYoutubeSearchBtn.addEventListener('click', () => {
        youtubeSearchInput.value = '';
        clearYoutubeSearchBtn.style.display = 'none';
        youtubeSearchInput.focus();
        youtubeSearchResultsContainer.innerHTML = ''; // Optional: Clear results when clearing text
});

// --- ⬇️ MODIFIED: Radio Button Logic ⬇️ ---
searchModeVideosBtn.addEventListener('click', () => {
    currentSearchMode = 'videos';
    youtubeSearchInput.placeholder = 'Search YouTube...';
    youtubeSearchResultsContainer.innerHTML = ''; // Clear results
    youtubeSearchGoBtn.textContent = 'Search'; // <-- ADD THIS
});

searchModeIsGdBtn.addEventListener('click', () => {
    currentSearchMode = 'isGd';
    youtubeSearchInput.placeholder = 'Enter is.gd code...';
    renderSavedPlaylists(); // Show saved playlists
    youtubeSearchGoBtn.textContent = 'Load';
});

// --- ⬇️ ADDED: Info Button Listener ⬇️ ---
isGdInfoBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent label from firing
    e.stopPropagation(); // Stop bubbling
    
    // Create the multi-line message
    const message = "1. On another device, copy your YouTube playlist link.\n" +
                    "2. Go to is.gd and paste the link.\n" +
                    "3. Tap “Shorten” to get a short code (after is.gd/).\n" +
                    "4. Enter that code here and tap “Load.”\n" +
                    "5. Wait about 1 minute while the playlist loads.";
                    
    showAlert(message);
});
// --- ⬆️ END OF ADDED/MODIFIED CODE ⬆️ ---

playerSearchBtn.addEventListener('click', () => returnToSearchFromPlayer(true));

// Event Listeners for playlist controls
playerBackBtn_playlist.addEventListener('click', () => returnToSearchFromPlayer(false));

playerShuffleBtn.addEventListener('click', toggleShuffle); // uses fixed toggleShuffle()

// --- Play All Button with Active Highlight ---
playerPlayAllBtn.addEventListener('click', () => {
    if (!player || !isManualPlaylist) return;
    triggerHaptic();

    // Reset Shuffle state
    isShuffleActive = false;
    playerShuffleBtn.classList.remove('active');

    // Visually indicate Play All is active
    playerPlayAllBtn.classList.add('active');
    setTimeout(() => playerPlayAllBtn.classList.remove('active'), 2000); // fade back after a moment

    // Restore original playlist & restart
    currentPlaylist = [...originalPlaylist];
    currentPlaylistIndex = 0;
    loadVideoFromPlaylist(currentPlaylist[0]);
    if (player) player.playVideo();

    sayOnRabbit("Playing all from start");
});
playerPrevBtn.addEventListener('click', playPreviousVideoInList); // Use our new function
playerPlayPauseBtn_playlist.addEventListener('click', togglePlayback);

// --- Audio-Only (Playlist mode) — mirror Songs mode (no mute/unmute) ---
playerAudioOnlyBtn_playlist.addEventListener('click', () => {
    isAudioOnly = !isAudioOnly;

    // Hide/show video layer; overlay shows "Audio Only" per CSS
    playerContainer.classList.toggle('audio-only', isAudioOnly);

    // Button highlight to theme
    playerAudioOnlyBtn_playlist.classList.toggle('active', isAudioOnly);

    triggerHaptic();
    sayOnRabbit(isAudioOnly ? "Audio only" : "Video enabled");
});

playerNextBtn.addEventListener('click', playNextVideoInList); // Use our new function

playerSearchBtn_playlist.addEventListener('click', () => returnToSearchFromPlayer(true));

    playerPlayPauseBtn.addEventListener('click', togglePlayback);

        // This is the corrected listener for the Audio Only button
playerAudioOnlyBtn.addEventListener('click', () => {
    isAudioOnly = !isAudioOnly;
    playerContainer.classList.toggle('audio-only', isAudioOnly);
    playerAudioOnlyBtn.classList.toggle('active', isAudioOnly);
    triggerHaptic();
    sayOnRabbit(isAudioOnly ? "Audio only" : "Video enabled");
});

// --- ⬇️ ADD THIS NEW LISTENER ⬇️ ---
nowPlayingIcon.addEventListener('click', () => {
    // This function will be shared by the icon and the bar
    openPlayerFromNowPlaying();
});
// --- ⬆️ END OF ADDED CODE ⬆️ ---

// This is the listener for the Now Playing bar
nowPlayingBar.addEventListener('click', () => {
    openPlayerFromNowPlaying();
});

// --- ⬇️ ADD THIS NEW HELPER FUNCTION ⬇️ ---
function openPlayerFromNowPlaying() {
    youtubeSearchViewOverlay.style.display = 'none';
    mainView.classList.remove('input-mode-active');
    internalPlayerOverlay.style.display = 'flex'; // Show the player again
    
    // Hide both elements
    nowPlayingBar.style.display = 'none';
    nowPlayingIcon.style.display = 'none';

    showPlayerUI(); // Always show controls when re-entering
    
    // Restart the hide timer if it's currently playing
    if (player && player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
        startUIHideTimer();
    }
}
// --- ⬆️ END OF ADDED CODE ⬆️ ---

// Stop button listener - stops playback completely
stopPlayingBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering the bar's click event
    if (player) {
        currentlyPlayingPlaylistId = null; // <-- ADD THIS
        player.stopVideo();
        updateNowPlayingUI('stopped'); // <-- USE NEW FUNCTION
        triggerHaptic();
        sayOnRabbit("Playback stopped");
    }
});

// --- ⬇️ ADD THIS NEW LISTENER ⬇️ ---
playerHomeIcon.addEventListener('click', () => {
    // We REMOVED player.stopVideo() and updateNowPlayingUI('stopped')
    internalPlayerOverlay.style.display = 'none'; // Hide player overlay
    hideTapHint(); // Ensure hint is hidden
    goHome(); // Navigate home (goHome will call updateNowPlayingUI based on the current state)
    triggerHaptic();
});
// --- ⬆️ END OF ADDED CODE ⬆️ ---

    // Use the correct 'sideClick' event based on the SDK demo.
    window.addEventListener('sideClick', (event) => {
        if (internalPlayerOverlay.style.display === 'flex') {
            // Prevent any default OS action for the click.
            event.preventDefault();
            togglePlayback();
        }
    });

    // --- Scroll Wheel Navigation ---
    // Uses the correct event names found in the SDK documentation.
    // This now handles both the main list and lists within dialogs.
    const SCROLL_AMOUNT_MAIN = 120; // Pixels to scroll on the main page.
    const SCROLL_AMOUNT_DIALOG = 80; // A smaller scroll amount for lists in dialogs.

    function getActiveScrollTarget() {
        if (themeDialogOverlay.style.display === 'flex') return themeColorList;
        if (deletePromptOverlay.style.display === 'flex') return deleteLinksList;
        if (favoritesPromptOverlay.style.display === 'flex') return favoritesList;
        if (youtubeSearchViewOverlay.style.display === 'flex') return youtubeSearchResultsContainer;
        
        // Check if we are on the main view and not in input mode or another overlay.
        const onMainView = internalPlayerOverlay.style.display === 'none' &&
                           genericPromptOverlay.style.display === 'none' &&
                           !mainView.classList.contains('input-mode-active');
        
        if (onMainView) return window;

        return null; // No active target to scroll.
    }

    window.addEventListener('scrollUp', () => {
        const target = getActiveScrollTarget();
        if (target) {
            target.scrollBy({ top: -(target === window ? SCROLL_AMOUNT_MAIN : SCROLL_AMOUNT_DIALOG), behavior: 'smooth' });
        }
    });

    window.addEventListener('scrollDown', () => {
        const target = getActiveScrollTarget();
        if (target) {
            target.scrollBy({ top: (target === window ? SCROLL_AMOUNT_MAIN : SCROLL_AMOUNT_DIALOG), behavior: 'smooth' });
        }
    });
    // --- End of Scroll Wheel Navigation ---

        // --- Player overlay tap to show UI ---
    internalPlayerOverlay.addEventListener('click', (e) => {
        if (!isUIVisible && player) {
            e.preventDefault();
            e.stopPropagation();
            showPlayerUI();
            if (player.getPlayerState && player.getPlayerState() === YT.PlayerState.PLAYING) {
                startUIHideTimer();
            }
        }
    });

    renderLinks();
})();

function togglePlayback() {
    if (!player || typeof player.getPlayerState !== 'function') return;
    triggerHaptic();
    const playerState = player.getPlayerState();
    if (playerState === YT.PlayerState.PLAYING) {
        isIntentionalPause = true; // <-- ADD THIS
        player.pauseVideo();
    } else {
        player.playVideo();
    }
}

function onPlayerReady(event) {
    // This function fires as soon as the player has loaded the video/playlist data.
    
    // --- ⬇️ MODIFIED FOR MANUAL PLAYLIST CONTROL ⬇️ ---
    if (isManualPlaylist) {
        // The player is ready and the fetch is complete.
        // We CUE the first video, which loads it without playing.
        if (player && currentPlaylist[0]) {
            player.cueVideoById(currentPlaylist[0].id);
            playerVideoTitle.textContent = currentPlaylist[0].title;
        }
    } else {
    // --- ⬆️ END OF MODIFIED CODE ⬆️ ---
        // For SINGLE songs, this logic is still fine.
        const videoData = player.getVideoData();
        if (videoData && videoData.title) {
            playerVideoTitle.textContent = videoData.title;
        }
    }
}

function toggleShuffle() {
    if (!player || !isManualPlaylist) return; // Only works in manual mode
    triggerHaptic();

    if (!isShuffleActive) {
        // Enable shuffle and save the original order
        isShuffleActive = true;
        playerShuffleBtn.classList.add('active');
        originalPlaylist = [...currentPlaylist];
        sayOnRabbit("Shuffle enabled");

        // Shuffle while keeping current video first
        const currentVideo = currentPlaylist[currentPlaylistIndex];
        const remaining = currentPlaylist.filter((_, i) => i !== currentPlaylistIndex);
        for (let i = remaining.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
        }
        currentPlaylist = [currentVideo, ...remaining];
        currentPlaylistIndex = 0;

        loadVideoFromPlaylist(currentPlaylist[0]);
        if (player) player.playVideo();

    } else {
        // Disable shuffle and restore original order
        isShuffleActive = false;
        playerShuffleBtn.classList.remove('active');

        const currentVideo = currentPlaylist[currentPlaylistIndex];
        currentPlaylist = [...originalPlaylist];

        // restore index to current video in the restored list
        const idx = currentPlaylist.findIndex(v => v.id === currentVideo?.id);
        currentPlaylistIndex = idx >= 0 ? idx : 0;

        sayOnRabbit("Shuffle disabled");
        loadVideoFromPlaylist(currentPlaylist[currentPlaylistIndex]);
        if (player) player.playVideo();
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        let currentTitle = ''; // <-- ADD THIS

        // --- ⬇️ MODIFIED FOR MANUAL PLAYLIST CONTROL ⬇️ ---
        if (isManualPlaylist) {
            // In manual mode, get title from our array
            if (currentPlaylist[currentPlaylistIndex]) {
                currentTitle = currentPlaylist[currentPlaylistIndex].title; // <-- SET VARIABLE
                playerVideoTitle.textContent = currentTitle;
            }
        } else {
            // Original logic for single songs
            const videoData = player.getVideoData();
            if (videoData && videoData.title) {
                currentTitle = videoData.title; // <-- SET VARIABLE
                playerVideoTitle.textContent = currentTitle;
            }
        }
        // --- ⬆️ END OF MODIFIED CODE ⬆️ ---

        // --- ⬇️ THIS IS THE FIX ⬇️ ---
        nowPlayingTitle.textContent = currentTitle; // <-- UPDATE THE BAR'S TITLE
        updateNowPlayingUI('playing'); // <-- UPDATE THE BAR'S VISIBILITY
        // --- ⬆️ END OF FIX ⬆️ ---

        // Update BOTH buttons
        playerPlayPauseBtn.innerHTML = PAUSE_ICON_SVG;
        playerPlayPauseBtn_playlist.innerHTML = PAUSE_ICON_SVG;
        
        // --- ⬇️ ADDED TO FIX UI FADING BUG ⬇️ ---
        showPlayerUI(); // Always show UI when a new video starts
        // --- ⬆️ END OF ADDED CODE ⬆️ ---
        startUIHideTimer();

    } else if (event.data === YT.PlayerState.PAUSED ) {
        playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG;
        playerPlayPauseBtn_playlist.innerHTML = PLAY_ICON_SVG;
        clearTimeout(uiHideTimeout);
        
        if (isIntentionalPause) {
            showPlayerUI();
            isIntentionalPause = false; 
        }
        
        updateNowPlayingUI('paused'); // <-- ADD THIS BACK

    } else if (event.data === YT.PlayerState.ENDED ) {
        playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG; 
        playerPlayPauseBtn_playlist.innerHTML = PLAY_ICON_SVG;
        // nowPlayingBar.style.display = 'none'; // <-- REMOVED
        clearTimeout(uiHideTimeout);
        
        // --- ⬇️ MODIFIED FOR MANUAL PLAYLIST CONTROL ⬇️ ---
        if (isManualPlaylist) {
            // When a video ends, automatically play the next one.
            playNextVideoInList();
            // Don't show UI, let the next video start playing.
        } else {
            // Original logic for single songs
            showPlayerUI();
            updateNowPlayingUI('stopped'); // <-- KEPT (This is correct)
        }
        // --- ⬆️ END OF MODIFIED CODE ⬆️ ---

    } else if (event.data === YT.PlayerState.BUFFERING) {
        // This state is unreliable for title updates, do nothing here.
    } else if (event.data === YT.PlayerState.UNSTARTED) {
        playerPlayPauseBtn.innerHTML = PLAY_ICON_SVG;
        playerPlayPauseBtn_playlist.innerHTML = PLAY_ICON_SVG;
    }
}