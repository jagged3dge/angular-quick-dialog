describe('e2e:angularQuickDialog:example/test page', function () { 
    browser.get('http://localhost:8080/example/');
    var dialogEl = element(by.id('test-dialog-login')),
        ptor = protractor.getInstance();


    describe('open button', function() {
        var openButton = element(by.cssContainingText('.btn-main', 'Log in'));
     
        it('should exist', function() {
            expect(ptor.isElementPresent(openButton)).toBe(true);
        });
      
        it('should open dialog', function() {
            openButton.click();
            expect(dialogEl.isDisplayed()).toBe(true); 
        });
    });



    beforeEach(function() {
        var openButton = element(by.cssContainingText('.btn-main', 'Log in'));
        openButton.click();
    });

    describe('dialog', function() {
        it('should have a dialog name', function() {
            expect(dialogEl.getAttribute('dialog-name')).toBeDefined();
        }); 

        it('should open', function() {
            expect(dialogEl.isDisplayed()).toBe(true); 
        });

        describe('directive close button', function() {
            var closeButton = element(by.cssContainingText('.quick-dialog__close', 'x'));

            it('should exist', function() {
                expect(ptor.isElementPresent(closeButton)).toBe(true);
            });

            it('should close the dialog', function() {
                closeButton.click();
                expect(dialogEl.isDisplayed()).toBe(false);
            });
        });

        describe('transcluded elements', function() {
            describe('transcluded log in button', function() {
                var loginButton = element(by.id('test-dialog-login-login'));

                it('should exist', function() {
                    expect(ptor.isElementPresent(loginButton)).toBe(true);
                });

                it('should close the dialog', function() {
                    loginButton.click();
                    expect(dialogEl.isDisplayed()).toBe(false);
                })
            });

            describe('transcluded cancel button', function() {
                var cancelButton = element(by.id('test-dialog-login-cancel'));

                it('should exist', function() {
                    expect(ptor.isElementPresent(cancelButton)).toBe(true);
                });

                it('should close the dialog', function() {
                    cancelButton.click();
                    expect(dialogEl.isDisplayed()).toBe(false);
                })
            });
        });

        describe('escape key', function() {
            it('should close the dialog', function() {
                dialogEl.sendKeys(protractor.Key.ESCAPE);
                expect(dialogEl.isDisplayed()).toBe(false);
            });
        });
    }); // End describe dialog

    describe('optional focus features', function() {
        describe('openFocus', function() {
            it('should be defined as an attribute of the dialog', function() {
                expect(dialogEl.getAttribute('open-focus')).toBeDefined();
            });

            it('should make the correct element be focused when dialog is opened', function() {
                var input = element(by.id(dialogEl.getAttribute('open-focus')));
                input.click();
                testIsFocused(input);
            });
        });

        describe('closeFocus', function() {
            it('should be defined as an attribute of the dialog', function() {
                expect(dialogEl.getAttribute('close-focus')).toBeDefined();
            });

            it('should make the correct element be focused when dialog is closed', function() {
                var input = element(by.id(dialogEl.getAttribute('close-focus')));
                input.click();
                testIsFocused(input);
            });
        });

        /**
         * Helper function to check if entered element has focus. 
         *
         * @param {Element} el
         * @return isFocused
         */
        function testIsFocused(el) {
            expect(el.getAttribute('id')).toBe(browser.driver.switchTo().activeElement().getAttribute('id'));
        }
    }); // End describe focus features
});

