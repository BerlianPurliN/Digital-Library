<script>
  import { API_URL } from '../services/api.js';
  import { setAuth } from '../stores/authStore.js';

  let email = '';
  let password = '';
  let errorMessage = '';
  let isLoading = false;
  let showPassword = false;

  function togglePassword() {
    showPassword = !showPassword;
  }

  async function handleLogin() {
    isLoading = true;
    errorMessage = '';

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setAuth(data.access_token, data.user);
        window.location.hash = '#/home';
      } else {
        errorMessage = data.message || 'Login gagal. Silakan periksa kredensial Anda.';
      }
    } catch (error) {
      errorMessage = 'Terjadi kesalahan pada server.';
    } finally {
      isLoading = false;
    }
  }
</script>

<main class="flex items-center justify-center min-h-screen bg-slate-50 p-4">
  <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h2 class="text-3xl font-extrabold text-gray-900">Login</h2>
      <p class="text-gray-500 mt-2 text-sm">Selamat datang di Digital Library</p>
    </div>

    {#if errorMessage}
      <div
        class="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        {errorMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleLogin} class="space-y-5">
      <div>
        <label for="email" class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <div class="relative">
          <input
            type="email"
            id="email"
            bind:value={email}
            required
            placeholder="nama@email.com"
            class="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <div class="flex justify-between mb-1">
          <label for="password" class="text-sm font-semibold text-gray-700">Password</label>
          <a href="#/forgot-password" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >Lupa Password?</a
          >
        </div>
        <div class="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            bind:value={password}
            required
            placeholder="••••••••"
            class="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white outline-none transition-all duration-200"
          />
          <button
            type="button"
            id="password"
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
      </div>

      <button
        type="submit"
        disabled={isLoading}
        class="w-full py-3 px-4 mt-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-md transition-colors duration-200 ease-in-out flex items-center justify-center gap-2"
      >
        {#if isLoading}
          <svg
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Memverifikasi...</span>
        {:else}
          <span>Masuk ke Akun</span>
        {/if}
      </button>
    </form>

    <div class="mt-8 pt-6 border-t border-gray-100 text-center">
      <p class="text-sm text-gray-600">
        Belum punya akun?
        <a
          href="#/register"
          class="text-emerald-600 hover:text-emerald-700 font-bold decoration-2 hover:underline transition-all"
        >
          Daftar di sini
        </a>
      </p>
    </div>
  </div>
</main>
