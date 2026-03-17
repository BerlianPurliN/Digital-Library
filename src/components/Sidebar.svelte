<script>
  import { user, clearAuth } from '../stores/authStore.js';

  export let activeMenu = 'dashboard';

  $: currentUser = $user || { name: 'Guest', email: 'guest@email.com' };
  $: userInitial = currentUser.name.charAt(0).toUpperCase();

  async function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      clearAuth();
      window.location.hash = '#/login';
    }
  }
</script>

<aside class="fixed top-0 left-0 z-10 flex flex-col w-[260px] min-h-screen bg-[#1a1208]">
  <div class="px-7 pt-8 pb-6 border-b border-white/5">
    <div class="font-['Playfair_Display'] text-white font-bold text-xl leading-none">
      LibraVault
    </div>
    <div class="text-[10px] mt-1 text-white/35 uppercase tracking-widest font-medium">
      Digital Library
    </div>
  </div>

  <nav class="flex-1 py-6 overflow-y-auto">
    <div class="px-6 mb-3">
      <span class="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20">Menu</span>
    </div>

    <a
      href="#/dashboard"
      class="flex items-center gap-3 py-[11px] px-5 mx-3 rounded-lg text-sm transition-all duration-200 no-underline
         {activeMenu === 'dashboard'
        ? 'bg-[#c8922a] text-white font-medium'
        : 'text-white/55 hover:bg-[#c8922a]/15 hover:text-[#f0d08a]'}"
    >
      <svg
        class="w-[18px] h-[18px] shrink-0 opacity-80"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        viewBox="0 0 24 24"
        ><rect x="3" y="3" width="7" height="7" rx="1" /><rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
        /><rect x="3" y="14" width="7" height="7" rx="1" /><rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
        /></svg
      >
      Dashboard
    </a>

    <a
      href="#/books"
      class="flex items-center gap-3 py-[11px] px-5 mx-3 rounded-lg text-sm transition-all duration-200 no-underline
         {activeMenu === 'books'
        ? 'bg-[#c8922a] text-white font-medium'
        : 'text-white/55 hover:bg-[#c8922a]/15 hover:text-[#f0d08a]'}"
    >
      <svg
        class="w-[18px] h-[18px] shrink-0 opacity-80"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        viewBox="0 0 24 24"
        ><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path
          d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
        /></svg
      >
      Koleksi Buku
    </a>

    <a
      href="#/categories"
      class="flex items-center gap-3 py-[11px] px-5 mx-3 rounded-lg text-sm transition-all duration-200 no-underline
         {activeMenu === 'categories'
        ? 'bg-[#c8922a] text-white font-medium'
        : 'text-white/55 hover:bg-[#c8922a]/15 hover:text-[#f0d08a]'}"
    >
      <svg
        class="w-[18px] h-[18px] shrink-0 opacity-80"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        viewBox="0 0 24 24"
        ><path
          d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
        /><line x1="7" y1="7" x2="7.01" y2="7" /></svg
      >
      Kategori
    </a>

    <a
      href="#/authors"
      class="flex items-center gap-3 py-[11px] px-5 mx-3 rounded-lg text-sm transition-all duration-200 no-underline
         {activeMenu === 'authors'
        ? 'bg-[#c8922a] text-white font-medium'
        : 'text-white/55 hover:bg-[#c8922a]/15 hover:text-[#f0d08a]'}"
    >
      <svg
        class="w-[18px] h-[18px] shrink-0 opacity-80"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        viewBox="0 0 24 24"
        ><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg
      >
      Penulis
    </a>
  </nav>

  <div class="p-5 border-t border-white/5 bg-black/10">
    <div class="flex items-center gap-3">
      <div
        class="w-9 h-9 bg-[#c8922a] rounded-full flex items-center justify-center text-white font-semibold text-sm"
      >
        {userInitial}
      </div>
      <div class="flex-1 overflow-hidden">
        <div class="text-sm font-medium text-white truncate">{currentUser.name}</div>
        <div class="text-[10px] text-white/40 truncate">{currentUser.email}</div>
      </div>
      <button
        on:click={handleLogout}
        title="Logout"
        class="ml-auto p-1.5 text-white/30 hover:text-white bg-transparent border-none cursor-pointer transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          ><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline
            points="16 17 21 12 16 7"
          /><line x1="21" y1="12" x2="9" y2="12" /></svg
        >
      </button>
    </div>
  </div>
</aside>