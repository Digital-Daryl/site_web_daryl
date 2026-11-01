async function envoyerMessageAuBot(messageUtilisateur) {
  const urlWebhookN8n = "VOTRE_URL_WEBHOOK_N8N_ICI"; // ex: https://ton-domaine.com/webhook/support-chat

  try {
    const reponse = await fetch(urlWebhookN8n, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chatInput: messageUtilisateur, // C'est la variable que l'AI Agent récupère
        sessionId: "client_unique_123"   // Pour que la Simple Memory garde le fil de la conversation
      })
    });

    const data = await reponse.json();
    // Affiche la réponse de l'agent dans ton interface de chat HTML
    afficherReponseDansLeChat(data.output); 

  } catch (erreur) {
    console.error("Erreur de communication avec le support :", erreur);
  }
}