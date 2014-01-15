var iFixitDevice = function(name, sorter) {
	this.name = name.replace( / /, '_' );
	this.sorter = sorter;
};

iFixitDevice.prototype.getThumbnail = function() {
	var that = this;
	
	(new Request.JSON({
		url: 'https://www.ifixit.com/api/2.0/categories/' + that.name,
		onSuccess: function(response) {
			if( response.image )
				that.thumbnail = response.image.thumbnail;
			that.appendToDevices();
		}
	})).get();
};

iFixitDevice.prototype.appendToDevices = function() {
	if( !this.thumbnail )
		return;
		
	var li = new Element('li');
		
	$('device-list').adopt( li );

	li.adopt(new Element( 
		'img#' + this.name, 
		{ 'src': this.thumbnail }
	));
	
	this.sorter.addItems( li );
};