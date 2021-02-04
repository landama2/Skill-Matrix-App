package cz.cvut.fel.skillmatrix.frontend.tests;

import cz.cvut.fel.skillmatrix.frontend.pages.HomePage;
import cz.cvut.fel.skillmatrix.frontend.pages.LoginPage;
import cz.cvut.fel.skillmatrix.frontend.pages.RegisterPage;
import cz.cvut.fel.still.sqa.seleniumStarterPack.DriverBase;
import cz.cvut.fel.still.sqa.seleniumStarterPack.config.DriverFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class BaseTests extends DriverBase {

    WebDriver driver;

    @Before
    public void before() throws IOException {
        driver = new DriverFactory().getDriver();
    }

    @After
    public void after() {
        driver.close();
    }

    @Test
    public void loginAsAdmin() {
        HomePage homePage = HomePage.goToUnlogged(driver);
        homePage.clickLogin();
        LoginPage loginPage = new LoginPage(driver);
        assertTrue(loginPage.isOnPage());
        loginPage.login("admin", "admin");
        homePage.logout();
    }

    @Test
    public void registration() {
        HomePage homePage = HomePage.goToUnlogged(driver);

        homePage.clickRegister();
        RegisterPage registerPage = new RegisterPage(driver);
        registerPage.register("test", "test@test.com", "John", "Doe", "test");

        //try loging in as the newly created user
        homePage.clickLogin();
        LoginPage loginPage = new LoginPage(driver);
        assertTrue(loginPage.isOnPage());
        loginPage.login("test", "test");
        homePage.logout();
    }

    @Test
    public void loginAsUser() {
        HomePage homePage = HomePage.goToUnlogged(driver);
        homePage.clickLogin();
        LoginPage loginPage = new LoginPage(driver);
        assertTrue(loginPage.isOnPage());
        loginPage.login("user", "user");
        homePage.logout();
    }

}
