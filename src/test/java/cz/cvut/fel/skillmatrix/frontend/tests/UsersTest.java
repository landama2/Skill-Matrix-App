package cz.cvut.horovtom.zks.semestral.pom.test;

import cz.cvut.fel.still.sqa.seleniumStarterPack.DriverBase;
import cz.cvut.fel.still.sqa.seleniumStarterPack.config.DriverFactory;
import cz.cvut.horovtom.zks.semestral.PropertiesContainer;
import cz.cvut.horovtom.zks.semestral.pom.pages.HomePage;
import cz.cvut.horovtom.zks.semestral.pom.pages.LoginPage;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class UsersTest extends DriverBase {
    WebDriver driver;
    TestUtil util;

    @Before
    public void before() throws IOException {
        driver = new DriverFactory().getDriver();
        util = new TestUtil(driver);
    }

    @After
    public void after() throws IOException {
        driver.close();
        util = null;
    }

    @Test
    public void loginAsAdmin() {
        util.loginAsAdmin();
    }

    @Test
    public void capablancaRegistration() {
        HomePage homePage = HomePage.goToUnlogged(driver);
        util.ensureCapablancaIsRegistered(homePage);
        homePage.clickLogin();
        LoginPage loginPage = new LoginPage(driver);
        assertTrue(loginPage.isOnPage());
        loginPage.login(PropertiesContainer.getCapablancaEmail(), PropertiesContainer.getCapablancaPassword());
        assertTrue(homePage.isOnPage());
        assertEquals(PropertiesContainer.getCapablancaName(), homePage.getLoggedUser());
        homePage.logout();
    }
}
