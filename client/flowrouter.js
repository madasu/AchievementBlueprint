let exposed = FlowRouter.group();

let loggedIn = FlowRouter.group({
    triggersEnter: [function () {
        if (!(Meteor.loggingIn() || Meteor.userId())) {
            let route = FlowRouter.current();
            if (route.route.name !== 'login') {
                Session.set('redirectAfterLogin', route.path);
            }
            return FlowRouter.go('login');
        }
    }]
});

let admin = loggedIn.group({
    prefix: '/admin',
    triggersEnter: [function () {
        // TODO: Add admin to user roles
        // if (!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        //     return FlowRouter.go(FlowRouter.path('dashboard'));
        // }
        if (!Meteor.userId()) {
            return FlowRouter.go('login');
        }
    }]
});

exposed.route('/login', {
    name: 'login',
    action: function (params) {
        BlazeLayout.render("_plainLayout", {main: "login"});
    }
});

exposed.route('/register', {
    name: 'register',
    action: function (params) {
        BlazeLayout.render("_plainLayout", {main: "register"});
    }
});