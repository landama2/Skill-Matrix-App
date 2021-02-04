package cz.cvut.fel.skillmatrix.frontend.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class RegisterPage extends BasePage {

    @FindBy(id = "username")
    WebElement usernameField;

    @FindBy(id = "name")
    WebElement firstNameField;

    @FindBy(id = "surname")
    WebElement surnameField;

    @FindBy(id = "email")
    WebElement emailField;

    @FindBy(id="password")
    WebElement passwordField;

    @FindBy(id="confirmPassword")
    WebElement confirmPasswordField;

    @FindBy(xpath = "/html/body/jhi-main/div[2]/div/jhi-register/div/div[2]/div/form/button")
    WebElement registerButton;

    public RegisterPage(WebDriver driver) {
        super(driver);
    }

    @Override
    protected String getPageUrl() {
        return Config.HOST_URL + "/account/register";
    }

    public void clickRegister() {
        registerButton.click();
    }

    public void register(String username, String email, String firstName, String surname, String password) {
        setField(usernameField, username);
        setField(emailField, email);
        setField(firstNameField, firstName);
        setField(surnameField, surname);
        setField(passwordField, password);
        setField(confirmPasswordField, password);
        clickRegister();
    }
}
