package cz.cvut.fel.skillmatrix.service.mapper;


import cz.cvut.fel.skillmatrix.domain.SubCategory;
import cz.cvut.fel.skillmatrix.domain.*;
import cz.cvut.fel.skillmatrix.service.dto.SubCategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SubCategory} and its DTO {@link SubCategoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class})
public interface SubCategoryMapper extends EntityMapper<SubCategoryDTO, SubCategory> {

    @Mapping(source = "category.id", target = "categoryId")
    SubCategoryDTO toDto(SubCategory subCategory);

    @Mapping(target = "skills", ignore = true)
    @Mapping(target = "removeSkill", ignore = true)
    @Mapping(source = "categoryId", target = "category")
    SubCategory toEntity(SubCategoryDTO subCategoryDTO);

    default SubCategory fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubCategory subCategory = new SubCategory();
        subCategory.setId(id);
        return subCategory;
    }
}
