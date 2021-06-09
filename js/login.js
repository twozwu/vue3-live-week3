const url = "https://vue3-course-api.hexschool.io";

const app = Vue.createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post(`${url}/admin/signin`, this.user) //請求的方法
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            console.log(token, expired);
            document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
            window.location = "products.html";
          } else {
            alert("帳號或密碼錯誤");
          }
        })
        .catch((error) => {
          console.dir(error);
        });
    },
  },
});

app.mount("#app");
