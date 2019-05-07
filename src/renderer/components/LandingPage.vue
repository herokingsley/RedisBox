<template>
  <el-container style="position:absolute;height:100%;width:100%;background-color:green;">
    <ServerListPanel/>
    <el-main style="background-color:blue;">
      <p>main</p>
    </el-main>
  </el-container>
</template>
<script>
import ServerListPanel from './ServerListPanel';
import { mapState } from 'vuex';

export default {
  name: 'LandingPage',
  components: { ServerListPanel },
  data() {
    return {};
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    visible: state => state.AddServerDialog.visible,
    visibleAlias: 'visible',
  }),
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    openDialog() {
      //console.log(this.$store.modules.AddServerDialog);
      console.log(this.$store.state);
      this.$store.commit('show');
      console.log(this.visible);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Source Sans Pro', sans-serif;
}

#wrapper {
  background: radial-gradient(ellipse at top left, rgba(255, 255, 255, 1) 40%, rgba(229, 229, 229, 0.9) 100%);
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
