let newItemModal = "";
let delItemModal = "";
const url = "https://vue3-course-api.hexschool.io";
const path = "onedog";

const app = {
  data() {
    return {
      isNew: false,
      products: [],
      tempProducts: {
        imagesUrl: [],
      },
      modalTitle: "",
      delTitle: "",
    };
  },
  methods: {
    getData() {
      axios
        .get(`${url}/api/${path}/admin/products`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            // console.log(this.products);
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => console.log(error));
    },
    openModal(action, item) {
      if (action === "newItem") {
        this.isNew = true;
        this.modalTitle = "新增產品";
        this.tempProducts = { imagesUrl: [] };
        newItemModal.show();
      } else if (action === "editItem") {
        this.isNew = false;
        this.modalTitle = "編輯產品";
        this.tempProducts = { ...item };
        //判斷有無圖片，無圖片的話就加上屬性
        if (!Object.keys(this.tempProducts).find((key) => key == "imageUrl")) {
          this.tempProducts.imageUrl = "";
        }
        if (!Object.keys(this.tempProducts).find((key) => key == "imagesUrl")) {
          this.tempProducts.imagesUrl = "";
        }
        newItemModal.show();
      }
      // (action === "delItem")
      else {
        this.tempProducts = item;
        this.delTitle = this.tempProducts.title;
        delItemModal.show();
      }
    },
    addItem() {
      let apiUrl = `${url}/api/${path}/admin/product`;
      let http = "post";

      if (!this.isNew) {
        apiUrl = `${url}/api/${path}/admin/product/${this.tempProducts.id}`;
        http = "put";
      }

      axios[http](apiUrl, { data: this.tempProducts })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            this.getData();
            newItemModal.hide();
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => console.log(error));
    },
    addImg() {
      this.tempProducts.imagesUrl.push("");
    },
    autoImg() {
      this.tempProducts.imageUrl = "https://picsum.photos/400";
      this.tempProducts.imagesUrl.push("https://picsum.photos/399");
    },
    delItem() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.tempProducts.id}`)
        .then((res) => {
          if (res.data.success) {
            this.getData();
            this.tempProducts = {};
          } else {
            alert(res.data.message);
          }
          delItemModal.hide();
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    newItemModal = new bootstrap.Modal(document.getElementById("productModal"));
    delItemModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token == "") {
      alert("您尚未登入，請重新登入");
      window.location = "index.html";
    }
    axios.defaults.headers.common["Authorization"] = token;
    this.getData();
  },
};

Vue.createApp(app).mount("#app");
