<template>
    <div class="component-add-slide-transition">
        <div class="modal__backdrop" @click="$emit('click_close')"></div>
        <div class="modal__content">
            <h2 class="content__title">Select Transition Effect</h2>
            <div class="content__body">
                <div class="transition--list d-flex">
                    <div class="list__item" v-for="transition in transitions" @click="addTransition(transition)" :class="{selected: transition.leave && transition.leave.name === animationName}">
                        <div class="img--wrap">
                            <img :src="transition.img" alt="" />
                        </div>
                        <div class="transition__label">{{transition.label}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./add-slide-transition.js">
</script>
<style scoped lang="scss" src="./add-slide-transition.scss"></style>
