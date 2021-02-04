package cz.cvut.fel.skillmatrix.frontend.screenplay.tasks;

import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.CategoryPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.LoggedInMenu;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.thucydides.core.annotations.Step;

public class ReadCategory implements Task {

    int order;

    public ReadCategory(int order) {
        this.order = order;
    }

    public static ReadCategory called(int order) {
        return Instrumented.instanceOf(ReadCategory.class).withProperties(order);
    }

    @Step("{0} reads category #categoryName")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
            Click.on(LoggedInMenu.category),
            Click.on(CategoryPage.VIEW_BUTTON.of(String.valueOf(order)))
        );
    }
}
