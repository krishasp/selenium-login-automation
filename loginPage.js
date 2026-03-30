const { By, until } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async open() {
    await this.driver.get('https://the-internet.herokuapp.com/login');
  }

  async enterUsername(username) {
    const usernameField = await this.driver.wait(
      until.elementLocated(By.id('username')),
      5000
    );
    await usernameField.clear();
    await usernameField.sendKeys(username);
  }

  async enterPassword(password) {
    const passwordField = await this.driver.wait(
      until.elementLocated(By.id('password')),
      5000
    );
    await passwordField.clear();
    await passwordField.sendKeys(password);
  }

  async clickLogin() {
    const loginButton = await this.driver.wait(
      until.elementLocated(By.css('button[type="submit"]')),
      5000
    );

    await loginButton.click();

    // Wait for page response (success OR failure)
    await this.driver.wait(async () => {
      const url = await this.driver.getCurrentUrl();
      return url.includes('/secure') || url.includes('/login');
    }, 5000);
  }

  async getMessage() {
    const flash = await this.driver.wait(
      until.elementLocated(By.css('#flash')),
      7000
    );

    await this.driver.wait(
      until.elementIsVisible(flash),
      5000
    );

    return await flash.getText();
  }
}

module.exports = LoginPage;