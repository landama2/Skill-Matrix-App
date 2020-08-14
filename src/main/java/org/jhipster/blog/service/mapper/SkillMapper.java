package org.jhipster.blog.service.mapper;


import org.jhipster.blog.domain.*;
import org.jhipster.blog.service.dto.SkillDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Skill} and its DTO {@link SkillDTO}.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class, SubCategoryMapper.class})
public interface SkillMapper extends EntityMapper<SkillDTO, Skill> {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "subCategory.id", target = "subCategoryId")
    SkillDTO toDto(Skill skill);

    @Mapping(target = "userSkills", ignore = true)
    @Mapping(source = "categoryId", target = "category")
    @Mapping(source = "subCategoryId", target = "subCategory")
    Skill toEntity(SkillDTO skillDTO);

    default Skill fromId(Long id) {
        if (id == null) {
            return null;
        }
        Skill skill = new Skill();
        skill.setId(id);
        return skill;
    }
}
