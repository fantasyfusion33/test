const urlParams = new URLSearchParams(window.location.search);
const draftId = urlParams.get('draftId');
const playerId = urlParams.get('playerId');

// Fetch and display the draft state
const fetchDraftState = async () => {
  const { data, error } = await supabase
    .from('draft_state')
    .select('*')
    .eq('draft_id', draftId)
    .single();

  if (error) {
    console.error('Error fetching draft state:', error);
    return;
  }

  renderDraftState(data);
};

// Render the draft state
const renderDraftState = (draftState) => {
  const { current_pick, draft_order, player_rosters, is_paused } = draftState;

  // Display next picks
  const nextPicks = draft_order.slice(current_pick - 1, current_pick + 2);
  document.getElementById('next-picks').innerHTML = nextPicks
    .map((player, index) => `<div>${index + 1}. ${player}</div>`)
    .join('');

  // Display my roster
  const myRoster = player_rosters[playerId] || [];
  document.getElementById('my-roster').innerHTML = myRoster
    .map((team) => `<div>${team}</div>`)
    .join('');

  // Display available teams
  const allTeams = ['team1', 'team2', 'team3']; // Replace with your team data
  const draftedTeams = Object.values(player_rosters).flat();
  const availableTeams = allTeams.filter((team) => !draftedTeams.includes(team));
  document.getElementById('teams').innerHTML = availableTeams
    .map((team) => `<div><button onclick="draftTeam('${team}')">${team}</button></div>`)
    .join('');
};

// Draft a team
const draftTeam = async (team) => {
  const { data, error } = await supabase
    .from('draft_state')
    .update({ player_rosters: { ...draftState.player_rosters, [playerId]: [...draftState.player_rosters[playerId], team] } })
    .eq('draft_id', draftId);

  if (error) {
    console.error('Error drafting team:', error);
    return;
  }

  fetchDraftState();
};

// Subscribe to real-time updates
supabase
  .from('draft_state')
  .on('UPDATE', (payload) => {
    if (payload.new.draft_id === draftId) {
      renderDraftState(payload.new);
    }
  })
  .subscribe();

// Initial fetch
fetchDraftState();
