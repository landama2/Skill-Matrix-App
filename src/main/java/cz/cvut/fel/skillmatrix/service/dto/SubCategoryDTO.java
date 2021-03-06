package cz.cvut.fel.skillmatrix.service.dto;

import cz.cvut.fel.skillmatrix.domain.SubCategory;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link SubCategory} entity.
 */
public class SubCategoryDTO implements Serializable {

    private Long id;

    private String name;


    private Long categoryId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubCategoryDTO subCategoryDTO = (SubCategoryDTO) o;
        if (subCategoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subCategoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubCategoryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", categoryId=" + getCategoryId() +
            "}";
    }
}
