<script>
  import { onMount } from 'svelte';

  let status = 'loading';
  let message = 'Sedang memverifikasi email Anda...';

  onMount(async () => {
    try {
      const hashParts = window.location.hash.split('?');
      if (hashParts.length < 2) {
        throw new Error('Link verifikasi tidak valid atau tidak lengkap.');
      }

      const queryParams = new URLSearchParams(hashParts[1]);
      const apiUrl = queryParams.get('api_url');

      if (!apiUrl) {
        throw new Error('URL API tidak ditemukan pada link verifikasi.');
      }

      const decodedApiUrl = decodeURIComponent(apiUrl);

      const response = await fetch(decodedApiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        status = 'success';
        message = data.message || 'Email berhasil diverifikasi!';
      } else {
        status = 'error';
        message = data.message || 'Gagal memverifikasi email.';
      }
    } catch (error) {
      status = 'error';
      message = error.message || 'Terjadi kesalahan pada sistem.';
    }
  });
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
  <div
    class="w-full max-w-md bg-white p-10 rounded-xl shadow-lg text-center border border-gray-100"
  >
    {#if status === 'loading'}
      <h2 class="text-2xl font-bold text-gray-800 mb-4 animate-pulse">⏳ Memproses...</h2>
      <p class="text-gray-600 mb-8 leading-relaxed italic">{message}</p>
    {:else if status === 'success'}
      <h2 class="text-2xl font-bold text-emerald-500 mb-4">✅ Berhasil!</h2>
      <p class="text-gray-600 mb-8 leading-relaxed">{message}</p>
      <a
        href="#/login"
        class="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300 shadow-md"
      >
        Pergi ke Login
      </a>
    {:else if status === 'error'}
      <h2 class="text-2xl font-bold text-red-600 mb-4">❌ Gagal</h2>
      <p class="text-gray-600 mb-8 leading-relaxed">{message}</p>
      <a
        href="#/login"
        class="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors duration-300 shadow-md"
      >
        Kembali ke Login
      </a>
    {/if}
  </div>
</main>
