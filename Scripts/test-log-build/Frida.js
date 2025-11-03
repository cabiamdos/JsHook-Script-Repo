// 2025/10/04 01:14:09
// write your script...

Java.perform(function () {
  const build = {
    product: Java.use("android.os.Build").PRODUCT.value,
    brand: Java.use("android.os.Build").BRAND.value,
    device: Java.use("android.os.Build").DEVICE.value,
    model: Java.use("android.os.Build").MODEL.value,
    hardware: Java.use("android.os.Build").HARDWARE.value,
    fingerprint: Java.use("android.os.Build").FINGERPRINT.value
  }
  console.log('[+] printing simple build object')
  console.log(JSON.stringify(build, null, 2));
  console.log('\n')

  var Build = Java.use("android.os.Build");
  var fields = Build.class.getDeclaredFields();
  console.log('[+] printing complex build object');
  console.log(fields)
  fields.forEach(function (field) {
    field.setAccessible(true);
    try {
      var value = field.get(null); // static field: null instance
      console.log(field.getName() + ": " + value);
    } catch (e) {
      console.log(field.getName() + ": <unable to access>");
    }
  });
  
})