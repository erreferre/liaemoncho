(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    // create an object to store the models for each view
    window.APP = {
        models: {
            inicio: {
                title: 'Inicio'
            },
            camara: {
                title: 'Camara'
            },
            axenda: {
                title: 'Axenda do Casamento'
            },
            fotos: {
                title: 'Fotos'
            }
        }
    };

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {

        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
        navigator.splashscreen.hide();

        document.addEventListener("menubutton", exitAppPopup, false);
        //document.addEventListener("backbutton", exitAppPopup, false);

        app = new kendo.mobile.Application(document.body, {

            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',

            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: 'flat',

            // the application needs to know which view to load first
            initial: 'views/inicio.html'
        });

    }, false);

    //opcion de Exit
    function exitAppPopup() {
        navigator.notification.confirm(
            "pásanos o teu mail a erreferre@gmail.com ou liacarballal@msn.com, e mandarémosche as fotos", function (button) {
                if (button === 2) {
                    //window.plugins.powerManagement.release();
                    //stopSelfie();
                    navigator.app.exitApp();
                }
            }, "¿Sair da App?", "Pois non, Pois si"
        );
        return false;
    };

}());