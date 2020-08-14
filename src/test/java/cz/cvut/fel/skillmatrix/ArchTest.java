package cz.cvut.fel.skillmatrix;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("cz.cvut.fel.skillmatrix");

        noClasses()
            .that()
                .resideInAnyPackage("cz.cvut.fel.skillmatrix.service..")
            .or()
                .resideInAnyPackage("cz.cvut.fel.skillmatrix.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..cz.cvut.fel.skillmatrix.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
