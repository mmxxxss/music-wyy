<template>
  <div>
    <div>
      <video :src="videoSrc" @play="handlePlay" @pause="handlePause" @ended="handleEnded" controls></video>
    </div>
    <div>
      <a-comment v-for="item in mvComments" :key="item.commentid">
        <template slot="actions">
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <a-icon type="like" :theme="action === 'liked' ? 'filled' : 'outlined'" @click="like" />
            </a-tooltip>
            <span style="padding-left: '8px'; cursor: 'auto'">
              {{ likes }}
            </span>
          </span>
          <span key="comment-basic-dislike">
            <a-tooltip title="Dislike">
              <a-icon type="dislike" :theme="action === 'disliked' ? 'filled' : 'outlined'" @click="dislike" />
            </a-tooltip>
            <span style="padding-left: '8px'; cursor: 'auto'">
              {{ dislikes }}
            </span>
          </span>
          <span key="comment-basic-reply-to">Reply to</span>
        </template>
        <a slot="author">{{ item.user.nickname }}</a>
        <a-avatar slot="avatar" :src="item.user.avatarUrl" alt="Han Solo" />
        <p slot="content">
          {{ item.content }}
        </p>
        <!-- <a-tooltip
          slot="datetime"
          :title="moment().format('YYYY-MM-DD HH:mm:ss')"
        >
          <span>{{ moment().fromNow() }}</span>
        </a-tooltip> -->
      </a-comment>
    </div>
  </div>
</template>

<script>
import API from "../api/login";
export default {
  data() {
    return {
      videoSrc: "", // 替换为您的视频文件路径
      mvComments: [],
      isPlaying: false,
      likes: 0,
      dislikes: 0,
      action: null,
    };
  },
  async mounted() {
    // API.getMvAdress(id).then((res3) => {
    //   console.log("res3", res3);
    //   // console.log(res3.data.url);
    //   this.$store.commit("getMvUrl", res3.data.url);
    //   this.$router.push("/home/video");
    // }),
    // API.getMvDetail(id).then((res4) => {
    //   this.$store.commit("getMvComments", res4.comments);
    //   console.log("res4", res4);
    // });
    const id = this.$route.params.id;
    const res1 = await API.getMvAdress(id);
    this.videoSrc = res1.data.url;
    const res2 = await API.getMvDetail(id);
    this.mvComments = res2.comments;

    // console.log(this.mvComments);
  },
  methods: {
    handlePlay() {
      this.isPlaying = true;
    },
    handlePause() {
      this.isPlaying = false;
    },
    handleEnded() {
      this.isPlaying = false;
    },
    like() {
      this.likes = 1;
      this.dislikes = 0;
      this.action = "liked";
    },
    dislike() {
      this.likes = 0;
      this.dislikes = 1;
      this.action = "disliked";
    },
  },
};
</script>

<style scoped>
video {
  width: 100%
}
</style>