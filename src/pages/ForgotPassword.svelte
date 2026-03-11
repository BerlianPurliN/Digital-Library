<script>
  import { API_URL } from '../services/api.js';

  let email = '';
  let isLoading = false;
  let message = '';
  let status = ''; // 'success' atau 'error'

  async function handleForgot() {
    isLoading = true;
    message = '';
    status = '';

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        status = 'success';
        message = data.message || 'Link reset password telah dikirim ke email Anda.';
        email = ''; // Kosongkan input setelah berhasil
      } else {
        status = 'error';
        message = data.message || 'Gagal mengirim link reset password.';
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
  <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Lupa Password</h2>
    <p class="text-center text-gray-600 text-sm mb-6">
      Masukkan email Anda untuk menerima link reset password.
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

    <form on:submit|preventDefault={handleForgot} class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          placeholder="nama@email.com"
          class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full py-3 px-4 mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-md transition-all duration-200 active:scale-[0.98]"
      >
        {isLoading ? 'Mengirim...' : 'Kirim Link Reset'}
      </button>
    </form>

    <div class="mt-8 text-center border-t border-gray-100 pt-6">
      <p class="text-sm text-gray-600">
        Sudah ingat password?
        <a
          href="#/login"
          class="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-all"
        >
          Kembali ke Login
        </a>
      </p>
    </div>
  </div>
</main>
