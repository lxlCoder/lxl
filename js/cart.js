var vm = new Vue({
    el: "#app",
    data: {
        shopList: null,
        totalSum: 0,
        allCheck: false,
        diaShow: false,
        delIdx:0
    },
    filters: {
        price: function(val, type) {
            return '¥ ' + val + ' ' + type;
        }
    },
    mounted: function() {
        var me = this;
        me.$nextTick(function() {
            me.loadData();
        });
    },
    methods: {
        loadData: function() {
            var me = this;
            axios.get("data/data.json").then(function(res) {
                me.shopList = res.data.result.list;
                // me.totalSum = res.data.result.totalMoney;
            });
        },
        productNUm: function(param, flag) {
            if (flag === -1) {
                param.productQuantity > 1 ? param.productQuantity-- : param.productQuantity = 1;
            } else {
                param.productQuantity++;
            };
            this.getTotalSum();
        },
        chooseShop: function(param) {
            var me = this;
            if (typeof param.checked == 'undefined') {
                me.$set(param, "checked", true);
            } else {
                param.checked = !param.checked;
            };
            (!param.checked) && (me.allCheck = false);
            me.getTotalSum();
        },
        allChoose: function(flag) {
            var me = this;
            me.allCheck = flag;
            me.shopList.forEach(function(item) {
                if (typeof me.shopList.checked == 'undefined') {
                    me.$set(item, "checked", flag);
                } else {
                    item.checked = flag;
                };
            });
            me.getTotalSum();
        },
        getTotalSum: function() {
            var me = this;
            me.totalSum = 0;
            me.shopList.forEach(function(item) {
                if (item.checked) {
                    me.totalSum += item.productPrice * item.productQuantity;
                };
            });
        },
        delComform:function(param){
        	this.diaShow = true;
        	this.delIdx = param;
        },
        delProduct:function(){
        	this.diaShow = false;
        	this.shopList.splice(this.delIdx,1);
        }
    }
});
