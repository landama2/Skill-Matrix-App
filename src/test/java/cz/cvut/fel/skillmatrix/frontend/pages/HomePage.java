package cz.cvut.fel.skillmatrix.frontend.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class HomePage extends BasePage {

    @FindBy(linkText = "Account")
    WebElement accountButton;

    @FindBy(linkText = "Sign in")
    WebElement loginButton;

    @FindBy(xpath = "//*[@id=\"logoutForm\"]/button")
    WebElement logoutButton;

//    @FindBy(linkText = "Register")
    @FindBy(linkText = "Register a new account")
    WebElement registerButton;

    @FindBy(xpath = "//*[@id=\"Industry\"]")
    WebElement industryCmb;

    @FindBy(className = "btn-danger")
    WebElement resetButton;

    @FindBy(xpath = "//*[@id=\"cookieConsent\"]/div/div/div/button")
    WebElement acceptCookieBanner;

    public HomePage(WebDriver driver) {
        super(driver);
        disposeOfCookieBanner();
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

    public void clickOnProduct(int index) {
        List<WebElement> elements = driver.findElements(By.className("product-price"));
        assertTrue(elements.size() > index);
        elements.get(index).click();
    }

    public void logout() {
        if (isLoggedIn()) {
            clickLogout();
        }
    }

    public void disposeOfCookieBanner() {
        List<WebElement> elements = driver.findElements(By.xpath("//*[@id=\"cookieConsent\"]/div/div/div/button"));
        if (!elements.isEmpty()) {
            elements.get(0).click();
        }
    }

    public boolean isLoggedIn() {
        return !driver.findElements(By.xpath("//a[@href=\"/user\"]")).isEmpty();
    }

    public boolean isAdminLoggedIn() {
        return getLoggedUser().equals("Shop Admin");
    }

    public String getLoggedUser() {
        String text = driver.findElement(By.xpath("//a[@href=\"/user\"]")).getText();
        Pattern pattern = Pattern.compile("Hello (.*?)!");
        Matcher matcher = pattern.matcher(text);
        if (!matcher.find())
            return null;
        return matcher.group(1);
    }

    public void resetData() {
        (new Select(industryCmb)).selectByValue("Phones");
        resetButton.click();
        disposeOfCookieBanner();
    }
}
