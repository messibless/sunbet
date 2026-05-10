<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Live & Upcoming Matches
        </h1>
        <p class="text-gray-400 text-sm mt-1">Today's featured games</p>
      </div>
  
      <!-- Games Grid -->
      <div class="space-y-4">
        <div 
          v-for="(game, index) in games" 
          :key="index"
          class="bg-gradient-to-r from-slate-800 to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-700"
        >
          <!-- League Info -->
          <div class="px-4 py-2 bg-gray-900/50 border-b border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-xs font-semibold text-purple-400">{{ game.league }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">{{ game.matchId }}</span>
                <span v-if="game.isLive" class="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                  LIVE
                </span>
              </div>
            </div>
          </div>
  
          <!-- Teams -->
          <div class="px-4 py-3">
            <div class="flex items-center justify-between">
              <!-- Home Team -->
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">{{ game.homeTeam.substring(0, 2) }}</span>
                  </div>
                  <span class="text-white font-semibold">{{ game.homeTeam }}</span>
                </div>
              </div>
  
              <!-- VS -->
              <div class="px-4">
                <div class="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">VS</span>
                </div>
              </div>
  
              <!-- Away Team -->
              <div class="flex-1 text-right">
                <div class="flex items-center justify-end space-x-3">
                  <span class="text-white font-semibold">{{ game.awayTeam }}</span>
                  <div class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-sm">{{ game.awayTeam.substring(0, 2) }}</span>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Match Time/Score -->
            <div class="mt-3 text-center">
              <div v-if="game.isLive && game.score" class="text-2xl font-bold text-white">
                {{ game.score.home }} - {{ game.score.away }}
              </div>
              <div v-else class="text-sm text-gray-400">
                {{ game.time }} | {{ game.date }}
              </div>
              <div v-if="game.isLive" class="text-xs text-red-500 mt-1">Live Now</div>
            </div>
          </div>
  
          <!-- Betting Odds -->
          <div class="px-4 py-3 bg-gray-900/30 border-t border-gray-700">
            <div class="grid grid-cols-3 gap-3">
              <!-- Home Win -->
              <button 
                @click="placeBet(game, 'home')"
                class="group relative overflow-hidden bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 rounded-lg py-2 transition-all duration-300"
              >
                <div class="text-center">
                  <p class="text-xs text-gray-400 group-hover:text-white/80">1</p>
                  <p class="text-lg font-bold text-white">{{ game.odds.home }}</p>
                  <p class="text-xs text-gray-500 group-hover:text-white/60">{{ game.homeTeamShort }}</p>
                </div>
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </button>
  
              <!-- Draw -->
              <button 
                @click="placeBet(game, 'draw')"
                class="group relative overflow-hidden bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 rounded-lg py-2 transition-all duration-300"
              >
                <div class="text-center">
                  <p class="text-xs text-gray-400 group-hover:text-white/80">X</p>
                  <p class="text-lg font-bold text-white">{{ game.odds.draw }}</p>
                  <p class="text-xs text-gray-500 group-hover:text-white/60">Draw</p>
                </div>
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </button>
  
              <!-- Away Win -->
              <button 
                @click="placeBet(game, 'away')"
                class="group relative overflow-hidden bg-gray-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 rounded-lg py-2 transition-all duration-300"
              >
                <div class="text-center">
                  <p class="text-xs text-gray-400 group-hover:text-white/80">2</p>
                  <p class="text-lg font-bold text-white">{{ game.odds.away }}</p>
                  <p class="text-xs text-gray-500 group-hover:text-white/60">{{ game.awayTeamShort }}</p>
                </div>
                <div class="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Loading Skeleton (Optional) -->
      <div v-if="loading" class="space-y-4">
        <div v-for="n in 3" :key="n" class="bg-gray-800 rounded-xl animate-pulse">
          <div class="h-12 bg-gray-700 rounded-t-xl"></div>
          <div class="p-4 space-y-3">
            <div class="h-16 bg-gray-700 rounded"></div>
            <div class="h-12 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
  
      <!-- Toast Notification -->
      <div 
        v-if="toast.show" 
        class="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-slide-up"
        :class="toast.type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'"
      >
        <div class="flex items-center space-x-2">
          <svg v-if="toast.type === 'success'" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg v-else class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  // Dummy Games Data
  const games = ref([
    {
      league: "Italy - Serie A",
      matchId: "#205",
      homeTeam: "Torino FC",
      awayTeam: "Sassuolo Calcio",
      homeTeamShort: "TOR",
      awayTeamShort: "SAS",
      time: "21:45",
      date: "Today",
      isLive: false,
      score: null,
      odds: {
        home: "2.50",
        draw: "3.20",
        away: "2.95"
      }
    },
    {
      league: "England - Premier League",
      matchId: "#189",
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      homeTeamShort: "ARS",
      awayTeamShort: "CHE",
      time: "18:30",
      date: "Today",
      isLive: true,
      score: { home: 2, away: 1 },
      odds: {
        home: "2.10",
        draw: "3.40",
        away: "3.50"
      }
    },
    {
      league: "Spain - La Liga",
      matchId: "#234",
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      homeTeamShort: "BAR",
      awayTeamShort: "RMA",
      time: "22:00",
      date: "Today",
      isLive: false,
      score: null,
      odds: {
        home: "2.30",
        draw: "3.30",
        away: "3.10"
      }
    },
    {
      league: "Germany - Bundesliga",
      matchId: "#156",
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      homeTeamShort: "BAY",
      awayTeamShort: "DOR",
      time: "20:30",
      date: "Today",
      isLive: true,
      score: { home: 1, away: 0 },
      odds: {
        home: "1.85",
        draw: "3.80",
        away: "4.20"
      }
    },
    {
      league: "France - Ligue 1",
      matchId: "#278",
      homeTeam: "PSG",
      awayTeam: "Olympique Marseille",
      homeTeamShort: "PSG",
      awayTeamShort: "MAR",
      time: "23:00",
      date: "Today",
      isLive: false,
      score: null,
      odds: {
        home: "1.65",
        draw: "3.90",
        away: "5.00"
      }
    },
    {
      league: "Italy - Serie A",
      matchId: "#212",
      homeTeam: "AC Milan",
      awayTeam: "Inter Milan",
      homeTeamShort: "ACM",
      awayTeamShort: "INT",
      time: "20:00",
      date: "Tomorrow",
      isLive: false,
      score: null,
      odds: {
        home: "3.10",
        draw: "3.20",
        away: "2.40"
      }
    },
    {
      league: "England - Premier League",
      matchId: "#201",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      homeTeamShort: "MCI",
      awayTeamShort: "LIV",
      time: "17:30",
      date: "Tomorrow",
      isLive: false,
      score: null,
      odds: {
        home: "2.05",
        draw: "3.60",
        away: "3.40"
      }
    },
    {
      league: "UEFA Champions League",
      matchId: "#089",
      homeTeam: "Real Madrid",
      awayTeam: "Bayern Munich",
      homeTeamShort: "RMA",
      awayTeamShort: "BAY",
      time: "21:00",
      date: "Wednesday",
      isLive: false,
      score: null,
      odds: {
        home: "2.25",
        draw: "3.50",
        away: "3.10"
      }
    }
  ])
  
  // UI State
  const loading = ref(false)
  const toast = ref({
    show: false,
    message: '',
    type: 'success'
  })
  
  // Methods
  const placeBet = (game, betType) => {
    let selection = ''
    let odds = ''
    
    if (betType === 'home') {
      selection = game.homeTeam
      odds = game.odds.home
    } else if (betType === 'draw') {
      selection = 'Draw'
      odds = game.odds.draw
    } else {
      selection = game.awayTeam
      odds = game.odds.away
    }
    
    // Show toast notification
    toast.value = {
      show: true,
      message: `Added: ${selection} @ ${odds} - ${game.homeTeam} vs ${game.awayTeam}`,
      type: 'success'
    }
    
    // Hide toast after 2 seconds
    setTimeout(() => {
      toast.value.show = false
    }, 2000)
    
    // Emit event to parent component
    emit('bet-placed', {
      game: game,
      betType: betType,
      selection: selection,
      odds: odds,
      timestamp: new Date()
    })
    
    console.log(`Bet placed on ${selection} against odds ${odds}`)
  }
  
  // Emit events
  const emit = defineEmits(['bet-placed'])
  
  // Simulate loading
  onMounted(() => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000)
  })
  </script>
  
  <style lang="scss" scoped>
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #1f2937;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(to bottom, #7c3aed, #2563eb);
  }
  </style>