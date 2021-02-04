package cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects;

import net.serenitybdd.screenplay.targets.Target;
import org.openqa.selenium.By;

public class RegistrationPage {

    public static final Target usernameField = Target
        .the("Username field")
        .located(By.id("username"));

    public static final Target firstNameField = Target
        .the("First name field")
        .located(By.id("name"));

    public static final Target surnameField = Target
        .the("Surname field")
        .located(By.id("surname"));

    public static final Target emailField = Target
        .the("Email field")
        .located(By.id("email"));

    public static final Target passwordField = Target
        .the("Password field")
        .located(By.id("password"));

    public static final Target confirmPasswordField = Target
        .the("Confirm password field")
        .located(By.id("confirmPassword"));

    public static final Target submitButton = Target
        .the("submitButton")
        .located(By.xpath("/html/body/jhi-main/div[2]/div/jhi-register/div/div[2]/div/form/button"));

    public static final Target SUCCESS_MESSAGE = Target.the("Registration success")
        .locatedBy("/html/body/jhi-main/div[2]/div/jhi-register/div/div[1]/div/div[1]");

}
