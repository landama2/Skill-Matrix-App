package cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects;

import net.serenitybdd.core.annotations.findby.By;
import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("http://localhost:8080")
public class LoginPage extends PageObject {

    public static final Target username = Target
            .the("Username field")
            .located(By.id("username"));

    public static final Target password = Target
            .the("Password field")
            .located(By.id("password"));

    public static final Target loginButton = Target
            .the("Login button")
            .located(By.id("signIn"));

    public static final Target loginLink = Target
        .the("Login link")
        .locatedBy("/html/body/jhi-main/div[2]/div/jhi-home/div/div[2]/div/div[1]/a");

    public static final Target registerLink = Target
        .the("Login link")
        .located(By.linkText("Register a new account"));

}
