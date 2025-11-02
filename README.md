## JsHook script repository JsHook-Script-Repo

- The warehouse script is for learning reference only, please do not use it for illegal purposes
### It is recommended to use the github warehouse for self-built warehouses. There is a delay in CDN warehouse refresh
#### New version warehouse address (V1.1.5+)

- **github (usually you need to climb the wall):**

https://raw.githubusercontent.com/cabiamdos/JsHook-Script-Repo/main/Store-new.json

[Add warehouse](jshook://store?url=https://raw.githubusercontent.com/cabiamdos/JsHook-Script-Repo/main/Store-new.json)

- **CDN resolution address (normal domestic access under normal circumstances):**

https://gh-proxy.com/https://raw.githubusercontent.com/cabiamdos/JsHook-Script-Repo/main/Store-new-cdn.json

[Add warehouse](jshook://store?url=https://gh-proxy.com/https://raw.githubusercontent.com/cabiamdos/JsHook-Script-Repo/main/Store-new-cdn.json)

## Script description
### Simulator translation mechanism 
- **Translation behavior**: Most simulators (such as LDPlayer, NoxPlayer, etc.) will automatically translate from the ARM/ARM64 architecture module in the APK when the APK does not support the x86/x64 architecture.
- **Loading method**: The translated module will not be loaded into the process memory in the normal way, but will be loaded through the special mechanism of the simulator.
- **Hook Failure**: Due to changes in loading methods, Hooks for native layer functions may fail. This is a normal phenomenon.

### Solution suggestions 
1. **Check APK architecture**: Ensure that the APK contains x86/x64 architecture modules to avoid translation by the simulator.
2. **Adjust Hook logic**: If you must use a translation module, try to use a Hook method based on function name or symbol.
3. **Ultimate Solution**: Directly replace Arm/Arm64 architecture PC devices (such as most Apple devices, Microsoft Surface, etc.).
 