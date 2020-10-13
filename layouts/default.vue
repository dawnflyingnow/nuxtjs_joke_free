<template>
<div>
    <el-container>
        <el-header>
            <el-row>
                <el-col class="hidden-sm-and-down logo" :span="3">
                    <img src="@/assets/ele.svg" alt="" width="146" height="38" />
                </el-col>
                <el-col class="hidden-md-and-up logo" :span="3">
                    <img src="@/assets/logo-icon.svg" alt="" />
                </el-col>
                <el-col :span="19">
                    <el-menu :default-active="'/'+(this.$store.state.type||'')" mode="horizontal" :router="true">
                        <el-menu-item index="/">随机</el-menu-item>
                        <el-menu-item index="/gif">动图</el-menu-item>
                        <el-menu-item index="/video">小视频</el-menu-item>
                        <el-menu-item index="/image">图片</el-menu-item>
                        <el-menu-item index="/text">文字</el-menu-item>
                    </el-menu>
                </el-col>
                <el-col class="user" :span="2">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <el-avatar :size="36" :src="circleUrl"></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>想好再扩展...</el-dropdown-item>
                            <el-dropdown-item>退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <Nuxt />
        </el-main>
        <el-footer>
            <div class="footer">
                资源均来源于网上，仅供个人学习使用</div>
        </el-footer>
    </el-container>
</div>
</template>

<script>
export default {
    // async asyncData({
    //     $axios
    // }) {
    //     const {
    //         data
    //     } = $axios.$get(
    //         "https://api.apiopen.top/getJoke?page=1&count=10&type=video"
    //     );
    //     console.log(data);
    //     return {};
    // },

    data() {
        return {
            // activeIndex: '',
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        };
    },
    mounted() {
        // this.activeIndex = '/' + (this.$store.state.type || '')
        // console.log('/' + this.$store.state.type)
        // this.$nextTick(() => {
        //     this.$nuxt.$loading.start();
        //     // setTimeout(() => this.$nuxt.$loading.finish(), 2000);
        // });
    },

};
</script>

<style lang="scss">
body {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: #666;
}

.el-header {

    .logo,
    .user {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .user {
        .el-dropdown-link {
            display: flex;
            align-items: center;
        }
    }
}

.el-main {
    min-height: calc(100vh - 120px);
    max-width: 1200px;
    margin: 0 auto;
}

.el-footer {
    background-color: #333;
    color: #ffffff;
    line-height: 60px;
    text-align: center;
}

.el-icon-picture-outline,
.el-icon-loading {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;

    &::before {
        font-size: 4rem;
    }
}
</style>
