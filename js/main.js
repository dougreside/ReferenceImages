var app = {
    changePicture: function(event){
     event.preventDefault();
    if (!navigator.camera) {
        app.showAlert("Camera API not supported", "Error");
        return;
    }
    var options =   {   quality: 50,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Photo Album
                        encodingType: 0     // 0=JPG 1=PNG
                    };
 
    navigator.camera.getPicture(
        function(imageData) {
        	 app.showAlert('Happiness', 'So far');
        	$("#results").html("<img class='cam_image'></img>
            $('.cam_image').attr('src', "data:image/jpeg;base64," + imageData);
        },
        function() {
            app.showAlert('Error taking picture', 'Error');
        },
        options);
 
    return false;
    },
    
    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
       var self = this;
    this.store = new MemoryStore(function() {
        self.showAlert('Store Initialized', 'Info');
    });
    $('.search-key').on('keyup', $.proxy(this.findByName, this));
    $('.change-pic-btn').on('click',this.changePicture);
    },
    showAlert: function (message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

};

app.initialize();