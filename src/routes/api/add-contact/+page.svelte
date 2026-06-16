<script lang="ts">
    import {goto} from "$app/navigation";

    let name = $state("");
    let address = $state("");
    let phone = $state("");

    async function save_contact() {
        const response = await fetch('/api/add-contact', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, address, phone}) 
        });
        const result = await response.json();
        console.log(result);
        goto("/")
    }
</script>

<main class="white-block">
    <h2>Create new contact</h2>
    <div class="contact-save" style="display: flex; flex-direction: column; gap: 0.5rem;">
        <input bind:value={name} placeholder="Name" class="text-input" />
        <input bind:value={address} placeholder="Address" class="text-input" />
    </div>
    <div style="text-align: center; margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center;">
        <a href="/" class="button-style" style="background-color: #6b7280;">Cancel</a>
        <button onclick={save_contact} class="button-style">Save</button>
    </div>
</main>