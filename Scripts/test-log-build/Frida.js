// 2025/10/04 01:14:09
// write your script...

Java.perform(function() {
  const build = {
    product: Java.use("android.os.Build").PRODUCT.value,
    brand: Java.use("android.os.Build").BRAND.value,
    device: Java.use("android.os.Build").DEVICE.value,
    model: Java.use("android.os.Build").MODEL.value,
    hardware: Java.use("android.os.Build").HARDWARE.value,
    fingerprint: Java.use("android.os.Build").FINGERPRINT.value
  }

  console.log(JSON.stringify(build,null, 2))
})