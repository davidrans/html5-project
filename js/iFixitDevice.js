var iFixitDevice = function(name) {
	this.name = name.replace( /\s/, '_' );
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
	
	(new Element( 
		'img#' + this.name, 
		{ 'src': this.thumbnail }
	)).inject('get-more', 'before');
}