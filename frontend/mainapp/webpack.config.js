module.exports = {
    name: "mainApp",
    remotes: {
        "login": "login@http://example.com/auth-mc/src/Login.js",
        "imagesControl": "imagescontrol@http://example.com/imagescontrol-mc/src/ImagesControl.js",
        "profile": "profile@http://example.com/auth-mc/src/EditProfilePopup.js"
    },
    shared: ["react", "react-dom"]
    }; 