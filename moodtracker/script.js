document.addEventListener('DOMContentLoaded', function() {
    // Initialize mood data from localStorage or create empty array
    let moodData = JSON.parse(localStorage.getItem('moodData')) || [];
    let selectedMood = null;
    
    // DOM elements
    const moodLevels = document.querySelectorAll('.mood-btn');
    const saveBtn = document.getElementById('save-btn');
    const moodHistory = document.getElementById('mood-history');
    const depressionAlert = document.getElementById('depression-alert');
    
    // Chart setup
    const ctx = document.getElementById('moodChart').getContext('2d');
    const moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Mood Level',
                data: Array(7).fill(null),
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    min: 1,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Mood: ${context.parsed.y}/10`;
                        }
                    }
                }
            }
        }
    });
    
    // Event listeners for mood selection
    moodLevels.forEach(level => {
        level.addEventListener('click', function() {
            moodLevels.forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
            selectedMood = parseInt(this.getAttribute('data-level'));
        });
    });
    
    // Save mood entry
    saveBtn.addEventListener('click', function() {
        if (!selectedMood) {
            alert('Please select your mood first');
            return;
        }
        
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        
        // Check if there's already an entry for today
        const existingEntryIndex = moodData.findIndex(entry => {
            const entryDate = new Date(entry.date);
            return (
                entryDate.getDate() === today.getDate() &&
                entryDate.getMonth() === today.getMonth() &&
                entryDate.getFullYear() === today.getFullYear()
            );
        });
        
        const moodEntry = {
            date: today.toISOString(),
            day: dayOfWeek,
            mood: selectedMood
        };
        
        if (existingEntryIndex !== -1) {
            moodData[existingEntryIndex] = moodEntry;
        } else {
            moodData.push(moodEntry);
        }
        
        // Keep only the last 7 days of data
        moodData = moodData.slice(-7);
        
        // Save to localStorage
        localStorage.setItem('moodData', JSON.stringify(moodData));
        
        // Update UI
        updateChart();
        updateHistory();
        checkForDepression();
        
        // Reset selection
        moodLevels.forEach(l => l.classList.remove('selected'));
        selectedMood = null;
    });
    
    // Update chart with mood data
    function updateChart() {
        const weeklyData = Array(7).fill(null);
        
        moodData.forEach(entry => {
            weeklyData[entry.day] = entry.mood;
        });
        
        moodChart.data.datasets[0].data = weeklyData;
        moodChart.update();
    }
    
    // Update mood history display
    function updateHistory() {
        moodHistory.innerHTML = '';
        
        // Sort by date (newest first)
        const sortedData = [...moodData].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (sortedData.length === 0) {
            moodHistory.innerHTML = '<p>No mood entries yet.</p>';
            return;
        }
        
        sortedData.forEach(entry => {
            const date = new Date(entry.date);
            const dateStr = date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            
            const moodEmoji = getMoodEmoji(entry.mood);
            
            const entryElement = document.createElement('div');
            entryElement.className = 'mood-entry-item';
            entryElement.innerHTML = `
                <span>${dateStr}</span>
                <span>${moodEmoji} (${entry.mood}/10)</span>
            `;
            
            moodHistory.appendChild(entryElement);
        });
    }
    
    // Check for depression warning (average mood < 4 over at least 3 days)
    // In your existing JavaScript (script.js)
function checkForDepression() {
    if (moodData.length < 4) return; // Need at least 4 days of data
    
    // Count low mood days (mood ≤ 4)
    const lowMoodDays = moodData.filter(entry => entry.mood <= 4).length;
    
    // Get depression alert element
    const depressionAlert = document.getElementById('depression-alert');
    
    if (lowMoodDays >= 3) {
        depressionAlert.classList.remove('hidden');
        
        // Create more detailed alert message
        depressionAlert.innerHTML = `
            <h3>⚠️ Mood Alert</h3>
            <p>Your mood has been low for ${lowMoodDays} of the last ${moodData.length} days.</p>
            <p>Consider reaching out to a friend or professional for support.</p>
            <div class="resources">
                <p>Resources that might help:</p>
                <ul>
                    <li><a href="https://www.crisistextline.org/" target="_blank">Crisis Text Line</a></li>
                    <li><a href="https://www.psychologytoday.com/us" target="_blank">Find a Therapist</a></li>
                </ul>
            </div>
        `;
    } else {
        depressionAlert.classList.add('hidden');
    }
}

// Call this function whenever you save a new mood entry
// and also when initializing the app
    // Helper function to get emoji for mood level
    function getMoodEmoji(level) {
        const emojis = ['😭', '😢', '😔', '😐', '🙂', '😊', '😄', '😁', '🤩', '🌈'];
        return emojis[level - 1] || '❓';
    }
    
    // Initialize the app
    updateChart();
    updateHistory();
    checkForDepression();
});