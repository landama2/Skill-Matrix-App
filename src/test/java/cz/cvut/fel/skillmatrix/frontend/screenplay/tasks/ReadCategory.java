package cz.cvut.fel.skillmatrix.frontend.screenplay.tasks;

import cz.cvut.fel.skillmatrix.domain.Category;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.CategoryDetailPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.CategoryPage;
import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.LoggedInMenu;
import net.serenitybdd.core.steps.Instrumented;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.questions.Visibility;
import net.serenitybdd.screenplay.waits.Wait;
import net.thucydides.core.annotations.Step;

import static org.hamcrest.Matchers.is;

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

            Click.on(LoggedInMenu.category)
        );

        actor.attemptsTo(Wait.until
            (Visibility.of(CategoryPage.VIEW_BUTTON.of(String.valueOf(order)))
            .viewedBy(actor)
                .asAQuestion(), is(true))
            .forNoLongerThan(2).seconds());
        actor.attemptsTo(
            Click.on(CategoryPage.VIEW_BUTTON.of(String.valueOf(order))).then(
                Wait.until(Visibility.of(CategoryDetailPage.NAME).viewedBy(actor).asAQuestion(), is(true))
                    .forNoLongerThan(2).seconds()));
    }
}
