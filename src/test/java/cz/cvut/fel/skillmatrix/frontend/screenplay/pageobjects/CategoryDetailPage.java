package cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;

public class CategoryDetailPage extends PageObject {

    public static final Target NAME = Target
        .the("Name")
        .locatedBy("/html/body/jhi-main/div[2]/div/jhi-category-my-suffix-detail/div/div/div/dl/dd/span");


}
