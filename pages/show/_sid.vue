<template>
<div style="width: 960px">
    <el-page-header @back="$router.go(-1)" title="返回">
    </el-page-header>

    <div style="display: flex">
        <el-row :gutter="10" style="width: 80%">
            <el-col :span="22">
                <el-card style="text-align: center" shadow="hover">
                    <div slot="header" class="card-header">
                        <el-avatar :size="36" :src="info.header"></el-avatar>
                        <span class="username">{{ info.name }}-{{ info.type }}</span>
                    </div>

                    <el-image class="data-img" v-if="info.type != 'text' && info.type != 'video'" fit="cover" :src="info.images">
                        <!--<div slot="placeholder" class="image-slot">
                            <i class="el-icon-loading"></i>
                        </div>
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>-->
                    </el-image>

                    <video :src="info.video" v-if="info.type == 'video'" controls autoplay class="video" width="100%"></video>

                    <div class="card-foot" :class="{ 'card-foot-text': info.type == 'text' }">
                        <span>
                            <nuxt-link :to="`/show/${info.sid}`">{{ info.text }}</nuxt-link>
                        </span>
                    </div>

                    <div class="other-foot">
                        <a href="javascript:;" title="称赞" class="icon-up" @click="info.up++">{{ info.up }}</a>
                        <a href="javascript:;" title="鄙视" class="icon-down" @click="info.down++">{{ info.down }}</a>

                        <a href="javascript:;" title="收藏" class="icon-favorites" :class="{ 'icon-favorites-1': info.forward != '0' }"></a>

                        <a href="javascript:;" title="评论" class="icon-comment">{{
                info.comment
              }}</a>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-row style="width: 20%">
            <el-col>
                <el-card style="text-align: center" shadow="hover" class="recommend-card">
                    <div slot="header" class="card-header recommend-header">
                        <i class="el-icon-s-promotion" style="font-size: 20px;margin-right: 5px;"></i>
                        <span class="recommend">随机推荐</span>
                    </div>

                    <div class="recommend-list" v-for="item in rangeData" :key="item.sid">

                        <nuxt-link :to="`/show/${item.sid}`">
                            <video :src="item.video" v-if="item.type == 'video'" controls autoplay class="video" width="100%" style="height: 150px"></video>

                            <el-image class="data-img" v-else-if="item.type != 'text'" fit="cover" :src="item.images+'..'" style="height: 150px;width: 100%;">

                            </el-image>

                            <div class="card-foot" :class="{ 'card-foot-text': item.type == 'text' }">
                                <span>
                                    {{ item.text }}
                                </span>
                            </div>

                        </nuxt-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
export default {
    async asyncData({
        $axios,
        params
    }) {
        let [
            // { data: styles },
            // { data: areas },
            // { data: cates },
            // { data: years },
            {
                data: info
            },
            {
                data: rangeData
            },
        ] = await Promise.all([
            // $axios.$get("/styles"),
            // $axios.$get("/areas"),
            // $axios.$get("/cates"),
            // $axios.$get("/years"),
            $axios.get(`https://api.apiopen.top/getSingleJoke?sid=${params.sid}`),
            $axios.get(`https://api.apiopen.top/getJoke?count=4`),
        ]);

        // console.log(singleData)
        // console.log(rangeData)

        return {
            info: info.result,
            rangeData: rangeData.result.filter(v => v.type != 'text' && v.type != 'video'),
        };
    },

    // mounted() {
    //     console.log(this.$route.params.sid);
    //     this.$store.commit("setType", this.$route.params.type);
    //     this.$store.dispatch("getData");
    //     this.$nextTick(() => {
    //         this.$nuxt.$loading.start();
    //         setTimeout(() => this.$nuxt.$loading.finish(), 2000);
    //     });
    // },
};
</script>

<style lang="scss">
.el-card__header {
    padding: 5px 20px !important;
}

.el-row {
    display: flex;
    // justify-content: center;
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

    .recommend {
        font-size: 16px;
        font-weight: bold;
        padding: 5px 0;
    }

    .username {
        margin-left: 10px;
        font-size: 12px;
    }
}

.recommend-list {
    padding: 15px 10px;
    border-bottom: solid 1px #ffeeff;

    .card-foot {
        margin-top: 0;
        height: auto;

        span {
            font-size: 12px;
        }
    }
}

.recommend-card {
    .el-card__header {
        padding: 5px 10px !important;
    }

    .el-card__body {
        padding: 0;
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

    // justify-content: space-around;

    .icon-up {
        // margin-right: 12px;
        background: url(../../assets/up.png) left top no-repeat;
    }

    .icon-down {
        // margin-right: 12px;
        background: url(../../assets/down.png) left top no-repeat;
    }

    .icon-comment {
        // margin-right: 12px;
        background: url(../../assets/comment.png) left top no-repeat;
    }

    .icon-favorites {
        background: url(../../assets/favorites-0.png) left top no-repeat;
    }

    .icon-favorites-1 {
        background: url(../../assets/favorites-1.png) left top no-repeat;
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
    text-align: left;

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

.el-page-header {
    height: 50px;
    line-height: 50px;
    margin-bottom: 10px;
}
</style>
