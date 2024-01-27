<template>
    <div class="container">
        <div class="lines">
            <div v-for="(item, index) in lineItems" :key="index" class="lines__item"
                :style="{ height: item.itemHeight + 'px', backgroundColor: item.isActive ? item.activeBgColor : item.basicBgColor }">
            </div>
            <div class="rubin" :class="{ 'rubin--active': isWon }">
                <img class="rubin__img" src="./assets/images/rubin.svg" alt="rubin" />
            </div>
        </div>
        <div class="action">
            <ButtonHit @click="hitButton" :isHit="isHit" :isDisabled="!isGameStart" />
            <img class="action__hammer" :class="{ 'action__hammer--active': isHit, 'action__hammer--start': !isGameStart }"
                src="./assets/images/hammer.png" alt="hammer" />
        </div>
        <div class="option">
            <Bar :progressValue="progressBar" />
            <div class="option__info">
                <div class="option__wrapper">
                    <!-- start block -->
                    <div v-if="!isGameStart" class="option__start">
                        <div class="option__text">
                            <p class="option__paragraph">
                                Привет!
                            </p>
                            <p class="option__paragraph">
                                Проверим твою силу!
                            </p>
                        </div>
                        <button class="btn option__reset" @click="startGame">НОВАЯ ИГРА</button>
                    </div>
                    <!-- game changer block -->
                    <div v-if="isGameStart && !isWon && !isLost" ref="$changer" class="option__selection">
                        <div class="option__text">
                            <p class="option__paragraph">
                                Жми на кнопку
                            </p>
                            <p class="option__paragraph">
                                в нужный момент!
                            </p>
                        </div>
                        <button class="btn option__blow" @click="hitButton">УДАР!</button>
                    </div>
                    <!-- win block -->
                    <div v-if="isWon" class="option__win">
                        <div class="option__text">
                            <p class="option__paragraph">
                                ВОТ ЭТО СИЛА!
                            </p>
                            <p class="option__paragraph">
                                Ты выбил главный приз!
                            </p>
                            <p class="option__rubin">Рубин</p>
                        </div>
                        <button class="btn option__reset" ref="$resetButton" @click="resetGame">
                            <span v-if="!isLoading">НОВАЯ ИГРА</span>
                            <span class="loader" v-if="isLoading"></span>
                        </button>
                    </div>
                    <!-- lost block -->
                    <div v-if="isLost" class="option__lost">
                        <div class="option__text">
                            <p class="option__paragraph">
                                Неплохо!
                            </p>
                            <p class="option__paragraph">
                                Попробуй ещё раз.
                            </p>
                        </div>
                        <button class="btn option__reset" ref="$resetButton" @click="resetGame">
                            <span v-if="!isLoading">ИГРАТЬ ЕЩЕ</span>
                            <span class="loader" v-if="isLoading"></span>
                        </button>
                    </div>
                </div>
                <Robot :isWon="isWon" :isHit="isHit" />
            </div>
        </div>
        <audio volume="0.4" ref="$audioPlayer" :src="winningSound"></audio>
    </div>
</template>
<script setup>

import winningSound from './assets/sounds/winning_sound.mp3';
import { ref, onMounted } from 'vue';
import Bar from "./components/bar.vue";
import Robot from "./components/robot.vue";
import ButtonHit from "./components/buttonHit.vue";

const settings = {
    incrementAmountBar: 1,
    directionBar: 1,
    timerBar: 8,
};

const $changer = ref(null);
const $resetButton = ref(null);
const $audioPlayer = ref(null)

const isHit = ref(false);
const isGameStart = ref(false);
const isWon = ref(false);
const isLost = ref(false);
const isLoading = ref(false);

const progressBar = ref(0);
const updater = ref(Number);

const lineItems = ref([
    { itemHeight: 50, isActive: false, activeBgColor: '#00B047', basicBgColor: '#254B9D' },
    { itemHeight: 45, isActive: false, activeBgColor: '#00D355', basicBgColor: '#3A5CA5' },
    { itemHeight: 40, isActive: false, activeBgColor: '#91E508', basicBgColor: '#5878BE' },
    { itemHeight: 35, isActive: false, activeBgColor: '#FFDF35', basicBgColor: '#7593D6' },
    { itemHeight: 30, isActive: false, activeBgColor: '#FFAE4E', basicBgColor: '#94AADC' },
    { itemHeight: 25, isActive: false, activeBgColor: '#FF784E', basicBgColor: '#B7C8ED' },
    { itemHeight: 24, isActive: false, activeBgColor: '#F65A5A', basicBgColor: '#D1DEFB' },
]);

function startGame() {
    isGameStart.value = true;
    updater.value = setInterval(updateProgressBar, settings.timerBar);
}

function stopGame() {
    clearInterval(updater.value);
}

async function resetGame() {
    $resetButton.value.disabled = true;
    isLoading.value = true;
    isHit.value = false;
    await clearProgress();
    lineItems.value.forEach(element => {
        element.isActive = false;
    });
    isWon.value = false;
    isLost.value = false;
    $resetButton.value.disabled = false;
    isLoading.value = false;
    startGame();
}

async function clearProgress() {
    return new Promise(resolve => {
        const timeOut = setInterval(() => {
            if (progressBar.value >= 2) {
                progressBar.value += settings.incrementAmountBar * -1;
            } else {
                clearInterval(timeOut);
                resolve();
            }
        }, 10);
    });
}

function hitButton() {
    $changer.value.style.opacity = 0;
    isHit.value = true;
    stopGame();
    setTimeout(() => {
        setActiveLines(progressBar.value)
        if (progressBar.value >= 96) {
            setTimeout(() => {
                $audioPlayer.value.play();
                isWon.value = true;
            }, 1000)
        } else {
            isLost.value = true;
        }
    }, 600);
}

function updateProgressBar() {
    progressBar.value += settings.incrementAmountBar * settings.directionBar;
    if (progressBar.value >= 100) {
        settings.directionBar = -1;
    } else if (progressBar.value <= 0) {
        settings.directionBar = 1;
    }
}

function setActiveLines(progressValue) {
    let numberOfElements;
    switch (true) {
        case progressValue >= 0 && progressValue < 15:
            numberOfElements = 0;
            break;
        case progressValue >= 15 && progressValue < 30:
            numberOfElements = 1;
            break;
        case progressValue >= 30 && progressValue < 45:
            numberOfElements = 2;
            break;
        case progressValue >= 45 && progressValue < 60:
            numberOfElements = 3;
            break;
        case progressValue >= 60 && progressValue <= 75:
            numberOfElements = 4;
            break;
        case progressValue >= 75 && progressValue <= 95:
            numberOfElements = 5;
            break;
        case progressValue >= 95 && progressValue <= 100:
            numberOfElements = 6;
            break;
        default:
            numberOfElements = 0;
            return;
    }

    let i = 0;
    function activateNextItem() {
        if (i < lineItems.value.length && i <= numberOfElements) {
            lineItems.value[i].isActive = true;
            i++;
            setTimeout(activateNextItem, 100);
        }
    }
    activateNextItem();
}

</script>
<style scoped>
.container {
    width: 360px;
    height: 640px;
    background-image: url('./assets/images/bg_top.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}

.loader {
    width: 20px;
    height: 20px;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotate 1s linear infinite;
}

.loader::after {
    content: '';
    position: absolute;
    box-sizing: border-box;
    left: 4px;
    top: 10px;
    border: 6px solid transparent;
    border-right-color: #FFF;
    transform: rotate(-40deg);
}

.option__paragraph {
    color: #FFF;
    text-align: center;

    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;

    margin: 0;
}

.option__text {
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    margin-bottom: 13px;
}

.action__icon {
    width: 124px;
}

.action {
    margin: 6px 0;
    position: relative;
}

.action__hammer {
    position: absolute;
    user-select: none;
    bottom: 0;
    right: -80px;

    transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.action__hammer--active {
    transform: translate(-55px, -10px) rotate(-90deg);
}

.action__hammer--start {
    transform: rotate(-40deg);
}

.lines__item {
    width: 74px;
    background-color: #7593D6;
    position: relative;

    transition: 0.3s background-color ease;
}

.lines__item::after {
    content: '';
    width: 71px;
    height: 3px;
    position: absolute;
    top: 2px;
    left: 1px;
    background-color: white;
    opacity: 0.3;
}

.lines__item::before {
    content: '';
    width: 3px;
    height: calc(100% - 4px);
    position: absolute;
    top: 2px;
    right: 2px;
    background-color: white;
    opacity: 0.3;
}

.lines {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column-reverse;

    gap: 2px;
    background-image: url('./assets/images/measure_main.png');
    background-position: center;
    background-size: cover;


    width: 186px;
    padding-top: 30px;
    padding-bottom: 2px;
}

.btn {
    text-align: center;
    font-weight: 700;
    border-radius: 5px;
    width: 172px;
    height: 36px;

    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.option__reset {
    background-color: #FF42E0;
    border: 2px solid white;
}

.option__blow {
    background-color: #FFDF35;
    border: 2px solid #BB20A2;
    color: #BB20A2;
}

.option__selection {
    transition: opacity 0.2s ease-in-out;
}

.option__info {
    display: flex;
    align-items: flex-end;
}

.option {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;

    margin-top: 10px;
    margin-bottom: 20px;
}

.option__rubin {
    text-align: center;
    color: #FF4646;
    margin: 0;
}

.rubin {
    width: 73px;
    height: 47px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 4px;
    margin-bottom: 5px;
    background: linear-gradient(180deg, #B676CB 0%, rgba(255, 255, 255, 0.00) 100%), #080B3A;
}

.rubin--active {
    position: relative;
    background: linear-gradient(180deg, #FF9494 0%, #FF0101 100%), #080B3A;
}

.rubin--active>.rubin__img {
    animation: 1s linear infinite scale;

}

.rubin--active::after {
    content: url('./assets/images/layer_glow.svg');
    position: absolute;
    top: -45px;
    left: -30px;
    animation: 8s linear infinite rotate;
}

.rubin__img {
    position: relative;
    width: 55px;
    z-index: 1;
}
</style>
