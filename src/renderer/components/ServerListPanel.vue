<template>
  <el-aside width="200px" style="background-color:yellow;" @:add-server="loadServers">
    <el-tree v-if="serverDataList.length > 0" :data="serverDataList" :props="defaultProps" @node-click="handleNodeClick" />
    <div style="position: absolute;bottom: 0px;">
      <el-button type="primary" @click="clearRecord">清除记录</el-button>
      <el-button type="primary" @click="openDialog">+</el-button>
      <AddServerDialog :visible="visible" @:add-server="loadServers"/>
    </div>
  </el-aside>
</template>
<script>
import AddServerDialog from './AddServerDialog';
import { mapState } from 'vuex';
import Store from 'electron-store';

export default {
  name: 'ServerListPanel',
  components: { AddServerDialog },
  data() {
    return {
      dialogVisible: false,
      serverDataList: [
        {
          label: '一级 1',
          children: [{}],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    visible: state => state.AddServerDialog.visible,
    visibleAlias: 'visible',
  }),
  created() {
    // load data
    var me = this;
    this.$bus.$on('add-server', function() {
      console.log('hehe');
      me.loadServers();
    });
    this.loadServers();
  },
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
    convertFromConfigToShowData(config) {
      console.log('len:' + config.len);
      for (var i in config) {
        config[i].label = config[i].name;
      }
    },
    handleNodeClick(b) {
      console.log(b);
      // to connect the server
    },
    loadServers() {
      var store = new Store();
      var config = store.get('config') || [];
      console.log('loadServers' + config);
      this.convertFromConfigToShowData(config);
      console.log('server');
      this.serverDataList = config;
    },
    clearRecord() {
      var store = new Store();
      store.set('config', []);
      this.loadServers();
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
