<template>
    <div class="bar">
        <svg class="bar__svg" xmlns="http://www.w3.org/2000/svg" width="48" height="155" viewBox="0 0 48 155" fill="none">
            <g filter="url(#filter0_d_33_2707)">
                <rect x="4" width="40" height="147" rx="4" fill="#C3E5F5" />
                <rect x="4.5" y="0.5" width="39" height="146" rx="3.5" stroke="#0A0E68" />
            </g>
            <rect x="7" y="3" width="34" :height="props.progressValue * 1.45" rx="1" fill="#00D355" />
            <rect x="14" y="7" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="19" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="31" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="43" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="55" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="67" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="79" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="91" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="103" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="115" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="127" width="20" height="1" fill="#63B6DF" />
            <rect x="14" y="139" width="20" height="1" fill="#63B6DF" />
            <rect x="8" y="4" width="14" height="139" rx="1" fill="white" fill-opacity="0.4" />
            <rect :y="props.progressValue * 1.45" width="48" height="3" rx="1.5" fill="white" />
            <defs>
                <filter id="filter0_d_33_2707" x="0" y="0" width="48" height="155" filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_33_2707" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_33_2707" result="shape" />
                </filter>
            </defs>
        </svg>
    </div>
</template>
<script setup>
const props = defineProps({
    progressValue: Number
})
</script>
<style scoped>
.bar {
    width: 48px;
    height: 100%;
    margin-bottom: -2px;
}

.bar__svg {
    transform: rotate(180deg);
}
</style>
