<script>
  import { onMount } from 'svelte';
  import { user, clearAuth } from '../stores/authStore.js';
  import { fetchApi } from '../services/api.js';
    import Sidebar from '../components/Sidebar.svelte';

  $: currentUser = $user || { name: 'Guest', email: 'guest@email.com' };
  $: userInitial = currentUser.name.charAt(0).toUpperCase();

  // State untuk menyimpan data dari API
  let isLoading = true;
  let stats = {
    total: 0,
    reading: 0,
    finished: 0,
    unread: 0,
    finished_percentage: 0,
    unread_percentage: 0,
    reading_percentage: 0
  };
  let categories = [];
  let recentBooks = [];

  // Perhitungan untuk SVG Chart (Keliling lingkaran = 2 * PI * r = 2 * 3.14 * 48 = 301.6)
  const CIRCUMFERENCE = 301.6;
  $: finishedDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * stats.finished_percentage) / 100;
  $: readingDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * stats.reading_percentage) / 100;

  onMount(async () => {
    await loadDashboardData();
  });

  async function loadDashboardData() {
    try {
      const response = await fetchApi('/dashboard');
      if (response.ok) {
        const data = await response.json();
        stats = data.stats;
        categories = data.categories;
        recentBooks = data.recent_books;
      } else if (response.status === 401) {
        handleLogout(); // Force logout jika token expired
      }
    } catch (error) {
      console.error('Gagal memuat data dashboard:', error);
    } finally {
      isLoading = false;
    }
  }

  async function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      clearAuth();
      window.location.hash = '#/login';
    }
  }

  // Helper warna kategori (Looping warna)
  const categoryColors = [
    { bg: 'rgba(200,146,42,0.06)', badge: 'var(--amber)' },
    { bg: 'rgba(74,103,65,0.06)', badge: 'var(--moss)' },
    { bg: 'rgba(61,74,92,0.06)', badge: 'var(--slate)' },
    { bg: 'rgba(196,121,107,0.06)', badge: 'var(--dusty-rose)' }
  ];
</script>

<div class="min-h-screen bg-[#faf6ef] text-[#1a1208] font-['DM_Sans'] relative overflow-x-hidden">
  <Sidebar activeMenu="dashboard" />

  <div class="ml-[260px] min-h-screen flex flex-col">
    <header
      class="bg-[#faf6ef]/80 backdrop-blur-md border-b border-[#1a1208]/5 px-9 py-4 flex items-center justify-between sticky top-0 z-20"
    >
      <h1 class="font-['Playfair_Display'] text-xl font-bold text-[#1a1208] tracking-tight">
        Dashboard Overview
      </h1>
      <button
        class="flex items-center gap-2 px-5 py-2.5 bg-[#c8922a] hover:bg-[#b07d1e] rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-[#c8922a]/20 active:scale-95"
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          viewBox="0 0 24 24"
          ><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg
        >
        Tambah Buku
      </button>
    </header>

    <main class="p-9 flex-1">
      {#if isLoading}
        <div class="flex flex-col items-center justify-center py-32 animate-pulse">
          <div
            class="w-12 h-12 border-4 border-[#c8922a]/20 border-t-[#c8922a] rounded-full animate-spin mb-4"
          ></div>
          <p class="text-sm font-medium text-[#1a1208]/40">Menyusun rak buku Anda...</p>
        </div>
      {:else}
        <div
          class="mb-10 rounded-[2rem] p-8 flex items-center justify-between overflow-hidden relative bg-gradient-to-br from-[#1a1208] via-[#261a0b] to-[#2e1f0a] shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <div class="relative z-10">
            <div
              class="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f0d08a] mb-3 opacity-80"
            >
              Library Member
            </div>
            <h2 class="font-['Playfair_Display'] text-3xl font-bold text-white mb-2">
              Hai, {currentUser.name}! 👋
            </h2>
            <p class="text-white/50 text-sm max-w-md leading-relaxed">
              Anda telah menyelesaikan <span class="text-[#f0d08a] font-bold"
                >{stats.finished} buku</span
              > sejauh ini. Terus perluas cakrawala Anda!
            </p>
          </div>
          <div class="relative z-10 text-right hidden lg:block">
            <div
              class="font-['Playfair_Display'] text-7xl font-black text-white/[0.07] leading-none"
            >
              {stats.total}
            </div>
            <div class="text-[10px] font-bold text-[#f0d08a]/40 tracking-widest mt-1">
              TOTAL KOLEKSI
            </div>
          </div>
          <div
            class="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#c8922a]/5 blur-2xl"
          ></div>
          <div
            class="absolute left-1/2 -bottom-20 w-40 h-40 rounded-full bg-[#c8922a]/5 blur-xl"
          ></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {#each [{ label: 'Koleksi Buku', val: stats.total, color: '#c8922a', bg: 'rgba(200,146,42,0.1)', icon: 'M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z' }, { label: 'Sedang Dibaca', val: stats.reading, color: '#c8922a', bg: 'rgba(200,146,42,0.1)', bar: true }, { label: 'Selesai', val: stats.finished, color: '#4a6741', bg: 'rgba(74,103,65,0.1)', sub: `${stats.finished_percentage}% tuntas` }, { label: 'Menunggu', val: stats.unread, color: '#3d4a5c', bg: 'rgba(61,74,92,0.08)', sub: `${stats.unread_percentage}% antrean` }] as stat}
            <div
              class="bg-white p-6 rounded-2xl border border-[#1a1208]/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div class="flex items-center justify-between mb-4">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style="background:{stat.bg}; color:{stat.color}"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    {#if stat.bar}
                      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path
                        d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"
                      />
                    {:else}
                      <path d={stat.icon} />
                    {/if}
                  </svg>
                </div>
                <span
                  class="text-[10px] font-bold px-2 py-1 rounded-md bg-gray-50 text-gray-400 uppercase tracking-tighter"
                  >Statistik</span
                >
              </div>
              <div class="font-['Playfair_Display'] text-4xl font-bold text-[#1a1208] mb-1">
                {stat.val}
              </div>
              <div class="text-xs font-medium text-[#1a1208]/40 uppercase tracking-wider">
                {stat.label}
              </div>

              {#if stat.bar}
                <div class="mt-4 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    class="h-full bg-gradient-to-r from-[#c8922a] to-[#f0d08a] transition-all duration-1000"
                    style="width:{stats.reading_percentage}%"
                  ></div>
                </div>
              {:else if stat.sub}
                <div class="mt-3 text-[10px] font-bold" style="color:{stat.color}">{stat.sub}</div>
              {/if}
            </div>
          {/each}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div class="space-y-6">
            <h3
              class="font-['Playfair_Display'] text-xl font-bold text-[#1a1208] flex items-center gap-2"
            >
              Buku Terbaru
              <span class="h-px flex-1 bg-[#1a1208]/10 ml-2"></span>
            </h3>

            <div class="grid gap-4">
              {#if recentBooks.length === 0}
                <div
                  class="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-[#1a1208]/5"
                >
                  <div
                    class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 italic text-2xl text-gray-300"
                  >
                    ?
                  </div>
                  <p class="text-sm font-medium text-[#1a1208]/30 italic">
                    Rak buku Anda masih kosong...
                  </p>
                </div>
              {:else}
                {#each recentBooks as book}
                  <div
                    class="bg-white group rounded-2xl border border-[#1a1208]/5 flex overflow-hidden hover:shadow-2xl hover:border-[#c8922a]/20 transition-all cursor-pointer"
                  >
                    <div
                      class="w-24 bg-gradient-to-br from-[#8b4513] to-[#c8922a] p-4 flex flex-col justify-center text-center shadow-inner"
                    >
                      <span class="text-[8px] font-black text-white/40 uppercase mb-1"
                        >Vault ID: {book.id}</span
                      >
                      <span
                        class="font-['Playfair_Display'] text-[10px] font-bold text-white leading-tight drop-shadow-md uppercase tracking-tighter"
                        >{book.title.substring(0, 15)}</span
                      >
                    </div>
                    <div class="flex-1 p-5 relative">
                      <div class="flex justify-between items-start mb-2">
                        <div>
                          <h4
                            class="font-bold text-[#1a1208] group-hover:text-[#c8922a] transition-colors line-clamp-1"
                          >
                            {book.title}
                          </h4>
                          <p
                            class="text-[10px] font-medium text-[#1a1208]/40 uppercase tracking-widest mt-0.5"
                          >
                            {book.author?.name || 'Anonim'} &bull; {book.year || 'N/A'}
                          </p>
                        </div>
                        {#if book.status === 'finished'}
                          <span
                            class="text-[9px] font-bold px-3 py-1 bg-[#4a6741]/10 text-[#4a6741] rounded-full ring-1 ring-[#4a6741]/20 italic"
                            >✓ Selesai</span
                          >
                        {:else if book.status === 'reading'}
                          <span
                            class="text-[9px] font-bold px-3 py-1 bg-[#c8922a]/10 text-[#c8922a] rounded-full ring-1 ring-[#c8922a]/20"
                            >📖 Sedang Dibaca</span
                          >
                        {:else}
                          <span
                            class="text-[9px] font-bold px-3 py-1 bg-slate-100 text-slate-500 rounded-full italic"
                            >Antrean</span
                          >
                        {/if}
                      </div>
                      <p class="text-xs text-[#1a1208]/60 line-clamp-2 leading-relaxed italic pr-4">
                        "{book.description || 'Tidak ada catatan untuk buku ini.'}"
                      </p>
                    </div>
                  </div>
                {/each}
              {/if}
            </div>
          </div>

          <div class="space-y-6">
            <div class="bg-white p-7 rounded-[2rem] border border-[#1a1208]/5 shadow-sm">
              <h4
                class="font-['Playfair_Display'] font-bold text-[#1a1208] mb-6 flex justify-between items-center text-sm uppercase tracking-widest opacity-60"
              >
                Progress
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  /></svg
                >
              </h4>
              <div class="relative flex items-center justify-center py-4">
                <svg class="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="54" fill="none" stroke="#f3f4f6" stroke-width="12" />
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    fill="none"
                    stroke="#4a6741"
                    stroke-width="12"
                    stroke-dasharray="339.29"
                    stroke-dashoffset={339.29 - (339.29 * stats.finished_percentage) / 100}
                    stroke-linecap="round"
                    class="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div class="absolute flex flex-col items-center">
                  <span class="text-2xl font-black text-[#1a1208]"
                    >{stats.finished_percentage}%</span
                  >
                  <span class="text-[8px] font-bold text-gray-400 uppercase tracking-tighter"
                    >Done</span
                  >
                </div>
              </div>
            </div>

            <div class="bg-white p-7 rounded-[2rem] border border-[#1a1208]/5 shadow-sm">
              <h4
                class="font-['Playfair_Display'] font-bold text-[#1a1208] mb-5 text-sm uppercase tracking-widest opacity-60"
              >
                Top Genre
              </h4>
              <div class="space-y-3">
                {#each categories as category, i}
                  <div
                    class="flex items-center justify-between p-3.5 rounded-2xl group transition-all"
                    style="background:{categoryColors[i % 4].bg}"
                  >
                    <span class="text-xs font-bold text-[#1a1208]/70">{category.name}</span>
                    <span
                      class="w-7 h-7 flex items-center justify-center text-[10px] font-black text-white rounded-lg shadow-md transition-transform group-hover:scale-110"
                      style="background:{categoryColors[i % 4].badge}"
                    >
                      {category.books_count}
                    </span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      {/if}
    </main>
  </div>
</div>
