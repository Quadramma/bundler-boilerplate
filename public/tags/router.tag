<router>
	<div>{name}</div>


	var self = this

	self.route = {collection:'',id:'',action:''}

	self.options = {
		defaultView: '',
		tags: [],
		notfoundView: ''
	};

	self.currentName = '' //Represents the name of the current route //eg home,services,contact
	self.currentTag = null

	config(opt){	
		opt.tags = opt.tags || [];
		opt.defaultView = opt.defaultView || '';
		opt.notfoundView = opt.notfoundView || '';
		for(var t in opt.tags){
			$('<'+opt.tags[t]+'/>').appendTo($('body'));
		}
		self.options.defaultView = opt.defaultView;
		self.options.tags = opt.tags;
		self.options.notfoundView = opt.notfoundView;
	}

	
	var tryMount=function(routeName){
		if(self.currentTag!=null){
			self.currentTag.unmount(true)	
		} 
		var arr =riot.mount(routeName)	
		self.currentTag =  arr&&arr.length==1 && arr[0] || null
		return arr.length == 1;
	}
	var tryMountOnFailGoTo=function(routeName,failFn){
		if(tryMount(routeName)){
			self.currentName = routeName
			self.update()	
			riot.$emit('router.change');
		}else{
			failFn && failFn()
		}
	}
	var onRouteChange=function(collection,id,action){
		//console.log('router.change'+JSON.stringify(self.options));
		self.route = {collection:collection,id:id,action:action}
		collection = collection===''?self.options.defaultView:collection
		tryMountOnFailGoTo(collection,function(){
			tryMountOnFailGoTo(self.options.notfoundView,function(){
				tryMountOnFailGoTo(self.options.defaultView,function(){
					console.log('router.fail');
					alert('Contacte al administrador');
				});
			})	
		})
	}
	riot.route(onRouteChange);
	riot.route.start() // start again
	
	//riot.mount(getDefaultTagsConcatened()) //Mount default tags
	riot.myrouterTag = this


	//EDIT THIS OPTIONS
	//console.log(self.opts.tags);
	self.config(self.opts);
	/*{
		tags: ['home', 'notfound'],
		defaultView: 'home',
		notfoundView: 'notfound'
	}*/
	riot.route.exec(onRouteChange)

	riot.$one('router.ready',{});
	
</router>