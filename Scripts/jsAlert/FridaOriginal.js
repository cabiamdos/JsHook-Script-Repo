Java.perform(function () {
    function waitForContext(callback) {
        var ActivityThread = Java.use("android.app.ActivityThread");
        try {
            var context = ActivityThread.currentApplication().getApplicationContext();
            if (context) {
                console.log("Context ready!");
                callback(context);
                return;
            }
        } catch (e) {
            // Context not ready yet
        }
        
        // Retry every 100ms, max 5 seconds
        setTimeout(function() {
            waitForContext(callback);
        }, 100);
    }
    
    waitForContext(function(context) {
        var Toast = Java.use("android.widget.Toast");
        var String = Java.use("java.lang.String");
        var ActivityThread = Java.use("android.app.ActivityThread");
        var activity = ActivityThread.currentActivityThread().getApplication();

        var Handler = Java.use("android.os.Handler");
        var Looper = Java.use("android.os.Looper");
        var handler = Handler.$new(Looper.getMainLooper());

        handler.post(Java.registerClass({
            name: "org.jshook.ToastRunnable",
            implements: [Java.use("java.lang.Runnable")],
            methods: {
                run: function () {
                    Toast.makeText(context, String.$new("Hello from JSHook!"), Toast.LENGTH_SHORT.value).show();
                }
            }
        }).$new());
        
        console.log("Toast posted!");
    });
});
