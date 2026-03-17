<script>
    import ForgotPassword from "./pages/ForgotPassword.svelte";
    import Login from "./pages/Login.svelte";
    import Register from "./pages/Register.svelte";
    import ResetPassword from "./pages/ResetPassword.svelte";
    import VerifyEmail from "./pages/VerifyEmail.svelte";
    import Home from "./pages/Home.svelte";

    let currentHash = window.location.hash || "#/login";

    window.addEventListener("hashchange", () => {
        currentHash = window.location.hash;
    });

    const routes = {
        "#/login": Login,
        "#/register": Register,
        "#/verify-email": VerifyEmail,
        "#/forgot-password": ForgotPassword,
        "#/reset-password": ResetPassword,
        "#/home": Home
    };

    $: activeComponent = routes[currentHash.split('?')[0]] || Login;

</script>

<svelte:component this={activeComponent} />