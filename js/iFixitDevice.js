var iFixitDevice = function(name, sorter) {
	this.name = name;
	this.sorter = sorter;
	this.li = new Element('li', {
		name: name,
	});
};

iFixitDevice.prototype.appendToList = function( parent_id ) {
	var that = this;
	
	(new Request.JSONP({
		url: 'https://www.ifixit.com/api/1.0/topic/' + that.name,
		callbackKey: 'jsonp',
		onRequest: function(url) {
			$(parent_id).adopt( that.li );

			that.li.adopt(new Element( 'img', {
				src: './images/spinner.gif'
			}));
		},
		onComplete: function(response) {
			console.log(response);
			if( response.image && response.image.text )
				that.thumbnail = response.image.text + '.thumbnail';
			else
			{
				that.li.destroy();
				return;
			}

			that.li.getChildren('img')[0].set( 'src', that.thumbnail );
	
			that.sorter.addItems( that.li );
		}
	})).send();
};
