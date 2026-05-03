<template>
  <div class="about">
    <div class="fl">{{ msg }}</div>
    <TransitionGroup name="list">
      <div
        v-for="color in displayColor"
        class="square"
        v-bind:style="{ background: color }"
        :key="color"
      >
      <span>
        {{ color }}
      </span>
      </div>
    </TransitionGroup>
  </div>
</template>
<script>
export default {
  name: "about",
  data() {
    return {
      msg: "霓虹灯 About Page",
      num: 0,
    };
  },
  computed: {
    colorful() {
      const colorArray = [];
      const step = 10;
      for (var i = 0; i < 255; i+=step) {
        for (var j = 0; j < 255; j+=step) {
          for (var k = 0; k < 255; k+=step) {
            colorArray.push(`rgba(${k}, ${j}, ${i}, 0.8)`);
          }
        }
      }
      return colorArray;
    },


    displayColor() {
      return this.colorful.slice(this.num , this.num + 300);
    },
  },

  mounted() {
    setInterval(() => {
      this.num++
      this.num%= this.colorful.length
    }, 32);
  },

  methods: {
    getRandomColor(base) {
      return base + parseInt(Math.random() * 256);
    },
  },
};
</script>

<style>
.about {
  font-size: 0px;
  text-align: left;
  margin: 16px 16px;
}
.square {
  font-size: 0px;
  width: 50px;
  height: 50px;
  display: inline-block;
  margin: 4px 4px;
  padding: 0px 0px;
  background-size: 100% 100%;
  border-radius: 8px;
}
.fl {
  position: absolute;
  color: black;
  font-size: 2rem;
  margin-top: 10rem;
  left: 50%;
}

.list-enter-active,
.list-leave-active {
  transition: all 1.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .list-leave-active {
  position: absolute;
}
</style>
