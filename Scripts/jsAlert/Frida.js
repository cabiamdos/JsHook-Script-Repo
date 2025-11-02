// 2025/10/03 23:13:14
// write your script...

Java.perform(function () {
  var Toast = Java.use("android.widget.Toast");
  var String = Java.use("java.lang.String");
  var ActivityThread = Java.use("android.app.ActivityThread");
  var context = ActivityThread.currentApplication().getApplicationContext();

  // Get the current activity
  var activity = ActivityThread.currentActivityThread().getApplication().getApplicationContext();

  // Get the main thread handler
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
});