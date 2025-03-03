document.getElementById('create-league').addEventListener('submit', async (e) => {
  e.preventDefault();

  const leagueName = document.getElementById('league-name').value;
  const numPlayers = document.getElementById('num-players').value;

  // Generate a unique draft ID
  const draftId = generateDraftId();

  // Create draft state in Supabase
  const { data, error } = await supabase
    .from('draft_state')
    .insert([{ draft_id: draftId, league_name: leagueName, num_players: numPlayers }]);

  if (error) {
    console.error('Error creating league:', error);
    return;
  }

  // Generate invite links
  const inviteLinks = [];
  for (let i = 1; i <= numPlayers; i++) {
    const playerId = `player${i}`;
    const link = `https://your-site.com/player.html?draftId=${draftId}&playerId=${playerId}`;
    inviteLinks.push(`<li><a href="${link}" target="_blank">${link}</a></li>`);
  }

  // Display invite links
  document.getElementById('links').innerHTML = inviteLinks.join('');
  document.getElementById('invite-links').style.display = 'block';
});

function generateDraftId() {
  return Math.random().toString(36).substring(2, 15);
}
