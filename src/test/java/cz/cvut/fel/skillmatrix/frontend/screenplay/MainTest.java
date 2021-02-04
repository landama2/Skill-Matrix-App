package cz.cvut.fel.skillmatrix.frontend.screenplay;

import cz.cvut.fel.skillmatrix.domain.Category;
import cz.cvut.fel.skillmatrix.frontend.screenplay.abilities.Authenticate;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.ApplicationHomePage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.CategoryPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.LoginPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.RegistrationPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.questions.DisplayedItemsQuestion;
import cz.cvut.fel.skillmatrix.frontend.screenplay.questions.DisplayedMessageQuestion;
import cz.cvut.fel.skillmatrix.frontend.screenplay.questions.Price;
import cz.cvut.fel.skillmatrix.frontend.screenplay.tasks.*;
import cz.cvut.fel.skillmatrix.frontend.screenplay.utils.CsvInputConverter;
import cz.cvut.fel.skillmatrix.frontend.screenplay.utils.Passwords;
import cz.cvut.fel.still.sqa.seleniumStarterPack.config.DriverFactory;
import net.serenitybdd.junit.runners.SerenityRunner;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.abilities.BrowseTheWeb;
import net.serenitybdd.screenplay.actions.Open;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

import static net.serenitybdd.screenplay.GivenWhenThen.*;
import static org.hamcrest.core.Is.is;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(SerenityRunner.class)
public class MainTest {

    Actor regularUser =
            Actor.named("test")
                    .whoCan(Authenticate.with(
                            "user",
                            "user"
                    ));

    Actor admin =
        Actor.named("admin")
            .whoCan(Authenticate.with(
                "admin",
                "admin"
            ));

    private WebDriver theBrowser;

    @Before
    public void before() throws IOException {
        theBrowser = new DriverFactory().getDriver();
        theBrowser.manage().window().maximize();
        theBrowser.manage().deleteAllCookies();

        regularUser.can(BrowseTheWeb.with(theBrowser));
        admin.can(BrowseTheWeb.with(theBrowser));
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/twoway-acts.csv", numLinesToSkip = 1)
    public void register(String email, String usernameLength, String passwords, boolean valid) {
        givenThat(regularUser).wasAbleTo(Open.browserOn().the(ApplicationHomePage.class));

        Passwords passwordsConverted = CsvInputConverter.toPassword(passwords);
        when(regularUser).attemptsTo(
            Register.called(
                email,
                CsvInputConverter.toUsername(usernameLength),
                passwordsConverted.getPassword1(),
                passwordsConverted.getPassword2()));

        if (valid) {
            then(regularUser).should(seeThat(DisplayedMessageQuestion.forUser(RegistrationPage.SUCCESS_MESSAGE), is(Matchers.containsString("Registration saved! Please check your email for confirmation."))));
        } else {
            Exception exception = assertThrows(Exception.class, () -> {
                then(regularUser).should(seeThat(DisplayedMessageQuestion.forUser(RegistrationPage.SUCCESS_MESSAGE), is(Matchers.containsString("Registration saved! Please check your email for confirmation."))));
            });

        }
    }

    @Test
    public void login() {
        givenThat(regularUser).wasAbleTo(
            Open.browserOn().the(LoginPage.class),
            Login.withCredentials());

        then(regularUser).should(seeThat(DisplayedMessageQuestion.forUser(ApplicationHomePage.GREETING_MESSAGE), is(Matchers.containsString("You are logged in as user"))));
    }

    @Test
    public void createCategory() {
        givenThat(admin).wasAbleTo(
            Open.browserOn().the(LoginPage.class),
            Login.withCredentials());

        when(admin).attemptsTo(
                Open.browserOn().the(ApplicationHomePage.class),
                CreateCategory.called("Category 1"));

        then(admin).should(seeThat(DisplayedMessageQuestion.forUser(CategoryPage.CREATED_MESSAGE), is(Matchers.containsString("A new Category is created"))));
    }

    @Test
    public void readCategory() {
        givenThat(admin).wasAbleTo(
            Open.browserOn().the(LoginPage.class),
            Login.withCredentials());

        when(admin).attemptsTo(
            Open.browserOn().the(ApplicationHomePage.class),
            ReadCategory.called(1));

        then(admin).should(seeThat(DisplayedMessageQuestion.forUser(CategoryPage.CREATED_MESSAGE), is(Matchers.containsString("A new Category is created"))));
    }

    @After
    public void closeBrowser() {
        theBrowser.close();
    }
}
