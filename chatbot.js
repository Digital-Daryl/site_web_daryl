const toggleBtn = document.getElementById('chat-toggle-btn');
const chatBox = document.getElementById('chat-box');
const closeBtn = document.getElementById('chat-close-btn');
const chatForm = document.getElementById('chat-form');
const sendBtn = document.getElementById('chat-send-btn');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const quickReplies = document.getElementById('chat-quick-replies');

function afficherMessage(texte, expediteur) {
    const message = document.createElement('div');
    message.classList.add('chat-message', `chat-message-${expediteur}`);
    message.textContent = texte;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function ouvrirChat() {
    chatBox.hidden = false;
    chatBox.inert = false;
    chatBox.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    chatInput.focus();

    if (!chatMessages.hasChildNodes()) {
        afficherMessage(
            'Bonjour et bienvenue chez DARYL ! Comment pouvons-nous vous aider dans votre projet digital ?',
            'bot'
        );
    }
}

function fermerChat() {
    chatBox.hidden = true;
    chatBox.inert = true;
    chatBox.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.focus();
}

async function envoyerMessageAuBot(messageUtilisateur) {
    const urlWebhookN8n = 'https://chatbot-backend.darylsfotsingk.workers.dev/chat';

    try {
        const reponse = await fetch(urlWebhookN8n, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chatInput: messageUtilisateur,
                sessionId: 'client_unique_123'
            })
        });

        if (!reponse.ok) {
            throw new Error(`Le webhook a répondu avec le statut ${reponse.status}.`);
        }

        const data = await reponse.json();
        afficherMessage(
            data.output || data.text || 'Réponse reçue.',
            'bot'
        );
    } catch (erreur) {
        console.error('Erreur de communication avec le support :', erreur);
        afficherMessage(
            'Désolé, le chat est momentanément indisponible. Vous pouvez nous écrire à darylsfotsingk@gmail.com.',
            'bot'
        );
    }
}

async function envoyerMessage(texte) {
    const message = texte.trim();
    if (!message || sendBtn.disabled) {
        return;
    }

    afficherMessage(message, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;

    try {
        await envoyerMessageAuBot(message);
    } finally {
        sendBtn.disabled = false;
        chatInput.focus();
    }
}

if (toggleBtn && chatBox && closeBtn && chatForm && sendBtn && chatInput && chatMessages) {
    toggleBtn.addEventListener('click', () => {
        if (chatBox.hidden) {
            ouvrirChat();
        } else {
            fermerChat();
        }
    });

    closeBtn.addEventListener('click', fermerChat);

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        envoyerMessage(chatInput.value);
    });

    if (quickReplies) {
        quickReplies.addEventListener('click', (event) => {
            const button = event.target.closest('.chat-quick-reply');
            if (button) {
                envoyerMessage(button.textContent);
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !chatBox.hidden) {
            fermerChat();
        }
    });
}
