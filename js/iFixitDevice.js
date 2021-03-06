var iFixitDevice = function(name, sorter, thumbnail) {
	this.name = name;
	this.sorter = sorter;
	this.thumbnail = thumbnail;
	this.li = new Element('li', {
		name: name
	});
};

iFixitDevice.prototype.appendToList = function( parent_id ) {
	var that = this;
	
	if( this.thumbnail === null )
	{
		(new Request.JSONP({
			url: 'https://www.ifixit.com/api/1.0/topic/' + that.name,
			callbackKey: 'jsonp',
			onRequest: function(url) {
				$(parent_id).grab( that.li, 'top' );

				that.li.adopt(new Element( 'img', {
					src: './images/spinner.gif'
				}));
			},
			onComplete: function(response) {
				if( response.image && response.image.text )
					that.thumbnail = response.image.text + '.thumbnail';
				else
					that.thumbnail = './images/no_image.jpg';

				that.li.getChildren('img')[0].set( 'src', that.thumbnail );
				that.sorter.addItems( that.li );
			}
		})).send();
	}
	else
	{
		$(parent_id).adopt( this.li );

		this.li.adopt(new Element( 'img', {
			src: this.thumbnail
		}));
		
		this.sorter.addItems( this.li );
	}
};
