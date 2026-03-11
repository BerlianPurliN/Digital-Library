<script>
  import { onMount } from 'svelte';
  import { API_URL } from '../services/api.js';

  let token = '';
  let email = '';
  let password = '';
  let password_confirmation = '';

  let isLoading = false;
  let message = '';
  let status = '';
  onMount(() => {
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
      const queryParams = new URLSearchParams(hashParts[1]);
      token = queryParams.get('token') || '';
      email = decodeURIComponent(queryParams.get('email') || '');
    }

    if (!token || !email) {
      status = 'error';
      message = 'Token atau email tidak valid. Silakan request link reset ulang.';
    }
  });

  async function handleReset() {
    if (!token || !email) return;

    isLoading = true;
    message = '';
    status = '';

    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ token, email, password, password_confirmation })
      });

      const data = await response.json();

      if (response.ok) {
        status = 'success';
        message = data.message || 'Password berhasil direset!';
        password = '';
        password_confirmation = '';
      } else {
        status = 'error';
        message = data.message || 'Gagal mereset password.';
      }
    } catch (error) {
      status = 'error';
      message = 'Terjadi kesalahan pada server.';
    } finally {
      isLoading = false;
    }
  }
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
  <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Buat Password Baru</h2>
    <p class="text-center text-gray-600 text-sm mb-6">
      Silakan masukkan password baru untuk akun <strong class="text-gray-800">{email}</strong>
    </p>

    {#if message}
      <div
        class="mb-4 p-3 rounded-lg text-sm text-center font-medium
                {status === 'success'
          ? 'bg-emerald-100 text-emerald-700'
          : 'bg-red-100 text-red-700'}"
      >
        {message}
      </div>
    {/if}

    {#if status !== 'success' && token && email}
      <form on:submit|preventDefault={handleReset} class="space-y-4">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600 mb-1"
            >Password Baru</label
          >
          <input
            type="password"
            id="password"
            bind:value={password}
            required
            minlength="6"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
          />
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium text-gray-600 mb-1"
            >Konfirmasi Password Baru</label
          >
          <input
            type="password"
            id="password_confirmation"
            bind:value={password_confirmation}
            required
            minlength="6"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          class="w-full py-3 px-4 mt-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
        >
          {isLoading ? 'Memproses...' : 'Simpan Password Baru'}
        </button>
      </form>
    {/if}

    <div class="mt-6 text-center">
      <a
        href="#/login"
        class="text-sm text-blue-500 hover:text-blue-600 font-medium hover:underline"
      >
        Kembali ke Login
      </a>
    </div>
  </div>
</main>
