package cz.cvut.fel.skillmatrix.frontend.screenplay.pageobjects;

import net.serenitybdd.core.pages.PageObject;
import net.serenitybdd.screenplay.targets.Target;
import net.thucydides.core.annotations.DefaultUrl;

@DefaultUrl("http://localhost:8080/category-my-suffix")
public class CategoryPage extends PageObject {

    public static final Target CREATE_CATEGORY = Target
        .the("Create category")
        .locatedBy("//*[@id=\"jh-create-entity\"]");

    public static final Target EDIT_CATEGORY = Target
        .the("Edit category")
        .locatedBy("//*[@id=\"entities\"]/table/tbody/tr[1]/td[3]/div/button[2]");

    public static final Target CATEGORY_NAME_FIELD = Target
        .the("Category name field")
        .locatedBy("//*[@id=\"field_name\"]");

    public static final Target SAVE_CATEGORY = Target
        .the("Save category")
        .locatedBy("//*[@id=\"save-entity\"]");

    public static final Target CANCEL_SAVE = Target
        .the("Cancel save")
        .locatedBy("//*[@id=\"cancel-save\"]");

    public static final Target CREATED_MESSAGE = Target
        .the("Created message")
        .locatedBy("/html/body/jhi-main/div[2]/div/jhi-category-my-suffix/div/jhi-alert/div/div");
}
