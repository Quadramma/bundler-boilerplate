window.eventable = function(o) {
	var events = {};
	o.$on = function(n, fn) {
		//console.log('eventable->$on->'+n);
		var fired = this.$one(n, null, true); //Caso: Se registro depuesde ser disparado desde $one
		//console.log('fired?'+fired);
		if (fired) return;
		//
		events[n] = events[n] || [];
		var id = new Date().getTime();
		events[n].push({
			id: id,
			fn: fn
		});
		//console.log('added');
		return {
			name: n,
			id: id
		};
	};
	o.$emit = function(n, p) {
		for (var x in events[n]) {
			events[n][x].fired = events[n][x].fired || false;
			if (!events[n][x].fired) {
				events[n][x].fn(p);
				console.log('eventable->' + n + '->fired [' + events[n][x].id + ']');
			}
		}
	};
	o.$one = function(n, p, ignoreFired) {
		p = p || null;
		events[n] = events[n] || [];
		for (var x = 0; x < events[n].length; x++) {
			events[n][x].p = events[n][x].p || p;
			if (events[n][x].p) {
				events[n][x].fn(p);
				events[n][x].fired = true;
				//delete events[n][x];
				console.log('eventable->' + n + '->fired [' + events[n][x].id + ']');
			}else{
				console.log('eventable->'+n+'->skip');
			}
		}
		//console.log('eventable->$one->-'+n+'>called [for('+events[n].length+')]');
		return false;
	};
	o.$off = function(onrta) {
		events[onrta.name] = events[onrta.name] || [];
		for (var x = 0; x < events[onrta.name].length; x++) {
			if (events[onrta.name][x].id == onrta.id) {
				delete events[onrta.name][x];
			}
		}
	};
	//console.log('eventable->converted');
	return o;
};