<template>
  <a-layout class="pageAll">
    <a-layout-sider
      breakpoint="sm"
      collapsed-width="0"
      v-model="collapsed"
      :trigger="null"
      collapsible
    >
      <div class="Navlogo">
        <a-icon type="schedule" />
        Ant-design-Vue
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :open-keys="openNavList"
        @openChange="onOpenNav"
      >
        <a-sub-menu :key="nav.MenuID" v-for="nav in NavBarData">
          <span slot="title"
            ><a-icon :type="nav.Icon" />{{ nav.MenuTitle }}</span
          >
          <a-menu-item :key="nChild.MenuID" v-for="nChild in nav.Children">
            <router-link :to="nChild.MenuPath">{{
              nChild.MenuTitle
            }}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="pageHead">
        <a-icon
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          class="triggerIcon headTool"
          @click="() => (collapsed = !collapsed)"
        />

        <a-switch
          class="openMethod headTool"
          checked-children="Tab"
          un-checked-children="Cover"
          :checked="isOpenRemember"
          @change="changeOpenType"
        />
        <a-button
          v-bind:style="{ marginLeft: '85%' }"
          type="primary"
          @click="unLogin"
        >
          退出
        </a-button>
      </a-layout-header>
      <a-layout-content class="pageCont">
        <a-spin tip="Loading..." :spinning="loading">
          <a-tabs
            v-show="isOpenRemember"
            size="small"
            class="pgTab"
            :activeKey="actPage"
            hide-add
            type="editable-card"
            @tabClick="changePage"
            @edit="onDelPage"
          >
            <a-tab-pane
              v-for="(pg, pgInd) in pageTabList"
              :key="pgInd"
              :tab="pg.title"
              :closable="pgInd != 0"
            >
            </a-tab-pane>
          </a-tabs>
          <router-view class="moduleAll" :class="{ hasTab: isOpenRemember }" />
        </a-spin>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isOpenRemember", "pageTabList", "actPage"]),
  },
  data() {
    return {
      loading: true,
      collapsed: false,
      openNavList: [],
      NavBarData: [
        {
          MenuTitle: "Example",
          Icon: "deployment-unit",
          MenuID: 100,
          Children: [
            {
              MenuID: 101,
              MenuTitle: "模块一",
              MenuPath: "/Module1",
            },
            {
              MenuID: 102,
              MenuTitle: "模块二",
              MenuPath: "/Module2",
            },
            {
              MenuID: 103,
              MenuTitle: "实例页面",
              MenuPath: "/ExamplePage",
            },
          ],
        },
        {
          MenuTitle: "公司管理",
          Icon: "user",
          MenuID: 1,
          Children: [
            {
              MenuID: 2,
              MenuTitle: "用户管理",
              MenuPath: "userManage",
            },
            {
              MenuID: 3,
              MenuTitle: "公司管理",
              MenuPath: "companyManage",
            },
            {
              MenuID: 4,
              MenuTitle: "部门管理",
              MenuPath: "departmentManage",
            },
          ],
        },
        {
          MenuTitle: "数据管理",
          Icon: "hdd",
          MenuID: 5,
          Children: [
            {
              MenuID: 6,
              MenuTitle: "模块管理",
              MenuPath: "moduleManage",
            },
            {
              MenuID: 7,
              MenuTitle: "角色管理",
              MenuPath: "roleManage",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    console.log(this.$store.state);
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  methods: {
    unLogin() {
      this.$router.push({
        path: "/",
      });
    },
    changeOpenType(e) {
      this.$store.commit("changeOpenRemember", e);
    },
    changePage(e) {
      if (e != this.actPage) {
        this.$store.commit("changeActPage", e);
        this.$router.push({ path: this.pageTabList[e].path });
      }
    },
    onDelPage(e) {
      let arr = this.pageTabList,
        len = arr.length;
      if (e == len - 1 && this.actPage == e) {
        this.$router.push({ path: this.pageTabList[len - 2].path });
      }
      this.$store.commit("delPage", e);
    },
    onOpenNav(e) {
      let endKey = e.pop();
      this.openNavList = endKey ? [endKey] : [];
    },
  },
};
</script>

<style lang="scss" scoped>
.pageAll {
  width: 100vw;
  height: 100vh;
  .Navlogo {
    height: 32px;
    background-color: $colTheme;
    opacity: 0.7;
    margin: 16px;
    color: $colWhite;
    @extend .GFlex;
    .anticon {
      margin-right: 5px;
    }
  }
  .pageHead {
    padding: 0;
    display: flex;
    align-items: center;
    .headTool {
      margin: 0 10px;
    }
    .triggerIcon {
      font-size: 18px;
      line-height: 100%;
      cursor: pointer;
      color: #ffffff;
      transition: color 0.3s;
    }
    // .openMethod{
    // }
  }
  .pageCont {
    overflow: hidden;
    padding: 10px;
    height: 100%;
    .pgTab/deep/ {
      .ant-tabs-bar {
        margin: 0;
      }
      /deep/.ant-tabs-card-bar,
      .ant-tabs-tab {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
      }
    }
    .moduleAll {
      width: 100%;
      background-color: #ffffff;
      height: calc(100vh - 64px - 20px);
      overflow-y: auto;
      &.hasTab {
        height: calc(100vh - 64px - 20px - 26px);
      }
    }
  }
}
</style>
