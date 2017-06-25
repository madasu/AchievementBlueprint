Accounts.onLogin(function () {
    let redirect = Session.get('redirectAfterLogin');
    if (redirect != null) {
        if (redirect !== '/login') {
            return FlowRouter.go(redirect);
        }
    }
});