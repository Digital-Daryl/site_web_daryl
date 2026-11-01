// 1. Gestion de l'affichage de la boîte de chat au clic sur le bouton
const toggleBtn = document.getElementById('chat-toggle-btn');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('chat-send-btn');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

if (toggleBtn && chatBox) {
    toggleBtn.addEventListener('click', () => {
        if (chatBox.style.display === 'none' || chatBox.style.display === '') {
            chatBox.style.display = 'flex';
        } else {
            chatBox.style.display = 'none';
        }
    });
}

// Fonction pour afficher les messages dans l'interface visuelle
function afficherMessage(texte, expediteur) {
    const div = document.createElement('div');
    div.style.margin = '8px 0';
    div.style.padding = '8px 12px';
    div.style.borderRadius = '8px';
    if (expediteur === 'moi') {
        div.style.backgroundColor = '#dbeafe';
        div.style.textAlign = 'right';
    } else {
        div.style.backgroundColor = '#f3f4f6';
        div.style.textAlign = 'left';
    }
    div.textContent = texte;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 2. Fonction d'appel vers ton webhook n8n
async function envoyerMessageAuBot(messageUtilisateur) {
    const urlWebhookN8n = "VOTRE_URL_WEBHOOK_N8N_ICI"; // Remplace par ton URL n8n active

    try {
        const reponse = await fetch(urlWebhookN8n, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatInput: messageUtilisateur, // Variable attendue par ton Agent n8n
                sessionId: "client_unique_123"    // Garde le fil de la conversation
            })
        });

        const data = await reponse.json();
        // Affiche la réponse de l'agent dans le chat
        afficherMessage(data.output || data.text || "Réponse reçue", "bot");

    } catch (erreur) {
        console.error("Erreur de communication avec le support :", erreur);
        afficherMessage("Désolé, une erreur est survenue.", "bot");
    }
}

// 3. Déclenchement lors du clic sur le bouton "Envoyer" ou touche Entrée
if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
        const texte = chatInput.value.trim();
        if (texte) {
            afficherMessage(texte, 'moi');
            chatInput.value = '';
            envoyerMessageAuBot(texte);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
}
