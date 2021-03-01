<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMneu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <br />
      <!-- 表单start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from" v-show="model=='register'">
          <label>重复密码</label>
          <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>


        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
                <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
                <el-button type="success"  class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-bth block">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {stripscript,validateEmail,validatePass,validateVcode} from '@/utils/validate.js';
export default {
  name: "login",
  data() {
      //验证用户名为邮箱
    var validateUsername = (rule, value, callback) => {
        // console.log(value);
      // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;在vue中验证，注销后再JS里面提取
      if (value === "") {
        callback(new Error("请输入用户名"));
      // } else if(!reg.test(value)){   在vue中验证，注销后再JS里面提取
      } else if(validateEmail(value)){
        callback(new Error("用户名格式有误"));
        }else{
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
        // console.log(stripscript(value))
        //过滤后的数据
      this.ruleForm.password = stripscript(value)//过滤后的数据给绑定的数据
      value= this.ruleForm.password//绑定后的值重新赋值在进行后面判断
      
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };
    //验证重复密码
    var validatePasswords = (rule, value, callback) => {
      //如果模块值为login，直接通过
      if(this.model=='login'){callback();}
        // console.log(stripscript(value))
        //过滤后的数据
      this.ruleForm.passwords = stripscript(value)//过滤后的数据给绑定的数据
      value= this.ruleForm.passwords//绑定后的值重新赋值在进行后面判断  
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !=this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };
    //验证验证码
    var checkCode = (rule, value, callback) => {
        // console.log(value);
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVcode(value)) {
        callback(new Error("验证码的格式有误"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "登录", current: true ,type:'login'},
        { txt: "注册", current: false ,type:'register'},
      ],
      //模块值
      model:'login',
      //表单数据
      ruleForm: {
        username: "",
        password: "",
        passwords:"",
        code: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  created() {},
  //挂载完成后自动执行的
  mounted() {
    // (1)基本数据类型(按值访问):
    // ndefined、Null、 Boolean、 Number和 String
    // 概述
    // 基本数据类型复制:复制的是该变量的副本,这两个变量可以
    // 参与任何操作而不会相互影响
    // let a = 11;
    // let b = a;
    // b = 20
    // console.log(`a:${a}`)
    // console.log(`b:${b}`)
    // 引用数据类型(按引用访问):
    // object、Array. function
    // 概述:
    // 引用数据类型复制:复制的是该变量的指针,该指针指向存储
    // 在堆中的一个对象。复制操作结束后,两个变量实际上将引用
    // 同一个对象。因此,改变其中一个变量,就会影响另一个变量
    // let aArr =[11,22];//object
    // let bArr =aArr
    // let cArr =bArr
    // cArr[0] = 33
    // console.log(`aArr:${aArr}`)
    // console.log(`bArr:${bArr}`)
    // console.log(`cArr:${cArr}`)
  },
  //写函数的地方
  methods: {
    //vue数据驱动视频渲染
    //js 操作DOM元素
    toggleMneu(data) {
      // console.log(data)
      this.menuTab.forEach((elem) => {
        elem.current = false; //清楚当前属性current
      });
      data.current = true; //选中那个那个属性current是真的
      //修改模块值
      this.model = data.type
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    
  },
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form{
    margin-top: 29px;
    label {
        display: block;
        font-size: 14px;
        color: #fff;
        margin-bottom: 3px;
    }
    .item-from{
        margin-bottom: 13px;
    }
    .block{
        display: block;
        width: 100%;   
    }
    .login-bth{
        margin-top: 19px;
    }
}
</style>