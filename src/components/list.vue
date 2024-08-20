<template>
  <a-list item-layout="horizontal" :data-source="hotSingers" >
    <a-list-item slot="renderItem" slot-scope="item" @click="getSinger(item.id)">
      <a-list-item-meta>
        <a slot="title">{{ item.name }}</a>
        <a-avatar slot="avatar" :src="item.picUrl" />
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: ['hotSingers'],
  methods:{
    getSinger(singerid){
      this.$router.push({ path: `singer/${singerid}` });
    }
  }
};
</script>

<style>
</style>