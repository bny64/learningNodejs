const colors = require("colors");

colors.setTheme({
    warn:"rainbow",
    notice:"yellow",
    normal:"blue"
});

console.log("warn!".warn);
console.log("notice!".notice);