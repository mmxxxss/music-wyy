<template>
  <div class="body">
    <el-row>
      <el-col
        :span="4"
        v-for="(item, index) in playlist"
        :key="index"
        @click.native="loginMusic(item.id)"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.picUrl" class="image" />
          <div class="name">
            <span>{{ item.name }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import discoveryAPI from "../api/discovery";
export default {
  data() {
    return {
      playlist: [],
    };
  },
  async created() {
    this.$store.commit("changeSelectedKey", "2");
    const { result } = await discoveryAPI.getRecommend(56);
    this.playlist = result;
  },
  methods: {
    async loginMusic(musicid) {
      this.$router.push({ path: `playlistmusic/${musicid}` });
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center;
}
.image {
  display: block;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}
.name {
  width: 100%;
  padding: 0px 10px;
  height: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  margin: 10px;
  width: 150px;
}
.el-card {
  border-radius: 10px;
}
</style>