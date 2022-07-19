<template>
    <div class="animation">
        <vue-particles
         color="#fff"
         :particleOpacity="0.8"
         :particlesNumber="80"
         shapeType="circle"
         :particleSize="4"
         linesColor="#555"
         :linesWidth="1"
         :lineLinked="true"
         :lineOpacity="0.4"
         :linesDistance="150"
         :moveSpeed="1"
         :hoverEffect="true"
         hoverMode="grab"
         :clickEffect="true"
         clickMode="push"
         class="lizi"
        />
        <div class="content">
            <slot></slot>    
        </div> 
    </div>
</template>

<script>
export default {
    name: 'PodcastBganimation',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
.animation {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
    position: relative;
}
.animation .lizi{
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
}
</style>