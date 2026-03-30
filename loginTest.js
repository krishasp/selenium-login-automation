require('chromedriver'); // 🔥 VERY IMPORTANT

const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const LoginPage = require('../pages/loginPage');

describe('Login Test', function () {
  this.timeout(30000);

  let driver;
  let loginPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    loginPage = new LoginPage(driver);
    await loginPage.open();
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should login successfully with valid credentials', async function () {
    await loginPage.enterUsername('tomsmith');
    await loginPage.enterPassword('SuperSecretPassword!');
    await loginPage.clickLogin();

    const message = await loginPage.getMessage();
    console.log('Message:', message);

    assert(message.includes('You logged into a secure area!'));
  });

  it('should fail login with invalid password', async function () {
    await loginPage.enterUsername('tomsmith');
    await loginPage.enterPassword('wrongpassword');
    await loginPage.clickLogin();

    const message = await loginPage.getMessage();
    console.log('Error Message:', message);

    assert(message.toLowerCase().includes('invalid'));
  });
});