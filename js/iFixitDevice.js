var iFixitDevice = function(name, sorter) {
	this.name = name;
	this.sorter = sorter;
};

iFixitDevice.prototype.appendToList = function( parent_id ) {
	var that = this;
	
	(new Request.JSON({
		url: 'https://www.ifixit.com/api/2.0/categories/' + that.name,
		onSuccess: function(response) {
			if( response.image )
				that.thumbnail = response.image.thumbnail;
			
			if( !that.thumbnail )
				return;
		
			var li = new Element('li', {
				name: that.name,
				src: that.thumbnail 
			});
		
			$(parent_id).adopt( li );

			li.adopt(new Element( 'img', {
				src: that.thumbnail 
			}));
	
			that.sorter.addItems( li );
		}
	})).get();
};
