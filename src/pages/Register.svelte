<script>
  import { API_URL } from '../services/api.js';
  import { setAuth } from '../stores/authStore.js';

  let name = '';
  let email = '';
  let password = '';
  let password_confirmation = '';
  let errorMessage = '';
  let validationErrors = {};
  let isLoading = false;
  let showPassword = false;

  function togglePassword() {
    showPassword = !showPassword;
  }

  async function handleRegister() {
    isLoading = true;
    errorMessage = '';
    validationErrors = {};

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ name, email, password, password_confirmation })
      });

      const data = await response.json();

      if (response.ok) {
        setAuth(data.access_token, data.user);
        alert('Silahkan Cek Email Anda untuk Verifikasi!');
      } else if (response.status === 422) {
        validationErrors = data.errors;
      } else {
        errorMessage = data.message || 'Registrasi gagal.';
      }
    } catch (error) {
      errorMessage = 'Terjadi kesalahan pada server.';
    } finally {
      isLoading = false;
    }
  }
</script>

<main class="flex items-center justify-center min-h-screen bg-slate-50 p-4">
  <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Register Akun</h2>

    {#if errorMessage}
      <div class="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
        {errorMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-600 mb-1">Nama Lengkap</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          placeholder="nama lengkap"
          class="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all duration-200
                    {validationErrors.name ? 'border-red-500' : 'border-gray-300'}"
        />
        {#if validationErrors.name}
          <span class="text-red-500 text-xs mt-1 block">{validationErrors.name[0]}</span>
        {/if}
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          placeholder="user@example.com"
          class="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all duration-200
                    {validationErrors.email ? 'border-red-500' : 'border-gray-300'}"
        />
        {#if validationErrors.email}
          <span class="text-red-500 text-xs mt-1 block">{validationErrors.email[0]}</span>
        {/if}
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label for="password" class="block text-sm font-medium text-gray-600 mb-1">Password</label
          >
          <div class="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              bind:value={password}
              required
              minlength="6"
              placeholder="••••••••"
              class="w-full pl-4 pr-12 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all duration-200
                {validationErrors.password ? 'border-red-500' : 'border-gray-300'}"
            />

            <button
              type="button"
              on:click={togglePassword}
              class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
              tabindex="-1"
            >
              {#if showPassword}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              {:else}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                  />
                </svg>
              {/if}
            </button>
          </div>
          {#if validationErrors.password}
            <span class="text-red-500 text-xs mt-1 block">{validationErrors.password[0]}</span>
          {/if}
        </div>

        <div>
          <label for="password_confirmation" class="block text-sm font-medium text-gray-600 mb-1"
            >Konfirmasi Password</label
          >
          <input
            type={showPassword ? 'text' : 'password'}
            id="password_confirmation"
            bind:value={password_confirmation}
            required
            minlength="6"
            placeholder="••••••••"
            class="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all duration-200"
          />
          {#if validationErrors.password_confirmation}
            <span class="text-red-500 text-xs mt-1 block"
              >{validationErrors.password_confirmation[0]}</span
            >
          {/if}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full py-3 px-4 mt-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-md transition-colors duration-200 ease-in-out"
      >
        {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
      </button>
    </form>

    <p class="text-center mt-6 text-sm text-gray-600">
      Sudah punya akun?
      <a href="#/login" class="text-emerald-600 hover:underline font-semibold">Login di sini</a>
    </p>
  </div>
</main>
