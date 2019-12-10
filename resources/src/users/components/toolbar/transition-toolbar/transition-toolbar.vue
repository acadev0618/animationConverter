<template>
    <div class="component-transition-toolbar">
        <header class="toolbar__header">
            <div class="toolbar__name">TRANSITIONS</div>
        </header>
        <div class="toolbar__body">
            <section class="in-out--select">
                <div class="d-flex">
                    <div class="flex-grow-1">
                        <div class="in-out__item" :class="{selected: inOut === 'in'}" @click="inOut='in'">
                            <svg width="10" height="10" viewBox="0 0 10 10"><defs><polygon id="build-in-a" points="7 17 17 17 17 7"></polygon></defs><use fill-rule="nonzero" xlink:href="#build-in-a" transform="translate(-7 -7)"></use></svg>
                            <span>IN</span>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <div class="in-out__item" :class="{selected: inOut === 'out'}" @click="inOut='out'">
                            <svg width="10" height="10" viewBox="0 0 10 10"><defs><polygon id="build-out-a" points="7 17 17 17 17 7"></polygon></defs><use fill-rule="nonzero" transform="matrix(-1 0 0 1 17 -7)" xlink:href="#build-out-a"></use></svg>
                            <span>OUT</span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="animation--select">
                <div class="d-flex align-items-center justify-content-between">
                    <div class="flex-grow-1 mr-2">
                        <v-select :searchable="false" :clearable="false" :options="animations" class="toolbar--select" v-model="animation" v-on:input="animationChange"></v-select>
                    </div>
                    <div class="play-icon" @click="playAnimation">
                        <svg viewBox="0 0 42 42" height="14px"><path d="M36.068 20.176l-29-20A1 1 0 1 0 5.5.999v40a1 1 0 0 0 1.568.823l29-20a.999.999 0 0 0 0-1.646z"></path></svg>
                    </div>
                </div>
            </section>
            <section class="ease--select" v-if="animation !== 'none'">
                <div class="section__name">Ease type</div>
                <div>
                    <v-select :searchable="false" :clearable="false" :options="easeOptions" class="toolbar--select" v-model="ease" v-on:input="animationChange"></v-select>
                </div>
            </section>
        </div>
    </div>
</template>

<script src="./transition-toolbar.js"></script>

<style scoped lang="scss" src="./transition-toolbar.scss"></style>
