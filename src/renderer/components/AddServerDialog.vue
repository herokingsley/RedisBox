<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="handleClose"
    title="Connection"
    width="50%"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="Name" >
        <el-input v-model="form.name" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="Host">
        <el-input v-model="form.host" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="Port">
        <el-input v-model="form.port" auto-complete="off"/>
      </el-form-item>
      <el-form-item label="Auth">
        <el-input v-model="form.pass" auto-complete="off"/>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="testLink">测试连接</el-button>
      <el-button @click="closePop()">取 消</el-button>
      <el-button type="primary" @click="addServer()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from 'vuex';
import Store from 'electron-store';
import redis from 'redis';

export default {
  name: 'AddServerDialog',
  components: {},
  data() {
    return {
      form: {
        name: 'test',
        host: '',
        port: '6379',
        pass: '',
      },
      v: false,
    };
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    visible: state => state.AddServerDialog.visible,
  }),
  created() {
    console.log('created');
    console.log(this.visible);
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    addServer() {
      const store = new Store();
      if (this.form) {
        var config = store.get('config');
        if (!config) {
          config = [];
        }
        config.push(this.form);
      }
      console.log(config);
      store.set('config', config);
      this.$bus.$emit('add-server');
      this.$store.commit('hide');
    },
    closePop() {
      this.$store.commit('hide');
    },
    testLink() {
      if (!this.form) {
        return;
      }
      var me = this;
      var r = redis.createClient({
        host: me.form.host,
        port: me.form.port,
        password: me.form.pass,
      });
      r.select(0, function() {
        alert('测试连接成功');
      });
    },
    handleClose() {},
    loadServers() {
      console.log('heheh');
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
