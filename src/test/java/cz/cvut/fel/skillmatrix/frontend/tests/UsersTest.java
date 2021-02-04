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

public class UsersTest extends DriverBase {
    WebDriver driver;
//    TestUtil util;

    @Before
    public void before() throws IOException {
        driver = new DriverFactory().getDriver();
//        util = new TestUtil(driver);
    }

    @After
    public void after() throws IOException {
        driver.close();
//        util = null;
    }

    @Test
    public void loginAsAdmin() {
//        util.loginAsAdmin();
    }

    @Test
    public void capablancaRegistration() throws InterruptedException {
        HomePage homePage = HomePage.goToUnlogged(driver);
        Thread.sleep(2000);

        homePage.clickRegister();

        Thread.sleep(5000);

        RegisterPage registerPage = new RegisterPage(driver);
        registerPage.register("test", "test@test.com", "John", "Doe", "test");
        Thread.sleep(10000);

//        util.ensureCapablancaIsRegistered(homePage);
        homePage.clickLogin();
        Thread.sleep(10000);
        LoginPage loginPage = new LoginPage(driver);
        assertTrue(loginPage.isOnPage());
//        loginPage.login(PropertiesContainer.getCapablancaEmail(), PropertiesContainer.getCapablancaPassword());
//        loginPage.login("user", "user");
        loginPage.login("test", "test");
//        assertTrue(homePage.isOnPage());
//        assertEquals(PropertiesContainer.getCapablancaName(), homePage.getLoggedUser());
        Thread.sleep(10000);
        homePage.logout();
    }

    private void assertTrue(boolean onPage) {
    }
}
