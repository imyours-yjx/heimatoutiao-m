<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon
        slot="left"
        name="cross"
        color="white"
        @click="$router.back()"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        name="手机号"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
      >
        <!-- 插槽放入图标 -->
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        type="number"
        name="验证码"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>

        <!-- <van-count-down slot="button" :time="1000 * 5" format="ss s" /> -->
        <!-- 发送验证码，倒计时做法和点击按钮事件，倒计时和按钮显示的切换 -->
        <template #button>
          <van-count-down
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
            :time="1000 * 60"
            format="ss"
          >
            <template #default="{seconds}">
              {{ (seconds + 1 + '').padStart(2, '0') }} s
            </template>
          </van-count-down>

          <van-button
            v-show="!isShowCountDown"
            round
            size="small"
            type="info"
            @click="onSendYzm"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, yzm } from '@/api/user';
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data() {
    return {
      isShowCountDown: false,
      user: {
        mobile: '',
        code: '',
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '不能为空',
          },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
            message: '手机号格式错误',
          },
        ],
        code: [
          {
            required: true,
            message: '不能为空',
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码错误',
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      const user = this.user;

      // 开始转圈圈;
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...', // 提示消息
        isCountDownShow: false,
      });

      try {
        const data = await login(user);
        this.$store.commit('setUser', data.data);
        this.$toast.success('成功！');
        this.$router.back();
        // console.log(data);
      } catch (err) {
        console.log(err);
        this.$toast.fail('失败！');
      }
    },
    async onSendYzm(mobile) {
      this.isShowCountDown = true;
      mobile = this.user.mobile;
      try {
        const data = await yzm(mobile);
        console.log(data);

        this.$toast.success('已发送！');
      } catch (err) {
        console.log(err);
        this.$toast.fail('发送失败！');
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
