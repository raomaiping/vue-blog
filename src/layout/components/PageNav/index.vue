<template>
  <nav class="menu">
    <e-switcher></e-switcher>
    <div
      :class="['menu-item', { active: active === index }]"
      v-for="({ title, key, children }, index) in menuList"
      :key="key"
      @click="handleMenu(key, index)"
    >
      <span>{{ title }}</span>
      <ul class="sub-menu" v-if="children">
        <li
          v-for="({ title: subTitle, key: subKey }, subIndex) in children"
          :key="subKey"
          @click="handleSubMenu(subKey, subIndex)"
        >
          <span>{{ subTitle }}</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      menuList: [
        {
          key: 'Home',
          title: '首页',
        },
        {
          key: 'Archive',
          title: '归档',
          // children: [
          //   {
          //     key: 'TimerShaft1',
          //     title: '归档1',
          //   },
          //   {
          //     key: 'TimerShaft2',
          //     title: '归档2',
          //   },
          //   {
          //     key: 'TimerShaft3',
          //     title: '归档3',
          //   },
          // ],
        },
        {
          key: 'About',
          title: '关于',
        },
      ],
      active: 0,
    }
  },
  methods: {
    async handleMenu(name, index) {
      await this.$router.push({ name })
      console.log(name)
      this.active = index
    },
    handleSubMenu(subKey, subIndex) {
      console.log(subKey, subIndex)
    },
  },
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  .menu-item {
    position: relative;
    padding: 0 10px 40px;
    cursor: pointer;
    color: #bebbaa;
    &.active {
      color: #fff;
    }
    .sub-menu {
      position: absolute;
      top: 40px;
      right: 0;
      z-index: 999;
      display: none;
      background-color: #fff;
      border-radius: 3px;
      li {
        span {
          display: inline-block;
          color: rgba(2, 0, 0, 0.6);
          padding: 15px 25px 15px 20px;
          width: 100%;
          min-width: 190px;
          box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03);
          text-align: left;
          white-space: nowrap;
          &:hover {
            background-color: rgba(0, 0, 0, 0.02);
          }
        }
      }
      &::before {
        z-index: 0;
        content: '';
        position: absolute;
        top: -8px;
        right: 28px;
        border-style: solid;
        border-width: 0 10px 10px 10px;
        border-color: transparent transparent #fff transparent;
        transform: rotate(360deg);
      }
    }
    &:hover {
      .sub-menu {
        display: block;
      }
    }
    span {
      font-weight: bold;
      &::after,
      &::before {
        display: inline-block;
        opacity: 0;
        transition: transform 0.3s, opacity 0.2s;
      }
      &::after {
        margin-left: 5px;
        content: ']';
        transform: translateX(-20px);
      }
      &::before {
        margin-right: 5px;
        content: '[';
        transform: translateX(20px);
      }
      &:hover::after,
      &:hover::before {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>
