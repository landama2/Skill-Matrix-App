package cz.cvut.fel.skillmatrix.frontend.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class HomePage extends BasePage {

    @FindBy(linkText = "Account")
    WebElement accountButton;

    @FindBy(linkText = "Sign in")
    WebElement loginButton;

    @FindBy(xpath = "//*[@id=\"logout\"]")
    WebElement logoutButton;

    @FindBy(linkText = "Register a new account")
    WebElement registerButton;

    public HomePage(WebDriver driver) {
        super(driver);
    }

    @Override
    protected String getPageUrl() {
        return Config.HOST_URL;
    }

    public static HomePage goToUnlogged(WebDriver driver) {
        HomePage homePage = goTo(driver);
        assertEquals(homePage.getPageUrl(), homePage.getPageUrl());
        homePage.logout();
        return homePage;
    }

    public static HomePage goTo(WebDriver driver) {
        String url = Config.HOST_URL;
        driver.get(url);

        return new HomePage(driver);
    }

    public void clickLogin() {
        accountButton.click();
        loginButton.click();
    }

    public void clickRegister() {
        registerButton.click();
    }

    public void clickLogout() {
        logoutButton.click();
    }

    public void logout() {
        if (isLoggedIn()) {
            clickLogout();
        }
    }

    public boolean isLoggedIn() {
        return !driver.findElements(By.xpath("//a[@href=\"/user\"]")).isEmpty();
    }

}
