<template>
  <div id="app">
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
  // 取得getters的值
  computed: mapGetters(["evenOrOdd"]),
  methods: mapActions([
    // mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
    // 发起异步action处理数据方法
    // 相当于this.$store.dispatch('increment')
    "increment",
    "decrement",
    "incrementIfOdd",
    "incrementAsync",
  ]),
};
</script>
