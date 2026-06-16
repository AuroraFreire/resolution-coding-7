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

<main>
    <h2>Contact Book :3</h2>
    <hr>
    {#each contacts as contact}
        <div class="contact-element">
            <div>
                <p><strong>{contact.name}</strong></p>
                <p>{contact.address}</p>
            </div>
            <div style="text-align: right; display: flex; align_items: center; gap: 1rem">
                <p>{contact.phone}</p>
                <button class = "clear_button" onclick={() => remove_contact(contact.name, contact.address, contact.phone)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            </div>
        </div>
    {:else}
        <p style="text-align: center; color: #6b7280; margin: 2rem 0">No contacts found. Add one below</p>
    {/each}
    <div style="text-align: center; margin-top: 1rem">
        <a href="/api/add-contact" class="button-style">Add contact</a>
    </div>
</main>