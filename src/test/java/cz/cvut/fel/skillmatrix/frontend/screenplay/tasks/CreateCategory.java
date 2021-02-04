package cz.cvut.fel.skillmatrix.frontend.screenplay.tasks;

import cz.cvut.fel.skillmatrix.domain.Category;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.CategoryPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.LoggedInMenu;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.LoginPage;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.actions.Enter;
import net.thucydides.core.annotations.Step;

import static cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.ApplicationHomePage.CATEGORY_NAME;

public class CreateCategory implements Task {

    String categoryName;

    public CreateCategory(String categoryName) {
        this.categoryName = categoryName;
    }

    public static CreateCategory called(String categoryName) {
        return Instrumented.instanceOf(CreateCategory.class).withProperties(categoryName);
    }

    @Step("{0} creates category #categoryName")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
            Click.on(LoggedInMenu.category),
            Click.on(CategoryPage.CREATE_CATEGORY),
            Enter.theValue(categoryName)
                .into(CategoryPage.CATEGORY_NAME_FIELD),
            Click.on(CategoryPage.SAVE_CATEGORY)
        );
    }
}
