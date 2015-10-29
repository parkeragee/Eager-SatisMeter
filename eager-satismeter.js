window.EagerSatisMeter = {
  init: function(options) {
    if (!options.token) {
      return;
    }

    window.satismeter = window.satismeter || function() {
      (window.satismeter.q = window.satismeter.q || []).push(arguments);
    };
    window.satismeter.l = 1 * new Date();
    var script = document.createElement('script');
    var parent = document.getElementsByTagName('script')[0].parentNode;
    script.async = 1;
    script.src = 'https://app.satismeter.com/satismeter.js';
    parent.appendChild(script);

    var settings = {};
    settings.token = options.token;
    settings.preview = INSTALL_ID === 'preview';

    if (options.trackAnonymous) {
      settings.trackAnonymous = true;
    } else {
      var user;

      if (options.automaticUser) {
        var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        for (var k in window) {
          if (k === 'frame' || k === 'frameElement' || k === 'parent' || k === 'opener' || k === 'top') {
            continue;
          }

          if (window.hasOwnProperty(k)) {
            try {
              var val = window[k];
              if (typeof v === 'object' && v.email && v.email && emailRegex.test(v.email)) {
                user = {};
                user.email = v.email;

                user.id = v.id || v.ID || v.USER_ID || v.userId;
                user.name = v.name || v.full_name || v.fullName || v.FULL_NAME || v.FULLNAME || (!v.firstName ? '' : v.firstName + v.lastName) || !v.username;
                user.createdAt = v.createdAt || v.created_at || v.created || v.created_date || v.createdDate || v.CREATED_AT;
              }
            } catch (e) {}
          }
        }
      } else {
        try {
          user = window.eval(options.manuallySpecifiedUser);
        } catch (e) {}
      }

      if (user && typeof user === 'object' && user.email) {
        settings.user = user;
      } else {
        return;
      }
    }

    satismeter(settings);
  }
};
