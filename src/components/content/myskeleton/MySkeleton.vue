<template>
  <el-skeleton style="width:320px;height:248px;margin:30px;border-radius: 6px;" animated>
    <template v-slot:template>
      <el-skeleton-item variant="image" style="width:100%;height:210px;border-radius: 6px;"/>
      <div style="padding:6px 0">
        <el-skeleton-item variant="p" style="width: 100%;height:34px" />
      </div>
    </template>
  </el-skeleton>
</template>

<script>
export default {
    name: 'PodcastElskeleton',

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

</style>