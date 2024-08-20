<template>
  <div class="all">
    <div class="top">
      <img :src="albumDesc.picUrl" alt="" class="alimg" />
      <div class="top-right">
        <h2>{{ albumDesc?.name }}</h2>
        <p>歌手:{{ albumDesc.artist?.name }}</p>
        <p>发行时间:{{ publishTime }}</p>
        <p>发行公司:{{ albumDesc?.company }}</p>
      </div>
    </div>
    <div class="body">
      <h4>专辑介绍</h4>
      <p style="white-space: pre-line" class="desc">
        {{ albumDesc.description }}
      </p>
    </div>
    <div class="bottom">
      <el-table
        :data="albumList"
        style="width: 100%; border-radius: 12px"
        stripe
      >
        <el-table-column prop="name" label="音乐标题" width="210">
        </el-table-column>
        <el-table-column prop="singer" label="歌手" width="180">
        </el-table-column>
        <el-table-column prop="album" label="专辑" width="200">
        </el-table-column>
        <el-table-column prop="date" label="发布时间" width="200">
        </el-table-column>
        <el-table-column label="播放" width="120" align="center" fixed="right">
          <template slot-scope="scope">
            <a-button
              @click="handlePlay(scope.row)"
              shape="circle"
              icon="customer-service"
            ></a-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import singerAPI from "../api/singer";
export default {
  data() {
    return {
      albumDesc: {},
      publishTime: "",
      albumList:[]
    };
  },
  async created() {
    const albumid = this.$route.params.albumid;
    const res = await singerAPI.getAlbumDesc(albumid);
    this.albumDesc = res.album;
    this.publishTime = dayjs(this.albumDesc.publishTime).format(
      "YYYY年MM月DD日"
    );
    const albumList = this.albumDesc.songs.map((item) => {
      return {
        name: item.name,
        singer: item.ar[0].name,
        album: item.al.name,
        date: dayjs(item.publishTime).format("YYYY年MM月DD日"),
        id: item.id,
      };
    });
    this.albumList=albumList;
  },
};
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin-left: 100px;
}
.top {
  display: flex;
}
.top-right {
  margin-left: 20px;
}
.alimg {
  width: 200px;
  height: 200px;
}
h4 {
  margin-top: 10px;
}
.desc {
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
}
</style>