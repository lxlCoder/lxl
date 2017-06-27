var vm = new Vue({
	el:".container",
	data:{
		addrList:[],
		sliceNum:3,
		nowIdx:0,
		shipIdx:1
	},
	computed:{
		addrListSlice:function(){
			return this.addrList.slice(0,this.sliceNum);
		}
	},
	mounted:function(){
		var me = this;
		me.$nextTick(function(){
			me.loadData();
		});
	},
	methods:{
		loadData:function(){
			var me = this;
			me.$http.get("data/address.json").then(function(res){
				me.addrList=res.body.result;
			});
		},
		setDefault:function(flag){
			var me = this;
			me.addrList.forEach(function(item,idx){
				item.isDefault=false;
				(idx===flag)&&(item.isDefault=true);
			});
		}
	}
})