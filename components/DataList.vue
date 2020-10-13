<template>
<div>
    <el-row :gutter="10">
        <el-col :sm="12" :md="8" :lg="5" v-for="(item, index) in $store.state.dataList" :key="index">
            <el-card style="text-align: center" shadow="hover">
                <div slot="header" class="card-header">
                    <el-avatar :size="36" :src="item.header"></el-avatar>
                    <span class="username">{{ item.name }}</span>
                </div>

                <nuxt-link :to="`/show/${item.sid}`">
                    <el-image class="data-img" v-if="item.type != 'text'" style="height: 236px; width: 100%;line-height: 236px;" fit="cover" :src="item.thumbnail ? item.thumbnail : item.images" @click="xxx(item)">
                        <!--<div slot="placeholder" class="image-slot">
                            <i class="el-icon-loading"></i>
                        </div>
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>-->
                    </el-image>
                </nuxt-link>
                <img v-if="item.type == 'gif' && !item.isPlay" src="https://static.yangpinwang.com/images/gif-img.png" alt="" class="play-icon" @click="play(item)" />

                <img v-if="item.type == 'video'" src="@/assets/video_play.png" alt="" class="play-icon" />

                <div class="card-foot" :class="{ 'card-foot-text': item.type == 'text' }">
                    <span>
                        <nuxt-link :to="`/show/${item.sid}`">{{ item.text }}</nuxt-link>
                    </span>

                </div>

                <div class="other-foot">
                    <a href="javascript:;" title="称赞" class="icon-up" @click="item.up++">{{ item.up }}</a>
                    <a href="javascript:;" title="鄙视" class="icon-down" @click="item.down++">{{ item.down }}</a>

                    <a href="javascript:;" title="收藏" class="icon-favorites" :class="{'icon-favorites-1':item.forward!='0'}"></a>

                    <a href="javascript:;" title="评论" class="icon-comment">{{
              item.comment
            }}</a>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-row>
        <el-col style="text-align: center; margin-top: 20px">
            <el-pagination background layout="prev, pager, next" :total="150" @current-change="prevNextClick" @prev-click="prevNextClick" @next-click="prevNextClick">
            </el-pagination>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name: "data-list",

    data() {
        return {
            list: {},
        };
    },
    mounted() {
        // console.log(this.$route.params.type)
        this.$store.commit("setType", this.$route.params.type);
        this.$store.dispatch("getData");
        this.$nextTick(() => {
            this.$nuxt.$loading.start();
            setTimeout(() => this.$nuxt.$loading.finish(), 2000);
        });
    },

    methods: {

        prevNextClick(e) {
            // console.log(e);
            this.$store.commit("setPage", e);
            this.$store.dispatch("getData");
        },

        play(item) {
            if (item.type == "gif") {
                item.thumbnail = item.images;
                item.isPlay = true;
            } else if (item.type == "video") {
                item.thumbnail = item.video;
            }
        },

        xxx(item) {
            // item.isPlay=false
            // item.thumbnail = item.thumbnail;
            // console.log(item);
        },
    },
};
</script>

<style lang="scss">
.el-card__header {
    padding: 5px 20px;
}

.el-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .el-col {
        margin-bottom: 10px;
    }

    // &:after {
    //     content: "";
    //     width: 190px;
    // }
}

.card-header {
    display: flex;
    align-items: center;

    .username {
        margin-left: 10px;
        font-size: 12px;
    }
}

.card-foot {
    margin-top: 14px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    text-align: left;
    height: 35px;
}

.card-foot-text {
    -webkit-line-clamp: 8;
    line-clamp: 8;
    height: 150px;
}

.other-foot {
    margin-top: 20px;
    display: flex;

    justify-content: space-around;

    .icon-up {
        // margin-right: 12px;
        background: url(../assets/up.png) left top no-repeat;
    }

    .icon-down {
        // margin-right: 12px;
        background: url(../assets/down.png) left top no-repeat;
    }

    .icon-comment {
        // margin-right: 12px;
        background: url(../assets/comment.png) left top no-repeat;
    }

    .icon-favorites {
        background: url(../assets/favorites-0.png) left top no-repeat;
    }

    .icon-favorites-1 {
        background: url(../assets/favorites-1.png) left top no-repeat;
    }

    a {
        background-size: 24px !important;
        padding: 0 12px 0 28px;
        height: 24px;
        color: #666;
        line-height: 24px;
        font-size: 12px;
    }
}

.el-image__error {
    background: none;
}

.el-card__body {
    position: relative;

    .play-icon {
        display: block;
        position: absolute;
        left: 50%;
        top: calc(50% - 50px);
        margin-top: -25px;
        margin-left: -25px;
        width: 50px;
        height: 50px;
        cursor: pointer;
    }
}
</style>
