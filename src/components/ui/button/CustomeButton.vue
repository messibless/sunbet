<!-- components/ui/CustomButton.vue -->
<template>
    <button
      :type="type"
      :disabled="disabled || loading"
      :class="buttonClasses"
      @click="handleClick"
    >
      <!-- Loading Spinner -->
      <svg 
        v-if="loading" 
        class="animate-spin w-4 h-4" 
        :class="loadingTextClass"
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
  
      <!-- Icon Left -->
      <span v-if="iconLeft && !loading" class="inline-flex" :class="iconClass">
        <component :is="iconLeft" />
      </span>
  
      <!-- Button Text -->
      <span :class="loading ? loadingTextClass : ''">
        <slot>{{ label }}</slot>
      </span>
  
      <!-- Icon Right -->
      <span v-if="iconRight && !loading" class="inline-flex" :class="iconClass">
        <component :is="iconRight" />
      </span>
  
      <!-- Betting Badge (for odds/counts) -->
      <span 
        v-if="badge" 
        class="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs font-bold rounded-full"
        :class="badgeClass"
      >
        {{ badge }}
      </span>
    </button>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // Props
  const props = defineProps({
    // Variant: primary, secondary, success, danger, warning, outline, ghost, bet
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'danger', 'warning', 'outline', 'ghost', 'bet'].includes(value)
    },
    
    // Size: xs, sm, md, lg, xl
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    
    // Full width button
    fullWidth: {
      type: Boolean,
      default: false
    },
    
    // Disabled state
    disabled: {
      type: Boolean,
      default: false
    },
    
    // Loading state
    loading: {
      type: Boolean,
      default: false
    },
    
    // Button type
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    
    // Label (can be overridden by slot)
    label: {
      type: String,
      default: ''
    },
    
    // Left icon component
    iconLeft: {
      type: Object,
      default: null
    },
    
    // Right icon component
    iconRight: {
      type: Object,
      default: null
    },
    
    // Icon position (left or right only)
    iconClass: {
      type: String,
      default: 'w-4 h-4'
    },
    
    // Badge count/text
    badge: {
      type: [String, Number],
      default: null
    },
    
    // Betting odds specific (for bet button)
    odds: {
      type: [String, Number],
      default: null
    },
    
    // Rounded style
    rounded: {
      type: String,
      default: 'md',
      validator: (value) => ['none', 'sm', 'md', 'lg', 'full'].includes(value)
    }
  })
  
  // Emits
  const emit = defineEmits(['click'])
  
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-cyan-950 relative'
  
  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs gap-1',
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2',
    xl: 'px-6 py-3 text-lg gap-3'
  }
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl focus:ring-cyan-500',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-100 focus:ring-gray-500',
    success: 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg focus:ring-green-500',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg focus:ring-red-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-600 hover:to-yellow-500 text-gray-900 shadow-lg focus:ring-yellow-500',
    outline: 'border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white focus:ring-cyan-500',
    ghost: 'text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-500',
    bet: 'bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md hover:shadow-lg focus:ring-orange-500 transform hover:scale-105'
  }
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed transform-none hover:scale-100'
  
  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full'
  }
  
  // Width classes
  const widthClass = computed(() => props.fullWidth ? 'w-full' : '')
  
  // Badge classes based on variant
  const badgeClass = computed(() => {
    const badgeVariants = {
      primary: 'bg-red-500 text-white',
      secondary: 'bg-blue-500 text-white',
      success: 'bg-yellow-500 text-gray-900',
      danger: 'bg-white text-red-600',
      warning: 'bg-gray-800 text-white',
      outline: 'bg-red-500 text-white',
      ghost: 'bg-orange-500 text-white',
      bet: 'bg-yellow-400 text-gray-900'
    }
    return badgeVariants[props.variant] || 'bg-red-500 text-white'
  })
  
  // Loading text class
  const loadingTextClass = computed(() => props.loading ? 'opacity-0' : '')
  
  // Combined button classes
  const buttonClasses = computed(() => {
    const classes = [
      baseClasses,
      sizeClasses[props.size],
      variantClasses[props.variant],
      roundedClasses[props.rounded],
      widthClass.value
    ]
    
    if (props.disabled || props.loading) {
      classes.push(disabledClasses)
    }
    
    return classes.join(' ')
  })
  
  // Handle click event
  const handleClick = (event) => {
    if (!props.disabled && !props.loading) {
      emit('click', event)
    }
  }
  </script>
  
  <!-- Usage Examples -->
  <usage-examples>
    
  <!-- 1. Basic Usage -->
  <CustomButton label="Click Me" />
  
  <!-- 2. With Variants -->
  <CustomButton variant="success" label="Place Bet" />
  <CustomButton variant="danger" label="Cancel" />
  <CustomButton variant="outline" label="View Odds" />
  
  <!-- 3. Betting Specific -->
  <CustomButton 
    variant="bet" 
    size="lg" 
    label="Bet Now" 
    :odds="2.45"
    badge="HOT"
    icon-left="FireIcon"
  />
  
  <!-- 4. With Icons -->
  <CustomButton 
    variant="primary"
    :icon-left="DepositIcon"
    label="Deposit"
  />
  
  <CustomButton 
    variant="outline"
    :icon-right="ArrowIcon"
    label="View Details"
  />
  
  <!-- 5. Loading State -->
  <CustomButton 
    variant="primary" 
    :loading="true" 
    label="Processing..."
  />
  
  <!-- 6. Full Width -->
  <CustomButton 
    variant="bet" 
    full-width 
    label="Confirm Bet"
  />
  
  <!-- 7. Different Sizes -->
  <div class="flex gap-2">
    <CustomButton size="xs" label="XS" />
    <CustomButton size="sm" label="SM" />
    <CustomButton size="md" label="MD" />
    <CustomButton size="lg" label="LG" />
    <CustomButton size="xl" label="XL" />
  </div>
  
  <!-- 8. With Custom Slot Content -->
  <CustomButton variant="outline">
    <span class="flex items-center gap-2">
      <span>💰</span>
      <span>Place Bet</span>
      <span class="text-xs bg-cyan-600 px-1 rounded">2.50</span>
    </span>
  </CustomButton>
  
  <!-- 9. Disabled State -->
  <CustomButton variant="primary" disabled label="Not Available" />
  
  <!-- 10. For Bet Slip -->
  <CustomButton 
    variant="bet" 
    size="lg" 
    full-width 
    :badge="3"
    label="Place Bet"
    :icon-left="BetIcon"
  >
    Place Bet - TZS 50,000
  </CustomButton>
  
  </usage-examples>
  
  <style scoped>
  /* Additional hover effects for betting button */
  .bg-bet:hover {
    transform: translateY(-2px);
  }
  
  /* Focus ring offset fix for dark background */
  .focus\:ring-offset-2:focus {
    --tw-ring-offset-width: 2px;
  }
  
  /* Active state for betting button */
  button:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  /* Custom animation for loading spinner */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  </style>