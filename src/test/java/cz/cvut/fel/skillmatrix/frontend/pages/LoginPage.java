package cz.cvut.fel.skillmatrix.frontend.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends BasePage {

    @FindBy(id = "username")
    WebElement usernameField;

    @FindBy(id = "password")
    WebElement passwordField;

    @FindBy(id = "rememberMe")
    WebElement rememberField;

    @FindBy(xpath = "/html/body/ngb-modal-window/div/div/jhi-login-modal/div[2]/div/div[2]/form/button")
    WebElement loginButton;

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    @Override
    protected String getPageUrl() {
        return Config.HOST_URL;
    }

    public void setUsername(String username) {
        usernameField.clear();
        usernameField.sendKeys(username);
    }

    public void setPassword(String password) {
        passwordField.clear();
        passwordField.sendKeys(password);
    }

    public void setRemember(boolean value) {
        if (rememberField.isSelected() != value)
            rememberField.click();
    }

    public void clickLogin() {
        loginButton.click();
    }

    public void login(String email, String password, boolean remember) {
        setUsername(email);
        setPassword(password);
        setRemember(remember);
        clickLogin();
    }

    public void login(String email, String password)  {
        login(email, password, false);
    }
}
