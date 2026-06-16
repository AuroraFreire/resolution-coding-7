<script lang="ts">
    import {onMount} from "svelte";
    type Contact = {
        name: string;
        address: string;
        phone: string;
    };
    
    let contacts: Contact[] = $state([]);

    async function read_contacts() {
        console.log("Reading contacts");
        const response = await fetch("/api/read-contacts", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
        const result = await response.json();
        console.log("Contacts: ", result.contacts);
        return result.contacts;
    }

    async function remove_contact(name: string, address: string, phone: string) {
        const response = await fetch("/api/remove-contact", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, address, phone})
        });
        const result = await response.json();
        console.log(result);
        contacts = await read_contacts();
    }

    onMount(async() => {
        contacts = await read_contacts();
    });

</script>

<main class="white-block">
    <h2>Contact Book :3</h2>

    {#each contacts as contact}
        <div class="contact-element">
            <div>
                <p><strong>{contact.name}</strong></p>
                <p>{contact.address}</p>
            </div>
            <div style="text-align: right; display: flex; align_items: center; gap: 1rem">
                <p>{contact.phone}</p>
                <button class = "clear_button" onclick={() => remove_contact(contact.name, contact.address, contact.phone)}>
                    <img src="/delete_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Trash Icon" />
                </button>
            </div>
        </div>
    {:else}
        <p style="text-align: center; color: #6b7280; margin: 2rem 0">No contatcs found. Add one below</p>
    {/each}
    <div style="text-align: center; margin-top: 1rem">
        <a href="/api/add-contact" class="button-style">Add contact</a>
    </div>
</main>