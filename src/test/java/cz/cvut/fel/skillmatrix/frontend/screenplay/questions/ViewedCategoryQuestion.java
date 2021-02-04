package cz.cvut.fel.skillmatrix.frontend.screenplay.questions;

import cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects.CategoryDetailPage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

public class ViewedCategoryQuestion implements Question<String> {

    public static Question<String> name() {
        return new ViewedCategoryQuestion();
    }

    @Override
    public String answeredBy(Actor actor){
        return Text.of(CategoryDetailPage.NAME).viewedBy(actor).toString();
    }
}
